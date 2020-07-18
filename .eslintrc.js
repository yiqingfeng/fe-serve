const ISDEUG = process.env.NODE_ENV === 'development';

module.exports = {
    root: true,

    env: {
        node: true,
    },

    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },

    extends: [
        'eslint:recommended',
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
    ],

    globals: {

    },
    rules: {
        // https://cn.eslint.org/docs/rules/
        "comma-dangle": [
            "error",
            {
                "arrays": "always",
                "objects": "always",
                "imports": "always",
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
