/// <reference types="react" />
import { RootElem } from './RootElem';
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
import { Styles as ST } from './styles';
import { UiUiCanvas } from './utils/Canvas';
export declare namespace UiUi {
    const Root: typeof RootElem;
    const Canvas: typeof UiUiCanvas;
    export import Config = CFG;
    export import Styles = ST;
    namespace Types {
        type THREE_NUMBERS = TypeUtils.THREE_NUMBERS;
        type SIX_NUMBERS = TypeUtils.SIX_NUMBERS;
    }
    namespace Lib {
        const enable: (e: ((a: {
            o: any;
            onChange?: ((o: any) => void) | undefined;
        }) => JSX.Element) | ((a: {
            o: any;
            onChange?: ((o: any) => void) | undefined;
        }) => JSX.Element)[]) => void;
        const Group: typeof UiUiGroup;
        const Panel: typeof UiUiPanel;
        const Slider: typeof UiUiSlider;
        const Knob: typeof UiUiKnob;
        const ColorRamp: typeof UiUiColorRamp;
        const Point: typeof UiUiPoint;
        const Sine: typeof UiUiSine;
        const Select: typeof UiUiSelect;
    }
}
//# sourceMappingURL=index.d.ts.map