import { Library } from './Library';

export namespace Config {
  type Elem = Library.Element.Config;
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
    opts: Library.Element.BuilderOpts
  ): JSX.Element[] => {
    return (!Array.isArray(els) ? [els] : els)
      .map((e: Elem) =>
        Library.has(e.type) ? Library.build(e.type, e, opts) : null
      )
      .filter((e) => e !== null) as JSX.Element[];
  };
}
