import { Styles } from './styles';
type ConstructorArgs<PROPS extends UiUiLib.Props> = PROPS['Args'];
type ElemConstructor<PROPS extends UiUiLib.Props> = (
  a: ConstructorArgs<PROPS>
) => JSX.Element;

type ElemBuilderOpts = {
  onChange?: (o: any) => void;
  isRoot?: boolean;
  [key: string]: any;
};

type ElemBuilder<PROPS extends UiUiLib.Props> = (
  Tag: ElemConstructor<PROPS>,
  mixedConfig: PROPS['Mix'],
  finalConfig: PROPS['Args']['o'],
  opts: ElemBuilderOpts
) => JSX.Element;

type Mix<A, B> = {
  [K in keyof A]: K extends keyof B ? A[K] | B[K] : A[K];
};

type ElemRegistry = {
  [key: string]: UiUiLib.JSX<any>;
};

export const els: ElemRegistry = {};

export namespace UiUiLib {
  export type Props<
    MAIN extends Object = any,
    ALT extends Object = any,
    XARGS extends Object = {}
  > = {
    Args: {
      o: MAIN;
      onChange?: (o: any) => void;
    } & XARGS;
    Main: MAIN;
    Alt: ALT;
    Mix: Mix<MAIN, ALT>;
  };

  export type JSX<PROPS extends Props = Props> = ((
    args: ConstructorArgs<PROPS>
  ) => JSX.Element) & {
    uiui: Info<PROPS>;
  };

  export type Info<PROPS extends Props> = {
    id: string;
    tag: string;
    styles: any;
    builder: ElemBuilder<PROPS>;
  };

  export function El<PROPS extends Props>(
    jsx: (props: PROPS['Args']) => JSX.Element,
    info: Info<PROPS>
  ): UiUiLib.JSX<PROPS> {
    const el = jsx as any as UiUiLib.JSX<PROPS>;
    el.uiui = info;
    return el;
  }

  export function addElement<
    MAIN extends Object = {},
    ALT extends Object = {},
    XARGS extends Object = {},
    PROPS extends Props<MAIN, ALT, XARGS> = Props<MAIN, ALT, XARGS>,
    ID extends string = string,
    INFO extends Info<PROPS> = Info<PROPS>
  >(
    id: ID,
    jsx: (props: PROPS['Args']) => JSX.Element,
    info: Omit<INFO, 'id' | 'tag'>
  ): UiUiLib.JSX<PROPS> {
    const cInfo = Object.assign(info, { id, tag: id }) as any as INFO;
    return El<PROPS>(jsx, cInfo);
  }

  export function register<PROPS extends Props<any>>(
    elOrEls: UiUiLib.JSX<PROPS>[] | UiUiLib.JSX<PROPS>
  ) {
    if (!Array.isArray(elOrEls)) return register([elOrEls]);
    elOrEls.forEach((el) => {
      els[el.uiui.id] = el;
      if (el.uiui.styles) Styles.register(el.uiui.tag, el.uiui.styles);
    });
  }

  export const has = (key: string) => els[key] !== undefined;

  export const build = <PROPS extends Props<any>>(
    key: string,
    conf: PROPS['Mix'],
    opts: ElemBuilderOpts
  ) => {
    const o = els[key];
    return o.uiui.builder(o, conf, conf, opts);
  };
}
