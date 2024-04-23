import { Str } from './str';
export declare namespace Comment {
    export type Types = 'L' | 'S' | 'M';
    export const L: Types;
    export const S: Types;
    export const M: Types;
    export type I = {
        type: string;
        pos: Str.Range;
        content: string;
        raw: string;
    };
    export type List = Comment.I[];
    export const process: (code: string) => {
        comments: List;
        code: string;
    };
    type FindAdditional = (c: Comment.I) => boolean;
    export const find: (t: Comment.Types, l: List, st: number, en: number, additional?: FindAdditional) => string | false;
    type findUtil = (l: Comment.List, st: number, en: number, additional?: FindAdditional) => ReturnType<typeof find>;
    export const findL: findUtil;
    export const findS: findUtil;
    export const findM: findUtil;
    export const eachM: (cs: List, cb: (c: I) => void) => void;
    export {};
}
//# sourceMappingURL=comment.d.ts.map