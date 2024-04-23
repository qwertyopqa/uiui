import React from 'react';
import styles from './Group.module.scss';
export function UiUiGroup(_a) {
    var children = _a.children, flow = _a.flow;
    return (React.createElement("div", { className: styles.uiGroup, "data-flow": flow !== null && flow !== void 0 ? flow : 'col' }, children));
}
//# sourceMappingURL=Group.js.map