import * as ddb from '@aws-cdk/aws-dynamodb';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import {
  MetaflowVpc,
  MetaflowBucket,
  MetaflowTable,
  MetaflowDatabaseInstance,
  IMetaflowDatabase,
  EcsExecutionRole,
  EcsTaskRole,
  LambdaECSExecuteRole,
} from './constructs';

export class Metaflow extends cdk.Construct {
  public readonly vpc: ec2.IVpc;
  public readonly bucket: s3.IBucket;
  public readonly table: ddb.ITable;
  public readonly database: IMetaflowDatabase;
  public readonly ecsTaskRole: EcsTaskRole;
  public readonly ecsExecutionRole: EcsExecutionRole;
  public readonly lambdaECSExecuteRole: LambdaECSExecuteRole;
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);
    // Network
    this.vpc = new MetaflowVpc(this, 'vpc');
    const databaseSecurityGroup = new ec2.SecurityGroup(this, 'rds-sg', {
      allowAllOutbound: true,
      vpc: this.vpc,
    });
    const serviceSecurityGroup = new ec2.SecurityGroup(this, 'fargate-sg', {
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
    this.database = new MetaflowDatabaseInstance(this, 'database', {
      vpc: this.vpc,
      dbSecurityGroups: [databaseSecurityGroup],
      dbSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
    });

    // iam
    this.ecsExecutionRole = new EcsExecutionRole(this, 'ecs-execution-role');
    this.ecsTaskRole = new EcsTaskRole(this, 'ecs-task-role');
    this.lambdaECSExecuteRole = new LambdaECSExecuteRole(
      this,
      'lambda-ecs-execution-role',
    );
    this.bucket.grantRead(this.ecsTaskRole);
  }
}
