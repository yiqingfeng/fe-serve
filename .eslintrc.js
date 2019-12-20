module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    extends: [
        'airbnb-base/legacy',
        'plugin:vue/recommended'
    ],
    globals: {
        AMap: true,
        FSOpen: true,
        wx: true,
        Promise: true,
        System: true,
        arguments: true,
        '_': true
    },
    rules: {
        'no-underscore-dangle': ['error', {
            'allow': [
                '_id',
                '_userDefinedData',
                '_eventHandlers',
                '__FSUI'
            ],
            'allowAfterThis': true
        }],
        // 暂时先关闭掉，后续要继续打开
        'no-underscore-dangle': 0,
        'no-console': 0,
        'no-plusplus': 0,
        'one-var': 0,
        'no-param-reassign': 0,
        'vars-on-top': 0,
        'no-unused-expressions': 0,
        'object-curly-newline': ['error', {
            'ObjectPattern': { multiline: true }
        }],
        // vue rules: https://vuejs.github.io/eslint-plugin-vue/rules/
        'vue/html-self-closing': ['warn', { html: { normal: "never", void: "never" } }],
        'vue/max-attributes-per-line': 0,
        'vue/html-indent': ['warn', 2, { 'alignAttributesVertically': false }],
        'vue/singleline-html-element-content-newline': 0
    }
};
