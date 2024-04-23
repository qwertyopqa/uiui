import React from 'react';
import { GLSL } from 'glslcv';
export type UUCb = (us: GLSL.Uniform.Info[]) => void;
export type Opts = {
    autoPlay?: boolean;
    callbacks?: {
        refresh?: () => void;
    };
};
type Args = {
    fragShaderCode?: string;
    onUniformsUpdate?: UUCb;
    options?: Opts;
};
export declare function UiUiCanvasBckgd({ onUniformsUpdate, fragShaderCode, options, }: Args): React.JSX.Element;
export {};
//# sourceMappingURL=XYPadCanvasBackground.d.ts.map