import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as ecs from '@aws-cdk/aws-ecs';
import * as cdk from '@aws-cdk/core';

const REFRESH_PERIOD_IN_MIN = 15;
export interface DashboardProps {
  readonly bucketName: string;
  readonly ecsService: ecs.FargateService;
  readonly dashboardName: string;
}
/**
 * A Metaflow environment.
 */
export interface IDashboard {
  readonly dashboard: cloudwatch.Dashboard;
}

export class MetaflowDashboard extends cdk.Construct implements IDashboard {
  public readonly dashboard: cloudwatch.Dashboard;

  constructor(scope: cdk.Construct, id: string, props: DashboardProps) {
    super(scope, id);

    const dashboard = new cloudwatch.Dashboard(this, 'Dashboard', {
      dashboardName: props.dashboardName,
    });

    const bytesUploaded = new cloudwatch.Metric({
      metricName: 'BucketSizeBytes',
      namespace: 'AWS/S3',
      dimensions: {
        BucketName: props.bucketName,
        StorageType: 'StandardStorage',
      },
      period: cdk.Duration.minutes(REFRESH_PERIOD_IN_MIN),
      statistic: cloudwatch.Statistic.SUM,
      unit: cloudwatch.Unit.BYTES,
    });

    const putRequests = new cloudwatch.Metric({
      metricName: 'NumberOfObjects',
      namespace: 'AWS/S3',
      dimensions: {
        BucketName: props.bucketName,
        StorageType: 'AllStorageTypes',
      },
      period: cdk.Duration.minutes(REFRESH_PERIOD_IN_MIN),
      statistic: cloudwatch.Statistic.SUM,
      unit: cloudwatch.Unit.BYTES,
    });
    // row for S3 metrics
    dashboard.addWidgets(
      new cloudwatch.GraphWidget({
        left: [putRequests],
        right: [bytesUploaded],
        width: 24,
        title: 'Amazon S3 Objects (bytes)',
        leftYAxis: {
          min: 0,
        },
        rightYAxis: {
          min: 0,
        },
      }),
      new cloudwatch.GraphWidget({
        title: 'Metadata Service: CPU',
        left: [props.ecsService.metricCpuUtilization()],
        width: 12,
        period: cdk.Duration.minutes(REFRESH_PERIOD_IN_MIN),
      }),
      new cloudwatch.GraphWidget({
        title: 'Metadata Service: Memory',
        left: [props.ecsService.metricMemoryUtilization()],
        width: 12,
        period: cdk.Duration.minutes(REFRESH_PERIOD_IN_MIN),
      }),
    );

    this.dashboard = dashboard;
    new cdk.CfnOutput(this, 'dashboardUri', {
      exportName: 'metaflowDashboard',
      value: `https://console.aws.amazon.com/cloudwatch/home#dashboards:name=${props.dashboardName}`,
    });
  }
}
