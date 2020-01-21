/**
 * @description 请求处理
 */
import axios from 'axios';
import EventBus from '../utils/eventbus';

class Service extends EventBus {
    constructor(api) {
        super();
        this.apis = {};
        this.register();
    }
    /**
     * @description options 配置解析
     */
    parseOptions(options, data = {}) {
        let config;
        if (typeof options === 'string') {
            config = {
                url: options
            }
        } else {
            config = options;
        }
        if (config.method && config.method.toLowerCase() === 'get') {
            config.params = data;
        } else {
            config.data = data;
        }
    }
    /**
     * @description API 注册
     * @param apiMaps {Object} 接口配置
     */
    register(apiMaps = {}) {
        Object.keys(apiMaps)
            .forEach(key => {
                let options = apiMaps[key];
                if (typeof options === 'string') {
                    options = {
                        url: options,
                    };
                }
                this.apis[key] = (data, config) => {
                    this.fetch()
                };
            })
    }
    /**
     * @description 发起后台请求
     * @param {object} options 给服务端的请求参数，见：https://github.com/axios/axios
     */
    fetch(options, config = { showError: false, showLoading: false }) {
        const showLoading = config.showLoading
        if (config.showLoading) {

        }
        return axios(options)
            .then(res => {

            })
    }
    /**
     * @description 请求预处理
     */
    beforeRequestHandle() {

    }
    /**
     * @description
     */
    beforeResponseHandle() {

    }
    /**
     * @description 显示loading
     */
    showLoading(config) {
        this.trigger('loading:show')
    }
    /**
     * @description 隐藏loading
     */
    hideLoading() {

    }
}

export default Service;
