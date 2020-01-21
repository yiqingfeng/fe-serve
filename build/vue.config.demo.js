/**
 * @description ui 开发模式
 * @author nimo 2010-01-21
 */
const path = require('path');

const ISDEBUG = process.env.NODE_ENV === 'development';

module.exports = {
    pages: {
        demo: {
            entry: 'demo/index.ts',
            template: 'demo/index.html',
            filename: 'index.html'
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                Demo: path.resolve(__dirname, '../demo')
            },
        },
    },
    runtimeCompiler: true,
    ...(
        ISDEBUG ? {
            devServer: {
                port: 4000
            }
        } : {
            publicPath: './',
            outputDir: './dist/demo',
        }
    )
};
