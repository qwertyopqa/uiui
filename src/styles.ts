import base from './styles.module.scss';

type iStyle = any;
type styleBook = {
  [key: string]: iStyle;
};
//
const styles: styleBook = {};
export namespace Styles {
  export const of = (name: string): iStyle => {
    return styles[name];
  };
  export const register = (name: string, style: iStyle) => {
    styles[name] = style;
    if (typeof style === 'object') {
      Object.keys(style).forEach((key) => {
        register(`${name}.${key}`, style[key]);
      });
    }
  };
  export const concat = (classes: string, style: string) => {
    return `${classes} ${of(style)}`;
  };
}
//
const themes: styleBook = {
  base: base.uiUiBaseTheme,
};
export namespace Theme {
  export const of = (name: string): iStyle => {
    return themes[name];
  };
  export const register = (name: string, style: iStyle) => {
    themes[name] = style;
  };
}
