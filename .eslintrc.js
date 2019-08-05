module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['node', 'prettier'],
  rules: {
    'no-process-exit': 'off',
  },
  env: {
    es6: true,
    node: true,
  },
}
