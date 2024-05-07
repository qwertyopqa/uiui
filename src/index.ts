import { RootElem } from './Root';
import { Config as CFG } from './config';
import { UiUiPanel } from './ui/Panel';
import { UiUiSlider } from './ui/Slider';
import { UiUiKnob } from './ui/Knob';
import { UiUiColorRamp } from './ui/ColorRamp';
import { UiUiPoint } from './ui/Point';
import { UiUiSine } from './ui/Sine';
import { UiUiSelect } from './ui/Select';
import type * as TypeUtils from './utils/numbers';
import { UiUiGroup } from './ui/Group';
import { Styles as ST, Theme as TH } from './styles';
import { UiUiCanvas } from './utils/Canvas';

CFG.enable([
  UiUiPanel,
  UiUiSlider,
  UiUiKnob,
  UiUiColorRamp,
  UiUiPoint,
  UiUiSine,
  UiUiSelect,
]);

export namespace UiUi {
  export const Root = RootElem;
  export const Canvas = UiUiCanvas;
  /* eslint-disable no-unused-vars */
  export import Config = CFG;
  export import Styles = ST;
  export import Theme = TH;
  /* eslint-enable */
  export namespace Types {
    export type THREE_NUMBERS = TypeUtils.THREE_NUMBERS;
    export type SIX_NUMBERS = TypeUtils.SIX_NUMBERS;
  }
  export namespace Lib {
    export const enable = CFG.enable;
    export const Group = UiUiGroup;
    export const Panel = UiUiPanel;
    export const Slider = UiUiSlider;
    export const Knob = UiUiKnob;
    export const ColorRamp = UiUiColorRamp;
    export const Point = UiUiPoint;
    export const Sine = UiUiSine;
    export const Select = UiUiSelect;
  }
}
