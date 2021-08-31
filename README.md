# CDK Metaflow

The `cdk-metaflow` package contains cdk constructs for deploying metaflow infrastructure on aws.

```ts nofixture
import * as metaflow from 'cdk-metaflow';
```

## Metaflow

The main construct creates all the required infrastructure for getting up and running with Metaflow on AWS. This is achieved by creating an instance of `Metaflow`:

```ts
const metaflow = new Metaflow(this, 'metaflow')
```

Full example:

```ts
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
  account: '123456789',
  region: 'us-west-2',
};

const app = new cdk.App();
new MetaflowStack(app, 'metaflow-stack-ts', { env: devEnv });
```
