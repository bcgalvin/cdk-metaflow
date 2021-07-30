import * as cdk from '@aws-cdk/core';
import { Metaflow } from '..';
/**
 * Integration test. This lives in the src directory so we can run it.
 * @internal
 */
export class IntegMetaflowStack extends cdk.Stack {
  public readonly metaflow: Metaflow;
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);
    this.metaflow = new Metaflow(this, 'base');
  }
}

const app = new cdk.App();
new IntegMetaflowStack(app, 'integ-metaflow-stack');
