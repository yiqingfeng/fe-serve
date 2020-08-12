/**
 * @description 子进程相关
 */
import cp from 'child_process';
import base from './base';

type CpOptions = cp.ExecSyncOptionsWithStringEncoding;

const {
    isWindows,
} = base;

/**
 * @description 执行指定命令
 */
function cpExec(cmd: string, opts?: CpOptions): resData<string>;
function cpExec(cmd: string, opts: CpOptions, isAsync: boolean): Promise<any> | resData<string>;
function cpExec(cmd: string, opts?: CpOptions, isAsync?: boolean): Promise<any> | resData<string> {
    const options: CpOptions = Object.assign({
        maxBuffer: 4 << 20,
    }, opts);
    if (!isWindows()) {
        options.shell = '/bin/bash';
    }
    // 异步处理
    if (isAsync) {
        return new Promise((resolve, reject) => {
            cp.exec(cmd, options, function (error, stdout, stderr) {
                if (error) {
                    return reject(error);
                }

                resolve(stdout.toString());
            });
        });
    }
    // 同步处理
    const res: resData<string> = {
        errCode: 0,
        data: '',
    };
    try {
        const data = cp.execSync(cmd, options);
        res.data = data.toString(); // 将 buffer 转换成 string
    } catch (error) {
        res.errCode = -1;
    }
    return res;
}

/**
 * @param cmd
 */
// export function cpSpawn(cmd: string) {

// }

export default {
    cpExec,
    // cpSpawn,
}
