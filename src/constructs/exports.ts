import * as ssm from '@aws-cdk/aws-ssm';
import * as cdk from '@aws-cdk/core';

export interface MetaflowExportProps {
  readonly bucketName: string;
  readonly tableName: string;
  readonly nlbDnsName: string;
  readonly migrateLambdaName: string;
  readonly batchExecutionRoleArn: string;
  readonly batchS3TaskRoleArn: string;
  readonly stepFunctionsRoleArn: string;
  readonly eventBridgeRoleArn: string;
  readonly ecsTaskRoleArn: string;
  readonly ecsRoleArn: string;
  readonly ecsExecutionRoleArn: string;
  readonly lambdaECSExecuteRoleArn: string;
}

/**
 * @summary Metaflow Nlb
 */
export class MetaflowExports extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: MetaflowExportProps) {
    super(scope, id);
    const exports = {
      METAFLOW_BATCH_JOB_QUEUE: `arn:${cdk.Aws.PARTITION}:batch:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:job-queue/jobs`,
      METAFLOW_DATASTORE_SYSROOT_S3: `s3://${props.bucketName}/metaflow`,
      METAFLOW_DATATOOLS_SYSROOT_S3: `s3://${props.bucketName}/data`,
      METAFLOW_DEFAULT_DATASTORE: 's3',
      METAFLOW_DEFAULT_METADATA: 'service',
      METAFLOW_ECS_S3_ACCESS_IAM_ROLE: props.batchS3TaskRoleArn,
      METAFLOW_EVENTS_SFN_ACCESS_IAM_ROLE: props.eventBridgeRoleArn,
      METAFLOW_SERVICE_INTERNAL_URL: `http://${props.nlbDnsName}/`,
      METAFLOW_SERVICE_URL: `http://${props.nlbDnsName}/api`,
      METAFLOW_SFN_DYNAMO_DB_TABLE: props.tableName,
      METAFLOW_SFN_IAM_ROLE: props.stepFunctionsRoleArn,
    };

    let k: keyof typeof exports;
    for (k in exports) {
      const v = exports[k];
      new cdk.CfnOutput(this, `${k}_Output`, {
        exportName: k,
        value: v,
      });
      new ssm.StringParameter(this, `${k}_Param`, {
        parameterName: k,
        stringValue: v,
        type: ssm.ParameterType.STRING,
      });
    }
  }
}
