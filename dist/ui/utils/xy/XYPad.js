import React from 'react';
import styles from './styles.module.scss';
import { StepCtrl } from '../../../utils/numbers';
export function getXYCtrlsFromArray(s) {
    return {
        x: StepCtrl.fromArray(s.x),
        y: StepCtrl.fromArray(s.y),
    };
}
var grayBackground = React.createElement("div", { className: styles.defaultBackground });
export function UiUiXYPad(_a) {
    var children = _a.children, _b = _a.background, background = _b === void 0 ? grayBackground : _b;
    return (React.createElement("div", { className: styles.xy },
        React.createElement("div", { className: styles.backgroundWrapper }, background),
        React.createElement("div", { className: styles.handlesWrapper }, children)));
}
//# sourceMappingURL=XYPad.js.map