import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

const defaults = {
  billingMode: ddb.BillingMode.PAY_PER_REQUEST,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  pointInTimeRecovery: true,
  partitionKey: {
    name: 'pathspec',
    type: ddb.AttributeType.STRING,
  },
  timeToLiveAttribute: 'ttl',
};

/**
 * @summary Metaflow DynamoDB Table
 * This may be going away entirely because I'm not sure that
 * ddb is necessary to manage state with dynamo with the recent support
 * for strong read-after-write consistency.
 */
export class MetaflowTable extends ddb.Table {
  /**
   * Constructs a new instance of the MetaflowTable class.
   * @param {Construct} scope the Scope of the CDK Construct
   * @param {string} id the ID of the CDK Construct
   * @param {TableProps} props the TableProps [properties]{@link ddb.TableProps}
   * @access public
   */
  public readonly resource: ddb.CfnTable;
  constructor(scope: Construct, id: string, props?: ddb.TableProps) {
    super(scope, id, { ...defaults, ...props });
    this.resource = this.node.findChild('Resource') as ddb.CfnTable;
  }
}
