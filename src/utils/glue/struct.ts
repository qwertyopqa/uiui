import { Str } from './str';
import { Var } from './var';

export namespace Struct {
  export namespace Prop {
    export type I = {
      name: string;
      type: string;
      pos: Str.Range;
      size: number;
      uiui?: string;
    };
    export type List = Prop.I[];
  }
  export type I = {
    name: string;
    content: {
      value: string;
      pos: Str.Range;
    };
    pos: Str.Range;
    properties: Struct.Prop.List;
    uiui?: string;
  };
  export type List = Struct.I[];
  export const parseDefinition = (code: string) => {
    const sRe = /\b(struct\b[\s|\n]*(\w*)[\s|\n]*{)(.*?)}/gs;
    const spRe = /(\w*)[\s|\n]*(\w*)[\s|\n]*;/gs;
    const structs: Struct.List = [];
    let m: RegExpExecArray | null, p: RegExpExecArray | null;
    while ((m = sRe.exec(code)) && m[0].length > 0) {
      const pos = Str.Location(code.substring(0, m.index), m[0]);
      const struct: Struct.I = {
        name: m[2],
        content: {
          value: m[3],
          pos: Str.Location(m[1], m[3], pos.s),
        },
        pos,
        properties: [],
      };
      structs.push(struct);
      while ((p = spRe.exec(struct.content.value)) && p[0].length > 1) {
        const before = struct.content.value.substring(0, p.index);
        struct.properties.push({
          type: p[1],
          name: p[2],
          size: 1,
          pos: Str.Location(before, p[0], struct.content.pos.s),
        });
      }
    }
    return structs;
  };
  export const withName = (list: Struct.List, name: string) => {
    const s = list.find((s: Struct.I) => s.name === name);
    if (!s) throw new Error('Struct not found: ' + name);
    return s;
  };

  export const parseValue = (
    code: string,
    type: string,
    varname: string,
    structs: List
  ) => {
    const struct = withName(structs, type);
    const ctt = new RegExp(
      `^[\\s|\\n]*${struct.name}[\\s|\\n]*\\((.*)\\)`,
      'sm'
    );
    const cttEx = ctt.exec(code);
    if (!cttEx)
      throw new Error(`Error Parsing Struct content for: ${struct.name}`);
    const argsList = Str.splitArgs(cttEx[1]);
    const args: (string | Var.I)[] = [];
    struct.properties.forEach((p, i) => {
      const arg = argsList[i];
      if (!p.uiui || p.uiui.indexOf('@uiui') < 0) {
        args.push(arg);
        return;
      }
      const argVarName = `${varname}_${p.name}`;
      if (Var.Type.isNumber(p.type)) {
        if (Str.isNumber(arg)) {
          args.push({
            name: argVarName,
            value: arg,
            subtype: 'number',
            type: p.type,
            size: p.size,
            uiuiInstruction: p.uiui,
            pos: p.pos,
          });
        } else {
          args.push(arg);
        }
      } else if (Var.Type.isVec(p.type)) {
        args.push(arg);
      } else {
        const argRe = /^(\w*)\(.*\)$/.exec(arg);
        if (!argRe)
          throw new Error('Error Parsing Struct content for: ' + struct.name);
        const structVar = parseValue(arg, p.type, argVarName, structs);
        args.push(structVar);
      }
    });
    return {
      type: struct.name,
      subtype: 'struct',
      name: varname,
      value: code,
      args,
    } as Var.I;
  };

  export const parseDeclarations = (
    code: string,
    struct: Struct.I,
    structs: List
  ) => {
    const declarations: Var.List = [];
    const n = struct.name;
    const w = '[\\n|\\s]*';
    const re = new RegExp(
      '\\b' + n + '\\b' + w + '?(\\w*)' + w + '=(' + w + n + '\\(.*?\\);)',
      'gs'
    );
    let ex: RegExpExecArray | null;
    while ((ex = re.exec(code))) {
      const o = parseValue(ex[2], struct.name, ex[1], structs);
      o.pos = Str.Location(code.substring(0, ex.index), ex[0]);
      declarations.push(o);
    }
    return declarations;
  };
}
