const alias = require('@rollup/plugin-alias')
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const rollupTypescript = require('rollup-plugin-typescript2');
const {
    eslint,
} = require('rollup-plugin-eslint');
const {
    DEFAULT_EXTENSIONS,
} = require('@babel/core');
const {
    terser,
} = require('rollup-plugin-terser');

const {
    aliases,
    builds,
} = require('./config');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * @description 生成指定的 Config
 */
function genConfig(name) {
    const options = builds[name];
    const config = {
        input: options.entry,
        external: options.external,
        plugins: [
            // 别名处理
            // alias(Object.assign({}, aliases, options.alias)),
            alias({
                entries: Object.keys(aliases).map(key => {
                    return {
                        find: key,
                        replacement: aliases[key],
                    };
                }),
                customResolver: resolve({
                    extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss'],
                }),
                // entries: [
                //     {
                //         find: 'shared',
                //         replacement: aliases['shared'],
                //     }
                // ]
            }),

            // 验证导入的文件
            eslint({
                throwOnError: true, // lint 结果有错误将会抛出异常
                throwOnWarning: true,
                include: ['src/**/*.ts'],
                exclude: ['node_modules/**', 'lib/**', '*.js'],
            }),

            // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
            commonjs(),

            // 配合 commnjs 解析第三方模块
            resolve({
                // 将自定义选项传递给解析插件
                customResolveOptions: {
                    moduleDirectory: 'node_modules',
                },
            }),
            rollupTypescript(),
            babel({
                runtimeHelpers: true,
                // 只转换源代码，不运行外部依赖
                exclude: 'node_modules/**',
                // babel 默认不支持 ts 需要手动添加
                extensions: [
                    ...DEFAULT_EXTENSIONS,
                    '.ts',
                ],
            }),

            ...(
                IS_PRODUCTION ? [
                    // 代码压缩
                    terser({
                        compress: {
                            evaluate: false,
                        },
                    }),
                ] : []
            ),
        ].concat(options.plugins || []),
        output: {
            file: options.dest,
            format: options.format,
            banner: options.banner,
            name: options.moduleName || 'FeServe',
        },
        onwarn(msg, warn) {
            if (!/Circular/.test(msg)) {
                warn(msg);
            }
        },
    };

    // 内置变量属性处理

    return config;
}

/**
 * 依据不同环境，做不同处理
 */
if (process.env.TARGET) {
    module.exports = genConfig(process.env.TARGET);
} else {
    exports.getBuild = genConfig;
    exports.getAllBuilds = () => Object.keys(builds).map(genConfig);
}
