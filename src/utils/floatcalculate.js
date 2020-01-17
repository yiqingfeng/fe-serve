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
};
