module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    extends: [
        'airbnb-base'
    ],
    globals: {

    },
    rules: {
        'indent': ['error', 4],
        'no-underscore-dangle': ["error", {
            allowAfterThis: true,
            // 'allow': ['_events']
        }]
    }
};
