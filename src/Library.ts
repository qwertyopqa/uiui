import { Styles } from './Styles';
import { Element as El } from './Element';
import { T } from './utils/t';

const _db: T.KVP<El.JSX<any>> = {};

export namespace Library {
  export import Element = El;

  export function register<PROPS extends El.Props<any>>(
    elOrEls: El.JSX<PROPS>[] | El.JSX<PROPS>
  ) {
    if (!Array.isArray(elOrEls)) return register([elOrEls]);
    elOrEls.forEach((el) => {
      _db[el.uiui.id] = el;
      if (el.uiui.styles) Styles.register(el.uiui.tag, el.uiui.styles);
    });
  }

  export const has = (key: string) => _db[key] !== undefined;

  export const build = <PROPS extends El.Props<any>>(
    key: string,
    conf: PROPS['Mix'],
    opts: El.BuilderOpts
  ) => {
    const o = _db[key];
    return o.uiui.builder(o, conf, conf, opts);
  };
}
