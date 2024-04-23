import { Str } from './str';
import { Var } from './var';
export declare namespace Struct {
    namespace Prop {
        type I = {
            name: string;
            type: string;
            pos: Str.Range;
            size: number;
            uiui?: string;
        };
        type List = Prop.I[];
    }
    type I = {
        name: string;
        content: {
            value: string;
            pos: Str.Range;
        };
        pos: Str.Range;
        properties: Struct.Prop.List;
        uiui?: string;
    };
    type List = Struct.I[];
    const parseDefinition: (code: string) => List;
    const withName: (list: List, name: string) => I;
    const parseValue: (code: string, type: string, varname: string, structs: List) => Var.I;
    const parseDeclarations: (code: string, struct: Struct.I, structs: List) => Var.List;
}
//# sourceMappingURL=struct.d.ts.map