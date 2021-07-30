import * as ec2 from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';

export class MetaflowVpc extends cdk.Construct implements cdk.ITaggable {
  tags: cdk.TagManager = new cdk.TagManager(
    cdk.TagType.MAP,
    'metaflow-network',
  );
  public readonly vpc: ec2.IVpc;
  public readonly databaseSecurityGroup: ec2.ISecurityGroup;
  public readonly serviceSecurityGroup: ec2.ISecurityGroup;

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
    this.databaseSecurityGroup = new ec2.SecurityGroup(this, 'rds-sg', {
      allowAllOutbound: true,
      vpc: this.vpc,
    });
    this.serviceSecurityGroup = new ec2.SecurityGroup(this, 'fargate-sg', {
      allowAllOutbound: true,
      vpc: this.vpc,
    });
    this.databaseSecurityGroup.connections.allowFrom(
      this.serviceSecurityGroup,
      ec2.Port.tcp(5432),
    );
    this.serviceSecurityGroup.connections.allowInternally(
      ec2.Port.allTraffic(),
      'Internal Communication',
    );
    this.serviceSecurityGroup.connections.allowFrom(
      ec2.Peer.ipv4(this.vpc.vpcCidrBlock),
      ec2.Port.tcp(8080),
      'Allow API Calls Internally',
    );
    this.serviceSecurityGroup.connections.allowFrom(
      ec2.Peer.ipv4(this.vpc.vpcCidrBlock),
      ec2.Port.tcp(8082),
      'Allow API Calls Internally',
    );
  }
}
