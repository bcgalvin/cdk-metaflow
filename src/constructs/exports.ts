import * as cdk from 'aws-cdk-lib';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

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
  readonly apiId: string;
}

/**
 * @summary Metaflow Nlb
 */
export class MetaflowExports extends Construct {
  constructor(scope: Construct, id: string, props: MetaflowExportProps) {
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
      'METAFLOW-SERVICE-URL': `http://${props.apiId}.execute-api.${cdk.Aws.REGION}.amazonaws.com/api`,
      'METAFLOW-SFN-DYNAMO-DB-TABLE': props.tableName,
      'METAFLOW-SFN-IAM-ROLE': props.stepFunctionsRoleArn,
      'METAFLOW-ECS-FARGATE-EXECUTION-ROLE': props.batchS3TaskRoleArn,
    };

    let k: keyof typeof exports;
    for (k in exports) {
      const v = exports[k];
      new cdk.CfnOutput(this, `${k}Output`, {
        exportName: k,
        value: v,
      });
      new ssm.StringParameter(this, `${k}Param`, {
        parameterName: k,
        stringValue: v,
        type: ssm.ParameterType.STRING,
      });
    }
  }
}
