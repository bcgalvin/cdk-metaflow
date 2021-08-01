import * as apigw from '@aws-cdk/aws-apigateway';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as logs from '@aws-cdk/aws-logs';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import {
  MetaflowApi,
  MetaflowVpc,
  MetaflowBucket,
  MetaflowTable,
  MetaflowDatabaseInstance,
  MetaflowFargateService,
  MetaflowDashboard,
  IMetaflowDatabase,
  EcsExecutionRole,
  EcsTaskRole,
  LambdaECSExecuteRole,
} from './constructs';
import { ServiceInfo } from './constructs/constants';

export class Metaflow extends cdk.Construct {
  public readonly vpc: ec2.IVpc;
  public readonly cluster: ecs.ICluster;
  public readonly bucket: s3.IBucket;
  public readonly table: ddb.ITable;
  public readonly database: IMetaflowDatabase;
  public readonly api: apigw.IRestApi;
  public readonly ecsTaskRole: EcsTaskRole;
  public readonly ecsExecutionRole: EcsExecutionRole;
  public readonly lambdaECSExecuteRole: LambdaECSExecuteRole;
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);
    // Network
    const vpc = new MetaflowVpc(this, 'vpc');
    this.vpc = vpc;
    const databaseSecurityGroup = new ec2.SecurityGroup(this, 'rds-sg', {
      allowAllOutbound: true,
      vpc: this.vpc,
    });

    // Persistence
    this.bucket = new MetaflowBucket(this, 'bucket');
    this.table = new MetaflowTable(this, 'table');
    this.database = new MetaflowDatabaseInstance(this, 'database', {
      vpc: this.vpc,
      dbSecurityGroups: [databaseSecurityGroup],
      dbSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
    });
    const logGroup = new logs.LogGroup(this, 'ecs-log-group', {
      logGroupName: `/ecs/${cdk.Aws.STACK_NAME}-${ServiceInfo.SERVICE_NAME}`,
      retention: logs.RetentionDays.ONE_MONTH,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // iam
    this.ecsExecutionRole = new EcsExecutionRole(this, 'ecs-execution-role');
    this.ecsTaskRole = new EcsTaskRole(this, 'ecs-task-role');
    this.lambdaECSExecuteRole = new LambdaECSExecuteRole(
      this,
      'lambda-ecs-execution-role',
    );
    this.bucket.grantRead(this.ecsTaskRole);
    logGroup.grantWrite(this.ecsTaskRole);

    // Ecs
    this.cluster = new ecs.Cluster(this, 'metaflow-cluster', {
      enableFargateCapacityProviders: true,
      containerInsights: true,
      vpc: this.vpc,
    });
    const metaflowFargate = new MetaflowFargateService(
      this,
      'fargate-service',
      {
        logGroup: logGroup,
        secret: this.database.credentials,
        executionRole: this.ecsExecutionRole,
        taskRole: this.ecsTaskRole,
        cluster: this.cluster,
        database: this.database.database,
      },
    );

    metaflowFargate.fargateService.service.connections.allowTo(
      databaseSecurityGroup,
      ec2.Port.tcp(5432),
      'allow connections from the service to the database',
    );

    // Nlb

    // API Gateway
    const api = new MetaflowApi(this, 'api', {
      executionRole: this.lambdaECSExecuteRole,
      securityGroup: ec2.SecurityGroup.fromSecurityGroupId(
        this,
        'default-vpc-security-group',
        vpc.vpcDefaultSecurityGroup,
      ),
      vpc: this.vpc,
      nlb: metaflowFargate.fargateService.loadBalancer,
    });
    this.api = api.api;

    // Cloudwatch
    new MetaflowDashboard(this, 'dashboard', {
      dashboardName: 'MetaflowDashboard',
      bucketName: this.bucket.bucketName,
      ecsService: metaflowFargate.fargateService.service,
      period: 15,
    });
  }
}
