const path = require('path');
const version = process.env.VERSION || require('../package.json').version;

const rootPath = path.join(__dirname, '../');

/**
 * @description 获取指定目录文件的实际路径
 */
function getPath(dir) {
    return path.resolve(rootPath, dir);
}

/**
 * base alias
 */
const aliases = {
    shared: getPath('src/shared'),
    core: getPath('src/platforms/core'),
    web: getPath('src/platforms/web'),
    node: getPath('src/platforms/node'),
};

const banner =
    '/*!\n' +
    ` * fe-serve v${version}\n` +
    ` * (c) 2020-${new Date().getFullYear()} Evan You\n` +
    ' * Released under the MIT License.\n' +
    ' */';

/**
 * @description 打包路径寻找
 */
function resolve(dir) {
    const base = dir.split('/')[0];
    if (aliases[base]) {
        return path.resolve(aliases[base], dir.slice(base.length + 1));
    } else {
        return getPath(dir);
    }
}

/**
 * @description 支持的打包方式
 */
const builds = {
    'core-cjs': {
        entry: resolve('core/index.ts'),
        dest: resolve('lib/index.cjs.js'),
        format: 'cjs',
        banner,
    },
    'core-es': {
        entry: resolve('core/index.ts'),
        dest: resolve('lib/index.es.js'),
        format: 'es',
        banner,
    },
    'core-umd': {
        entry: resolve('core/index.ts'),
        dest: resolve('lib/index.umd.js'),
        format: 'umd',
        banner,
    },
    // 输出 web ES 规范的代码
    'web-es': {
        entry: resolve('web/index.ts'),
        dest: resolve('lib/index.web.es.js'),
        format: 'es',
        banner,
    },
    // 输出 node commonjs 规范的代码
    'node-cjs': {
        entry: resolve('node/index.ts'),
        dest: resolve('lib/index.node.js'),
        format: 'cjs',
        banner,
    },
};

module.exports = {
    aliases,
    builds,
};
