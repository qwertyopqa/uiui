import React from 'react';
import { Config } from '../config';
import { TWO_NUMBERS } from 'utils/numbers';
import { XY } from './utils/XY';
type Obj = {
    type?: 'sine';
    label: string;
    settings: XY.Step.Settings;
    value: TWO_NUMBERS;
};
type Args = Config.Args<Obj>;
export declare function UiUiSine({ o, onChange }: Args): React.JSX.Element;
export {};
//# sourceMappingURL=Sine.d.ts.map