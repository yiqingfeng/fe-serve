// var babel = require('rollup-plugin-babel');
// var replace = require('rollup-plugin-replace');
// var resolve = require('rollup-plugin-node-resolve');
// var commonjs = require('rollup-plugin-commonjs');
// var uglify = require('rollup-plugin-uglify').uglify;
// var config = require('./config');
// var pkg = require('../package.json');

import typescript from 'rollup-plugin-typescript';
// import sourceMaps from 'rollup-plugin-sourcemaps';

export default {
    input: './src/index.ts',
    output: [
        {
            format: 'cjs',
            file: 'lib/bundle.cjs.js',
            // sourcemap: true
        },
        // {
        //     format: 'es',
        //     file: 'lib/bundle.esm.js',
        //     // sourcemap: true
        // },
    ],
    plugins: [
        typescript({
            exclude: 'node_modules/**',
            typescript: require('typescript'),
        }),
        // sourceMaps(),
    ]
};
