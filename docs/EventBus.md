# EventBus
----

## 基本用法

```javascript
const EventBus = require('fs-serve/eventbus');

// 第一种，进行继承
class A extend EventBus {
    constructor() {
        super();
    }
    render() {
        this.$emit('render');
    }
}

// 第二种，作为发布订阅容器单独使用
const em = new EventBus();
em.$on(['change', 'cancel'], (item) => {
    // todo
});
em.$emit('change', {a: 1});
```


## 特性

- 支持全局或具体对象，发布/订阅。
- 支持父子事件


## 接口APIS

接口   | 格式                                                    | 备注
----  | ------------------------------------------------------  | ---
$on   | `$on(events: string \| Array<string>, fn: Function)`    | 注册自定义事件/事件列表
$once | `$once(events: string, fn: Function)`                   | 注册一次性自定义事件
$off  | `$off(events?: string \| Array<string>, fn?: Function)` | 移除自定义事件/事件列表
$emit | `$emit(events: string)`                                 | 触发自定义事件
