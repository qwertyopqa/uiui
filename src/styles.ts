import base from './themes/UiUiBaseTheme.module.scss';

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
  base: base.UiUiBaseTheme,
};
export namespace Theme {
  export const of = (name: string): iStyle => {
    return themes[name];
  };
  export const register = (
    name: string,
    styles: { [key: string]: iStyle },
    extend: string = 'base'
  ) => {
    if (themes[extend] === undefined) {
      throw new Error(`Theme ${extend} does not exist`);
    }
    themes[name] = { styles, extend };
  };
}
