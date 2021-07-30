import * as cdk from '@aws-cdk/core';
import { MetaflowVpc } from './constructs';
export class Metaflow extends cdk.Construct {
  public readonly metaflowVpc: MetaflowVpc;
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);
    this.metaflowVpc = new MetaflowVpc(this, 'vpc');

    new cdk.CfnOutput(this, 'vpc-output', {
      exportName: 'vpcOutput',
      value: this.metaflowVpc.vpc.vpcId,
    });
    new cdk.CfnOutput(this, 'rds-sg-output', {
      exportName: 'rdsSecurityGroupOutput',
      value: this.metaflowVpc.databaseSecurityGroup.securityGroupId,
    });
    new cdk.CfnOutput(this, 'fargate-sg-output', {
      exportName: 'fargateSecurityGroupOutput',
      value: this.metaflowVpc.serviceSecurityGroup.securityGroupId,
    });
  }
}
