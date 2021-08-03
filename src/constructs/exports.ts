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
      'METAFLOW-BATCH-JOB-QUEUE': `arn:${cdk.Aws.PARTITION}:batch:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:job-queue/jobs`,
      'METAFLOW-DATASTORE-SYSROOT-S3': `s3://${props.bucketName}/metaflow`,
      'METAFLOW-DATATOOLS-SYSROOT-S3': `s3://${props.bucketName}/data`,
      'METAFLOW-DEFAULT-DATASTORE': 's3',
      'METAFLOW-DEFAULT-METADATA': 'service',
      'METAFLOW-ECS-S3-ACCESS-IAM-ROLE': props.batchS3TaskRoleArn,
      'METAFLOW-EVENTS-SFN-ACCESS-IAM-ROLE': props.eventBridgeRoleArn,
      'METAFLOW-SERVICE-INTERNAL-URL': `http://${props.nlbDnsName}/`,
      'METAFLOW-SERVICE-URL': `http://${props.nlbDnsName}/api`,
      'METAFLOW-SFN-DYNAMO-DB-TABLE': props.tableName,
      'METAFLOW-SFN-IAM-ROLE': props.stepFunctionsRoleArn,
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
