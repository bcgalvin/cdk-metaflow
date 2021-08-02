import * as ec2 from '@aws-cdk/aws-ec2';
import * as rds from '@aws-cdk/aws-rds';
import * as cdk from '@aws-cdk/core';

export enum ServiceInfo {
  SERVICE_NAME = 'metadata-service-v2',
  IMAGE_URL = 'netflixoss/metaflow_metadata_service',
  DB_USER = 'master',
  DB_NAME = 'metaflow',
  CONTAINER_PORT = '8080',
  CONTAINER_CPU = '512',
  CONTAINER_MEMORY = '1024',
  PATH = '*',
  PRIORITY = '1',
  DESIRED_COUNT = '1',
  ROLE = '',
}

export const DefaultRdsConfig = {
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  engine: rds.DatabaseInstanceEngine.postgres({
    version: rds.PostgresEngineVersion.VER_11_5,
  }),
  instanceType: new ec2.InstanceType('t2.small'), // cdk prepends 'db' here
  deletionProtection: false,
  publiclyAccessible: false,
  backupRetention: cdk.Duration.days(7),
} as rds.DatabaseInstanceProps;

const obj = {
  METAFLOW_BATCH_JOB_QUEUE:
    'arn:aws:batch:us-west-2:570405429484:job-queue/jobs',
  METAFLOW_DATASTORE_SYSROOT_S3:
    's3://integ-metaflow-stack-metaflowbucket78cc888c-jx8dhzo6tn9/metaflow',
  METAFLOW_DATATOOLS_SYSROOT_S3:
    's3://integ-metaflow-stack-metaflowbucket78cc888c-jx8dhzo6tn9/data',
  METAFLOW_DEFAULT_DATASTORE: 's3',
  METAFLOW_DEFAULT_METADATA: 'service',
  METAFLOW_ECS_S3_ACCESS_IAM_ROLE:
    'arn:aws:iam::570405429484:role/integ-metaflow-stackBatchS3TaskRole',
  METAFLOW_EVENTS_SFN_ACCESS_IAM_ROLE:
    'arn:aws:iam::570405429484:role/integ-metaflow-stackEventBridgeRole',
  METAFLOW_SERVICE_INTERNAL_URL:
    'http://integ-metaf-UWCL5NTV9T5O-29c31d77b08015cf.elb.us-west-2.amazonaws.com/',
  METAFLOW_SERVICE_URL:
    'https://yssga3shhf.execute-api.us-west-2.amazonaws.com/api/',
  METAFLOW_SFN_DYNAMO_DB_TABLE:
    'integ-metaflow-stack-metaflowtable406E5931-UMX0EL12CUJL',
  METAFLOW_SFN_IAM_ROLE:
    'arn:aws:iam::570405429484:role/integ-metaflow-stackStepFunctionsRole',
};

let k: keyof typeof obj; // Type is "one" | "two" | "three"
for (k in obj) {
  const v = obj[k]; // OK
  console.log(k, v);
}
