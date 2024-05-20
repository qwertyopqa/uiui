import { useContext } from 'react';
import { RootElem } from './elements/Root';
import { UiUiCanvas } from './elements/Canvas';
import { UiUiGroup } from './elements/Group';
import { UiUiLabel } from './elements/Label';
import { XY as XYns } from './elements/utils/XY';
import { Library } from './Library';
import { T as Types } from './utils/t';
import { ThemeContext } from './themes/ThemeContext';
import { Styles as ST, Theme as TH } from './Styles';
import { Config } from './Config';

export namespace UiUi {
  export import T = Types;
  export const El = {
    Root: RootElem,
    Canvas: UiUiCanvas,
    Label: UiUiLabel,
    Group: UiUiGroup,
    XY: XYns.Pad,
    XYHandle: XYns.Handle,
    XYCanvas: XYns.Canvas.Bckgd,
  };
  export import XY = XYns;
  /* eslint-disable no-unused-vars */
  export import Lib = Library;
  export import Styles = ST;
  export import Theme = TH;
  export function useTheme() {
    return useContext(ThemeContext);
  }
  /* eslint-enable */
  export import Element = Lib.Element.build;
  export import ElementBaseConfig = Lib.Element.Base;
  //
  export import renderConfig = Config.render;
}

type iUiUi = typeof UiUi;
type UiUiBundle = Types.KVP<UiUi.Lib.Element.JSX>;
export const addBundle = <UU extends iUiUi, T extends UiUiBundle>(
  base: UU,
  bundle: T
) => {
  base.Lib.register(Object.values(bundle).filter((el) => el.uiui?.builder));
  const newEl = { ...base.El, ...bundle };
  (base.El as any) = newEl;
  return base as any as iUiUi & {
    El: typeof newEl;
  };
};
