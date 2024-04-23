import React from 'react';
import { Config } from '../config';
type Obj = {
    type?: 'select';
    label: string;
    settings: {
        [key: string]: string;
    };
    value: [string];
};
export declare function UiUiSelect({ o, onChange }: Config.Args<Obj>): React.JSX.Element;
export {};
//# sourceMappingURL=Select.d.ts.map