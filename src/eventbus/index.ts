/**
 * @description 事件处理
 * @author nimo 2020-01-15
 * 支持多事件注册 on(['a', 'b'], () => {})
 * 支持父子事件 trigger('change:name') 会触发 'change' 和 'change:name' 事件
 */
type listener = (...args: any[]) => void;
interface EventMap {
    [propName: string]: listener[];
}

interface EventBusClass {
    $on: (events: string | string[], fn: listener) => EventBusClass;
    $once: (event: string, fn: listener) => EventBusClass;
    $off: (events?: string | string[], fn?: listener) => EventBusClass;
    $emit: (events: string, ...args: any[]) => EventBusClass;
}

export default class EventBus implements EventBusClass {
    protected _events: EventMap;

    constructor() {
        this._events = {};
    }

    /**
     * @description 注册自定义事件/事件列表
     * @param {events} {String | Array} 事件队列
     * @param {fn} 事件回调
     * @returns {this} 当前对象
     */
    $on(events: string | string[], fn: listener): EventBus {
        // 如果是多事件注册，则进行递归处理
        if (Array.isArray(events)) {
            events.forEach((item) => {
                this.$on(item, fn);
            });
        } else {
            (this._events[events] || (this._events[events] = [])).push(fn);
        }
        return this;
    }

    /**
     * @description 注册一次性自定义事件
     * @param {event} {String} 事件名称
     * @param {fn} 事件回调
     * @returns {this} 当前对象
     */
    $once(event: string, fn: listener): EventBus {
        const callback: listener = (...args) => {
            this.$off(event, callback);
            fn.apply(this, args);
        };
        return this.$on(event, callback);
    }

    /**
     * @description 移除自定义事件/事件列表
     * @param {events} {String | Array} 事件队列
     * @param {fn} 事件回调
     * -------------------------------------------------
     * 1. 未传参数时，默认移除所有事件
     * 2. 未传事件回调参数时，移除指定类型事件的所有监听
     * -------------------------------------------------
     * @returns {this} 当前对象
     */
    $off(events?: string | string[], fn?: listener): EventBus {
        if (!events) {
            this._events = {};
            return this;
        }

        // 如果是多事件移除，则进行递归处理
        if (Array.isArray(events)) {
            events.forEach((item) => {
                this.$off(item, fn);
            });
            return this;
        }

        const fns = this._events[events];
        if (!fns) {
            return this;
        }
        if (!fn) {
            delete this._events[events];
        } else {
            const index = fns.indexOf(fn);
            if (index > -1) {
                fns.splice(index, 1);
            }
            if (fns.length === 0) {
                delete this._events[events];
            }
        }

        return this;
    }

    /**
     * @description 触发自定义事件
     * @param {event} {String} 事件名称
     * @returns {this} 当前对象
     */
    $emit(event: string, ...args: any[]): EventBus {
        const fns = this._events[event];
        if (fns) {
            fns.forEach((fn) => {
                fn.apply(this, args);
            });
        }
        const arr = event.split(':');
        if (arr.length > 1) {
            this.$emit(arr[0], ...args);
        }
        return this;
    }
}
