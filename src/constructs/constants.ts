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
    version: rds.PostgresEngineVersion.VER_12_4,
  }),
  instanceType: new ec2.InstanceType('t2.small'), // cdk prepends 'db' here
  storageEncrypted: true,
  deletionProtection: false,
  publiclyAccessible: false,
  backupRetention: cdk.Duration.days(7),
} as rds.DatabaseInstanceProps;
