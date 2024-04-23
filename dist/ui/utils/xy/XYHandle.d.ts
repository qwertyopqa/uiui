import React from 'react';
import { XYStepCtrls } from './types';
import { TWO_NUMBERS } from '../../../utils/numbers';
type Options = {
    id: string;
    label: string;
    flipY: boolean;
    flipX: boolean;
};
type Args = {
    value: TWO_NUMBERS;
    stepCtrls: XYStepCtrls;
    onChange: (key: string, v: TWO_NUMBERS) => void;
    options?: Partial<Options>;
};
export declare function UiUiXYHandle({ value, stepCtrls, onChange, options }: Args): React.JSX.Element;
export {};
//# sourceMappingURL=XYHandle.d.ts.map