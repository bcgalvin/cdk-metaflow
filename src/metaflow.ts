import * as ec2 from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';
import { MetaflowVpc } from './constructs';
export class Metaflow extends cdk.Construct {
  public readonly vpc: ec2.IVpc;
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);
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

    new cdk.CfnOutput(this, 'vpc-output', {
      exportName: 'vpcOutput',
      value: this.vpc.vpcId,
    });
    new cdk.CfnOutput(this, 'rds-sg-output', {
      exportName: 'rdsSecurityGroupOutput',
      value: databaseSecurityGroup.securityGroupId,
    });
    new cdk.CfnOutput(this, 'fargate-sg-output', {
      exportName: 'fargateSecurityGroupOutput',
      value: serviceSecurityGroup.securityGroupId,
    });
  }
}
