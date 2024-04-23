import mainStyles from './styles.module.scss';

type iStyle = typeof mainStyles;
type styleBook = {
  [key: string]: iStyle;
};
const styles: styleBook = {
  main: mainStyles,
};

export namespace Styles {
  export const of = (name: string): iStyle => {
    return styles[name];
  };
  export const register = (name: string, style: iStyle) => {
    styles[name] = style;
  };
}
