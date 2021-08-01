import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as patterns from '@aws-cdk/aws-ecs-patterns';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
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
}

export class MetaflowFargateService extends cdk.Construct {
  public readonly fargateTaskDefinition: ecs.FargateTaskDefinition;
  public readonly fargateService: patterns.NetworkLoadBalancedFargateService;

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
          hostPort: 2000,
          protocol: ecs.Protocol.UDP,
        },
      ],
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: 'xray',
        logGroup: props.logGroup,
      }),
      entryPoint: ['/usr/bin/xray', '-b', '127.0.0.1:2000', '-l', 'dev', '-o'],
    });

    this.fargateService = new patterns.NetworkLoadBalancedFargateService(
      this,
      'Service',
      {
        cluster: props.cluster,
        taskDefinition: this.fargateTaskDefinition,
        desiredCount: Number(ServiceInfo.DESIRED_COUNT),
        assignPublicIp: true,
        minHealthyPercent: 75,
        maxHealthyPercent: 200,
        taskSubnets: {
          subnetType: ec2.SubnetType.PUBLIC,
        },
      },
    );

    const nlbTargetGroup = new elbv2.NetworkTargetGroup(
      this,
      'nlb-target-group',
      {
        protocol: elbv2.Protocol.TCP,
        targetType: elbv2.TargetType.IP,
        port: 8080,
        vpc: props.cluster.vpc,
        healthCheck: {
          healthyThresholdCount: 2,
          unhealthyThresholdCount: 2,
          protocol: elbv2.Protocol.TCP,
          interval: cdk.Duration.seconds(10),
          timeout: cdk.Duration.seconds(10),
        },
      },
    );

    const dbMigrateTargetGroup = new elbv2.NetworkTargetGroup(
      this,
      'db-migrate-target-group',
      {
        protocol: elbv2.Protocol.TCP,
        targetType: elbv2.TargetType.IP,
        port: 8082,
        vpc: props.cluster.vpc,
        healthCheck: {
          healthyThresholdCount: 2,
          unhealthyThresholdCount: 2,
          port: '8080',
          protocol: elbv2.Protocol.TCP,
          interval: cdk.Duration.seconds(10),
          timeout: cdk.Duration.seconds(10),
        },
      },
    );

    this.fargateService.loadBalancer.addListener('db-migrate-listener', {
      port: 8082,
      protocol: elbv2.Protocol.TCP,
      defaultAction: elbv2.NetworkListenerAction.forward([
        dbMigrateTargetGroup,
      ]),
    });

    this.fargateService.loadBalancer.addListener('nlb-listener', {
      port: 8080,
      protocol: elbv2.Protocol.TCP,
      defaultAction: elbv2.NetworkListenerAction.forward([nlbTargetGroup]),
    });

    this.fargateService.service.connections.allowInternally(
      ec2.Port.allTraffic(),
      'Internal Communication',
    );
    this.fargateService.service.connections.allowFrom(
      ec2.Peer.ipv4(props.cluster.vpc.vpcCidrBlock),
      ec2.Port.tcp(8080),
    );
    this.fargateService.service.connections.allowFrom(
      ec2.Peer.ipv4(props.cluster.vpc.vpcCidrBlock),
      ec2.Port.tcp(8082),
    );
    const taskDefinitionPolicy = new iam.PolicyStatement();
    taskDefinitionPolicy.addActions(
      // Rules which allow ECS to attach network interfaces to instances
      // on your behalf in order for awsvpc networking mode to work right
      'ec2:AttachNetworkInterface',
      'ec2:CreateNetworkInterface',
      'ec2:CreateNetworkInterfacePermission',
      'ec2:DeleteNetworkInterface',
      'ec2:DeleteNetworkInterfacePermission',
      'ec2:Describe*',
      'ec2:DetachNetworkInterface',

      // Rules which allow ECS to update load balancers on your behalf
      //  with the information sabout how to send traffic to your containers
      'elasticloadbalancing:DeregisterInstancesFromLoadBalancer',
      'elasticloadbalancing:DeregisterTargets',
      'elasticloadbalancing:Describe*',
      'elasticloadbalancing:RegisterInstancesWithLoadBalancer',
      'elasticloadbalancing:RegisterTargets',

      //  Rules which allow ECS to run tasks that have IAM roles assigned to them.
      'iam:PassRole',

      //  Rules that let ECS create and push logs to CloudWatch.
      'logs:DescribeLogStreams',
      'logs:CreateLogGroup',
    );
    taskDefinitionPolicy.addAllResources();
    this.fargateService.taskDefinition.addToTaskRolePolicy(
      taskDefinitionPolicy,
    );
  }
}
