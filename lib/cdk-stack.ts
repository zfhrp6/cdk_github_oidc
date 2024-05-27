import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface GitHubOidcStackProps extends cdk.StackProps {
  roles: {
    roleName: string;
    repositories: string[];
    isRepositoryExcactlyEquals: boolean;
    managedPolicies: string[];
    policies: {
      actions: string[];
      resources: string[];
    };
  }[];
}

export class GitHubOidcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: GitHubOidcStackProps) {
    super(scope, id, props);

    const provider = new iam.OpenIdConnectProvider(this, 'Provider', {
      url: 'https://token.actions.githubusercontent.com',
      clientIds: ['sts.amazonaws.com'],
    });

    props.roles.forEach((params) => {
      const principalProps = params.isRepositoryExcactlyEquals
        ? {
            StringEquals: {
              'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
              'token.actions.githubusercontent.com:sub': params.repositories,
            },
          }
        : {
            StringEquals: {
              'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
            },
            StringLike: {
              'token.actions.githubusercontent.com:sub': [params.repositories],
            },
          };

      const role = new iam.Role(this, `github-oidc-role-${params.roleName}`, {
        roleName: params.roleName,
        assumedBy: new iam.WebIdentityPrincipal(provider.openIdConnectProviderArn, principalProps),
      });

      // attach AWS Managed Policy
      if (params.managedPolicies.length > 0) {
        params.managedPolicies.forEach((policyName) => {
          role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName(policyName));
        });
      }

      if (params.policies.actions.length > 0) {
        console.log(params.policies.actions);
        // add other policy
        role.addToPolicy(
          new iam.PolicyStatement({
            actions: params.policies.actions,
            resources: params.policies.resources,
          })
        );
      }
    });
  }
}
