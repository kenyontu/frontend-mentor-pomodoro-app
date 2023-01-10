module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  root: true,
}
