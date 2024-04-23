import React from 'react';
import { Config } from '../config';
type Obj = Config.Obj<'panel', {
    flow: 'row' | 'col';
}, Config.Elem[]>;
export declare function UiUiPanel({ o, onChange }: Config.Args<Obj>): React.JSX.Element;
export {};
//# sourceMappingURL=Panel.d.ts.map