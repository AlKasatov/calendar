module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:json/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
      arrowFunctions: true
    }
  },
  plugins: ['import', 'react', 'jsx-a11y', 'react-hooks', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src']
      }
    }
  },
  rules: {
    // Existing rules
    'no-console': 'warn',
    'prefer-const': 'error',
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    // 'indent': ['error', 2, { 'SwitchCase': 1, 'ObjectExpression': 1 }],
    'max-len': ['error', {'code': 120, 'ignoreUrls': true}],
    'comma-dangle': 0,
    'semi': ['error', 'always'],
    'import/order': ['error', {
      'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      'newlines-between': 'always-and-inside-groups'
    }],
    'arrow-parens': ['error', 'as-needed'],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies,
    'react/react-in-jsx-scope': 'off',
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }]
  }
};