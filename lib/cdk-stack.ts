import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export class GitHubOidcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const provider = new iam.OpenIdConnectProvider(this, 'Provider', {
      url: 'https://token.actions.githubusercontent.com',
      clientIds: ['sts.amazonaws.com'],
    });
    const role = new iam.Role(this, 'github-oidc-role', {
      roleName: 'github-oidc-role',
      assumedBy: new iam.WebIdentityPrincipal(provider.openIdConnectProviderArn, {
        StringEquals: {
          'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
        },
        StringLike: {
          'token.actions.githubusercontent.com:sub': [],
        },
      }),
    });

    // attach AWS Managed Policy
    ['AWSIoTEventsReadOnlyAccess'].forEach((policy) => {
      role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName(policy));
    });

    // add other policy
    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['sts:GetCallerIdentity'],
        resources: ['*'],
        effect: iam.Effect.ALLOW,
      })
    );
  }
}
