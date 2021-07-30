import { App, Environment, Stack } from '@aws-cdk/core';

// Some stacks (such as ones using access logging on load balancers) require specifying a region
const defaultEnv: Environment = {
  account: '123456789',
  region: 'us-west-2',
};

export const TestMetaflowStack: () => Stack = () =>
  new Stack(new App(), 'Test', {
    env: defaultEnv,
  });
