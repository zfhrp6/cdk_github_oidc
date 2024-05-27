import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    ignores: ['dist/', 'cdk.out/', 'jest.config.js'],
  },
];
