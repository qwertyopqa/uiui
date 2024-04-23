import { Str } from './str';
import { Args } from './args';
export declare namespace Var {
    namespace Type {
        const isNumber: (t: string) => boolean;
        const isVec: (t: string) => boolean;
        const isBool: (t: string) => boolean;
        const assert: (t: string) => string;
    }
    type UiUi = {
        id?: string;
        type: string;
        label: string;
        args?: string[];
        value: (UiUi | number)[] | number;
        settings?: {
            flow?: 'row' | 'col';
        } | number[];
        children?: string[];
    };
    type UiUiList = {
        [key: string]: UiUi;
    };
    type I = {
        type: string;
        subtype: string;
        name: string;
        size: number;
        value: string | Args.I[];
        pos: Str.Range;
        args?: any[];
        uiuiInstruction?: string;
        uiui?: UiUi;
        replacement?: string;
    };
    type List = Var.I[];
    type NamedList = {
        [key: string]: Var.I;
    };
    const find: (name: string, list: List) => I | undefined;
    const parse: (code: string) => List;
}
//# sourceMappingURL=var.d.ts.map