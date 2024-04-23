export namespace Str {
  export type Pos = {
    row: number;
    off: number;
  };
  export type Range = {
    s: Str.Pos;
    e: Str.Pos;
  };
  export type Replacement = {
    start: number;
    end: number;
    text: string;
  };
  export namespace Match {
    export type List = {
      [key: string]: RegExp;
    };
    export type ListRes = {
      res: RegExpExecArray;
      key: string;
    };
  }
  export const Height = (code: string) => (code.match(/\n/g) || []).length;
  export const HeightAt = (code: string, index: number) =>
    Height(code.substring(0, index));
  export const Splice = (
    str: string,
    start: number,
    len: number,
    replacement: string
  ) => str.substring(0, start) + replacement + str.substring(start + len);
  export const replace = (str: string, i: Replacement): string => {
    return Str.Splice(str, i.start, i.end - i.start, i.text);
  };
  export const FirstMatch = (code: string, list: Match.List) => {
    let res: RegExpExecArray | null = null;
    let key: string = '';
    for (const k in list) {
      const m = list[k].exec(code);
      if (m && m.index >= 0 && (!res || m.index < res.index)) {
        res = m;
        key = k;
      }
    }
    return key !== '' ? ({ res, key } as Match.ListRes) : false;
  };
  export const ReplaceAllButNLs = (m: string) => m.replace(/[^\n]/g, ' ');
  export const Location = (
    before: string,
    code: string,
    off: Str.Pos = { off: 0, row: 0 }
  ) => {
    const bp = (o: number, r: number, st: Str.Pos) => ({
      off: o + st.off,
      row: r + st.row,
    });
    const s = bp(before.length, Str.Height(before), off);
    return { s, e: bp(code.length, Str.Height(code), s) } as Str.Range;
  };
  export const isNumber = (c: string) => /[^\d|.]/.exec(c) === null;
  export const splitArgs = (code: string) => {
    const args = code.replace(/[\s|\n]/g, '').split(',');
    const openPs = (c: string) => (c.match(/\(/g) || []).length;
    const closedPs = (c: string) => (c.match(/\)/g) || []).length;
    for (let i = 0; i < args.length; i++) {
      while (openPs(args[i]) > closedPs(args[i]) && i < args.length) {
        args[i] += ',' + args[i + 1];
        args.splice(i + 1, 1);
      }
    }
    return args;
  };
  export const whileMatches = (
    str: string,
    re: RegExp,
    cb: (m: RegExpExecArray) => void
  ) => {
    let m: RegExpExecArray | null;
    if (!re.global)
      throw new Error('WhileMatches can only be ran with global Regexes');
    while ((m = re.exec(str))) cb(m);
  };
}
