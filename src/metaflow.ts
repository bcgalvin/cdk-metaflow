import * as apigw from '@aws-cdk/aws-apigateway';
import * as batch from '@aws-cdk/aws-batch';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as events from '@aws-cdk/aws-events';
import * as iam from '@aws-cdk/aws-iam';
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
  MetaflowNlb,
  MetaflowDashboard,
  IMetaflowDatabase,
  EcsExecutionRole,
  EcsTaskRole,
  EcsRole,
  LambdaECSExecuteRole,
  BatchExecutionRole,
  StepFunctionsRole,
  EventBridgeRole,
  BatchS3TaskRole,
} from './constructs';
import { ServiceInfo } from './constructs/constants';

export class Metaflow extends cdk.Construct {
  public readonly vpc: ec2.IVpc;
  public readonly cluster: ecs.ICluster;
  public readonly bucket: s3.IBucket;
  public readonly table: ddb.ITable;
  public readonly database: IMetaflowDatabase;
  public readonly eventBus: events.IEventBus;
  public readonly api: apigw.IRestApi;
  public readonly batchExecutionRole: iam.IRole;
  public readonly batchS3TaskRole: iam.IRole;
  public readonly stepFunctionsRole: iam.IRole;
  public readonly eventBridgeRole: iam.IRole;
  public readonly ecsTaskRole: iam.IRole;
  public readonly ecsRole: iam.IRole;
  public readonly ecsExecutionRole: iam.IRole;
  public readonly lambdaECSExecuteRole: iam.IRole;
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    // Network
    const vpc = new MetaflowVpc(this, 'vpc');
    this.vpc = vpc;
    const serviceSecurityGroup = new ec2.SecurityGroup(this, 'fargate-sg', {
      allowAllOutbound: true,
      vpc: this.vpc,
    });
    const databaseSecurityGroup = new ec2.SecurityGroup(this, 'rds-sg', {
      allowAllOutbound: true,
      vpc: this.vpc,
    });
    databaseSecurityGroup.connections.allowFrom(
      serviceSecurityGroup,
      ec2.Port.tcp(5432),
    );
    serviceSecurityGroup.connections.allowInternally(
      ec2.Port.allTraffic(),
      'Internal Communication',
    );
    serviceSecurityGroup.connections.allowFrom(
      ec2.Peer.ipv4(this.vpc.vpcCidrBlock),
      ec2.Port.tcp(8080),
      'Allow API Calls Internally',
    );
    serviceSecurityGroup.connections.allowFrom(
      ec2.Peer.ipv4(this.vpc.vpcCidrBlock),
      ec2.Port.tcp(8082),
      'Allow API Calls Internally',
    );

