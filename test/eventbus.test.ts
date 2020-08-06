import EventBus from '../src/eventbus';

describe('EventBus 事件池', () => {
    const eventBus = new EventBus();
    const mockChange = jest.fn(x => `change ${x}`);
    const mockChangeName = jest.fn(x => `change name ${x}`);
    const mockOnce = jest.fn(x => x);
    test('监听事件 $on', () => {
        expect(eventBus.$on('change', mockChange)).toBe(eventBus);
        expect(eventBus).toEqual({
            _events: {
                change: [mockChange],
            },
        });
        expect(eventBus.$on(['change:name', 'cname'], mockChangeName)).toEqual({
            _events: {
                change: [mockChange],
                'change:name': [mockChangeName],
                'cname': [mockChangeName],
            },
        });
    });

    test('监听事件 $once', () => {
        expect(eventBus.$once('once', mockOnce)).toBe(eventBus);
    });

    test('触发事件 $emit', () => {
        expect(eventBus.$emit('change:name', 'Jack')).toBe(eventBus);
        expect(mockChangeName.mock.results[0].value).toBe('change name Jack');
        expect(mockChange.mock.results[0].value).toBe('change Jack');

        expect(eventBus.$emit('cname', 'Nemo')).toBe(eventBus);
        expect(mockChangeName.mock.calls.length).toBe(2);

        expect(eventBus.$emit('once', 'Jack')).toEqual({
            _events: {
                change: [mockChange],
                'change:name': [mockChangeName],
                'cname': [mockChangeName],
            },
        });
        expect(mockOnce.mock.results[0].value).toBe('Jack');
        expect(eventBus.$emit('once', 'Nemo')).toBe(eventBus);
        expect(mockChange.mock.calls.length).toBe(1);
    });

    test('解绑事件 $off', () => {
        expect(eventBus.$off(['change:name', 'once'], mockChangeName)).toEqual({
            _events: {
                change: [mockChange],
                'cname': [mockChangeName],
            },
        });
        expect(eventBus.$off('cname')).toEqual({
            _events: {
                change: [mockChange],
            },
        });

        expect(eventBus.$off()).toEqual({
            _events: {
            },
        });
    });
});
