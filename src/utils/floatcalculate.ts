/**
 * @description JS 浮点数计算处理
 * @author daiq 2020-01-17
 */
import base from './base';

const toNumber = base.toNumber;

type NumberData = number | string | undefined | null;

/**
 * @description 获取数字的最大精度（即最大小数位数）
 */
function getMaxPrecision(...nums: number[]): number {
    const numPrecisions: number[] = [];
    nums.forEach((num) => {
        let len: number;
        try {
            len = String(num).split('.')[1].length;
        } catch (err) {
            len = 0;
        }
        numPrecisions.push(len);
    });
    return Math.max(...numPrecisions);
}

/**
 * @description 获取数字的精度之和
 */
function getTotalPrecision(...nums: number[]): number {
    let total = 0;
    nums.forEach((num) => {
        let len: number;
        try {
            len = String(num).split('.')[1].length;
        } catch (err) {
            len = 0;
        }
        total += len;
    });
    return total;
}

/**
 * @description 字符串表达式预处理
 * @param {Array|String} expQueue 运算表达式 ['1', '+', '2'] 或 '1 + 2'
 * @returns {Array} 计算队列
 */
const OPERATORS = ['+', '-', '*', '/', '(', ')'];

function preExpCalc(expQueue: NumberData[] | string = []): Array<number | string> {
    if (Array.isArray(expQueue)) {
        return expQueue.map((item: NumberData) => {
            const data = String(item);
            if (OPERATORS.indexOf(data) === -1) {
                return toNumber(data);
            }
            return data;
        });
    }

    const result: Array<number | string> = [];
    let temp = '';
    for (let i = 0, len = expQueue.length; i < len; i++) {
        if (OPERATORS.indexOf(expQueue[i]) === -1) {
            temp += expQueue[i];
            continue;
        }
        temp = temp.trim();
        // 判断是否为负号
        if (expQueue[i] === '-' && !temp) {
            temp += expQueue[i];
            continue;
        }
        // 判断是否为左括号
        if (expQueue[i] === '(') {
            result.push(expQueue[i]);
            temp = '';
            continue;
        }
        // 判断前一个符号是否为右括号
        if (result[result.length - 1] === ')') {
            result.push(expQueue[i]);
            temp = '';
            continue;
        }
        result.push(toNumber(temp), expQueue[i]);
        temp = '';
    }
    if (temp) {
        result.push(toNumber(temp))
    }
    return result;
}

/**
 * @description 处理原生toFixed采用的银行家四舍五入导致的精度问题
 * num * + 1 精度是为了避免数据计算错误 eg. 271395.225 * 100 === 27139522.499999996
 */
function toFixed(num: number, decimal: number) {
    const assistNum = Math.pow(10, decimal);
    return (Math.round(10 * assistNum * num / 10) / assistNum).toFixed(decimal);
}

/**
 * @description 设置数字的精度
 */
function setNumberDecimal(num?: NumberData): number;
function setNumberDecimal(num?: NumberData, decimal?: number): string;
function setNumberDecimal(num?: NumberData, decimal = -1): string | number {
    const data = toNumber(num);

    if (isNaN(decimal) || decimal < 0) {
        return data;
    }
    return toFixed(data, decimal);
}

/**
 * @description 两数相加，未传值时默认为 0
 * @param {Number | String} num1 | num2 参与计算的数
 * @param {Number} decimal 计算精度，如果传递，则返回进行精度控制后的结果。
 */
function addCalc(num1?: NumberData, num2?: NumberData): number;
function addCalc(num1?: NumberData, num2?: NumberData, decimal?: number): string;
function addCalc(num1: NumberData = 0, num2: NumberData = 0, decimal?: number): string | number {
    const left: number = toNumber(num1);
    const right: number = toNumber(num2);
    const maxPrecision = getMaxPrecision(left, right);
    const assistNum = 10 ** maxPrecision;
    // 268.34 * 100 === 26833.999999999996
    const result = (mulCalc(left, assistNum) + mulCalc(right, assistNum)) / assistNum;
    return setNumberDecimal(result, decimal);
}

/**
 * @description 两数相减
 * @param {Number | String} num1 | num2 参与计算的数
 * @param {Number} decimal 计算精度，如果传递，则返回进行精度控制后的结果。
 */
function subCalc(num1?: NumberData, num2?: NumberData): number;
function subCalc(num1?: NumberData, num2?: NumberData, decimal?: number): string;
function subCalc(num1: NumberData = 0, num2: NumberData = 0, decimal?: number): string | number {
    const result = addCalc(toNumber(num1), -toNumber(num2));
    return setNumberDecimal(result, decimal);
}

/**
 * @description 两数相乘
 * @param {Number | String} num1 | num2 参与计算的数
 * @param {Number} decimal 计算精度，如果传递，则返回进行精度控制后的结果。
 */
