import { GitHubOidcStackProps } from '../lib/cdk-stack';

export const testConfig: GitHubOidcStackProps = {
  roles: [
    {
      roleName: 'test-role-name-1-policy',
      policies: {
        actions: ['test:TestAwsActionName'],
        resources: ['testResource'],
      },
      managedPolicies: [],
      repositories: ['repo:github-user/example-repository:example-oidc-branch-1'],
      isRepositoryExcactlyEquals: true,
    },
    {
      roleName: 'test-role-name-2-managedPolicy',
      policies: {
        actions: [],
        resources: [],
      },
      managedPolicies: ['AWSIoTEventsReadOnlyAccess'],
      repositories: ['repo:github-user/example-repository:*'],
      isRepositoryExcactlyEquals: false,
    },
    {
      roleName: 'test-role-name-3-policy-and-managedPolicy',
      policies: {
        actions: ['test:TestAwsActionName2'],
        resources: ['arn:aws:iam::123456789012:resource/test-resource-name'],
      },
      managedPolicies: ['AWSIoTEventsReadOnlyAccess'],
      repositories: ['repo:github-user/example-repository:*'],
      isRepositoryExcactlyEquals: false,
    },
  ],
};
