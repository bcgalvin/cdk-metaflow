import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import { Metaflow } from '../src/index';
import { TestMetaflowStack } from './util';

describe('vpc', () => {
  it('matches snapshot', () => {
    const stack = TestMetaflowStack();
    new Metaflow(stack, 'base');
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });

  it('matches cfn output', () => {
    const stack = TestMetaflowStack();
    new Metaflow(stack, 'vpc-resources');
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
    expect(SynthUtils.toCloudFormation(stack)).toCountResources(
      'AWS::EC2::Subnet',
      2,
    );
    expect(SynthUtils.toCloudFormation(stack)).toCountResources(
      'AWS::EC2::SubnetRouteTableAssociation',
      2,
    );
    expect(SynthUtils.toCloudFormation(stack)).toCountResources(
      'AWS::EC2::RouteTable',
      2,
    );
    expect(SynthUtils.toCloudFormation(stack)).toCountResources(
      'AWS::EC2::Route',
      2,
    );
    expect(SynthUtils.toCloudFormation(stack)).toCountResources(
      'AWS::EC2::NatGateway',
      0,
    );
    expect(SynthUtils.toCloudFormation(stack)).toCountResources(
      'AWS::EC2::InternetGateway',
      1,
    );
    expect(SynthUtils.toCloudFormation(stack)).toCountResources(
      'AWS::EC2::VPCGatewayAttachment',
      1,
    );
    expect(SynthUtils.toCloudFormation(stack)).toCountResources(
      'AWS::EC2::SecurityGroup',
      2,
    );
    expect(SynthUtils.toCloudFormation(stack)).toCountResources(
      'AWS::EC2::SecurityGroupIngress',
      2,
    );
    expect(SynthUtils.toCloudFormation(stack)).toCountResources(
      'AWS::EC2::VPCGatewayAttachment',
      1,
    );
  });
});

describe('s3', () => {
  it('has bucket policy', () => {
    const stack = TestMetaflowStack();
    new Metaflow(stack, 's3');
    expect(SynthUtils.toCloudFormation(stack)).toCountResources(
      'AWS::S3::BucketPolicy',
      1,
    );
    expect(SynthUtils.toCloudFormation(stack)).toCountResources(
      'AWS::S3::Bucket',
      1,
    );
    expect(SynthUtils.toCloudFormation(stack)).toHaveResourceLike(
      'AWS::S3::BucketPolicy',
      {
        PolicyDocument: {
          Statement: [
            {
              Action: 's3:*',
              Condition: {
                StringNotEquals: {
                  's3:authType': 'REST-HEADER',
                },
              },
              Effect: 'Deny',
              Principal: {
                AWS: '*',
              },
              Resource: {
                'Fn::Join': [
                  '',
                  [
                    'arn:',
                    {
                      Ref: 'AWS::Partition',
                    },
                    ':s3:::',
                    {
                      Ref: 's3bucketC0A07FFD',
                    },
                    '/*',
                  ],
                ],
              },
            },
          ],
          Version: '2012-10-17',
        },
      },
    );
  });
});

describe('ddb', () => {
  it('has expected table properties', () => {
    const stack = TestMetaflowStack();
    new Metaflow(stack, 'ddb');
    expect(SynthUtils.toCloudFormation(stack)).toHaveResourceLike(
      'AWS::DynamoDB::Table',
      {
        AttributeDefinitions: [
          {
            AttributeName: 'pathspec',
            AttributeType: 'S',
          },
        ],
        BillingMode: 'PAY_PER_REQUEST',
        KeySchema: [
          {
            AttributeName: 'pathspec',
            KeyType: 'HASH',
          },
        ],
        PointInTimeRecoverySpecification: {
          PointInTimeRecoveryEnabled: true,
        },
        TimeToLiveSpecification: {
          AttributeName: 'ttl',
          Enabled: true,
        },
      },
    );
  });
});

describe('iam', () => {
  it('has defined the correct number of roles', () => {
    const stack = TestMetaflowStack();
    new Metaflow(stack, 'iam');
    expect(SynthUtils.toCloudFormation(stack)).toCountResources(
      'AWS::IAM::Role',
      9,
    );
  });
});

describe('rds', () => {
  it('applies default settings', () => {
    const stack = TestMetaflowStack();
    new Metaflow(stack, 'rds');

    expect(SynthUtils.toCloudFormation(stack)).toHaveResource(
      'AWS::RDS::DBInstance',
      {
        DBInstanceClass: 'db.t2.small',
        PubliclyAccessible: false,
        DeletionProtection: false,
        Engine: 'postgres',
        EngineVersion: '11.5',
        BackupRetentionPeriod: 7,
      },
    );
  });
});
