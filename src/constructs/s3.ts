import * as iam from '@aws-cdk/aws-iam';
import * as s3 from '@aws-cdk/aws-s3';
import { RemovalPolicy, Aws, Construct } from '@aws-cdk/core';

/**
 * Default artifact bucket settings.
 */
export const DefaultBucketProps = {
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
  removalPolicy: RemovalPolicy.DESTROY,
} as s3.BucketProps;

/**
 * S3 bucket for metaflow artifacts.
 */
export class MetaflowBucket extends s3.Bucket {
  /**
   *
   * Class is designed to create a standard bucket for holding
   * metaflow artifacts and with iam DENY policy for REST-HEADER auth.
   *
   */
  public readonly resource: s3.CfnBucket;
  constructor(scope: Construct, id: string, props?: s3.BucketProps) {
    super(scope, id, { ...DefaultBucketProps, ...props });
    this.addToResourcePolicy(
      new iam.PolicyStatement({
        principals: [new iam.AnyPrincipal()],
        effect: iam.Effect.DENY,
        actions: ['s3:*'],
        resources: [`arn:${Aws.PARTITION}:s3:::${this.bucketName}/*`],
        conditions: {
          StringNotEquals: {
            's3:authType': 'REST-HEADER',
          },
        },
      }),
    );
    this.resource = this.node.findChild('Resource') as s3.CfnBucket;
  }
}
