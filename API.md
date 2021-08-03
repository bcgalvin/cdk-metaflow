# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### BatchExecutionRole <a name="cdk-metaflow.BatchExecutionRole"></a>

#### Initializer <a name="cdk-metaflow.BatchExecutionRole.Initializer"></a>

```typescript
import { BatchExecutionRole } from 'cdk-metaflow'

new BatchExecutionRole(scope: Construct, id: string)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.BatchExecutionRole.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

the Scope of the CDK Construct.

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.BatchExecutionRole.parameter.id"></a>

- *Type:* `string`

the ID of the CDK Construct.

---





### BatchS3TaskRole <a name="cdk-metaflow.BatchS3TaskRole"></a>

#### Initializer <a name="cdk-metaflow.BatchS3TaskRole.Initializer"></a>

```typescript
import { BatchS3TaskRole } from 'cdk-metaflow'

new BatchS3TaskRole(scope: Construct, id: string)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.BatchS3TaskRole.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

the Scope of the CDK Construct.

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.BatchS3TaskRole.parameter.id"></a>

- *Type:* `string`

the ID of the CDK Construct.

---





### EcsExecutionRole <a name="cdk-metaflow.EcsExecutionRole"></a>

#### Initializer <a name="cdk-metaflow.EcsExecutionRole.Initializer"></a>

```typescript
import { EcsExecutionRole } from 'cdk-metaflow'

new EcsExecutionRole(scope: Construct, id: string)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.EcsExecutionRole.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

the Scope of the CDK Construct.

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.EcsExecutionRole.parameter.id"></a>

- *Type:* `string`

the ID of the CDK Construct.

---





### EcsRole <a name="cdk-metaflow.EcsRole"></a>

#### Initializer <a name="cdk-metaflow.EcsRole.Initializer"></a>

```typescript
import { EcsRole } from 'cdk-metaflow'

new EcsRole(scope: Construct, id: string)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.EcsRole.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

the Scope of the CDK Construct.

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.EcsRole.parameter.id"></a>

- *Type:* `string`

the ID of the CDK Construct.

---





### EcsTaskRole <a name="cdk-metaflow.EcsTaskRole"></a>

#### Initializer <a name="cdk-metaflow.EcsTaskRole.Initializer"></a>

```typescript
import { EcsTaskRole } from 'cdk-metaflow'

new EcsTaskRole(scope: Construct, id: string)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.EcsTaskRole.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

the Scope of the CDK Construct.

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.EcsTaskRole.parameter.id"></a>

- *Type:* `string`

the ID of the CDK Construct.

---





### EventBridgeRole <a name="cdk-metaflow.EventBridgeRole"></a>

#### Initializer <a name="cdk-metaflow.EventBridgeRole.Initializer"></a>

```typescript
import { EventBridgeRole } from 'cdk-metaflow'

new EventBridgeRole(scope: Construct, id: string)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.EventBridgeRole.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

the Scope of the CDK Construct.

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.EventBridgeRole.parameter.id"></a>

- *Type:* `string`

the ID of the CDK Construct.

---





### LambdaECSExecuteRole <a name="cdk-metaflow.LambdaECSExecuteRole"></a>

#### Initializer <a name="cdk-metaflow.LambdaECSExecuteRole.Initializer"></a>

```typescript
import { LambdaECSExecuteRole } from 'cdk-metaflow'

new LambdaECSExecuteRole(scope: Construct, id: string)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.LambdaECSExecuteRole.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

the Scope of the CDK Construct.

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.LambdaECSExecuteRole.parameter.id"></a>

- *Type:* `string`

the ID of the CDK Construct.

---





### Metaflow <a name="cdk-metaflow.Metaflow"></a>

#### Initializer <a name="cdk-metaflow.Metaflow.Initializer"></a>

```typescript
import { Metaflow } from 'cdk-metaflow'

new Metaflow(scope: Construct, id: string)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.parameter.id"></a>

- *Type:* `string`

---



#### Properties <a name="Properties"></a>

##### `api`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.property.api"></a>