function mulCalc(num1?: NumberData, num2?: NumberData): number;
function mulCalc(num1?: NumberData, num2?: NumberData, decimal?: number): string;
function mulCalc(num1: NumberData = 0, num2: NumberData = 0, decimal?: number): string | number {
    const left: number = toNumber(num1);
    const right: number = toNumber(num2);
    const assistNum: number = 10 ** getTotalPrecision(left, right);
    const result = toNumber(String(left).replace('.', '')) * toNumber(String(right).replace('.', '')) / assistNum;
    return setNumberDecimal(result, decimal);
}

/**
 * @description 两数相除
 * @param {Number | String} num1 | num2 参与计算的数
 * @param {Number} decimal 计算精度，如果传递，则返回进行精度控制后的结果。
 */
function divCalc(num1?: NumberData, num2?: NumberData): number;
function divCalc(num1?: NumberData, num2?: NumberData, decimal?: number): string;
function divCalc(num1: NumberData = 0, num2: NumberData = 1, decimal?: number): string | number {
    const left: number = toNumber(num1);
    const right: number = toNumber(num2);
    const maxPrecision = getMaxPrecision(left, right);
    const assistNum = 10 ** maxPrecision;
    const result = (mulCalc(num1, assistNum) / mulCalc(num2, assistNum));
    return setNumberDecimal(result, decimal);
}

/**
 * @description 字符串表达式四则运算
 * @param {Array|String} expQueue 运算表达式 ['1', '+', '2'] 或 '1 + 2'
 * @param {Number} decimal 计算精度
 * 注意：计算精度如果传递，则每次计算都会进行精度控制（即会存在精度损失）。
 *      场景：涉及多重计算时，与后台保持一致
 */
function expCalc(expQueue: NumberData[] | string): number;
function expCalc(expQueue: NumberData[] | string, decimal: number): string;
function expCalc(expQueue: NumberData[] | string, decimal?: number): number | string {
    const queue: Array<number | string> = preExpCalc(expQueue);
    /**
     * 利用 栈 进行表达式求值 https://www.cnblogs.com/lulipro/p/7450886.html
     * 通过将中缀表达式装换为后缀表达式，便不再需要分界符 '(' ')'，同时运算符的优先级也会比较清晰
     * 逆波兰算法 1. 转换为后缀表达式  2. 依据特殊计算规则  eg. 2 * (3 + 4) => 2 (3 4 +) *
     */
    // 将计算队列转换成 逆波兰表达式队列
    const convert = (queue: Array<number | string>): Array<number | string> => {
        const numberStack: Array<number | string> = [];
        const operatorStack: string[] = [];

        const isAddOrSub = item => (item === '+' || item === '-');

        queue.forEach((item) => {
            // 操作数直接进入队列
            const sItem = String(item);
            if (OPERATORS.indexOf(sItem) === -1) {
                numberStack.push(+item);
                return;
            }

            // 如果操作符栈为空，或当前操作符为 '(' 左分界符时，直接压入栈中
            while (true) { // eslint-disable-line
                if (operatorStack.length === 0 || item === '(') {
                    operatorStack.push(sItem);
                    break;
                }

                const lastOperator = operatorStack.pop() as string;

                // `)` 的优先级最高，只要操作符不为 `(` 则一直输出
                if (item === ')') {
                    if (lastOperator !== '(') {
                        numberStack.push(lastOperator);
                        continue;
                    }
                    // 跳出循环，不需要输出 `(`
                    break;
                }

                if (lastOperator === '(') {
                    operatorStack.push(lastOperator, sItem);
                    break;
                }

                // '+' '-' 操作符的优先级最低
                if (isAddOrSub(item) && !isAddOrSub(lastOperator)) {
                    numberStack.push(lastOperator);
                    continue;
                }

                operatorStack.push(lastOperator, sItem);
                break;
            }
        });

        while (operatorStack.length) {
            const lastOperator = operatorStack.pop() as string;

            if (lastOperator !== '(') {
                numberStack.push(lastOperator);
            }
        }

        return numberStack;
    };
    // 计算处理逆波兰表达式队列
    const calculate = (polishArr: Array<number | string> = []): number | string => {
        const result: Array<number | string> = [];
        polishArr.forEach((item) => {
            if (OPERATORS.indexOf(String(item)) === -1) {
                return result.push(+item)
            }

            const num2 = result.pop();
            const num1 = result.pop();
            /* eslint-disable */
            switch (item) {
                case '+':
                    result.push(addCalc(num1, num2, decimal));
                    break;
                case '-':
                    result.push(subCalc(num1, num2, decimal));
                    break;
                case '*':
                    result.push(mulCalc(num1, num2, decimal));
                    break;
                case '/':
                    result.push(divCalc(num1, num2, decimal));
                    break;
            }
            /* eslint-enable */
        });
        return result.pop() as string | number;
    };
    return calculate(convert(queue));
}

/**
 * @description 浮点数相关计算，所有计算结果均会返回对应字符串
 */
export default {
    setNumberDecimal,
    addCalc,
    subCalc,
    mulCalc,
    divCalc,
    expCalc,
};
