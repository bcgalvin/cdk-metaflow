import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * @summary Batch Execution Role
 */
export class BatchExecutionRole extends iam.Role {
  /**
   * Constructs a new instance of the BatchExecutionRole class.
   * @param {Construct} scope the Scope of the CDK Construct
   * @param {string} id the ID of the CDK Construct
   * @param {RoleProps} props the RoleProps [properties]{@link iam.RoleProps}
   * @access public
   */

  constructor(scope: Construct, id: string) {
    super(scope, id, {
      roleName: `${cdk.Stack.of(scope).stackName}BatchExecutionRole`,
      assumedBy: new iam.ServicePrincipal('batch.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSBatchServiceRole',
        ),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSXRayDaemonWriteAccess'),
      ],
    });
  }
}
