const ISDEUG = process.env.NODE_ENV === 'development';

module.exports = {
    root: true,
    env: {
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint',
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
        'no-console': ISDEUG ? 0 : 1,
        'no-underscore-dangle': ['error', {
            allowAfterThis: true,
            // 'allow': ['_events']
        }]
    }
};
