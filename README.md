# fe-serve 前端工具库

> 收集一些常用的前端服务，避免重复造轮子。

## 目前支持的能力

- `floatcalculate` 浮点数计算相关：
    - 数字精度设置： `setNumberDecimal(num?: number | string | null, decimal ?: number): string | number`;
    - 两数相加： `addCalc(num1: number | string | null, num2: number | string | null, decimal?: number): string | number`;
    - 两数相减： `subCalc(num1: number | string | null, num2: number | string | null, decimal?: number): string | number`,
    - 两数相乘： `mulCalc(num1: number | string | null, num2: number | string | null, decimal?: number): string | number`,
    - 两数相除： `divCalc(num1: number | string | null, num2: number | string | null, decimal?: number): string | number`,
    - 表达式计算： `expCalc(expQueue: Array<number | string> | string, decimal?: number): number | string`,

> **注意：**
> 表达式计算方法 `expCalc` 如果传递计算精度，则每次计算都会进行精度控制（即会存在精度损失），这里主要是针对多重计算时，后台逐步计算过程存在精度缺失。【CPQ + 多单位】


- `EventBus` 发布订阅者
    - 支持多事件注册 `eventBus.$on(['a', 'b'], () => {})`
    - 支持父子事件 `eventBus.$emit('change:name') 会触发 'change' 和 'change:name' 事件`

```ts
interface EventBusClass {
    $on: (events: string | string[], fn: listener) => EventBusClass;
    $once: (event: string, fn: listener) => EventBusClass;
    $off: (events?: string | string[], fn?: listener) => EventBusClass;
    $emit: (events: string, ...args: any[]) => EventBusClass;
}
```


## 项目开发支持

目前项目使用 rollup 进行打包，支持 `common.js`、`ES module`、`UMD` 等形式。
