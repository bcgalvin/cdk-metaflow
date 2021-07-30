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

/**
 * @summary Metaflow VPC
 */
export class MetaflowVpc extends ec2.Vpc {
  /**
   * Constructs a new instance of the MetaflowVpc class.
   * @param {Construct} scope the Scope of the CDK Construct
   * @param {string} id the ID of the CDK Construct
   * @param {VpcProps} props the VpcProps [properties]{@link ec2.VpcProps}
   * @access public
   */
  public readonly vpc: ec2.IVpc;
  constructor(scope: Construct, id: string, props?: ec2.VpcProps) {
    super(scope, id, { ...defaults, ...props });

    this.vpc = this.node.findChild('Resource') as ec2.IVpc;
  }
}
