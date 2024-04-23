export declare namespace Str {
    type Pos = {
        row: number;
        off: number;
    };
    type Range = {
        s: Str.Pos;
        e: Str.Pos;
    };
    type Replacement = {
        start: number;
        end: number;
        text: string;
    };
    namespace Match {
        type List = {
            [key: string]: RegExp;
        };
        type ListRes = {
            res: RegExpExecArray;
            key: string;
        };
    }
    const Height: (code: string) => number;
    const HeightAt: (code: string, index: number) => number;
    const Splice: (str: string, start: number, len: number, replacement: string) => string;
    const replace: (str: string, i: Replacement) => string;
    const FirstMatch: (code: string, list: Match.List) => false | Match.ListRes;
    const ReplaceAllButNLs: (m: string) => string;
    const Location: (before: string, code: string, off?: Str.Pos) => Range;
    const isNumber: (c: string) => boolean;
    const splitArgs: (code: string) => string[];
    const whileMatches: (str: string, re: RegExp, cb: (m: RegExpExecArray) => void) => void;
}
//# sourceMappingURL=str.d.ts.map