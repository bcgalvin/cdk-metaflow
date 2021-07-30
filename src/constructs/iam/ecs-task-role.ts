import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';

/**
 * @summary ECS Task Role
 */
export class EcsTaskRole extends iam.Role {
  /**
   * Constructs a new instance of the EcsTaskRole class.
   * @param {Construct} scope the Scope of the CDK Construct
   * @param {string} id the ID of the CDK Construct
   * @param {RoleProps} props the RoleProps [properties]{@link iam.RoleProps}
   * @access public
   */

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id, {
      roleName: `${cdk.Stack.of(scope).stackName}-EcsTaskRole`,
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSXRayDaemonWriteAccess'),
      ],
    });
  }
}
