# 工具函数 utils
----

## 基本用法

```javascript
const { utils } = require('fs-serve');
utils.addCalc('1.3', '0.4');
```

> 实际使用时，可对 `utils` 进行继承拓展

```javascript
const { utils } = require('fs-serve');
const bUtils = {
    ...utils,
    // your methods
};
```


## 浮点数计算

> 浮点数相关计算，所有计算结果均会返回对应字符串。其中表达式计算方法 `expCalc`，目前仅支持加减乘除和小括号。

### APIS

接口   | 格式                                                    | 备注
-----  | ------------------------------------------------------  | ---
setNumberDecimal    | `setNumberDecimal(num: number \| string, decimal: number \| string)`                  | 设置数字的精度
addCalc             | `addCalc(num1: number \| string, num1: number \| string, decimal: number \| string)`  | 两数相加
subCalc             | `subCalc(num1: number \| string, num1: number \| string, decimal: number \| string)`  | 两数相减
mulCalc             | `mulCalc(num1: number \| string, num1: number \| string, decimal: number \| string)`  | 两数相乘
divCalc             | `divCalc(num1: number \| string, num1: number \| string, decimal: number \| string)`  | 两数相除
expCalc             | `expCalc(expQueue: Array<string> \| string, decimal: number \| string)`               | 表达式计算
