const {
  AwsCdkConstructLibrary,
  NodePackageManager,
} = require('projen');

const cdkVersion = '1.126.0';
const devDeps = [
  'ts-node',
  'constructs',
  'source-map-support',
];
const cdkDependencies = [
  '@aws-cdk/core',
  '@aws-cdk/aws-apigateway',
  '@aws-cdk/aws-batch',
  '@aws-cdk/aws-cloudwatch',
  '@aws-cdk/aws-dynamodb',
  '@aws-cdk/aws-ec2',
  '@aws-cdk/aws-ecs',
  '@aws-cdk/aws-events',
  '@aws-cdk/aws-elasticloadbalancingv2',
  '@aws-cdk/aws-iam',
  '@aws-cdk/aws-lambda',
  '@aws-cdk/aws-logs',
  '@aws-cdk/aws-rds',
  '@aws-cdk/aws-s3',
  '@aws-cdk/aws-ssm',
  '@aws-cdk/aws-secretsmanager',
];
const peerDependencies = [
  'constructs',
];
const common_exclude = [
  'cdk.out',
  'cdk.context.json',
  'yarn-error.log',
  '.vscode',
  '.DS_Store',
  '.idea',
];
const tsCustomConfig = {
  exclude: ['doc', 'examples'],
  include: ['assets/**.*.py'],
};

const project = new AwsCdkConstructLibrary({
  name: 'cdk-metaflow',
  repositoryUrl: 'https://github.com/bcgalvin/metaflow-cdk',
  description: 'A JSII construct library to build Metaflow infrastructure on AWS using Python, Typescript or Go',
  author: 'bcgalvin',
  authorAddress: 'bcgalvin@gmail.com',
  license: 'Apache-2.0',
  stability: 'experimental',
  packageManager: NodePackageManager.YARN,
  keywords: ['aws-cdk', 'cdk-construct', 'metaflow'],
  // repo
  defaultReleaseBranch: 'main',
  mergifyAutoMergeLabel: 'dependencies',
  pullRequestTemplateContents: [
    '---',
    'By submitting this pull request, I confirm that my contribution is made under the terms of the Apache 2.0 license.',
  ],
  // dependencies
  cdkVersion: cdkVersion,
  // cdkVersionPinning: true,
  devDeps: devDeps,
  cdkDependencies: cdkDependencies,
  peerDependencies: peerDependencies,
  minNodeVersion: '12.13.0',
  compat: true,
  jestOptions: {
    typescriptConfig: {
      compilerOptions: {
        esModuleInterop: true,
      },
    },
  },
  // devtools
  codeCov: true,
  // typescript
  tsconfig: tsCustomConfig,
  // release
  releaseEveryCommit: true,
  releaseBranchesreleaseBranches: ['main'],
  releaseToNpm: true,
  publishToPypi: {
    distName: 'cdk-metaflow',
    module: 'cdk_metaflow',
  },
  // publishToGo: {
  //   gitUserName: 'bcgalvin',
  //   gitUserEmail: 'bcgalvin@gmail.com',
  //   moduleName: 'github.com/bcgalvin/cdk-metaflow-go',
  // },
});
// disable go sumdb so that go deps are resolved directly against github
project.tasks.tryFind('package').prependExec('go env -w GOSUMDB=off');
project.gitignore.exclude(...common_exclude);
project.npmignore.exclude(...common_exclude, 'doc', 'examples');
const eslintConfig = project.tryFindObjectFile('.eslintrc.json');
eslintConfig.addOverride('rules', {
  '@typescript-eslint/no-require-imports': 'off',
  '@typescript-eslint/no-var-requires': 'off',
  'brace-style': 'off',
});
const openCoverage = project.addTask('coverage');
openCoverage.exec('npx projen test && open coverage/lcov-report/index.html');
project.synth();
