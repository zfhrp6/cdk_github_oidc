import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { GitHubOidcStack } from '../lib/cdk-stack';
import { testConfig } from './test-env';

test('STack snapshot test', () => {
  const app = new cdk.App();
  const stack = new GitHubOidcStack(app, 'SnapshotTestStack', testConfig);
  // スタックからテンプレート(JSON)を生成
  const template = Template.fromStack(stack).toJSON();

  // 生成したテンプレートとスナップショットが同じか検証
  expect(template).toMatchSnapshot();
});
