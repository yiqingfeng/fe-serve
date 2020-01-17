/**
 * @description 请求处理 （实际使用中，可以对此作进一步的封装）
 * @author daiq 2020-01-16
 */
import axios from 'axios';
// import cookie from 'cookie';

export default function CreateInstance({ requestCb } = {}) {
    const instance = axios.create({
        timeout: 15000,
    });
    instance.defaults.headers.Accept = 'application/json';
    instance.interceptors.request.use((options) => {
        // fs_token
        // options.params = options.params || {};
        // options.params._fs_token = cookies['fs_token'];
        // options.cancelToken = new axios.CancelToken(function executor(cancel) {
        //     Object.keys(config).forEach(key => {
        //         const c = config[key];
        //         if (options.url === c.url) {
        //             cancels[key] = cancel;
        //         }
        //     });
        // });
        if (typeof requestCb === 'function') {
            requestCb(options);
        }
        return options;
    });
    instance.interceptors.response.use((res) => res.data);

    return instance;
}
