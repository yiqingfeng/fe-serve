/**
 * @description 本地开发登录模拟
 * @author nimo 2020-01-16
 */
import axios from 'axios';

/* eslint-disable indent */
export default function login(data = {}, config = {}) {
    return new Promise((resolve, reject) => {
        axios({
                method: 'post',
                url: '/FHH/EM0HXUL/Authorize/Login',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                params: {
                    _t: +new Date(),
                },
                data: {
                    ClientId: +new Date(),
                    EnterpriseAccount: data.ea,
                    ImgCode: '',
                    Password: data.password,
                    PersistenceHint: true,
                    UserAccount: data.account,
                },
                ...config,
            })
            .then((res) => {
                const resData = res.data;
                if (resData && resData.Value && resData.Value.EnterpriseId) {
                    resolve(resData);
                } else {
                    reject(resData);
                }
            })
            .catch((res) => {
                reject(res);
            });
    });
}
/* eslint-enable indent */
