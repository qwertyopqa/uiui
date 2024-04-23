import React from 'react';
import RulerStyles from './Ruler.module.scss';
function normalize(s, v) {
    return (v - s[0]) / (s[1] - s[0]);
}
export function UiUiRuler(_a) {
    var value = _a.value, mms = _a.mms, _b = _a.scale, scale = _b === void 0 ? 1 : _b, _c = _a.show, show = _c === void 0 ? false : _c;
    /* eslint-disable no-unused-vars */
    var rulerRef = React.useRef(null);
    var _d = React.useState(show ? 'block' : 'none'), display = _d[0], setDisplay = _d[1];
    var _e = React.useState(value), val = _e[0], setVal = _e[1];
    var _f = React.useState(0), normalized = _f[0], setNormalized = _f[1];
    var _g = React.useState([0, 1, 0.01]), properties = _g[0], setProps = _g[1];
    /* eslint-enable no-unused-vars */
    React.useEffect(function () {
        var _a;
        setVal(value);
        setProps(mms);
        var n = normalize(mms, value);
        setNormalized(n);
        setDisplay(show ? 'block' : 'none');
        (_a = rulerRef.current) === null || _a === void 0 ? void 0 : _a.style.setProperty('--val', "".concat(n * 100, "%"));
    }, [value, mms, show]);
    return (React.createElement("div", { className: RulerStyles.rulerWrapper, ref: rulerRef, "data-show": display },
        React.createElement("div", { className: RulerStyles.ruler },
            React.createElement("div", { className: RulerStyles.rulerInner },
                React.createElement("div", { role: "unit", "data-u": "0" }),
                React.createElement("div", { role: "unit", "data-u": "0.25" }),
                React.createElement("div", { role: "unit", "data-u": "0.5" }),
                React.createElement("div", { role: "unit", "data-u": "0.75" }),
                React.createElement("div", { role: "unit", "data-u": "1" }))),
        React.createElement("div", { className: RulerStyles.rulerIndicator })));
}
//# sourceMappingURL=Ruler.js.map