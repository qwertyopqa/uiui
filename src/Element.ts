import { T } from 'utils/t';
type Mix<A, B> = {
  [K in keyof A]: K extends keyof B ? A[K] | B[K] : A[K];
};

export namespace Element {
  export type Base<ID, SETnVAL extends T.SETnVAL> = {
    type?: ID;
    label: string;
    settings: SETnVAL['settings'];
    value: SETnVAL['value'];
  };

  export type Config = {
    type: string;
    label: string;
    settings: any;
    value: any;
  };

  export type Props<
    MAIN extends Object = any,
    ALT extends Object = any,
    XARGS extends Object = {},
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

  type ConstructorArgs<PROPS extends Element.Props> = PROPS['Args'];

  type Constructor<PROPS extends Element.Props> = (
    a: ConstructorArgs<PROPS>
  ) => JSX.Element;

  type Info<PROPS extends Element.Props> = {
    id: string;
    tag: string;
    styles: any;
    builder: Element.Builder<PROPS>;
  };

  export type BuilderOpts = {
    onChange?: (o: any) => void;
    isRoot?: boolean;
    [key: string]: any;
  };

  export type Builder<PROPS extends Props> = (
    Tag: Constructor<PROPS>,
    mixedConfig: PROPS['Mix'],
    finalConfig: PROPS['Args']['o'],
    opts: BuilderOpts
  ) => JSX.Element;

  export function build<
    SETnVAL extends T.SETnVAL,
    ALT extends Object = {},
    XARGS extends Object = {},
    ID extends string = string,
    MAIN extends Base<ID, SETnVAL> = Base<ID, SETnVAL>,
    PROPS extends Props<MAIN, ALT, XARGS> = Props<MAIN, ALT, XARGS>,
    INFO extends Info<PROPS> = Info<PROPS>,
  >(
    id: ID,
    jsx: (props: PROPS['Args']) => JSX.Element,
    info: Omit<INFO, 'id' | 'tag'>
  ): JSX<PROPS> {
    const cInfo = Object.assign(info, { id, tag: id }) as any as INFO;
    const el = jsx as any as JSX<PROPS>;
    el.uiui = cInfo;
    return el;
  }
}
