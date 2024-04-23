import { UiUiXYPad, getXYCtrlsFromArray } from './xy/XYPad';
import { UiUiXYHandle } from './xy/XYHandle';
import { UiUiCanvasBckgd } from './xy/XYPadCanvasBackground';
export var XY;
(function (XY) {
    XY.Pad = UiUiXYPad;
    XY.Handle = UiUiXYHandle;
    var Canvas;
    (function (Canvas) {
        Canvas.Bckgd = UiUiCanvasBckgd;
    })(Canvas = XY.Canvas || (XY.Canvas = {}));
    XY.processSettings = function (d) {
        if (!Array.isArray(d))
            return d;
        return {
            x: d.slice(0, 3),
            y: d.slice(3),
        };
    };
    var Step;
    (function (Step) {
        Step.getCtrlsFromArray = getXYCtrlsFromArray;
    })(Step = XY.Step || (XY.Step = {}));
})(XY || (XY = {}));
//# sourceMappingURL=XY.js.map