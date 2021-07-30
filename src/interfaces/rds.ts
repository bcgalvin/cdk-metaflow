import * as ec2 from '@aws-cdk/aws-ec2';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';

export interface IMetaflowDatabase {
  /**
   * Database credentials in standard RDS json format.
   */
  readonly credentials: secretsmanager.ISecret;

  /**
   * A connectable so that the cluster can allow itself to connect to the database.
   */
  readonly connectable: ec2.IConnectable;
}
