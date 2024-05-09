import { Config as CFG } from './config';
import { UiUiLib } from './UiUiLib';
import { RootElem } from './elements/Root';
import { UiUiCanvas } from './elements/Canvas';
import type * as TypeUtils from './utils/numbers';

import { Styles as ST, Theme as TH } from './styles';

export namespace UiUi {
  export const Root = RootElem;
  export const Canvas = UiUiCanvas;
  export const Lib = UiUiLib;
  /* eslint-disable no-unused-vars */
  export import Config = CFG;
  export import Styles = ST;
  export import Theme = TH;
  /* eslint-enable */
  export namespace Types {
    export type THREE_NUMBERS = TypeUtils.THREE_NUMBERS;
    export type SIX_NUMBERS = TypeUtils.SIX_NUMBERS;
  }
}
