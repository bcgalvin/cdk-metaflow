import * as ddb from '@aws-cdk/aws-dynamodb';
import * as cdk from '@aws-cdk/core';

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

export class MetaflowTable extends ddb.Table {
  /**
   *
   * This may be going away entirely because I'm not sure that
   * ddb is necessary to manage state with dynamo with the recent support
   * for strong read-after-write consistency.
   */
  public readonly resource: ddb.CfnTable;
  constructor(scope: cdk.Construct, id: string, props?: ddb.TableProps) {
    super(scope, id, { ...defaults, ...props });
    this.resource = this.node.findChild('Resource') as ddb.CfnTable;
  }
}
