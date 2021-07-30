import * as path from 'path';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import * as logs from '@aws-cdk/aws-logs';
import * as cdk from '@aws-cdk/core';

export interface MetaflowApiProps {
  readonly executionRole: iam.IRole;
  readonly vpc: ec2.IVpc;
  readonly securityGroup: ec2.ISecurityGroup;
  readonly nlb: elbv2.INetworkLoadBalancer;
}

/**
 * @summary Metaflow Api
 */
export class MetaflowApi extends cdk.Construct {
  /**
   * Constructs a new instance of the MetaflowApi class.
   * @param {Construct} scope the Scope of the CDK Construct
   * @param {string} id the ID of the CDK Construct
   * @param {MetaflowApiProps} props the MetaflowApiProps [properties]{@link MetaflowApiProps}
   * @access public
   */
  public readonly api: apigw.IRestApi;
  public readonly apiKey: apigw.IApiKey;
  constructor(scope: cdk.Construct, id: string, props: MetaflowApiProps) {
    super(scope, id);
    const logGroup = new logs.LogGroup(this, 'api-logs', {
      logGroupName: cdk.Aws.STACK_NAME + '-api',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    this.api = new apigw.RestApi(this, 'api', {
      endpointConfiguration: {
        types: [apigw.EndpointType.EDGE],
      },
      deployOptions: {
        metricsEnabled: true,
        accessLogDestination: new apigw.LogGroupLogDestination(logGroup),
        loggingLevel: apigw.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
        tracingEnabled: true,
        stageName: 'api',
      },
    });
    this.apiKey = new apigw.ApiKey(this, 'api-key', {
      apiKeyName: `${cdk.Aws.STACK_NAME}-apiKey`,
      enabled: true,
      resources: [this.api],
    });

    new apigw.UsagePlan(scope, 'usage-plan', {
      apiKey: this.apiKey,
      apiStages: [
        {
          stage: this.api.deploymentStage,
          api: this.api,
        },
      ],
    });

    const dbMigrateLambda = new lambda.Function(this, 'db-migrate-handler', {
      runtime: lambda.Runtime.PYTHON_3_8,
      description: 'Trigger DB Migration',
      functionName: 'migrate-db',
      vpc: props.vpc,
      securityGroups: [props.securityGroup],
      allowPublicSubnet: true,
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda/db-migrate')),
      role: props.executionRole,
      handler: 'index.handler',
      environment: {
        MD_LB_ADDRESS: `http://${props.nlb.loadBalancerDnsName}:8082`,
      },
    });
    const dbMigrateLambdaIntegration = new apigw.LambdaIntegration(
      dbMigrateLambda,
    );
    const dbMidgrateResource = this.api.root.addResource('db_schema_status');
    dbMidgrateResource.addMethod('GET', dbMigrateLambdaIntegration);

    const vpcLink = new apigw.CfnVpcLink(this, 'VpcLink', {
      name: 'vpcLink',
      targetArns: [props.nlb.loadBalancerArn],
    });
    const resource = new apigw.CfnResource(this, 'ApiResource', {
      parentId: this.api.restApiRootResourceId,
      restApiId: this.api.restApiId,
      pathPart: '{proxy+}',
    });
    const dbresource = new apigw.CfnResource(this, 'DBApiResource', {
      parentId: this.api.restApiRootResourceId,
      restApiId: this.api.restApiId,
      pathPart: 'db_schema_status',
    });
    new apigw.CfnMethod(this, 'ProxyMethod', {
      httpMethod: 'ANY',
      apiKeyRequired: true,
      resourceId: resource.ref,
      restApiId: this.api.restApiId,
      authorizationType: 'NONE',
      requestParameters: {
        methodRequestPathProxy: true,
      },
      integration: {
        connectionType: 'VPC_LINK',
        connectionId: vpcLink.ref,
        cacheKeyParameters: ['method.request.path.proxy'],
        requestParameters: {
          integrationRequestPathProxy: 'method.request.path.proxy',
        },
        integrationHttpMethod: 'ANY',
        type: 'HTTP_PROXY',
        uri: `http://${props.nlb.loadBalancerDnsName}/{proxy}`,
        passthroughBehavior: 'WHEN_NO_MATCH',
        integrationResponses: [
          {
            statusCode: '200',
          },
        ],
      },
    });
    new apigw.CfnMethod(this, 'DBMethod', {
      httpMethod: 'GET',
      apiKeyRequired: true,
      resourceId: dbresource.ref,
      restApiId: this.api.restApiId,
      authorizationType: 'NONE',
      integration: {
        connectionType: 'VPC_LINK',
        connectionId: vpcLink.ref,
        integrationHttpMethod: 'GET',
        type: 'HTTP_PROXY',
        uri: `http://${props.nlb.loadBalancerDnsName}:8082/db_schema_status`,
        passthroughBehavior: 'WHEN_NO_MATCH',
        integrationResponses: [
          {
            statusCode: '200',
          },
        ],
      },
    });
  }
}
