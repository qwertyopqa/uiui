import React from 'react';
import styles from './UiUi.module.scss';
import { UiUiUtilLayer } from 'ui/utils/GlobalLayer';
import { Config } from './config';
export function RootElem(_a) {
    var data = _a.data;
    var _b = React.useState([]), rootElems = _b[0], setRootElems = _b[1];
    React.useEffect(function () {
        if (data === null)
            return;
        var pdata = Array.isArray(data) ? data : Config.process(data);
        setRootElems(Config.render(pdata));
    }, [data]);
    return (React.createElement("div", { className: styles.uiUiRoot },
        React.createElement(UiUiUtilLayer, null),
        rootElems));
}
//# sourceMappingURL=RootElem.js.map