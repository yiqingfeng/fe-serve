import floatcalculate from '../src/floatcalculate';

describe('floatcalculate 浮点数计算', () => {
    test('设置精度 setNumberDecimal', () => {
        expect(floatcalculate.setNumberDecimal()).toEqual(0);
        expect(floatcalculate.setNumberDecimal(null)).toEqual(0);
        expect(floatcalculate.setNumberDecimal(271395.225)).toEqual(271395.225);
        expect(floatcalculate.setNumberDecimal('271395.225')).toEqual(271395.225);
        expect(floatcalculate.setNumberDecimal(undefined, 2)).toEqual('0.00');
        expect(floatcalculate.setNumberDecimal(null, 2)).toEqual('0.00');
        expect(floatcalculate.setNumberDecimal(271395.225, 2)).toEqual('271395.23');
        expect(floatcalculate.setNumberDecimal('271395.225', 2)).toEqual('271395.23');
    });
    test('加法 addCalc', () => {
        expect(floatcalculate.addCalc(6.225, 0.1)).toEqual(6.325);
        expect(floatcalculate.addCalc(6.225, 0.1, 2)).toEqual('6.33');
        expect(floatcalculate.addCalc(6.225)).toEqual(6.225);
        expect(floatcalculate.addCalc(6.225, undefined, 2)).toEqual('6.23');
        expect(floatcalculate.addCalc(6.225, null)).toEqual(6.225);
        expect(floatcalculate.addCalc(6.225, null, 2)).toEqual('6.23');
        expect(floatcalculate.addCalc(undefined, 6.225)).toEqual(6.225);
        expect(floatcalculate.addCalc(undefined, 6.225, 2)).toEqual('6.23');
        expect(floatcalculate.addCalc(null)).toEqual(0);
        expect(floatcalculate.addCalc(null, undefined, 2)).toEqual('0.00');
    });
    test('减法 subCalc', () => {
        expect(floatcalculate.subCalc(6.225, 0.2)).toEqual(6.025);
        expect(floatcalculate.subCalc(6.225, 0.2, 2)).toEqual('6.03');
        expect(floatcalculate.subCalc(6.225)).toEqual(6.225);
        expect(floatcalculate.subCalc(6.225, undefined, 2)).toEqual('6.23');
        expect(floatcalculate.subCalc(6.225, null)).toEqual(6.225);
        expect(floatcalculate.subCalc(6.225, null, 2)).toEqual('6.23');
        expect(floatcalculate.subCalc(undefined, 6.225)).toEqual(-6.225);
        expect(floatcalculate.subCalc(undefined, 6.225, 2)).toEqual('-6.22');
        expect(floatcalculate.subCalc(null)).toEqual(0);
        expect(floatcalculate.subCalc(null, undefined, 2)).toEqual('0.00');
    });
    test('乘法 mulCalc', () => {
        expect(floatcalculate.mulCalc(0.4, 0.2)).toEqual(0.08);
        expect(floatcalculate.mulCalc(0.4, 0.2, 1)).toEqual('0.1');
        expect(floatcalculate.mulCalc(0.4)).toEqual(0);
        expect(floatcalculate.mulCalc(0.4, null)).toEqual(0);
        expect(floatcalculate.mulCalc(0.4, undefined, 2)).toEqual('0.00');
        expect(floatcalculate.mulCalc(0.4, null, 2)).toEqual('0.00');
        expect(floatcalculate.mulCalc(null)).toEqual(0);
    });
    test('除法 divCalc', () => {
        expect(floatcalculate.divCalc(0.6, 0.1)).toEqual(6);
        expect(floatcalculate.divCalc(0.6, 0.1, 2)).toEqual('6.00');
        expect(floatcalculate.divCalc(0.6, 0)).toEqual(Infinity);
        expect(floatcalculate.divCalc(0.6, 0, 2)).toEqual('Infinity');
        expect(floatcalculate.divCalc(0.6)).toEqual(0.6);
        expect(floatcalculate.divCalc(null, null)).toEqual(0);
        expect(floatcalculate.divCalc(null, 0)).toEqual(0);
    });
    test('四则运算 expCalc', () => {
        expect(floatcalculate.expCalc('0.6 / 0.1')).toEqual(6);
        expect(floatcalculate.expCalc('-6.225 - 0.2 + 0.1 * 0.2 - 0.02')).toEqual(-6.425);
        expect(floatcalculate.expCalc('-6.225 - 0.2 + 0.1 * 0.2 - 0.02')).toEqual(-6.425);
        expect(floatcalculate.expCalc('(6.225 - 0.2) / 0.1')).toEqual(60.25);
        expect(floatcalculate.expCalc('(6.225 - 0.2) / 0.1', 1)).toEqual('60.0');
        expect(floatcalculate.expCalc([
            '(', 6.225, '-', '0.2', ')', '/', '0.1',
        ])).toEqual(60.25);
        expect(floatcalculate.expCalc([
            '(', 6.225, '-', '0.2', ')', '/', '0.1',
        ], 1)).toEqual('60.0');
    });
})
