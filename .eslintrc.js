const ISDEUG = process.env.NODE_ENV === 'development';

module.exports = {
    root: true,

    env: {
        node: true
    },

    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },

    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        'airbnb-base',
        'plugin:vue/recommended'
    ],

    globals: {

    },

    rules: {
        'indent': ['error', 4],
        'import/extensions': 'off',
        'no-console': ISDEUG ? 0 : 1,
        'no-underscore-dangle': ['error', {
            allowAfterThis: true,
            // 'allow': ['_events']
        }],
        'vue/html-indent': ['error', 4]
    },

    'extends': [
      'plugin:vue/essential',
      'eslint:recommended',
      'airbnb-base',
      'plugin:vue/recommended',
      '@vue/typescript'
    ]
};
