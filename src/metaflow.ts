import * as ec2 from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';

export class Metaflow extends cdk.Construct {
  public readonly vpc: ec2.IVpc;
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);
    this.vpc = new ec2.Vpc(this, 'vpc', {
      cidr: '10.20.0.0/16',
      enableDnsSupport: true,
      enableDnsHostnames: true,
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: 'service',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
      ],
    });
    const sagemakerSecurityGroup = new ec2.SecurityGroup(this, 'sagemaker-sg', {
      allowAllOutbound: true,
      vpc: this.vpc,
    });
    const rdsSecurityGroup = new ec2.SecurityGroup(this, 'rds-sg', {
      allowAllOutbound: true,
      vpc: this.vpc,
    });
    const fargateSecurityGroup = new ec2.SecurityGroup(this, 'fargate-sg', {
      allowAllOutbound: true,
      vpc: this.vpc,
    });
    rdsSecurityGroup.connections.allowFrom(
      fargateSecurityGroup,
      ec2.Port.tcp(5432),
    );
    fargateSecurityGroup.connections.allowInternally(
      ec2.Port.allTraffic(),
      'Internal Communication',
    );
    fargateSecurityGroup.connections.allowFrom(
      ec2.Peer.ipv4(this.vpc.vpcCidrBlock),
      ec2.Port.tcp(8080),
      'Allow API Calls Internally',
    );
    fargateSecurityGroup.connections.allowFrom(
      ec2.Peer.ipv4(this.vpc.vpcCidrBlock),
      ec2.Port.tcp(8082),
      'Allow API Calls Internally',
    );
    sagemakerSecurityGroup.connections.allowFromAnyIpv4(ec2.Port.tcp(8080));

    new cdk.CfnOutput(this, 'vpc-output', {
      exportName: 'vpcOutput',
      value: this.vpc.vpcId,
    });
    new cdk.CfnOutput(this, 'sagemaker-sg-output', {
      exportName: 'sagemakerSecurityGroupOutput',
      value: sagemakerSecurityGroup.securityGroupId,
    });
    new cdk.CfnOutput(this, 'rds-sg-output', {
      exportName: 'rdsSecurityGroupOutput',
      value: rdsSecurityGroup.securityGroupId,
    });
    new cdk.CfnOutput(this, 'fargate-sg-output', {
      exportName: 'fargateSecurityGroupOutput',
      value: fargateSecurityGroup.securityGroupId,
    });
  }
}
