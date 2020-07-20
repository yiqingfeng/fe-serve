import * as core from '../src'

describe('test', () => {
    test('测试', () => {
        expect(core.test('Jack')).toEqual('hi Jack');
    })
})
