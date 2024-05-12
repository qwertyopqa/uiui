import { useContext } from 'react';
import { Config as CFG } from './config';

import { RootElem } from './elements/Root';
import { UiUiCanvas } from './elements/Canvas';
import { UiUiLib } from './lib';
import type * as TypeUtils from './utils/numbers';
import { ThemeContext } from './themes/ThemeContext';
import { Styles as ST, Theme as TH } from './styles';

export namespace UiUi {
  export const Root = RootElem;
  export const Canvas = UiUiCanvas;
  /* eslint-disable no-unused-vars */
  export import Lib = UiUiLib;
  export import Config = CFG;
  export import Styles = ST;
  export import Theme = TH;
  export function useTheme() {
    return useContext(ThemeContext);
  }
  /* eslint-enable */
  export namespace Types {
    export type THREE_NUMBERS = TypeUtils.THREE_NUMBERS;
    export type SIX_NUMBERS = TypeUtils.SIX_NUMBERS;
  }
}
