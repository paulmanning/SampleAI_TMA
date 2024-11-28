module.exports = {
  env: {
    node: true,
    jest: true,
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
  ],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'jest/no-disabled-tests': 'off',
    'jest/expect-expect': 'off'
  },
  ignorePatterns: [
    'docs/**/*',
    'coverage/**/*',
    'dist/**/*',
    'node_modules/**/*'
  ]
}; 