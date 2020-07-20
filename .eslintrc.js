module.exports = {
    root: true,
    parser: '@typescript-eslint/parser', // 使用 ts 解析器
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended', // eslint 推荐规则
        'plugin:@typescript-eslint/recommended', // ts 推荐规则
    ],

    globals: {

    },
    rules: {
        // https://cn.eslint.org/docs/rules/
        "comma-dangle": [
            "error",
            {
                "arrays": "always-multiline",
                "objects": "always-multiline",
                "imports": "always-multiline",
                "exports": "always",
                "functions": "never"
            }
        ],
        "indent": ["warn", 4],
        "space-before-function-paren": [
            "error",
            {
                "anonymous": "always",
                "named": "never",
                "asyncArrow": "always"
            }
        ],
        "semi": "off",

        // ts-eslint
        "@typescript-eslint/no-explicit-any": "off"
    },
};
