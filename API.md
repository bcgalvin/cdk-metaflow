# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### EcsExecutionRole <a name="metaflow-cdk.EcsExecutionRole"></a>

#### Initializer <a name="metaflow-cdk.EcsExecutionRole.Initializer"></a>

```typescript
import { EcsExecutionRole } from 'metaflow-cdk'

new EcsExecutionRole(scope: Construct, id: string)
```

##### `scope`<sup>Required</sup> <a name="metaflow-cdk.EcsExecutionRole.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

the Scope of the CDK Construct.

---

##### `id`<sup>Required</sup> <a name="metaflow-cdk.EcsExecutionRole.parameter.id"></a>

- *Type:* `string`

the ID of the CDK Construct.

---





### EcsTaskRole <a name="metaflow-cdk.EcsTaskRole"></a>

#### Initializer <a name="metaflow-cdk.EcsTaskRole.Initializer"></a>

```typescript
import { EcsTaskRole } from 'metaflow-cdk'

new EcsTaskRole(scope: Construct, id: string)
```

##### `scope`<sup>Required</sup> <a name="metaflow-cdk.EcsTaskRole.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

the Scope of the CDK Construct.

---

##### `id`<sup>Required</sup> <a name="metaflow-cdk.EcsTaskRole.parameter.id"></a>

- *Type:* `string`

the ID of the CDK Construct.

---





### LambdaECSExecuteRole <a name="metaflow-cdk.LambdaECSExecuteRole"></a>

#### Initializer <a name="metaflow-cdk.LambdaECSExecuteRole.Initializer"></a>

```typescript
import { LambdaECSExecuteRole } from 'metaflow-cdk'

new LambdaECSExecuteRole(scope: Construct, id: string)
```

##### `scope`<sup>Required</sup> <a name="metaflow-cdk.LambdaECSExecuteRole.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

the Scope of the CDK Construct.

---

##### `id`<sup>Required</sup> <a name="metaflow-cdk.LambdaECSExecuteRole.parameter.id"></a>

- *Type:* `string`

the ID of the CDK Construct.

---





### Metaflow <a name="metaflow-cdk.Metaflow"></a>

#### Initializer <a name="metaflow-cdk.Metaflow.Initializer"></a>

```typescript
import { Metaflow } from 'metaflow-cdk'

new Metaflow(scope: Construct, id: string)
```

##### `scope`<sup>Required</sup> <a name="metaflow-cdk.Metaflow.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="metaflow-cdk.Metaflow.parameter.id"></a>

- *Type:* `string`

---



#### Properties <a name="Properties"></a>

##### `api`<sup>Required</sup> <a name="metaflow-cdk.Metaflow.property.api"></a>

