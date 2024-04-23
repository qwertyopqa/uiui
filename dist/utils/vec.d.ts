export declare namespace N {
    const radToAngle: (a: number) => number;
    const ev: (c: boolean) => 1 | 0;
}
export declare function V2(x: number | boolean, y?: number | boolean | null): {
    x: number;
    y: number;
};
export declare namespace V2 {
    var add: (a: {
        x: number;
        y: number;
    }, b: {
        x: number;
        y: number;
    }) => {
        x: number;
        y: number;
    };
    var times: (a: {
        x: number;
        y: number;
    }, b: {
        x: number;
        y: number;
    }) => number;
    var fromRad: (a: number, radius?: number | {
        x: number;
        y: number;
    }) => {
        x: number;
        y: number;
    };
    var str: (v: {
        x: number;
        y: number;
    }) => string;
}
export type V2 = ReturnType<typeof V2>;
export declare function M2(a: V2, b: V2): {
    a: {
        x: number;
        y: number;
    };
    b: {
        x: number;
        y: number;
    };
};
export declare namespace M2 {
    var times: (m: {
        a: {
            x: number;
            y: number;
        };
        b: {
            x: number;
            y: number;
        };
    }, c: {
        x: number;
        y: number;
    }) => {
        x: number;
        y: number;
    };
    var radToRot: (a: number) => {
        a: {
            x: number;
            y: number;
        };
        b: {
            x: number;
            y: number;
        };
    };
}
export type M2 = ReturnType<typeof M2>;
//# sourceMappingURL=vec.d.ts.map