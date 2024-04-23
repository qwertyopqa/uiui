/// <reference types="react" />
type ConstructorArgs<O> = {
    o: O;
    onChange?: (o: O) => void;
};
type ElemConstructor<O = any> = (a: ConstructorArgs<O>) => JSX.Element;
type ElemBuilder = (a: any, onChange?: (o: any) => void) => JSX.Element;
type ElemRegistryEntry<O> = {
    cfgKey: string;
    elem: ElemConstructor<O>;
    builder: ElemBuilder;
    enabled: boolean;
};
type ElemRegistry = {
    [key: string]: ElemRegistryEntry<any>;
};
export declare namespace Config {
    type Obj<T, S, V> = {
        type?: T;
        label: string;
        settings: S;
        value: V;
    };
    type Args<O> = {
        o: O;
        onChange?: (o: O) => void;
    };
    type Alt<A, B> = {
        [K in keyof A]: K extends keyof B ? A[K] | B[K] : A[K];
    };
    type AltArgs<A, B> = Args<Alt<A, B>>;
    type Elem = {
        type: string;
        label: string;
        settings: any;
        value: any;
    };
    type Json = Elem[];
    type ProcessorInfo = {
        elements: {
            [key: string]: {
                type: string;
                label: string;
                args: any;
            };
        };
        panels: {
            [key: string]: {
                label: string;
                orientation: string;
                children: string[];
            };
        };
        source: string;
    };
    function register<O>(e: ElemConstructor<O>, k: string, b: ElemBuilder): ElemRegistry;
    const enable: (e: ElemConstructor | ElemConstructor[]) => void;
    const process: (data: ProcessorInfo) => Json;
    const render: (els: Elem | Elem[], onChange?: (o: any) => void) => JSX.Element[];
}
export {};
//# sourceMappingURL=config.d.ts.map