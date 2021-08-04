import { Metaflow } from 'cdk-metaflow';
import * as cdk from '@aws-cdk/core';

export class MetaflowStack extends cdk.Stack {
  public readonly metaflow: Metaflow;
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);
    this.metaflow = new Metaflow(this, 'metaflow-ts');
  }
}

const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();
new MetaflowStack(app, 'metaflow-stack-ts', { env: devEnv });
