import { UiUiXYPad, getXYCtrlsFromArray } from './xy/XYPad';
import { UiUiXYHandle } from './xy/XYHandle';
import { UiUiCanvasBckgd, UUCb, Opts } from './xy/XYPadCanvasBackground';
import { XYStepCtrls, XYStepSettings } from './xy/types';
import { T } from 'utils/t';

export namespace XY {
  export const Pad = UiUiXYPad;
  export const Handle = UiUiXYHandle;
  export namespace Canvas {
    export const Bckgd = UiUiCanvasBckgd;
    export type BckgdOptions = Opts;
    export type Callback = UUCb;
  }
  export const processSettings = (d: T.N6 | XYStepSettings): XYStepSettings => {
    if (!Array.isArray(d)) return d;
    return {
      x: d.slice(0, 3) as T.N3,
      y: d.slice(3) as T.N3,
    };
  };

  export namespace Step {
    export const getCtrlsFromArray = getXYCtrlsFromArray;
    export type Ctrls = XYStepCtrls;
    export type Settings = XYStepSettings;
  }
}
