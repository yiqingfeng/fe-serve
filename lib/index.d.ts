import EventBus from './EventBus';
declare const _default: {
    EventBus: typeof EventBus;
    setNumberDecimal: {
        (num?: string | number | null | undefined): number;
        (num?: string | number | null | undefined, decimal?: number | undefined): string;
    };
    addCalc: {
        (num1?: string | number | null | undefined, num2?: string | number | null | undefined): number;
        (num1?: string | number | null | undefined, num2?: string | number | null | undefined, decimal?: number | undefined): string;
    };
    subCalc: {
        (num1?: string | number | null | undefined, num2?: string | number | null | undefined): number;
        (num1?: string | number | null | undefined, num2?: string | number | null | undefined, decimal?: number | undefined): string;
    };
    mulCalc: {
        (num1?: string | number | null | undefined, num2?: string | number | null | undefined): number;
        (num1?: string | number | null | undefined, num2?: string | number | null | undefined, decimal?: number | undefined): string;
    };
    divCalc: {
        (num1?: string | number | null | undefined, num2?: string | number | null | undefined): number;
        (num1?: string | number | null | undefined, num2?: string | number | null | undefined, decimal?: number | undefined): string;
    };
    expCalc: {
        (expQueue: string | (string | number | null | undefined)[]): number;
        (expQueue: string | (string | number | null | undefined)[], decimal: number): string;
    };
};
export default _default;
