import mainStyles from './styles.module.scss';
type iStyle = typeof mainStyles;
export declare namespace Styles {
    const of: (name: string) => iStyle;
    const register: (name: string, style: iStyle) => void;
}
export {};
//# sourceMappingURL=styles.d.ts.map