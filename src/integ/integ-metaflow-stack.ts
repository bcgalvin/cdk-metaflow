import * as cdk from '@aws-cdk/core';

/**
 * Integration test. This lives in the src directory so we can run it.
 * @internal
 */
export class IntegMetaflowStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);
    new cdk.CfnOutput(this, 'output-test', {
      exportName: 'outputTest',
      value: cdk.Aws.REGION,
    });
  }
}

const app = new cdk.App();
new IntegMetaflowStack(app, 'integ-metaflow-stack');
