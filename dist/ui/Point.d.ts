import React from 'react';
import { Config } from '../config';
import { XY } from './utils/XY';
import { TWO_NUMBERS } from 'utils/numbers';
type Obj = {
    type?: 'point';
    label: string;
    settings: XY.Step.Settings;
    value: TWO_NUMBERS;
};
type Args = Config.Args<Obj>;
export declare function UiUiPoint({ o, onChange }: Args): React.JSX.Element;
export {};
//# sourceMappingURL=Point.d.ts.map