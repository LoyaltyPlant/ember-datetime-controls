module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember/base',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
  }
};
