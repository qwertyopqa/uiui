type ConstructorArgs<PROPS extends UiUiLib.Props<any>> = {
  o: PROPS['Main'];
  onChange?: (o: PROPS['Main']) => void;
};
type ElemConstructor<PROPS extends UiUiLib.Props<any>> = (
  a: ConstructorArgs<PROPS>
) => JSX.Element;

type ElemBuilderOpts<PROPS extends UiUiLib.Props<any>> = {
  onChange?: (o: PROPS['Main']) => void;
  isRoot?: boolean;
  [key: string]: any;
};

type ElemBuilder<PROPS extends UiUiLib.Props<any>> = (
  Tag: ElemConstructor<PROPS>,
  mixedConfig: PROPS['Mix'],
  opts: ElemBuilderOpts<PROPS>
) => JSX.Element;

type Mix<A, B> = {
  [K in keyof A]: K extends keyof B ? A[K] | B[K] : A[K];
};

type ElemRegistry = {
  [key: string]: UiUiLib.JSX<any>;
};

export const els: ElemRegistry = {};

export namespace UiUiLib {
  export type Props<A = {}, B = {}> = {
    Args: {
      o: A;
      onChange?: (o: A) => void;
    };
    Main: A;
    Alt: B;
    Mix: Mix<A, B>;
  };

  export type JSX<PROPS extends Props<any> = any> = ((
    args: ConstructorArgs<PROPS>
  ) => JSX.Element) & {
    uiui: Info<PROPS>;
  };

  export type Info<PROPS extends Props<any>> = {
    id: string;
    tag: string;
    styles: any;
    builder: ElemBuilder<PROPS>;
  };

  export function El<PROPS extends Props<any>>(
    jsx: (props: PROPS['Args']) => JSX.Element,
    info: Info<PROPS>
  ): UiUiLib.JSX<PROPS> {
    const el = jsx as any as UiUiLib.JSX<PROPS>;
    el.uiui = info;
    console.log(el);
    return el;
  }

  export function register<PROPS extends Props<any>>(
    elOrEls: UiUiLib.JSX<PROPS>[] | UiUiLib.JSX<PROPS>
  ) {
    if (!Array.isArray(elOrEls)) return register([elOrEls]);
    elOrEls.forEach((el) => {
      els[el.uiui.id] = el;
      console.log(`Registered ${el.uiui.id}`);
    });
  }

  export const has = (key: string) => els[key] !== undefined;

  export const build = <PROPS extends Props<any>>(
    key: string,
    conf: PROPS['Mix'],
    opts: ElemBuilderOpts<any>
  ) => {
    const o = els[key];
    return o.uiui.builder(o, conf, opts);
  };
}
