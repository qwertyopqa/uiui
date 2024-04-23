import styles from './Panel.module.scss';
import React from 'react';
import { Config } from '../config';
import { UiUiGroup } from './Group';
export function UiUiPanel(_a) {
    var o = _a.o;
    var _b = React.useState([]), children = _b[0], setChildren = _b[1];
    React.useEffect(function () {
        setChildren(Config.render(o.value));
    }, [o]);
    return (React.createElement("div", { className: styles.uiPanel, rel: "panel" },
        React.createElement("label", null,
            o.label,
            React.createElement("span", null, "\u00A0")),
        React.createElement(UiUiGroup, { flow: o.settings.flow }, children)));
}
Config.register(UiUiPanel, 'panel', function (o) {
    var obj = o;
    obj.type = 'panel';
    if (obj.settings === undefined)
        obj.settings = { flow: 'row' };
    if (obj.settings.flow === undefined)
        obj.settings.flow = 'row';
    return React.createElement(UiUiPanel, { key: o.label, o: obj });
});
//# sourceMappingURL=Panel.js.map