    // Persistence
    this.bucket = new MetaflowBucket(this, 'bucket');
    this.table = new MetaflowTable(this, 'table');
    this.eventBus = new events.EventBus(this, 'event-bus');
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
    this.batchExecutionRole = new BatchExecutionRole(
      this,
      'batch-execution-role',
    );
    this.batchExecutionRole.grantPassRole(
      new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    );
    this.batchExecutionRole.grantPassRole(
      new iam.ServicePrincipal('ec2.amazonaws.com.cn'),
    );
    this.batchExecutionRole.grantPassRole(
      new iam.ServicePrincipal('ec2.amazonaws.com'),
    );
    this.ecsRole = new EcsRole(this, 'ecs-role');
    this.stepFunctionsRole = new StepFunctionsRole(this, 'step-functions-role');
    this.eventBridgeRole = new EventBridgeRole(this, 'event-bridge-role');
    this.batchS3TaskRole = new BatchS3TaskRole(this, 'batch-s3-task-role');

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
        securityGroup: serviceSecurityGroup,
        executionRole: this.ecsExecutionRole,
        taskRole: this.ecsTaskRole,
        cluster: this.cluster,
        database: this.database.database,
      },
    );

    // Nlb
    const metaflowNlb = new MetaflowNlb(this, 'nlb', {
      vpc: this.vpc,
    });
    const nlbTarget = metaflowFargate.fargateService.loadBalancerTarget({
      containerName: ServiceInfo.SERVICE_NAME,
      protocol: ecs.Protocol.TCP,
      containerPort: 8080,
    });
    const dbMigrateTarget = metaflowFargate.fargateService.loadBalancerTarget({
      containerName: ServiceInfo.SERVICE_NAME,
      protocol: ecs.Protocol.TCP,
      containerPort: 8082,
    });
    metaflowNlb.nlbTargetGroup.addTarget(nlbTarget);
    metaflowNlb.dbMigrateTargetGroup.addTarget(dbMigrateTarget);

    // API Gateway
    const api = new MetaflowApi(this, 'api', {
      executionRole: this.lambdaECSExecuteRole,
      securityGroup: ec2.SecurityGroup.fromSecurityGroupId(
        this,
        'default-vpc-security-group',
        vpc.vpcDefaultSecurityGroup,
      ),
      vpc: this.vpc,
      nlb: metaflowNlb.nlb,
    });
    this.api = api.api;

    // Batch
    const computeEnvironment = new batch.CfnComputeEnvironment(
      this,
      'ComputeEnvironment',
      {
        type: 'MANAGED',
        serviceRole: this.batchExecutionRole.roleArn,
        computeResources: {
          maxvCpus: 90,
          type: 'FARGATE',
          securityGroupIds: [vpc.vpcDefaultSecurityGroup],
          subnets: vpc.publicSubnets.map((subnet) => subnet.subnetId),
        },
        state: 'ENABLED',
      },
    );
    const jobQueue = new batch.CfnJobQueue(this, 'JobQueue', {
      computeEnvironmentOrder: [
        {
          order: 1,
          computeEnvironment: computeEnvironment.ref,
        },
      ],
      state: 'ENABLED',
      priority: 1,
      jobQueueName: 'jobs',
    });
    jobQueue.addDependsOn(computeEnvironment);

    // Permissions
    this.bucket.grantRead(this.ecsTaskRole);
    this.bucket.grantRead(this.stepFunctionsRole);
    this.bucket.grantRead(this.batchS3TaskRole);
    this.table.grantReadWriteData(this.stepFunctionsRole);
    this.table.grantReadWriteData(this.batchS3TaskRole);
    this.eventBus.grantPutEventsTo(this.stepFunctionsRole);
    logGroup.grantWrite(this.ecsTaskRole);
    this.database.credentials.grantRead(this.ecsExecutionRole);
    this.database.credentials.grantRead(this.ecsTaskRole);

    // Cloudwatch
    new MetaflowDashboard(this, 'dashboard', {
      dashboardName: 'MetaflowDashboard',
      bucketName: this.bucket.bucketName,
      ecsService: metaflowFargate.fargateService,
      period: 15,
    });

    // Outputs
    new cdk.CfnOutput(this, 'batch-queue-output', {
      exportName: 'BatchJobQueueArn',
      value: `arn:${cdk.Aws.PARTITION}:batch:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:job-queue/jobs`,
    });
    new cdk.CfnOutput(this, 'ddb-table-output', {
      exportName: 'DDBTableName',
      value: this.table.tableName,
    });
    new cdk.CfnOutput(this, 'batch-s3-role-output', {
      exportName: 'ECSJobRoleForBatchJobs',
      value: this.batchS3TaskRole.roleArn,
    });
    new cdk.CfnOutput(this, 'event-bridge-s3-role-output', {
      exportName: 'EventBridgeRoleArn',
      value: this.eventBridgeRole.roleArn,
    });
    new cdk.CfnOutput(this, 'internal-url-output', {
      exportName: 'InternalServiceUrl',
      value: `http://${metaflowNlb.nlb.loadBalancerDnsName}/`,
    });
    new cdk.CfnOutput(this, 'data-store-output', {
      exportName: 'MetaflowDataStoreS3Url',
      value: `s3://${this.bucket.bucketName}/metaflow`,
    });
    new cdk.CfnOutput(this, 'data-tools-output', {
      exportName: 'MetaflowDataToolsS3Url',
      value: `s3://${this.bucket.bucketName}/data`,
    });
    new cdk.CfnOutput(this, 'migration-function-output', {
      exportName: 'MigrationFunctionName',
      value: api.dbMigrateLambda.functionName,
    });
    new cdk.CfnOutput(this, 'service-url-output', {
      exportName: 'ServiceUrl',
      value: `http://${metaflowNlb.nlb.loadBalancerDnsName}/api`,
    });
    new cdk.CfnOutput(this, 'step-functions-role-output', {
      exportName: 'StepFunctionsRoleArn',
      value: this.stepFunctionsRole.roleArn,
    });
    new cdk.CfnOutput(this, 'ecs-fargate-execution-role-output', {
      exportName: 'EcsFargateExecutionRoleArn',
      value: this.ecsRole.roleArn,
    });
  }
}
