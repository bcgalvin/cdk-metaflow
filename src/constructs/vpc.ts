import * as ec2 from '@aws-cdk/aws-ec2';
import { Construct } from 'constructs';

const defaults = {
  cidr: '10.20.0.0/16',
  enableDnsSupport: true,
  enableDnsHostnames: true,
  maxAzs: 2,
  natGateways: 0,
  subnetConfiguration: [
    { cidrMask: 24, name: 'Public', subnetType: ec2.SubnetType.PUBLIC },
  ],
};

export class MetaflowVpc extends ec2.Vpc {
  public readonly vpc: ec2.IVpc;
  constructor(scope: Construct, id: string, props?: ec2.VpcProps) {
    super(scope, id, { ...defaults, ...props });

    this.vpc = this.node.findChild('Resource') as ec2.IVpc;
  }
}
