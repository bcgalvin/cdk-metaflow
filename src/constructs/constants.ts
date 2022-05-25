import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as cdk from 'aws-cdk-lib';

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
    version: rds.PostgresEngineVersion.VER_11_15,
  }),
  instanceType: new ec2.InstanceType('t2.small'), // cdk prepends 'db' here
  deletionProtection: false,
  publiclyAccessible: false,
  backupRetention: cdk.Duration.days(7),
} as rds.DatabaseInstanceProps;