- *Type:* [`@aws-cdk/aws-apigateway.IRestApi`](#@aws-cdk/aws-apigateway.IRestApi)

---

##### `apiKey`<sup>Required</sup> <a name="metaflow-cdk.Metaflow.property.apiKey"></a>

- *Type:* [`@aws-cdk/aws-apigateway.IApiKey`](#@aws-cdk/aws-apigateway.IApiKey)

---

##### `bucket`<sup>Required</sup> <a name="metaflow-cdk.Metaflow.property.bucket"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)

---

##### `database`<sup>Required</sup> <a name="metaflow-cdk.Metaflow.property.database"></a>

- *Type:* [`metaflow-cdk.IMetaflowDatabase`](#metaflow-cdk.IMetaflowDatabase)

---

##### `ecsExecutionRole`<sup>Required</sup> <a name="metaflow-cdk.Metaflow.property.ecsExecutionRole"></a>

- *Type:* [`metaflow-cdk.EcsExecutionRole`](#metaflow-cdk.EcsExecutionRole)

---

##### `ecsTaskRole`<sup>Required</sup> <a name="metaflow-cdk.Metaflow.property.ecsTaskRole"></a>

- *Type:* [`metaflow-cdk.EcsTaskRole`](#metaflow-cdk.EcsTaskRole)

---

##### `lambdaECSExecuteRole`<sup>Required</sup> <a name="metaflow-cdk.Metaflow.property.lambdaECSExecuteRole"></a>

- *Type:* [`metaflow-cdk.LambdaECSExecuteRole`](#metaflow-cdk.LambdaECSExecuteRole)

---

##### `table`<sup>Required</sup> <a name="metaflow-cdk.Metaflow.property.table"></a>

- *Type:* [`@aws-cdk/aws-dynamodb.ITable`](#@aws-cdk/aws-dynamodb.ITable)

---

##### `vpc`<sup>Required</sup> <a name="metaflow-cdk.Metaflow.property.vpc"></a>

- *Type:* [`@aws-cdk/aws-ec2.IVpc`](#@aws-cdk/aws-ec2.IVpc)

---


### MetaflowApi <a name="metaflow-cdk.MetaflowApi"></a>

#### Initializer <a name="metaflow-cdk.MetaflowApi.Initializer"></a>

```typescript
import { MetaflowApi } from 'metaflow-cdk'

new MetaflowApi(scope: Construct, id: string, props: MetaflowApiProps)
```

##### `scope`<sup>Required</sup> <a name="metaflow-cdk.MetaflowApi.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="metaflow-cdk.MetaflowApi.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="metaflow-cdk.MetaflowApi.parameter.props"></a>

- *Type:* [`metaflow-cdk.MetaflowApiProps`](#metaflow-cdk.MetaflowApiProps)

---



#### Properties <a name="Properties"></a>

##### `api`<sup>Required</sup> <a name="metaflow-cdk.MetaflowApi.property.api"></a>

- *Type:* [`@aws-cdk/aws-apigateway.IRestApi`](#@aws-cdk/aws-apigateway.IRestApi)

Constructs a new instance of the MetaflowApi class.

---

##### `apiKey`<sup>Required</sup> <a name="metaflow-cdk.MetaflowApi.property.apiKey"></a>

- *Type:* [`@aws-cdk/aws-apigateway.IApiKey`](#@aws-cdk/aws-apigateway.IApiKey)

---


### MetaflowBucket <a name="metaflow-cdk.MetaflowBucket"></a>

#### Initializer <a name="metaflow-cdk.MetaflowBucket.Initializer"></a>

```typescript
import { MetaflowBucket } from 'metaflow-cdk'

new MetaflowBucket(scope: Construct, id: string, props?: BucketProps)
```

##### `scope`<sup>Required</sup> <a name="metaflow-cdk.MetaflowBucket.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="metaflow-cdk.MetaflowBucket.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="metaflow-cdk.MetaflowBucket.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-s3.BucketProps`](#@aws-cdk/aws-s3.BucketProps)

---



#### Properties <a name="Properties"></a>

##### `resource`<sup>Required</sup> <a name="metaflow-cdk.MetaflowBucket.property.resource"></a>

- *Type:* [`@aws-cdk/aws-s3.CfnBucket`](#@aws-cdk/aws-s3.CfnBucket)

Constructs a new instance of the MetaflowBucket class.

---


### MetaflowDatabaseInstance <a name="metaflow-cdk.MetaflowDatabaseInstance"></a>

- *Implements:* [`metaflow-cdk.IMetaflowDatabase`](#metaflow-cdk.IMetaflowDatabase)

Provides a very basic RDS database instance.

#### Initializer <a name="metaflow-cdk.MetaflowDatabaseInstance.Initializer"></a>

```typescript
import { MetaflowDatabaseInstance } from 'metaflow-cdk'

new MetaflowDatabaseInstance(scope: Construct, id: string, props: MetaflowDatabaseInstanceProps)
```

##### `scope`<sup>Required</sup> <a name="metaflow-cdk.MetaflowDatabaseInstance.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="metaflow-cdk.MetaflowDatabaseInstance.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="metaflow-cdk.MetaflowDatabaseInstance.parameter.props"></a>

- *Type:* [`metaflow-cdk.MetaflowDatabaseInstanceProps`](#metaflow-cdk.MetaflowDatabaseInstanceProps)

---



#### Properties <a name="Properties"></a>

##### `connectable`<sup>Required</sup> <a name="metaflow-cdk.MetaflowDatabaseInstance.property.connectable"></a>

- *Type:* [`@aws-cdk/aws-ec2.IConnectable`](#@aws-cdk/aws-ec2.IConnectable)

A connectable so that the cluster can allow itself to connect to the database.

---

##### `credentials`<sup>Required</sup> <a name="metaflow-cdk.MetaflowDatabaseInstance.property.credentials"></a>

- *Type:* [`@aws-cdk/aws-secretsmanager.ISecret`](#@aws-cdk/aws-secretsmanager.ISecret)

Database credentials in standard RDS json format.

---


### MetaflowTable <a name="metaflow-cdk.MetaflowTable"></a>

#### Initializer <a name="metaflow-cdk.MetaflowTable.Initializer"></a>

```typescript
import { MetaflowTable } from 'metaflow-cdk'

new MetaflowTable(scope: Construct, id: string, props?: TableProps)
```

##### `scope`<sup>Required</sup> <a name="metaflow-cdk.MetaflowTable.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="metaflow-cdk.MetaflowTable.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="metaflow-cdk.MetaflowTable.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-dynamodb.TableProps`](#@aws-cdk/aws-dynamodb.TableProps)

---



#### Properties <a name="Properties"></a>

##### `resource`<sup>Required</sup> <a name="metaflow-cdk.MetaflowTable.property.resource"></a>

- *Type:* [`@aws-cdk/aws-dynamodb.CfnTable`](#@aws-cdk/aws-dynamodb.CfnTable)

Constructs a new instance of the MetaflowTable class.

---


### MetaflowVpc <a name="metaflow-cdk.MetaflowVpc"></a>

#### Initializer <a name="metaflow-cdk.MetaflowVpc.Initializer"></a>

```typescript
import { MetaflowVpc } from 'metaflow-cdk'

new MetaflowVpc(scope: Construct, id: string, props?: VpcProps)
```

##### `scope`<sup>Required</sup> <a name="metaflow-cdk.MetaflowVpc.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="metaflow-cdk.MetaflowVpc.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="metaflow-cdk.MetaflowVpc.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-ec2.VpcProps`](#@aws-cdk/aws-ec2.VpcProps)

---



#### Properties <a name="Properties"></a>

##### `vpc`<sup>Required</sup> <a name="metaflow-cdk.MetaflowVpc.property.vpc"></a>

- *Type:* [`@aws-cdk/aws-ec2.IVpc`](#@aws-cdk/aws-ec2.IVpc)

Constructs a new instance of the MetaflowVpc class.

---


## Structs <a name="Structs"></a>

### MetaflowApiProps <a name="metaflow-cdk.MetaflowApiProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { MetaflowApiProps } from 'metaflow-cdk'

const metaflowApiProps: MetaflowApiProps = { ... }
```

##### `executionRole`<sup>Required</sup> <a name="metaflow-cdk.MetaflowApiProps.property.executionRole"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---

##### `securityGroup`<sup>Required</sup> <a name="metaflow-cdk.MetaflowApiProps.property.securityGroup"></a>

- *Type:* [`@aws-cdk/aws-ec2.ISecurityGroup`](#@aws-cdk/aws-ec2.ISecurityGroup)

---

##### `vpc`<sup>Required</sup> <a name="metaflow-cdk.MetaflowApiProps.property.vpc"></a>

- *Type:* [`@aws-cdk/aws-ec2.IVpc`](#@aws-cdk/aws-ec2.IVpc)

---

### MetaflowDatabaseInstanceProps <a name="metaflow-cdk.MetaflowDatabaseInstanceProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { MetaflowDatabaseInstanceProps } from 'metaflow-cdk'

const metaflowDatabaseInstanceProps: MetaflowDatabaseInstanceProps = { ... }
```

##### `dbSecurityGroups`<sup>Required</sup> <a name="metaflow-cdk.MetaflowDatabaseInstanceProps.property.dbSecurityGroups"></a>

- *Type:* [`@aws-cdk/aws-ec2.SecurityGroup`](#@aws-cdk/aws-ec2.SecurityGroup)[]

---

##### `dbSubnets`<sup>Required</sup> <a name="metaflow-cdk.MetaflowDatabaseInstanceProps.property.dbSubnets"></a>

- *Type:* [`@aws-cdk/aws-ec2.SubnetSelection`](#@aws-cdk/aws-ec2.SubnetSelection)

---

##### `vpc`<sup>Required</sup> <a name="metaflow-cdk.MetaflowDatabaseInstanceProps.property.vpc"></a>

- *Type:* [`@aws-cdk/aws-ec2.IVpc`](#@aws-cdk/aws-ec2.IVpc)

---


## Protocols <a name="Protocols"></a>

### IMetaflowDatabase <a name="metaflow-cdk.IMetaflowDatabase"></a>

- *Implemented By:* [`metaflow-cdk.MetaflowDatabaseInstance`](#metaflow-cdk.MetaflowDatabaseInstance), [`metaflow-cdk.IMetaflowDatabase`](#metaflow-cdk.IMetaflowDatabase)


#### Properties <a name="Properties"></a>

##### `connectable`<sup>Required</sup> <a name="metaflow-cdk.IMetaflowDatabase.property.connectable"></a>

- *Type:* [`@aws-cdk/aws-ec2.IConnectable`](#@aws-cdk/aws-ec2.IConnectable)

A connectable so that the cluster can allow itself to connect to the database.

---

##### `credentials`<sup>Required</sup> <a name="metaflow-cdk.IMetaflowDatabase.property.credentials"></a>

- *Type:* [`@aws-cdk/aws-secretsmanager.ISecret`](#@aws-cdk/aws-secretsmanager.ISecret)

Database credentials in standard RDS json format.

---

