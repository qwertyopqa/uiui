import { Str } from './str';

export namespace Args {
  type Item = {
    st: number;
    en: number;
    pending: Item[];
    args: ValidArg[];
  };
  type ValidArg = Item | string;
  /* eslint-disable no-unused-vars */
  export enum TYPE {
    NUMBER,
    ID,
    FNCALL,
    COMPLEX,
  }
  /* eslint-enable no-unused-vars */
  export type I = {
    type: TYPE;
    value: string;
    keyword?: string;
  };
  export const parse = (str: string) => {
    const ExpressionsRe = /(?<fn>[\w]*)[\s|n]*\((?<ctt>[^(|)]*)\)/;
    const expressions: I[] = [];
    const parseType = (str: string): I | number => {
      let nm: RegExpExecArray | null;
      if ((nm = /(?<fn>[\w]*)[\s|n]*\((?<ctt>[^(|)]*)\)/.exec(str))) {
        if (nm.groups)
          return { type: TYPE.FNCALL, value: str, keyword: nm.groups.fn };
        throw new Error("what' wrong...");
      }
      if (!/[^\d|\s|\n|.|-]/.exec(str)) {
        return { type: TYPE.NUMBER, value: str };
      }
      if ((nm = /^[\s|\n]*:\$:(?<id>\d*):\$:[\s|\n]*$/.exec(str))) {
        if (nm.groups) return parseInt(nm.groups.id);
        throw new Error("what' wrong here...");
      }
      if ((nm = /^[\s|\n]*(?<kw>[a-zA-Z_]\w*)[\s|\n]*$/.exec(str))) {
        if (nm.groups)
          return { type: TYPE.ID, value: str, keyword: nm.groups.kw };
        throw new Error("what' wrong here as well...");
      }
      return { type: TYPE.COMPLEX, value: str };
    };
    const replaceExp = (str: string): string => {
      const re = /:\$:(?<id>\d*):\$:/;
      let m: RegExpExecArray | null;
      while ((m = re.exec(str))) {
        if (m.groups) {
          const k = Number(m.groups.id);
          const rep = replaceExp(expressions[k].value);
          str = Str.Splice(str, m.index, m[0].length, rep);
        } else {
          throw new Error('no way...');
        }
      }
      return str;
    };
    let m: RegExpExecArray | null;
    while ((m = ExpressionsRe.exec(str))) {
      if (!m.groups) throw new Error('wtf');
      let expId = expressions.length;
      if (m.groups.fn) {
        expressions.push(parseType(m[0]) as I);
      } else {
        const tk = parseType(m.groups.ctt);
        if (typeof tk === 'object') {
          expressions.push(tk);
        } else {
          expId = tk;
        }
      }
      str = Str.Splice(str, m.index, m[0].length, `:$:${expId}:$:`);
    }
    const args = str.split(',').map((s) => {
      const parsed = parseType(s);
      const tk = typeof parsed === 'object' ? parsed : expressions[parsed];
      tk.value = replaceExp(tk.value);
      return tk;
    });
    return args;
  };
}
