import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';

/**
 * @summary ECS Execution Role
 */

export class EcsExecutionRole extends iam.Role {
  /**
   * Constructs a new instance of the EcsExecutionRole class.
   * @param {Construct} scope the Scope of the CDK Construct
   * @param {string} id the ID of the CDK Construct
   * @param {RoleProps} props the RoleProps [properties]{@link RoleProps}
   * @since 1.0.0
   * @access public
   */

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id, {
      roleName: `${cdk.Stack.of(scope).stackName}EcsExecutionRole`,
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    });
    this.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        resources: [
          `arn:${cdk.Aws.PARTITION}:ecr:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:*`,
        ],
        actions: [
          'ecr:GetAuthorizationToken',
          'ecr:BatchCheckLayerAvailability',
          'ecr:GetDownloadUrlForLayer',
          'ecr:BatchGetImage',
        ],
      }),
    );
  }
}
