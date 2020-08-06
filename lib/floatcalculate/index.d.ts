/**
 * @description JS 浮点数计算处理
 * @author daiq 2020-01-17
 */
declare type NumberData = number | string | undefined | null;
/**
 * @description 设置数字的精度
 */
declare function setNumberDecimal(num?: NumberData): number;
declare function setNumberDecimal(num?: NumberData, decimal?: number): string;
/**
 * @description 两数相加，未传值时默认为 0
 * @param {Number | String} num1 | num2 参与计算的数
 * @param {Number} decimal 计算精度，如果传递，则返回进行精度控制后的结果。
 */
declare function addCalc(num1?: NumberData, num2?: NumberData): number;
declare function addCalc(num1?: NumberData, num2?: NumberData, decimal?: number): string;
/**
 * @description 两数相减
 * @param {Number | String} num1 | num2 参与计算的数
 * @param {Number} decimal 计算精度，如果传递，则返回进行精度控制后的结果。
 */
declare function subCalc(num1?: NumberData, num2?: NumberData): number;
declare function subCalc(num1?: NumberData, num2?: NumberData, decimal?: number): string;
/**
 * @description 两数相乘
 * @param {Number | String} num1 | num2 参与计算的数
 * @param {Number} decimal 计算精度，如果传递，则返回进行精度控制后的结果。
 */
declare function mulCalc(num1?: NumberData, num2?: NumberData): number;
declare function mulCalc(num1?: NumberData, num2?: NumberData, decimal?: number): string;
/**
 * @description 两数相除
 * @param {Number | String} num1 | num2 参与计算的数
 * @param {Number} decimal 计算精度，如果传递，则返回进行精度控制后的结果。
 */
declare function divCalc(num1?: NumberData, num2?: NumberData): number;
declare function divCalc(num1?: NumberData, num2?: NumberData, decimal?: number): string;
/**
 * @description 字符串表达式四则运算
 * @param {Array|String} expQueue 运算表达式 ['1', '+', '2'] 或 '1 + 2'
 * @param {Number} decimal 计算精度
 * 注意：计算精度如果传递，则每次计算都会进行精度控制（即会存在精度损失）。
 *      场景：涉及多重计算时，与后台保持一致
 */
declare function expCalc(expQueue: NumberData[] | string): number;
declare function expCalc(expQueue: NumberData[] | string, decimal: number): string;
declare const _default: {
    setNumberDecimal: typeof setNumberDecimal;
    addCalc: typeof addCalc;
    subCalc: typeof subCalc;
    mulCalc: typeof mulCalc;
    divCalc: typeof divCalc;
    expCalc: typeof expCalc;
};
/**
 * @description 浮点数相关计算，所有计算结果均会返回对应字符串
 */
export default _default;
