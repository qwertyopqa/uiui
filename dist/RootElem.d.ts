import React from 'react';
import { Config } from './config';
type Args = {
    data: Config.Json | Config.ProcessorInfo | null;
    defaultDock?: string;
    top?: Config.Json | Config.ProcessorInfo | null;
    bottom?: Config.Json | Config.ProcessorInfo | null;
};
export declare function RootElem({ data, top, bottom, defaultDock }: Args): React.JSX.Element;
export declare namespace RootElem {
    var withData: (data: Config.Json | Config.ProcessorInfo | null) => React.JSX.Element;
}
export {};
//# sourceMappingURL=RootElem.d.ts.map