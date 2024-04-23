import { Str } from './str';
import { Args } from './args';

export namespace Var {
  export namespace Type {
    export const isNumber = (t: string) =>
      ['float', 'int', 'uint'].indexOf(t) >= 0;
    export const isVec = (t: string) => ['vec2', 'vec3'].indexOf(t) >= 0;
    export const isBool = (t: string) => ['bool'].indexOf(t) >= 0;
    export const assert = (t: string): string => {
      if (!isNumber(t) && !isVec(t) && !isBool(t))
        throw new Error('Invalid type: ' + t);
      return isNumber(t)
        ? 'number'
        : Type.isVec(t)
        ? 'vec'
        : Type.isBool(t)
        ? 'bool'
        : 'never';
    };
  }
  export type UiUi = {
    id?: string;
    type: string;
    label: string;
    args?: string[];
    value: (UiUi | number)[] | number;
    settings?: { flow?: 'row' | 'col' } | number[];
    children?: string[];
  };
  export type UiUiList = { [key: string]: UiUi };

  export type I = {
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
  export type List = Var.I[];
  export type NamedList = { [key: string]: Var.I };
  export const find = (name: string, list: List) => {
    return list.find((v) => v.name === name);
  };
  export const parse = (code: string) => {
    const re =
      /\b(?<type>float|int|uint|vec2|vec3)[\s|\n]+(?<name>.*?)[\s|\n]*(\[(?<dim>\d+)\])?[\s|\n]*=[\s|\n]?(?<value>.*)[\s|\n]?;/g;
    let ex: RegExpExecArray | null;
    const vars: Var.List = [];
    while ((ex = re.exec(code))) {
      if (!ex.groups) throw new Error('oh no!!');
      const { type, name, value: _value, dim } = ex.groups;
      let value: string | Args.I[] = _value;
      if (['vec2', 'vec3'].indexOf(type) >= 0) {
        const size: number = +type.substring(3, 4);
        const vre = /\((.*)\)/.exec(_value);
        if (!vre) throw new Error('Unparsable Var');
        value = Args.parse(vre[1]);
        vars.push({
          name,
          type,
          size,
          value,
          subtype: 'vec',
          pos: Str.Location(code.substring(0, ex.index), ex[0]),
        });
      } else {
        const size: number = +(dim ?? '1');
        if (size > 1) {
          const vre = /\((.*)\)/.exec(_value);
          if (!vre) throw new Error('Unparsable Var');
          value = Args.parse(vre[1]);
        }
        vars.push({
          type,
          name,
          value,
          size,
          subtype: Type.assert(type),
          pos: Str.Location(code.substring(0, ex.index), ex[0]),
        });
      }
    }
    return vars;
  };
}
