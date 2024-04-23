type ConstructorArgs<O> = {
  o: O;
  onChange?: (o: O) => void;
};
type ElemConstructor<O = any> = (a: ConstructorArgs<O>) => JSX.Element;
type ElemBuilder = (a: any, onChange?: (o: any) => void) => JSX.Element;

type ElemRegistryEntry<O> = {
  cfgKey: string;
  elem: ElemConstructor<O>;
  builder: ElemBuilder;
  enabled: boolean;
};
type ElemRegistry = {
  [key: string]: ElemRegistryEntry<any>;
};

const registry: ElemRegistry = {};

export namespace Config {
  export type Obj<T, S, V> = {
    type?: T;
    label: string;
    settings: S;
    value: V;
  };
  export type Args<O> = {
    o: O;
    onChange?: (o: O) => void;
  };
  export type Alt<A, B> = {
    [K in keyof A]: K extends keyof B ? A[K] | B[K] : A[K];
  };
  export type AltArgs<A, B> = Args<Alt<A, B>>;
  export type Elem = {
    type: string;
    label: string;
    settings: any;
    value: any;
  };
  export type Json = Elem[];
  export type ProcessorInfo = {
    elements: {
      [key: string]: {
        type: string;
        label: string;
        args: any;
      };
    };
    panels: {
      [key: string]: {
        label: string;
        orientation: string;
        children: string[];
      };
    };
    source: string;
  };
  export function register<O>(
    e: ElemConstructor<O>,
    k: string,
    b: ElemBuilder
  ) {
    registry[e.name] = {
      cfgKey: k,
      elem: e,
      builder: b,
      enabled: false,
    };
    return registry;
  }
  export const enable = (e: ElemConstructor | ElemConstructor[]) => {
    if (!Array.isArray(e)) e = [e];
    e.map((c) => {
      registry[c.name].enabled = true;
      return c;
    });
  };
  const withElemType = (t: string): ElemRegistryEntry<any> => {
    let name = '';
    Object.keys(registry).map((key) => {
      if (registry[key].cfgKey === t) {
        name = key;
      }
      return key;
    });
    return registry[name];
  };
  export const process = (data: ProcessorInfo): Json => {
    const tmp: {
      [key: string]: Elem & { cn: string[]; r: boolean };
    } = {};
    Object.keys(data.panels).map((key) => {
      const p = data.panels[key];
      tmp[key] = {
        type: 'panel',
        label: p.label,
        settings: {
          flow: p.orientation === 'V' ? 'vertical' : 'horizontal',
        },
        value: [],
        cn: p.children,
        r: true,
      };
      return key;
    });
    Object.keys(tmp).map((key) => {
      const p = tmp[key];
      p.cn.map((k) => {
        if (tmp[k]) {
          p.value.push(tmp[k]);
          tmp[k].r = false;
        } else if (data.elements[k]) {
          const e = data.elements[k] as any;
          e.settings = e.args;
          p.value.push(e);
        }
        return k;
      });
      return key;
    });
    const ret: Json = [];
    Object.keys(tmp).map((key) => {
      return tmp[key].r ? ret.push(tmp[key]) : 0;
    });
    return ret;
  };
  export const render = (
    els: Elem | Elem[],
    onChange?: (o: any) => void
  ): JSX.Element[] => {
    if (!Array.isArray(els)) {
      els = [els];
    }
    const ret: JSX.Element[] = [];
    els.map((e: Elem) => {
      const reg = withElemType(e.type);
      if (reg && reg.enabled) {
        const build = reg.builder(e, onChange);
        ret.push(build);
      }
      return e;
    });
    return ret;
  };
}
