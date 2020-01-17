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
function preExpCalc(expQueue = []) {
    const operators = ['+', '-', '*', '/'];
    if (Array.isArray(expQueue)) {
        return expQueue.map((item) => {
            if (operators.indexOf(item) === -1) {
                return isNaN(+item) ? 0 : +item;
            }
            return item;
        });
    }

    const result = [];
    let temp = '';
    for(let i = 0, len = expQueue.length; i < len; i++) {
        if (operators.indexOf(expQueue[i]) === -1) {
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

export default {
    /**
     * @description 两数相加，未传值时默认为 0
     */
    addCalc(num1 = 0, num2 = 0) {
        const maxPrecision = getMaxPrecision(num1, num2);
        const assistNum = 10 ** maxPrecision;
        // 268.34 * 100 === 26833.999999999996
        return (this.mulCalc(num1, assistNum) + this.mulCalc(num2, assistNum)) / assistNum;
    },
    /**
     * @description 两数相减
     */
    subCalc(num1 = 0, num2 = 0) {
        return this.addCalc(num1, -Number(num2));
    },
    /**
     * @description 两数相乘
     */
    mulCalc(num1 = 0, num2 = 0) {
        const assistNum = 10 ** getTotalPrecision(num1, num2);
        return (String(num1).replace('.', '') * String(num2).replace('.', '')) / assistNum;
    },
    /**
     * @description 两数相除
     */
    divCalc(num1 = 0, num2 = 1) {
        const maxPrecision = getMaxPrecision(num1, num2);
        const assistNum = 10 ** maxPrecision;
        return (this.mulCalc(num1, assistNum) / this.mulCalc(num2, assistNum));
    },
    /**
     * @description 字符串表达式四则运算
     * @param {Array|String} expQueue 运算表达式 ['1', '+', '2'] 或 '1 + 2'
     * @param {Number} decimal 计算精度
     *      计算精度如果传递，则每次计算都会进行精度控制（即会存在精度损失）。
     *      场景：涉及多重计算时，与后台保持一致
     */
    expCalc(str, decimal) {
        const queue = preCalc(expQueue, decimal);
        // 计算权重
        const weight = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
        };
    }
};
