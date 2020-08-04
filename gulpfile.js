const path = require('path');
const {
    series,
} = require('gulp');
const fse = require('fs-extra');
const chalk = require('chalk');
const {
    rollup,
} = require('rollup');
const {
    Extractor,
    ExtractorConfig,
    ExtractorResult,
} = require('@microsoft/api-extractor');
// import conventionalChangelog from 'conventional-changelog'
const rollupConfig = require('./rollup.config');

const rootPath = path.join(__dirname, './');
const outPath = path.resolve(rootPath, './lib');

const log = {
    progress(text) {
        console.log(chalk.green(text));
    },
    error(text) {
        console.log(chalk.red(text));
    },
};

/**
 * @description 清理 lib 文件
 */
async function clean(cb) {
    fse.removeSync(outPath);
    log.progress('Deleted lib file');
    cb();
}

/**
 * @description rollup 打包
 */
async function buildByRollup(cb) {
    const inputOptions = {
        input: rollupConfig.input,
        external: rollupConfig.external,
        plugins: rollupConfig.plugins,
    };
    const outOptions = rollupConfig.output;
    const bundle = await rollup(inputOptions);

    // 写入需要遍历输出配置
    if (Array.isArray(outOptions)) {
        outOptions.forEach(async (outOption) => {
            await bundle.write(outOption);
        })
        cb();
        log.progress('Rollup built successfully');
    }
}

/**
 * @description 整理声明文件
 */
async function apiExtractorGenerate(cb) {
    const apiExtractorJsonPath = path.join(__dirname, './api-extractor.json')
    // 加载并解析 api-extractor.json 文件
    const extractorConfig = await ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath)
    // 判断是否存在 index.d.ts 文件，这里必须异步先访问一边，不然后面找不到会报错
    const isExist = await fse.pathExists(extractorConfig.mainEntryPointFilePath)

    if (!isExist) {
        log.error('API Extractor not find index.d.ts')
        return
    }

    // 调用 API
    const extractorResult = await Extractor.invoke(extractorConfig, {
        localBuild: true,
        // 在输出中显示信息
        showVerboseMessages: true,
    })

    if (extractorResult.succeeded) {
        // 删除多余的 .d.ts 文件
        const libFiles = await fse.readdir(outPath);
        libFiles.forEach(async file => {
            if (file.endsWith('.d.ts') && !file.includes('index')) {
                await fse.remove(path.join(outPath, file));
            }
        })
        log.progress('API Extractor completed successfully');
        cb();
    } else {
        log.error(`API Extractor completed with ${extractorResult.errorCount} errors` + ` and ${extractorResult.warningCount} warnings`);
    }
}

/**
 * @description build 打包
 *      1. 删除原 lib 文件夹
 *      2. rollup 打包
 *      3. api-extractor 生成统一声明文件
 */
exports.build = series(clean, buildByRollup)
