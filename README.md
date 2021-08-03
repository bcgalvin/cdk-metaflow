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
