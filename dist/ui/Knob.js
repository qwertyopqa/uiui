import React from 'react';
import { Config } from '../config';
import { ellipse } from '../utils/svg';
import KnobStyles from './Knob.module.scss';
import { UiUiRuler } from './Ruler';
function normalize(s, v) {
    return (v - s[0]) / (s[1] - s[0]);
}
export function UiUiKnob(_a) {
    var o = _a.o, onChange = _a.onChange;
    var _b = React.useState(false), rulerShow = _b[0], setRulerShow = _b[1];
    var _c = React.useState(o.value[0]), value = _c[0], setValue = _c[1];
    var _d = React.useState(0), normalized = _d[0], setNormalized = _d[1];
    var _e = React.useState([0, 1, 0.01]), properties = _e[0], setProps = _e[1];
    React.useEffect(function () {
        setValue(o.value[0]);
        setProps(o.settings);
        setNormalized(normalize(o.settings, o.value[0]));
    }, [o]);
    var updateWithNormalizedValue = function (p) {
        p = Math.max(0, Math.min(1, p));
        setNormalized(p);
        o.value[0] = p * (properties[1] - properties[0]) + properties[0];
        setValue(o.value[0]);
        if (onChange)
            onChange(o);
    };
    var mPos = false;
    var onMouseMove = function (e) {
        if (mPos === false) {
            return (mPos = { x: e.clientX, y: e.clientY });
        }
        var diff = (e.clientX - mPos.x) * 0.005 +
            Math.round((e.clientY - mPos.y) * 50) * -0.0001;
        updateWithNormalizedValue(normalized + diff);
    };
    var onMouseUp = function (e) {
        e.preventDefault();
        setRulerShow(false);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
    var onMouseDown = function (e) {
        e.preventDefault();
        setRulerShow(true);
        mPos = false;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };
    var r = Math.PI * 0.5;
    var full = Math.PI * 1.94;
    return (React.createElement("div", { className: KnobStyles.wrapper },
        React.createElement(UiUiRuler, { value: value, mms: properties, scale: 2, show: rulerShow }),
        React.createElement("svg", { width: "16", height: "14", onMouseDown: onMouseDown },
            React.createElement("path", { strokeWidth: "5.5", fill: "none", stroke: "#999", opacity: ".8", d: ellipse(8, 3.5, 0, full, r) }),
            React.createElement("path", { strokeWidth: "2.5", fill: "none", stroke: "#fff", d: ellipse(8, 3.2, 0, full * normalized, r) }))));
}
Config.register(UiUiKnob, 'knob', function (o, onChange) {
    var obj = o;
    var s = o.settings;
    obj.type = 'knob';
    obj.settings = Array.isArray(s)
        ? s
        : [s.min, s.max, s.step];
    obj.value = Array.isArray(o.value) ? o.value : [o.value];
    return React.createElement(UiUiKnob, { key: obj.label, o: obj, onChange: onChange });
});
//# sourceMappingURL=Knob.js.map