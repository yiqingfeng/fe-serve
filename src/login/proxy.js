/**
 * @description 接口代理信息
 */
export default function proxy(target) {
    return {
        '/FHH/EM0HXUL/Authorize/Login': {
            target,
            changeOrigin: true,
            secure: false,
            // 将set-cookie的path都去掉
            cookieDomainRewrite: {
                '*': '',
            },
            // 去掉set-cookie的Secure
            onProxyRes: (proxyRes) => {
                const proxyheaders = proxyRes.headers;
                const cookies = proxyheaders['set-cookie'];
                if (cookies) {
                    const result = [];
                    cookies.forEach((cookie) => {
                        const c = cookie.replace('Secure', '');
                        result.push(c);
                    });
                    proxyheaders['set-cookie'] = result;
                }
            },
        },
    };
}
