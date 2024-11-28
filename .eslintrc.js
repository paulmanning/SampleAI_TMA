module.exports = {
  env: {
    node: true,
    jest: true,
    browser: true,
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
    // Add any specific rules here
  },
}; 