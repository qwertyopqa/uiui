import { Str } from './str';

export namespace Comment {
  export type Types = 'L' | 'S' | 'M';
  export const L: Types = 'L';
  export const S: Types = 'S';
  export const M: Types = 'M';
  export type I = {
    type: string;
    pos: Str.Range;
    content: string;
    raw: string;
  };
  export type List = Comment.I[];
  export const process = (code: string) => {
    let res: ReturnType<typeof Str.FirstMatch>;
    const comments: List = [];
    const data = {
      L: /^\s*\/\/[/|\s]*(.*)$/m,
      S: /(?<=^[^\n]*\w.?[^\n]*)\/\/[/|\s]*(.*)$/m,
      M: /\/\*\**(.*?)\**\*\//ms,
    };
    while ((res = Str.FirstMatch(code, data))) {
      const m = res.res;
      comments.push({
        type: res.key,
        pos: Str.Location(code.substring(0, m.index), m[0]),
        content: m[1],
        raw: m[0],
      });
      code = Str.Splice(code, m.index, m[0].length, Str.ReplaceAllButNLs(m[0]));
    }
    return { comments, code };
  };
  type FindAdditional = (c: Comment.I) => boolean;
  export const find = (
    t: Comment.Types,
    l: Comment.List,
    st: number,
    en: number,
    additional?: FindAdditional
  ) => {
    const c = l.find((c: Comment.I) => {
      let is = c.type === t && c.pos.e.row >= st && c.pos.e.row <= en;
      if (is && additional) is = additional(c);
      return is;
    });
    return c ? c.content : false;
  };
  type findUtil = (
    l: Comment.List,
    st: number,
    en: number,
    additional?: FindAdditional
  ) => ReturnType<typeof find>;
  export const findL: findUtil = (l, st, en, additional?) =>
    find(Comment.L, l, st, en, additional);
  export const findS: findUtil = (l, st, en, additional?) =>
    find(Comment.S, l, st, en, additional);
  export const findM: findUtil = (l, st, en, additional?) =>
    find(Comment.M, l, st, en, additional);
  export const eachM = (cs: Comment.List, cb: (c: I) => void) =>
    cs.forEach((c) => c.type === Comment.M && cb(c));
}
