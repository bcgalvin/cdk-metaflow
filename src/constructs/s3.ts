import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * Default artifact bucket settings.
 */
export const DefaultBucketProps = {
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
} as s3.BucketProps;

/**
 * @summary Metaflow S3 Bucket
 * S3 bucket for metaflow artifacts. Creates a standard bucket for holding
 * metaflow artifacts and with iam DENY policy for REST-HEADER auth.
 */
export class MetaflowBucket extends s3.Bucket {
  /**
   * Constructs a new instance of the MetaflowBucket class.
   * @param {Construct} scope the Scope of the CDK Construct
   * @param {string} id the ID of the CDK Construct
   * @param {BucketProps} props the BucketProps [properties]{@link s3.BucketProps}
   * @access public
   */
  public readonly resource: s3.CfnBucket;
  constructor(scope: Construct, id: string, props?: s3.BucketProps) {
    super(scope, id, { ...DefaultBucketProps, ...props });
    this.addToResourcePolicy(
      new iam.PolicyStatement({
        principals: [new iam.AnyPrincipal()],
        effect: iam.Effect.DENY,
        actions: ['s3:*'],
        resources: [`arn:${cdk.Aws.PARTITION}:s3:::${this.bucketName}/*`],
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
