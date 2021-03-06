import * as apigw from '@aws-cdk/aws-apigateway';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import * as logs from '@aws-cdk/aws-logs';
import * as cdk from '@aws-cdk/core';

export interface MetaflowApiProps {
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

    const link = new apigw.VpcLink(cdk.Stack.of(this), 'gatewayLink', {
      targets: [props.nlb],
      vpcLinkName: 'apiGatewayECSLink',
    });

    const dbIntegration = new apigw.Integration({
      type: apigw.IntegrationType.HTTP_PROXY,
      options: {
        connectionType: apigw.ConnectionType.VPC_LINK,
        vpcLink: link,
        passthroughBehavior: apigw.PassthroughBehavior.WHEN_NO_MATCH,
        integrationResponses: [
          {
            statusCode: '200',
          },
        ],
      },
      integrationHttpMethod: 'GET',
      uri: `http://${props.nlb.loadBalancerDnsName}:8082/db_schema_status`,
    });

    const apiIntegration = new apigw.Integration({
      type: apigw.IntegrationType.HTTP_PROXY,
      options: {
        connectionType: apigw.ConnectionType.VPC_LINK,
        vpcLink: link,
        passthroughBehavior: apigw.PassthroughBehavior.WHEN_NO_MATCH,
        cacheKeyParameters: ['method.request.path.proxy'],
        requestParameters: {
          'integration.request.path.proxy': 'method.request.path.proxy',
        },
        integrationResponses: [
          {
            statusCode: '200',
          },
        ],
      },
      integrationHttpMethod: 'ANY',
      uri: `http://${props.nlb.loadBalancerDnsName}/{proxy}`,
    });

    const resource = this.api.root.addResource('{proxy+}');
    resource.addMethod('ANY', apiIntegration, {
      requestParameters: {
        'method.request.path.proxy': true,
      },
    });
    const dbResource = this.api.root.addResource('db_schema_status');
    dbResource.addMethod('GET', dbIntegration, {
      authorizationType: apigw.AuthorizationType.NONE,
    });
  }
}
