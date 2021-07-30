import * as ec2 from '@aws-cdk/aws-ec2';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import * as cdk from '@aws-cdk/core';

export interface MetaflowNlbProps {
  readonly vpc: ec2.IVpc;
}

/**
 * @summary Metaflow Nlb
 */
export class MetaflowNlb extends cdk.Construct {
  /**
   * Constructs a new instance of the MetaflowNlb class.
   * @param {Construct} scope the Scope of the CDK Construct
   * @param {string} id the ID of the CDK Construct
   * @param {MetaflowApiProps} props the MetaflowApiProps [properties]{@link MetaflowApiProps}
   * @access public
   */
  readonly nlb: elbv2.NetworkLoadBalancer;
  constructor(scope: cdk.Construct, id: string, props: MetaflowNlbProps) {
    super(scope, id);

    this.nlb = new elbv2.NetworkLoadBalancer(this, 'ExternalNlb', {
      vpc: props.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
    });

    const nlbTarget = new elbv2.NetworkTargetGroup(this, 'nlb-target-group', {
      protocol: elbv2.Protocol.TCP,
      targetType: elbv2.TargetType.IP,
      port: 8080,
      vpc: props.vpc,
      healthCheck: {
        healthyThresholdCount: 2,
        protocol: elbv2.Protocol.TCP,
        timeout: cdk.Duration.seconds(10),
      },
    });
    const dbMigrateTarget = new elbv2.NetworkTargetGroup(
      this,
      'db-migrate-target-group',
      {
        protocol: elbv2.Protocol.TCP,
        targetType: elbv2.TargetType.IP,
        port: 8082,
        vpc: props.vpc,
        healthCheck: {
          healthyThresholdCount: 2,
          port: '8080',
          protocol: elbv2.Protocol.TCP,
          timeout: cdk.Duration.seconds(10),
        },
      },
    );

    new elbv2.NetworkListener(this, 'nlb-listener', {
      loadBalancer: this.nlb!,
      port: 80,
      protocol: elbv2.Protocol.TCP,
      defaultAction: elbv2.NetworkListenerAction.forward([nlbTarget]),
    });

    new elbv2.NetworkListener(this, 'db-migrate-listener', {
      loadBalancer: this.nlb!,
      port: 8082,
      protocol: elbv2.Protocol.TCP,
      defaultAction: elbv2.NetworkListenerAction.forward([dbMigrateTarget]),
    });
  }
}
