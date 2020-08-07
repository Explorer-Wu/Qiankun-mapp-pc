module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
  ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 6,
  },
  rules: {
    'quotes': [0, 'single'],
    'semi': 0,
    'vue/html-self-closing': 'off',
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false
    }],
    'indent': 'off',
    "space-before-function-paren": 0,
    'eol-last': 0,
    'comma-dangle': 0,
    'no-unneeded-ternary': 0,
    'no-useless-return': 0,
    // 'no-console': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ]
};

// "gitHooks": {
//   "pre-commit": "lint-staged"
// },
// "lint-staged": {
//   "*.{js,jsx,vue}": [
//     "vue-cli-service lint",
//     "git add"
//   ]
// }