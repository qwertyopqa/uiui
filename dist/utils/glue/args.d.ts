export declare namespace Args {
    enum TYPE {
        NUMBER = 0,
        ID = 1,
        FNCALL = 2,
        COMPLEX = 3
    }
    type I = {
        type: TYPE;
        value: string;
        keyword?: string;
    };
    const parse: (str: string) => I[];
}
//# sourceMappingURL=args.d.ts.map