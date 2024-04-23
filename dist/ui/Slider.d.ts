import React from 'react';
import { Config } from '../config';
import type * as U from '../utils/numbers';
type Obj = {
    type?: 'slider';
    label: string;
    settings: U.THREE_NUMBERS;
    value: [number];
};
export declare function UiUiSlider({ o, onChange }: Config.Args<Obj>): React.JSX.Element;
export {};
//# sourceMappingURL=Slider.d.ts.map