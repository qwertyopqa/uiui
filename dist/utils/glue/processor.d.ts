import { Var } from './var';
type UiUiPanelCfg = {
    type: 'panel';
    label: string;
    settings: {
        flow: 'col' | 'row';
    };
    children?: string[];
    value: Var.UiUi[];
};
type Uniform = {
    type: string;
    name: string;
    size: number;
};
export declare function processGlslCode(raw: string): {
    uiui: UiUiPanelCfg[];
    code: string;
    uniforms: Uniform[];
};
export {};
//# sourceMappingURL=processor.d.ts.map