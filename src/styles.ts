import BaseTheme from './themes/UiUiBaseTheme.module.scss';

type iStyle = any;
type styleBook = {
  [key: string]: iStyle;
};
//
const styles: styleBook = {};
const vars: styleBook = {};
export namespace Styles {
  export const of = (name: string): iStyle => {
    return styles[name];
  };
  export const register = (name: string, style: iStyle) => {
    styles[name] = style;
    if (typeof style === 'object') {
      Object.keys(style).forEach((key) => {
        if (key === 'vars') {
          vars[name] = style[key];
        } else {
          register(`${name}.${key}`, style[key]);
        }
      });
    }
  };
  export const concat = (classes: string, style: string) => {
    return `${classes} ${of(style)}`;
  };
}
//
type nsDict = { [key: string]: string };
type iTheme = {
  name: string;
  getStyle(name: string): iStyle | undefined;
  getVars(): string[];
  ns(ns: string): nsDict;
};

function ThemeNs(theme: Theme.i, ns: string) {
  return new Proxy<nsDict>(
    {},
    {
      get: (target, prop) =>
        typeof prop !== 'string' ? '' : theme.getStyle(`${ns}.${prop}`) || '',
    }
  );
}
export class Theme implements iTheme {
  _styles: styleBook = {};
  _vars: iStyle = {};
  constructor(readonly name: string, styleslist: styleBook = {}) {
    if (typeof styleslist !== 'object') {
      throw new Error('Theme Styles must be an object');
    }
    Object.keys(styleslist).forEach((key: string) => {
      if (key === 'vars') {
        this._vars = styleslist[key];
      } else {
        const v = styleslist[key];
        if (typeof v === 'object') {
          Object.keys(v).forEach((k: string) => {
            this._styles[`${key}.${k}`] = v[k];
          });
        } else {
          this._styles[key] = styleslist[key];
        }
      }
    });
  }

  getStyle(name: string): iStyle {
    return this._styles[name] ?? Styles.of(name);
  }

  getVars(): string[] {
    return [...Object.keys(vars).map((key) => vars[key]), this._vars];
  }

  ns(ns: string): nsDict {
    return ThemeNs(this, ns);
  }
}

const themes: styleBook = {
  base: new Theme('base'),
};
Styles.register('baseTheme', BaseTheme);

export namespace Theme {
  export type i = iTheme;
  export const withName = (name: string): Theme => {
    return themes[name] ?? themes.base;
  };
  export const register = (name: string, overrides: styleBook) => {
    if (themes[name]) {
      throw new Error(`Theme ${name} already exists`);
    }
    themes[name] = new Theme(name, overrides);
  };
  export const List = () => ({ ...themes });
}
