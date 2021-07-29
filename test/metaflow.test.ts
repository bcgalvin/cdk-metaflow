import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import { Metaflow } from '../src/index';
import { TestMetaflowStack } from './util';

it('matches snapshot', () => {
  const stack = TestMetaflowStack();
  new Metaflow(stack, 'base');
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

test('matches cfn output', () => {
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
    3,
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
