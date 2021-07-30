import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as iam from '@aws-cdk/aws-iam';
import * as logs from '@aws-cdk/aws-logs';
import * as rds from '@aws-cdk/aws-rds';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';
import * as cdk from '@aws-cdk/core';
import { ServiceInfo } from './constants';

export interface MetaflowFargateServiceProps {
  readonly database: rds.IDatabaseInstance;
  readonly cluster: ecs.ICluster;
  readonly secret: secretsmanager.ISecret;
  readonly logGroup: logs.ILogGroup;
  readonly taskRole: iam.IRole;
  readonly executionRole: iam.IRole;
  readonly securityGroup: ec2.SecurityGroup;
}

export class MetaflowFargateService extends cdk.Construct {
  public readonly fargateTaskDefinition: ecs.FargateTaskDefinition;
  public readonly fargateService: ecs.FargateService;

  constructor(
    scope: cdk.Construct,
    id: string,
    props: MetaflowFargateServiceProps,
  ) {
    super(scope, id);

    this.fargateTaskDefinition = new ecs.FargateTaskDefinition(
      this,
      'metaflow-fargate-task-definition',
      {
        family: ServiceInfo.SERVICE_NAME,
        cpu: Number(ServiceInfo.CONTAINER_CPU),
        memoryLimitMiB: Number(ServiceInfo.CONTAINER_MEMORY),
        executionRole: props.executionRole,
        taskRole: props.taskRole,
      },
    );
    this.fargateTaskDefinition.addContainer('metadata-service', {
      containerName: ServiceInfo.SERVICE_NAME,
      image: ecs.ContainerImage.fromRegistry(ServiceInfo.IMAGE_URL),
      cpu: 512,
      portMappings: [
        {
          containerPort: Number(ServiceInfo.CONTAINER_PORT),
          hostPort: Number(ServiceInfo.CONTAINER_PORT),
          protocol: ecs.Protocol.TCP,
        },
        {
          containerPort: 8082,
          hostPort: 8082,
          protocol: ecs.Protocol.TCP,
        },
      ],
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: 'ecs',
        logGroup: props.logGroup,
      }),
      environment: {
        MF_METADATA_DB_HOST: props.database.dbInstanceEndpointAddress,
        MF_METADATA_DB_PORT: props.database.dbInstanceEndpointPort,
        MF_METADATA_DB_USER: ServiceInfo.DB_USER,
        MF_METADATA_DB_PSWD: props.secret
          .secretValueFromJson('password')
          .toString(),
        MF_METADATA_DB_NAME: 'metaflow',
      },
    });

    this.fargateTaskDefinition.addContainer('xray', {
      image: ecs.ContainerImage.fromRegistry('amazon/aws-xray-daemon'),
      essential: true,
      memoryReservationMiB: 256,
      environment: {
        AWS_REGION: cdk.Stack.of(this).region,
      },
      portMappings: [
        {
          containerPort: 2000,
          protocol: ecs.Protocol.UDP,
        },
      ],
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: 'xray',
        logGroup: props.logGroup,
      }),
      entryPoint: ['/usr/bin/xray', '-b', '127.0.0.1:2000', '-l', 'dev', '-o'],
    });

    this.fargateService = new ecs.FargateService(this, 'Service', {
      cluster: props.cluster,
      taskDefinition: this.fargateTaskDefinition,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      desiredCount: Number(ServiceInfo.DESIRED_COUNT),
      securityGroups: [props.securityGroup],
      assignPublicIp: true,
      capacityProviderStrategies: [
        {
          capacityProvider: 'FARGATE_SPOT',
          weight: 1,
        },
        {
          capacityProvider: 'FARGATE',
          weight: 0,
        },
      ],
      minHealthyPercent: 75,
      maxHealthyPercent: 200,
    });
  }
}
