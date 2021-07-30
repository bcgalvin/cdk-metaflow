import * as ec2 from '@aws-cdk/aws-ec2';
import * as rds from '@aws-cdk/aws-rds';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';
import * as cdk from '@aws-cdk/core';
import { IMetaflowDatabase } from '../../interfaces';
import { ServiceInfo, DefaultRdsConfig } from '../constants';

export interface MetaflowDatabaseInstanceProps {
  readonly vpc: ec2.IVpc;
  readonly dbSubnets: ec2.SubnetSelection;
  readonly dbSecurityGroups: ec2.SecurityGroup[];
}

/**
 * Provides a very basic RDS database instance.
 */
export class MetaflowDatabaseInstance
  extends cdk.Construct
  implements IMetaflowDatabase
{
  public readonly credentials: secretsmanager.ISecret;
  public readonly connectable: ec2.IConnectable;

  constructor(
    scope: cdk.Construct,
    id: string,
    props: MetaflowDatabaseInstanceProps,
  ) {
    super(scope, id);

    this.credentials = new secretsmanager.Secret(this, 'metaflow-rds-secret', {
      secretName: 'metaflow-rds-secret',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          username: ServiceInfo.DB_USER,
        }),
        excludePunctuation: true,
        includeSpace: false,
        generateStringKey: 'password',
      },
      description: 'This is a Secrets Manager secret for an RDS DB instance',
    });

    this.connectable = new rds.DatabaseInstance(this, 'DBInstance', {
      ...DefaultRdsConfig,
      vpc: props.vpc,
      vpcSubnets: props.dbSubnets,
      credentials: rds.Credentials.fromSecret(this.credentials),
      securityGroups: props.dbSecurityGroups,
      parameterGroup: rds.ParameterGroup.fromParameterGroupName(
        this,
        'ParameterGroup',
        'default.postgres12',
      ),
    });
  }
}
