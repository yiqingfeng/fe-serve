import utils from '../../src/utils'

describe('utils 浮点数计算', () => {
    test('设置精度 setNumberDecimal', () => {
        expect(utils.setNumberDecimal()).toEqual(0);
        expect(utils.setNumberDecimal(null)).toEqual(0);
        expect(utils.setNumberDecimal(271395.225)).toEqual(271395.225);
        expect(utils.setNumberDecimal('271395.225')).toEqual(271395.225);
        expect(utils.setNumberDecimal(undefined, 2)).toEqual('0.00');
        expect(utils.setNumberDecimal(null, 2)).toEqual('0.00');
        expect(utils.setNumberDecimal(271395.225, 2)).toEqual('271395.23');
        expect(utils.setNumberDecimal('271395.225', 2)).toEqual('271395.23');
    });
    test('加法 addCalc', () => {
        expect(utils.addCalc(6.225, 0.1)).toEqual(6.325);
        expect(utils.addCalc(6.225, 0.1, 2)).toEqual('6.33');
        expect(utils.addCalc(6.225)).toEqual(6.225);
        expect(utils.addCalc(6.225, undefined, 2)).toEqual('6.23');
        expect(utils.addCalc(6.225, null)).toEqual(6.225);
        expect(utils.addCalc(6.225, null, 2)).toEqual('6.23');
        expect(utils.addCalc(undefined, 6.225)).toEqual(6.225);
        expect(utils.addCalc(undefined, 6.225, 2)).toEqual('6.23');
        expect(utils.addCalc(null)).toEqual(0);
        expect(utils.addCalc(null, undefined, 2)).toEqual('0.00');
    });
    test('减法 subCalc', () => {
        expect(utils.subCalc(6.225, 0.2)).toEqual(6.025);
        expect(utils.subCalc(6.225, 0.2, 2)).toEqual('6.03');
        expect(utils.subCalc(6.225)).toEqual(6.225);
        expect(utils.subCalc(6.225, undefined, 2)).toEqual('6.23');
        expect(utils.subCalc(6.225, null)).toEqual(6.225);
        expect(utils.subCalc(6.225, null, 2)).toEqual('6.23');
        expect(utils.subCalc(undefined, 6.225)).toEqual(-6.225);
        expect(utils.subCalc(undefined, 6.225, 2)).toEqual('-6.22');
        expect(utils.subCalc(null)).toEqual(0);
        expect(utils.subCalc(null, undefined, 2)).toEqual('0.00');
    });
    test('乘法 mulCalc', () => {
        expect(utils.mulCalc(0.4, 0.2)).toEqual(0.08);
        expect(utils.mulCalc(0.4, 0.2, 1)).toEqual('0.1');
        expect(utils.mulCalc(0.4)).toEqual(0);
        expect(utils.mulCalc(0.4, null)).toEqual(0);
        expect(utils.mulCalc(0.4, undefined, 2)).toEqual('0.00');
        expect(utils.mulCalc(0.4, null, 2)).toEqual('0.00');
        expect(utils.mulCalc(null)).toEqual(0);
    });
    test('除法 divCalc', () => {
        expect(utils.divCalc(0.6, 0.1)).toEqual(6);
        expect(utils.divCalc(0.6, 0.1, 2)).toEqual('6.00');
        expect(utils.divCalc(0.6, 0)).toEqual(Infinity);
        expect(utils.divCalc(0.6, 0, 2)).toEqual('Infinity');
        expect(utils.divCalc(0.6)).toEqual(0.6);
        expect(utils.divCalc(null, null)).toEqual(0);
        expect(utils.divCalc(null, 0)).toEqual(0);
    });
    test('四则运算 expCalc', () => {
        expect(utils.expCalc('6.225 - 0.2')).toEqual(6.025);
        expect(utils.expCalc('(6.225 - 0.2) / 0.1')).toEqual(60.25);
        expect(utils.expCalc('(6.225 - 0.2) / 0.1', 1)).toEqual('60.0');
        expect(utils.expCalc([
            '(', 6.225, '-', '0.2', ')', '/', '0.1',
        ])).toEqual(60.25);
        expect(utils.expCalc([
            '(', 6.225, '-', '0.2', ')', '/', '0.1',
        ], 1)).toEqual('60.0');
    });
})
