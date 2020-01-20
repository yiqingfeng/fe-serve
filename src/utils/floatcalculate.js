/**
 * @description JS 浮点数计算处理
 * @author daiq 2020-01-17
 */
/**
 * @description 获取数字的最大精度（即最大小数位数）
 */
function getMaxPrecision(...nums) {
    const numPrecisions = [];
    nums.forEach((num) => {
        let len;
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
function getTotalPrecision(...nums) {
    let total = 0;
    nums.forEach((num) => {
        let len;
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

function preExpCalc(expQueue = []) {
    if (Array.isArray(expQueue)) {
        return expQueue.map((item) => {
            if (OPERATORS.indexOf(item) === -1) {
                return isNaN(+item) ? 0 : +item;
            }
            return item;
        });
    }

    const result = [];
    let temp = '';
    for (let i = 0, len = expQueue.length; i < len; i++) {
        if (OPERATORS.indexOf(expQueue[i]) === -1) {
            temp += expQueue[i];
            continue;
        }
        result.push(isNaN(+temp) ? 0 : +temp, expQueue[i]);
        temp = '';
    }
    if (temp) {
        result.push(isNaN(+temp) ? 0 : +temp)
    }
    return result;
}

/**
 * @description 浮点数相关计算，所有计算结果均会返回对应字符串
 */
export default {
    /**
     * @description 设置数字的精度
     */
    setNumberDecimal(num, decimal) {
        if (isNaN(result) || isNaN(decimal) || Number(decimal) < 0) {
            return num;
        }
        return Number(num).toFixed(decimal);
    },
    /**
     * @description 两数相加，未传值时默认为 0
     * @param {Number | String} num1 | num2 参与计算的数
     * @param {Number} decimal 计算精度，如果传递，则返回进行精度控制后的结果。
     */
    addCalc(num1 = 0, num2 = 0, decimal) {
        const maxPrecision = getMaxPrecision(num1, num2);
        const assistNum = 10 ** maxPrecision;
        // 268.34 * 100 === 26833.999999999996
        const result = (this.mulCalc(num1, assistNum) + this.mulCalc(num2, assistNum)) / assistNum;
        return this.setNumberDecimal(result, decimal);
    },
    /**
     * @description 两数相减
     * @param {Number | String} num1 | num2 参与计算的数
     * @param {Number} decimal 计算精度，如果传递，则返回进行精度控制后的结果。
     */
    subCalc(num1 = 0, num2 = 0, decimal) {
        const result = this.addCalc(num1, -Number(num2));
        return this.setNumberDecimal(result, decimal);
    },
    /**
     * @description 两数相乘
     * @param {Number | String} num1 | num2 参与计算的数
     * @param {Number} decimal 计算精度，如果传递，则返回进行精度控制后的结果。
     */
    mulCalc(num1 = 0, num2 = 0, decimal) {
        const assistNum = 10 ** getTotalPrecision(num1, num2);
        const result = (String(num1).replace('.', '') * String(num2).replace('.', '')) / assistNum;
        return this.setNumberDecimal(result, decimal);
    },
    /**
     * @description 两数相除
     * @param {Number | String} num1 | num2 参与计算的数
     * @param {Number} decimal 计算精度，如果传递，则返回进行精度控制后的结果。
     */
    divCalc(num1 = 0, num2 = 1, decimal) {
        const maxPrecision = getMaxPrecision(num1, num2);
        const assistNum = 10 ** maxPrecision;
        const result = (this.mulCalc(num1, assistNum) / this.mulCalc(num2, assistNum));
        return this.setNumberDecimal(result, decimal);
    },
    /**
     * @description 字符串表达式四则运算
     * todos: 后续可以考虑支持小括号
     * @param {Array|String} expQueue 运算表达式 ['1', '+', '2'] 或 '1 + 2'
     * @param {Number} decimal 计算精度
     *      计算精度如果传递，则每次计算都会进行精度控制（即会存在精度损失）。
     *      场景：涉及多重计算时，与后台保持一致
     */
    expCalc(expQueue, decimal) {
        const queue = preExpCalc(expQueue);
        /**
         * 利用 栈 进行表达式求值 https://www.cnblogs.com/lulipro/p/7450886.html
         * 通过将中缀表达式装换为后缀表达式，便不再需要分界符 '(' ')'，同时运算符的优先级也会比较清晰
         * 逆波兰算法 1. 转换为后缀表达式  2. 依据特殊计算规则  eg. 2 * (3 + 4) => 2 (3 4 +) *
         */
        // 将计算队列转换成 逆波兰表达式队列
        const convert = (queue = []) => {
            const numberStack = [];
            const operatorStack = [];

            const isAddOrSub = (item) => (item === '+' || item === '-');

            queue.forEach((item) => {
                // 操作数直接进入队列
                if (!OPERATORS.includes(item)) {
                    numberStack.push(item);
                    return;
                }

                // 如果操作符栈为空，或当前操作符为 '(' 左分界符时，直接压入栈中
                while (true) {
                    if (operatorStack.length === 0 || item === '(') {
                        operatorStack.push(item);
                        break;
                    }

                    const lastOperator = operatorStack.pop();

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
                        operatorStack.push(lastOperator, item);
                        break;
                    }

                    // '+' '-' 操作符的优先级最低
                    if (isAddOrSub(item) && !isAddOrSub(lastOperator)) {
                        numberStack.push(lastOperator);
                        continue;
                    }

                    operatorStack.push(lastOperator, item);
                    break;
                }
            });

            while (operatorStack.length) {
                const lastOperator = operatorStack.pop();

                if (lastOperator !== '(') {
                    numberStack.push(lastOperator);
                }
            }

            return numberStack;
        };
        // 计算处理逆波兰表达式队列
        const calculate = (polishArr = []) => {
            const operators = ['+', '-', '*', '/'];
            const result = [];
            polishArr.forEach((item) => {
                if (!OPERATORS.includes(item)) {
                    return result.push(item)
                }

                const num1 = result.pop();
                const num2 = result.pop();
                switch(item) {
                    case '+':
                        result.push(this.addCalc(num1, num2, decimal));
                        break;
                    case '-':
                        result.push(this.subCalc(num1, num2, decimal));
                        break;
                    case '*':
                        result.push(this.mulCalc(num1, num2, decimal));
                        break;
                    case '/':
                        result.push(this.divCalc(num1, num2, decimal));
                        break;
                }
            });
            return result.pop();
        };
        return calculate(convert(queue));
    }
};
