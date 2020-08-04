import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import rollupTypescript from 'rollup-plugin-typescript2';
import {
    eslint,
} from 'rollup-plugin-eslint';
import {
    DEFAULT_EXTENSIONS,
} from '@babel/core';
import {
    uglify,
} from 'rollup-plugin-uglify';

import pkg from './package.json';

const rootPath = path.join(__dirname, './');
const entryPath = path.resolve(rootPath, './src/index.ts');
const outPath = path.resolve(rootPath, './lib')

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// rollup 配置项
export default {
    input: entryPath,
    output: [
        // 输出 commonjs 规范的代码
        {
            file: path.join(outPath, 'index.js'),
            format: 'cjs',
            name: pkg.name,
        },
        // 输出 es 规范的代码
        {
            file: path.join(outPath, 'index.es.js'),
            format: 'es',
            name: pkg.name,
        },
        // 输出 umd 规范代码
        {
            file: path.join(outPath, 'index.umd.js'),
            format: 'umd',
            name: pkg.name,
        },
    ],
    // external: ['lodash'], // 指出应将哪些模块视为外部模块，如 Peer dependencies 中的依赖
    // plugins 需要注意引用顺序
    plugins: [
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
                uglify({
                    compress: {
                        evaluate: false,
                    }
                }),
            ] : []
        ),
    ],
};
