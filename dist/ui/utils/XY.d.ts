import { UiUiXYPad, getXYCtrlsFromArray } from './xy/XYPad';
import { UiUiXYHandle } from './xy/XYHandle';
import { UiUiCanvasBckgd, UUCb, Opts } from './xy/XYPadCanvasBackground';
import { XYStepCtrls, XYStepSettings } from './xy/types';
import { SIX_NUMBERS } from 'utils/numbers';
export declare namespace XY {
    const Pad: typeof UiUiXYPad;
    const Handle: typeof UiUiXYHandle;
    namespace Canvas {
        const Bckgd: typeof UiUiCanvasBckgd;
        type BckgdOptions = Opts;
        type Callback = UUCb;
    }
    const processSettings: (d: SIX_NUMBERS | XYStepSettings) => XYStepSettings;
    namespace Step {
        const getCtrlsFromArray: typeof getXYCtrlsFromArray;
        type Ctrls = XYStepCtrls;
        type Settings = XYStepSettings;
    }
}
//# sourceMappingURL=XY.d.ts.map