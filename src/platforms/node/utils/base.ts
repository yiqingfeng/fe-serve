/**
 * @description 基础通用处理
 */

// 是否为 windows 环境
function isWindows(): boolean {
    return process.platform === 'win32';
}

export default {
    isWindows,
}
