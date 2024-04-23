export type TWO_NUMBERS = [number, number];
export type THREE_NUMBERS = [number, number, number];
export type SIX_NUMBERS = [number, number, number, number, number, number];
export declare const decimalsCount: (n: number) => number;
export declare const fixDigits: (n: number, d: number) => number;
export declare const fixDigitsLike: (n: number, ref: number) => number;
export declare const limit: (n: number, min?: number, max?: number) => number;
export declare class StepCtrl {
    static fromArray(a: THREE_NUMBERS): StepCtrl;
    readonly min: number;
    readonly max: number;
    readonly step: number;
    readonly range: number;
    protected stepDigits: number;
    constructor(min: number, max: number, step: number);
    filter(v: number): number;
    normalize(v: number): number;
    denormalize(v: number): number;
}
//# sourceMappingURL=numbers.d.ts.map