- *Type:* [`@aws-cdk/aws-apigateway.IRestApi`](#@aws-cdk/aws-apigateway.IRestApi)

---

##### `batchExecutionRole`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.property.batchExecutionRole"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---

##### `batchS3TaskRole`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.property.batchS3TaskRole"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---

##### `bucket`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.property.bucket"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)

---

##### `cluster`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.property.cluster"></a>

- *Type:* [`@aws-cdk/aws-ecs.ICluster`](#@aws-cdk/aws-ecs.ICluster)

---

##### `database`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.property.database"></a>

- *Type:* [`cdk-metaflow.IMetaflowDatabase`](#cdk-metaflow.IMetaflowDatabase)

---

##### `dbMigrateLambda`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.property.dbMigrateLambda"></a>

- *Type:* [`@aws-cdk/aws-lambda.IFunction`](#@aws-cdk/aws-lambda.IFunction)

---

##### `ecsExecutionRole`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.property.ecsExecutionRole"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---

##### `ecsRole`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.property.ecsRole"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---

##### `ecsTaskRole`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.property.ecsTaskRole"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---

##### `eventBridgeRole`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.property.eventBridgeRole"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---

##### `eventBus`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.property.eventBus"></a>

- *Type:* [`@aws-cdk/aws-events.IEventBus`](#@aws-cdk/aws-events.IEventBus)

---

##### `lambdaECSExecuteRole`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.property.lambdaECSExecuteRole"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---

##### `stepFunctionsRole`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.property.stepFunctionsRole"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---

##### `table`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.property.table"></a>

- *Type:* [`@aws-cdk/aws-dynamodb.ITable`](#@aws-cdk/aws-dynamodb.ITable)

---

##### `vpc`<sup>Required</sup> <a name="cdk-metaflow.Metaflow.property.vpc"></a>

- *Type:* [`@aws-cdk/aws-ec2.IVpc`](#@aws-cdk/aws-ec2.IVpc)

---


### MetaflowApi <a name="cdk-metaflow.MetaflowApi"></a>

#### Initializer <a name="cdk-metaflow.MetaflowApi.Initializer"></a>

```typescript
import { MetaflowApi } from 'cdk-metaflow'

new MetaflowApi(scope: Construct, id: string, props: MetaflowApiProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.MetaflowApi.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.MetaflowApi.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-metaflow.MetaflowApi.parameter.props"></a>

- *Type:* [`cdk-metaflow.MetaflowApiProps`](#cdk-metaflow.MetaflowApiProps)

---



#### Properties <a name="Properties"></a>

##### `api`<sup>Required</sup> <a name="cdk-metaflow.MetaflowApi.property.api"></a>

- *Type:* [`@aws-cdk/aws-apigateway.IRestApi`](#@aws-cdk/aws-apigateway.IRestApi)

Constructs a new instance of the MetaflowApi class.

---


### MetaflowBucket <a name="cdk-metaflow.MetaflowBucket"></a>

#### Initializer <a name="cdk-metaflow.MetaflowBucket.Initializer"></a>

```typescript
import { MetaflowBucket } from 'cdk-metaflow'

new MetaflowBucket(scope: Construct, id: string, props?: BucketProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.MetaflowBucket.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.MetaflowBucket.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="cdk-metaflow.MetaflowBucket.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-s3.BucketProps`](#@aws-cdk/aws-s3.BucketProps)

---



#### Properties <a name="Properties"></a>

##### `resource`<sup>Required</sup> <a name="cdk-metaflow.MetaflowBucket.property.resource"></a>

- *Type:* [`@aws-cdk/aws-s3.CfnBucket`](#@aws-cdk/aws-s3.CfnBucket)

Constructs a new instance of the MetaflowBucket class.

---


### MetaflowDashboard <a name="cdk-metaflow.MetaflowDashboard"></a>

#### Initializer <a name="cdk-metaflow.MetaflowDashboard.Initializer"></a>

```typescript
import { MetaflowDashboard } from 'cdk-metaflow'

new MetaflowDashboard(scope: Construct, id: string, props: DashboardProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.MetaflowDashboard.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.MetaflowDashboard.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-metaflow.MetaflowDashboard.parameter.props"></a>

- *Type:* [`cdk-metaflow.DashboardProps`](#cdk-metaflow.DashboardProps)

---



#### Properties <a name="Properties"></a>

##### `dashboard`<sup>Required</sup> <a name="cdk-metaflow.MetaflowDashboard.property.dashboard"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Dashboard`](#@aws-cdk/aws-cloudwatch.Dashboard)

---


### MetaflowDatabaseInstance <a name="cdk-metaflow.MetaflowDatabaseInstance"></a>

- *Implements:* [`cdk-metaflow.IMetaflowDatabase`](#cdk-metaflow.IMetaflowDatabase)

Provides a very basic RDS database instance.

#### Initializer <a name="cdk-metaflow.MetaflowDatabaseInstance.Initializer"></a>

```typescript
import { MetaflowDatabaseInstance } from 'cdk-metaflow'

new MetaflowDatabaseInstance(scope: Construct, id: string, props: MetaflowDatabaseInstanceProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.MetaflowDatabaseInstance.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.MetaflowDatabaseInstance.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-metaflow.MetaflowDatabaseInstance.parameter.props"></a>

- *Type:* [`cdk-metaflow.MetaflowDatabaseInstanceProps`](#cdk-metaflow.MetaflowDatabaseInstanceProps)

---



#### Properties <a name="Properties"></a>

##### `credentials`<sup>Required</sup> <a name="cdk-metaflow.MetaflowDatabaseInstance.property.credentials"></a>

- *Type:* [`@aws-cdk/aws-secretsmanager.ISecret`](#@aws-cdk/aws-secretsmanager.ISecret)

Database credentials in standard RDS json format.

---

##### `database`<sup>Required</sup> <a name="cdk-metaflow.MetaflowDatabaseInstance.property.database"></a>

- *Type:* [`@aws-cdk/aws-rds.IDatabaseInstance`](#@aws-cdk/aws-rds.IDatabaseInstance)

A database instance;

can be extended to be a union type of Aurora Serverless or RDS Cluster.

---


### MetaflowExports <a name="cdk-metaflow.MetaflowExports"></a>

#### Initializer <a name="cdk-metaflow.MetaflowExports.Initializer"></a>

```typescript
import { MetaflowExports } from 'cdk-metaflow'

new MetaflowExports(scope: Construct, id: string, props: MetaflowExportProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.MetaflowExports.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.MetaflowExports.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-metaflow.MetaflowExports.parameter.props"></a>

- *Type:* [`cdk-metaflow.MetaflowExportProps`](#cdk-metaflow.MetaflowExportProps)

---





### MetaflowFargateService <a name="cdk-metaflow.MetaflowFargateService"></a>

#### Initializer <a name="cdk-metaflow.MetaflowFargateService.Initializer"></a>

```typescript
import { MetaflowFargateService } from 'cdk-metaflow'

new MetaflowFargateService(scope: Construct, id: string, props: MetaflowFargateServiceProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.MetaflowFargateService.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.MetaflowFargateService.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-metaflow.MetaflowFargateService.parameter.props"></a>

- *Type:* [`cdk-metaflow.MetaflowFargateServiceProps`](#cdk-metaflow.MetaflowFargateServiceProps)

---



#### Properties <a name="Properties"></a>

##### `fargateService`<sup>Required</sup> <a name="cdk-metaflow.MetaflowFargateService.property.fargateService"></a>

- *Type:* [`@aws-cdk/aws-ecs.FargateService`](#@aws-cdk/aws-ecs.FargateService)

---

##### `fargateTaskDefinition`<sup>Required</sup> <a name="cdk-metaflow.MetaflowFargateService.property.fargateTaskDefinition"></a>

- *Type:* [`@aws-cdk/aws-ecs.FargateTaskDefinition`](#@aws-cdk/aws-ecs.FargateTaskDefinition)

---


### MetaflowNlb <a name="cdk-metaflow.MetaflowNlb"></a>

#### Initializer <a name="cdk-metaflow.MetaflowNlb.Initializer"></a>

```typescript
import { MetaflowNlb } from 'cdk-metaflow'

new MetaflowNlb(scope: Construct, id: string, props: MetaflowNlbProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.MetaflowNlb.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.MetaflowNlb.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-metaflow.MetaflowNlb.parameter.props"></a>

- *Type:* [`cdk-metaflow.MetaflowNlbProps`](#cdk-metaflow.MetaflowNlbProps)

---



#### Properties <a name="Properties"></a>

##### `dbMigrateTargetGroup`<sup>Required</sup> <a name="cdk-metaflow.MetaflowNlb.property.dbMigrateTargetGroup"></a>

- *Type:* [`@aws-cdk/aws-elasticloadbalancingv2.NetworkTargetGroup`](#@aws-cdk/aws-elasticloadbalancingv2.NetworkTargetGroup)

---

##### `nlb`<sup>Required</sup> <a name="cdk-metaflow.MetaflowNlb.property.nlb"></a>

- *Type:* [`@aws-cdk/aws-elasticloadbalancingv2.NetworkLoadBalancer`](#@aws-cdk/aws-elasticloadbalancingv2.NetworkLoadBalancer)

Constructs a new instance of the MetaflowNlb class.

---

##### `nlbTargetGroup`<sup>Required</sup> <a name="cdk-metaflow.MetaflowNlb.property.nlbTargetGroup"></a>

- *Type:* [`@aws-cdk/aws-elasticloadbalancingv2.NetworkTargetGroup`](#@aws-cdk/aws-elasticloadbalancingv2.NetworkTargetGroup)

---


### MetaflowTable <a name="cdk-metaflow.MetaflowTable"></a>

#### Initializer <a name="cdk-metaflow.MetaflowTable.Initializer"></a>

```typescript
import { MetaflowTable } from 'cdk-metaflow'

new MetaflowTable(scope: Construct, id: string, props?: TableProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.MetaflowTable.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.MetaflowTable.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="cdk-metaflow.MetaflowTable.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-dynamodb.TableProps`](#@aws-cdk/aws-dynamodb.TableProps)

---



#### Properties <a name="Properties"></a>

##### `resource`<sup>Required</sup> <a name="cdk-metaflow.MetaflowTable.property.resource"></a>

- *Type:* [`@aws-cdk/aws-dynamodb.CfnTable`](#@aws-cdk/aws-dynamodb.CfnTable)

Constructs a new instance of the MetaflowTable class.

---


### MetaflowVpc <a name="cdk-metaflow.MetaflowVpc"></a>

#### Initializer <a name="cdk-metaflow.MetaflowVpc.Initializer"></a>

```typescript
import { MetaflowVpc } from 'cdk-metaflow'

new MetaflowVpc(scope: Construct, id: string, props?: VpcProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.MetaflowVpc.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.MetaflowVpc.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="cdk-metaflow.MetaflowVpc.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-ec2.VpcProps`](#@aws-cdk/aws-ec2.VpcProps)

---



#### Properties <a name="Properties"></a>

##### `vpc`<sup>Required</sup> <a name="cdk-metaflow.MetaflowVpc.property.vpc"></a>

- *Type:* [`@aws-cdk/aws-ec2.IVpc`](#@aws-cdk/aws-ec2.IVpc)

Constructs a new instance of the MetaflowVpc class.

---


### StepFunctionsRole <a name="cdk-metaflow.StepFunctionsRole"></a>

#### Initializer <a name="cdk-metaflow.StepFunctionsRole.Initializer"></a>

```typescript
import { StepFunctionsRole } from 'cdk-metaflow'

new StepFunctionsRole(scope: Construct, id: string)
```

##### `scope`<sup>Required</sup> <a name="cdk-metaflow.StepFunctionsRole.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

the Scope of the CDK Construct.

---

##### `id`<sup>Required</sup> <a name="cdk-metaflow.StepFunctionsRole.parameter.id"></a>

- *Type:* `string`

the ID of the CDK Construct.

---





## Structs <a name="Structs"></a>

### DashboardProps <a name="cdk-metaflow.DashboardProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DashboardProps } from 'cdk-metaflow'

const dashboardProps: DashboardProps = { ... }
```

##### `bucketName`<sup>Required</sup> <a name="cdk-metaflow.DashboardProps.property.bucketName"></a>

- *Type:* `string`

---

##### `dashboardName`<sup>Required</sup> <a name="cdk-metaflow.DashboardProps.property.dashboardName"></a>

- *Type:* `string`

---

##### `ecsService`<sup>Required</sup> <a name="cdk-metaflow.DashboardProps.property.ecsService"></a>

- *Type:* [`@aws-cdk/aws-ecs.FargateService`](#@aws-cdk/aws-ecs.FargateService)

---

##### `period`<sup>Required</sup> <a name="cdk-metaflow.DashboardProps.property.period"></a>

- *Type:* `number`

---

### MetaflowApiProps <a name="cdk-metaflow.MetaflowApiProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { MetaflowApiProps } from 'cdk-metaflow'

const metaflowApiProps: MetaflowApiProps = { ... }
```

##### `nlb`<sup>Required</sup> <a name="cdk-metaflow.MetaflowApiProps.property.nlb"></a>

- *Type:* [`@aws-cdk/aws-elasticloadbalancingv2.INetworkLoadBalancer`](#@aws-cdk/aws-elasticloadbalancingv2.INetworkLoadBalancer)

---

### MetaflowDatabaseInstanceProps <a name="cdk-metaflow.MetaflowDatabaseInstanceProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { MetaflowDatabaseInstanceProps } from 'cdk-metaflow'

const metaflowDatabaseInstanceProps: MetaflowDatabaseInstanceProps = { ... }
```

##### `dbSecurityGroups`<sup>Required</sup> <a name="cdk-metaflow.MetaflowDatabaseInstanceProps.property.dbSecurityGroups"></a>

- *Type:* [`@aws-cdk/aws-ec2.SecurityGroup`](#@aws-cdk/aws-ec2.SecurityGroup)[]

---

##### `dbSubnets`<sup>Required</sup> <a name="cdk-metaflow.MetaflowDatabaseInstanceProps.property.dbSubnets"></a>

- *Type:* [`@aws-cdk/aws-ec2.SubnetSelection`](#@aws-cdk/aws-ec2.SubnetSelection)

---

##### `vpc`<sup>Required</sup> <a name="cdk-metaflow.MetaflowDatabaseInstanceProps.property.vpc"></a>

- *Type:* [`@aws-cdk/aws-ec2.IVpc`](#@aws-cdk/aws-ec2.IVpc)

---

### MetaflowExportProps <a name="cdk-metaflow.MetaflowExportProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { MetaflowExportProps } from 'cdk-metaflow'

const metaflowExportProps: MetaflowExportProps = { ... }
```

##### `batchExecutionRoleArn`<sup>Required</sup> <a name="cdk-metaflow.MetaflowExportProps.property.batchExecutionRoleArn"></a>

- *Type:* `string`

---

##### `batchS3TaskRoleArn`<sup>Required</sup> <a name="cdk-metaflow.MetaflowExportProps.property.batchS3TaskRoleArn"></a>

- *Type:* `string`

---

##### `bucketName`<sup>Required</sup> <a name="cdk-metaflow.MetaflowExportProps.property.bucketName"></a>

- *Type:* `string`

---

##### `ecsExecutionRoleArn`<sup>Required</sup> <a name="cdk-metaflow.MetaflowExportProps.property.ecsExecutionRoleArn"></a>

- *Type:* `string`

---

##### `ecsRoleArn`<sup>Required</sup> <a name="cdk-metaflow.MetaflowExportProps.property.ecsRoleArn"></a>

- *Type:* `string`

---

##### `ecsTaskRoleArn`<sup>Required</sup> <a name="cdk-metaflow.MetaflowExportProps.property.ecsTaskRoleArn"></a>

- *Type:* `string`

---

##### `eventBridgeRoleArn`<sup>Required</sup> <a name="cdk-metaflow.MetaflowExportProps.property.eventBridgeRoleArn"></a>

- *Type:* `string`

---

##### `lambdaECSExecuteRoleArn`<sup>Required</sup> <a name="cdk-metaflow.MetaflowExportProps.property.lambdaECSExecuteRoleArn"></a>

- *Type:* `string`

---

##### `migrateLambdaName`<sup>Required</sup> <a name="cdk-metaflow.MetaflowExportProps.property.migrateLambdaName"></a>

- *Type:* `string`

---

##### `nlbDnsName`<sup>Required</sup> <a name="cdk-metaflow.MetaflowExportProps.property.nlbDnsName"></a>

- *Type:* `string`

---

##### `stepFunctionsRoleArn`<sup>Required</sup> <a name="cdk-metaflow.MetaflowExportProps.property.stepFunctionsRoleArn"></a>

- *Type:* `string`

---

##### `tableName`<sup>Required</sup> <a name="cdk-metaflow.MetaflowExportProps.property.tableName"></a>

- *Type:* `string`

---

### MetaflowFargateServiceProps <a name="cdk-metaflow.MetaflowFargateServiceProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { MetaflowFargateServiceProps } from 'cdk-metaflow'

const metaflowFargateServiceProps: MetaflowFargateServiceProps = { ... }
```

##### `cluster`<sup>Required</sup> <a name="cdk-metaflow.MetaflowFargateServiceProps.property.cluster"></a>

- *Type:* [`@aws-cdk/aws-ecs.ICluster`](#@aws-cdk/aws-ecs.ICluster)

---

##### `database`<sup>Required</sup> <a name="cdk-metaflow.MetaflowFargateServiceProps.property.database"></a>

- *Type:* [`@aws-cdk/aws-rds.IDatabaseInstance`](#@aws-cdk/aws-rds.IDatabaseInstance)

---

##### `executionRole`<sup>Required</sup> <a name="cdk-metaflow.MetaflowFargateServiceProps.property.executionRole"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---

##### `logGroup`<sup>Required</sup> <a name="cdk-metaflow.MetaflowFargateServiceProps.property.logGroup"></a>

- *Type:* [`@aws-cdk/aws-logs.ILogGroup`](#@aws-cdk/aws-logs.ILogGroup)

---

##### `secret`<sup>Required</sup> <a name="cdk-metaflow.MetaflowFargateServiceProps.property.secret"></a>

- *Type:* [`@aws-cdk/aws-secretsmanager.ISecret`](#@aws-cdk/aws-secretsmanager.ISecret)

---

##### `securityGroup`<sup>Required</sup> <a name="cdk-metaflow.MetaflowFargateServiceProps.property.securityGroup"></a>

- *Type:* [`@aws-cdk/aws-ec2.SecurityGroup`](#@aws-cdk/aws-ec2.SecurityGroup)

---

##### `taskRole`<sup>Required</sup> <a name="cdk-metaflow.MetaflowFargateServiceProps.property.taskRole"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---

### MetaflowNlbProps <a name="cdk-metaflow.MetaflowNlbProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { MetaflowNlbProps } from 'cdk-metaflow'

const metaflowNlbProps: MetaflowNlbProps = { ... }
```

##### `vpc`<sup>Required</sup> <a name="cdk-metaflow.MetaflowNlbProps.property.vpc"></a>

- *Type:* [`@aws-cdk/aws-ec2.IVpc`](#@aws-cdk/aws-ec2.IVpc)

---


## Protocols <a name="Protocols"></a>

### IMetaflowDatabase <a name="cdk-metaflow.IMetaflowDatabase"></a>

- *Implemented By:* [`cdk-metaflow.MetaflowDatabaseInstance`](#cdk-metaflow.MetaflowDatabaseInstance), [`cdk-metaflow.IMetaflowDatabase`](#cdk-metaflow.IMetaflowDatabase)


#### Properties <a name="Properties"></a>

##### `credentials`<sup>Required</sup> <a name="cdk-metaflow.IMetaflowDatabase.property.credentials"></a>

- *Type:* [`@aws-cdk/aws-secretsmanager.ISecret`](#@aws-cdk/aws-secretsmanager.ISecret)

Database credentials in standard RDS json format.

---

##### `database`<sup>Required</sup> <a name="cdk-metaflow.IMetaflowDatabase.property.database"></a>

- *Type:* [`@aws-cdk/aws-rds.IDatabaseInstance`](#@aws-cdk/aws-rds.IDatabaseInstance)

A database instance;

can be extended to be a union type of Aurora Serverless or RDS Cluster.

---

