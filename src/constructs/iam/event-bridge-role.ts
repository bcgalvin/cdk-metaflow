import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * @summary EventBridge Role
 */
export class EventBridgeRole extends iam.Role {
  /**
   * Constructs a new instance of the EventBridgeRole class.
   * @param {Construct} scope the Scope of the CDK Construct
   * @param {string} id the ID of the CDK Construct
   * @param {RoleProps} props the RoleProps [properties]{@link iam.RoleProps}
   * @access public
   */

  constructor(scope: Construct, id: string) {
    super(scope, id, {
      roleName: `${cdk.Stack.of(scope).stackName}EventBridgeRole`,
      assumedBy: new iam.ServicePrincipal('events.amazonaws.com'),
    });
    this.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        resources: [
          `arn:${cdk.Aws.PARTITION}:states:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:stateMachine:*`,
        ],
        actions: ['states:StartExecution'],
      }),
    );
  }
}
