var babel = require('rollup-plugin-babel');
var replace = require('rollup-plugin-replace');
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var uglify = require('rollup-plugin-uglify').uglify;
var config = require('./config');
var pkg = require('../package.json');

var suffix = process.env.API_ENV === 'web' ? '' : `-${process.env.API_ENV}`;
module.exports = {
    input: './src/index.js',
    output: [{
        file: `./dist/index${suffix}.js`,
        format: 'umd',
        name: 'Sail',
        banner: config.banner
    }, {
        file: `./dist/index${suffix}.esm.js`,
        format: 'esm'
    }],
    plugins: [
        replace({
            API_ENV: process.env.API_ENV,
            VERSION: pkg.version
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        commonjs({
            include: [
                'node_modules/**'
            ]
        }),
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**'
        }),
        (process.env.NODE_ENV === 'production' && uglify())
    ]
};
