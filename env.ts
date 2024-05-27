import { GitHubOidcStackProps } from './lib/cdk-stack';

export const config: GitHubOidcStackProps = {
  roles: [
    {
      roleName: 'example-readonly-role',
      policies: {
        actions: ['tag:GetResources'],
        resources: ['*'],
      },
      managedPolicies: ['AWSIoTEventsReadOnlyAccess'],
      repositories: ['repo:github-user/example-repository:example-oidc-branch'],
      isRepositoryExcactlyEquals: true,
    },
    {
      roleName: 'example-readonly-role-2',
      policies: {
        actions: ['sts:GetCallerIdentity'],
        resources: ['*'],
      },
      managedPolicies: [],
      repositories: ['repo:github-user/example-repository:example-oidc-branch-2'],
      isRepositoryExcactlyEquals: true,
    },
  ],
};
