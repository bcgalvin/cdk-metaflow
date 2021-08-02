import * as cdk from '@aws-cdk/core';
import { Metaflow } from '..';
/**
 * Integration test. This lives in the src directory so we can run it.
 * @internal
 */
export class IntegMetaflowStack extends cdk.Stack {
  public readonly metaflow: Metaflow;
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);
    this.metaflow = new Metaflow(this, 'metaflow');
  }
}

const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();
new IntegMetaflowStack(app, 'integ-metaflow-stack', { env: devEnv });
