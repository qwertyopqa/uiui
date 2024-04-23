var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from 'react';
import styles from './Point.module.scss';
import { Config } from '../config';
import { UiUiSlider } from './Slider';
import { UiUiGroup } from './Group';
import { XY } from './utils/XY';
export function UiUiPoint(_a) {
    var o = _a.o, onChange = _a.onChange;
    var _b = React.useState(o.value), value = _b[0], setValue = _b[1];
    var _c = React.useState(o.settings), properties = _c[0], setProperties = _c[1];
    var stepCtrls = XY.Step.getCtrlsFromArray(o.settings);
    React.useEffect(function () {
        setValue(o.value);
        setProperties(o.settings);
    }, [o]);
    function onSliderUpdate(obj) {
        o.value['xy'.indexOf(obj.label)] = obj.value[0];
        setValue(__spreadArray([], o.value, true));
        if (onChange)
            onChange(o);
    }
    function onHandleUpdate(k, v) {
        o.value[0] = v[0];
        o.value[1] = v[1];
        setValue(__spreadArray([], o.value, true));
        if (onChange)
            onChange(o);
    }
    function elO(i) {
        var k = 'xy'[i];
        return {
            label: k,
            value: [value[i]],
            settings: properties[k],
        };
    }
    return (React.createElement("div", { rel: "panel", className: styles.wrapper },
        React.createElement("label", null,
            o.label,
            React.createElement("span", null, "\u00A0")),
        React.createElement(UiUiGroup, null,
            React.createElement(XY.Pad, { className: styles.xy },
                React.createElement(XY.Handle, { value: value, stepCtrls: stepCtrls, onChange: onHandleUpdate })),
            React.createElement(UiUiSlider, { o: elO(0), onChange: onSliderUpdate }),
            React.createElement(UiUiSlider, { o: elO(1), onChange: onSliderUpdate })),
        React.createElement("input", { type: "hidden", name: o.label, value: value.toString() })));
}
Config.register(UiUiPoint, 'point', function (o, onChange) {
    var obj = o;
    obj.type = 'point';
    obj.settings = XY.processSettings(o.settings);
    return React.createElement(UiUiPoint, { key: o.label, o: obj, onChange: onChange });
});
//# sourceMappingURL=Point.js.map