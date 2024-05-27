#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { GitHubOidcStack } from '../lib/cdk-stack';
import { config } from '../env';

const app = new cdk.App();

new GitHubOidcStack(app, 'GitHubOidcStack', config);

const tags = {
  CreatedBy: 'AWS CDK',
  Repository: 'cdk_github_oidc',
};

Object.entries(tags).forEach(([k, v]) => {
  cdk.Tags.of(app).add(k, v);
});
