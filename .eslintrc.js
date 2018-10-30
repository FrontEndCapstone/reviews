module.exports = {
  extends: ['airbnb'],
  rules: {
    'no-plusplus': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/jsx-one-expression-per-line': ['warn', { allow: 'single-child' }],
    'import/extensions': ['disabled'],
    'space-before-function-paren': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'operator-linebreak': ['error', 'before'],
    'no-unused-expressions': ['error', { allowTernary: true }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.js', '**/*config.js', '*setupTests.js'],
      },
    ],
  },
  env: {
    browser: true,
    node: true,
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
        mocha: true,
      },
    },
  ],
};
