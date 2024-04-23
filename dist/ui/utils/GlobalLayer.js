import * as React from 'react';
import styles from './GlobalLayer.module.scss';
var _singleton = null;
export var UtilLayer;
(function (UtilLayer) {
    function getSingleton() {
        return _singleton;
    }
    UtilLayer.getSingleton = getSingleton;
    function setRole(role) {
        if (_singleton === null)
            return;
        _singleton.setAttribute('role', role);
    }
    UtilLayer.setRole = setRole;
    function resetRole() {
        if (_singleton === null)
            return;
        _singleton.setAttribute('role', '');
    }
    UtilLayer.resetRole = resetRole;
})(UtilLayer || (UtilLayer = {}));
export function UiUiUtilLayer() {
    var ref = React.useRef(null);
    React.useEffect(function () {
        _singleton = ref.current;
    }, [ref]);
    return React.createElement("div", { ref: ref, className: styles.utilLayer });
}
//# sourceMappingURL=GlobalLayer.js.map