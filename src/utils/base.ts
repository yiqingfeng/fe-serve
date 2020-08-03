/**
 * @description 通用基础方法
 */

/**
 * @description 将指定字符串或数字转换成数字 undefined | null 会被视为 0
 * @param num {string | number} 带转换的数字
 */
function toNumber(num ?: string | number | null): number {
    let data = Number(num);
    if (isNaN(data)) {
        data = 0;
    }
    return data;
}

export default {
    toNumber,
}
