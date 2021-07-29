import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as cdk from '@aws-cdk/core';
import { IntegMetaflowStack } from '../../src/integ/integ-metaflow-stack';

test('metaflow-integ-stack', () => {
  const app = new cdk.App();
  const stack = new IntegMetaflowStack(app, 'integ-ec2');
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});
