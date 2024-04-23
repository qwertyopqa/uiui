import React from 'react';
type CodeOrUrl = {
    code: string;
    url?: undefined;
} | {
    url: string;
    code?: undefined;
};
type Args = CodeOrUrl & {
    postProcessData?: (data: any) => void;
};
export declare function UiUiCanvas({ code, url, postProcessData }: Args): React.JSX.Element;
export {};
//# sourceMappingURL=Canvas.d.ts.map