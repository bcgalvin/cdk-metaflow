const {
  AwsCdkConstructLibrary,
  ProjectType,
  NodePackageManager,
  DependenciesUpgradeMechanism,
} = require('projen');

const cdkVersion = '1.116.0';
const devDeps = [
  'ts-node',
  'constructs',
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
  exclude: ['doc'],
  include: ['src/'],
};

const project = new AwsCdkConstructLibrary({
  name: 'cdk-metaflow',
  repositoryUrl: 'https://github.com/bcgalvin/metaflow-cdk',
  description: 'A JSII construct library to build Metaflow infrastructure on AWS using Python, Typescript or Go',
  author: 'bcgalvin',
  authorAddress: 'bcgalvin@gmail.com',
  license: 'Apache-2.0',
  stability: 'experimental',
  projectType: ProjectType.LIB,
  packageManager: NodePackageManager.YARN,
  keywords: ['aws-cdk', 'cdk-construct', 'metaflow'],
  // repo
  defaultReleaseBranch: 'main',
  mergifyAutoMergeLabel: 'dependencies',
  pullRequestTemplateContents: [
    '---',
    'By submitting this pull request, I confirm that my contribution is made under the terms of the Apache 2.0 license.',
  ],
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: 'PROJEN_GITHUB_TOKEN',
    },
  }),
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
  },
  gitpod: true,
  // dependencies
  cdkVersion: cdkVersion,
  cdkVersionPinning: true,
  cdkDependenciesAsDeps: false,
  devDeps: devDeps,
  cdkDependencies: cdkDependencies,
  peerDependencyOptions: {
    pinnedDevDependency: false,
  },
  peerDependencies: peerDependencies,
  minNodeVersion: '12.13.0',
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
  //   moduleName: 'github.com/bcgalvin/metaflow-cdk-go',
  // },
});
// disable go sumdb so that go deps are resolved directly against github
project.tasks.tryFind('package').prependExec('go env -w GOSUMDB=off');
project.gitignore.exclude(...common_exclude);
const eslintConfig = project.tryFindObjectFile('.eslintrc.json');
eslintConfig.addOverride('rules', {
  '@typescript-eslint/no-require-imports': 'off',
  '@typescript-eslint/no-var-requires': 'off',
  'brace-style': 'off',
});
const tsconfig = project.tryFindObjectFile('tsconfig.eslint.json');
tsconfig.addOverride('include', [
  '.projenrc.js',
  'src/**/*.ts',
  'test/**/*.ts',
]);
project.gitpod.addTasks({
  name: 'Setup',
  init: 'yarn install',
  command: 'npx projen build',
});
const openCoverage = project.addTask('coverage');
openCoverage.exec('npx projen test && open coverage/lcov-report/index.html');
project.synth();
