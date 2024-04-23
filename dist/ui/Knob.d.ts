import React from 'react';
import { Config } from '../config';
import { THREE_NUMBERS } from 'utils/numbers';
type Obj = {
    type?: 'knob';
    label: string;
    settings: THREE_NUMBERS;
    value: [number];
};
export declare function UiUiKnob({ o, onChange }: Config.Args<Obj>): React.JSX.Element;
export {};
//# sourceMappingURL=Knob.d.ts.map