import React from 'react';
import { Styles } from '../styles';
import { Config } from '../config';
import sliderStyles from './Slider.module.scss';
Styles.register('Slider', sliderStyles);
function pcent(s, v) {
    var a = v - s[0];
    var b = s[1] - s[0];
    return "".concat((a / b) * 100, "%");
}
export function UiUiSlider(_a) {
    var o = _a.o, onChange = _a.onChange;
    var thumbRef = React.useRef(null);
    var _b = React.useState(o.value[0]), value = _b[0], setValue = _b[1];
    var _c = React.useState([0, 1, 0.01]), props = _c[0], setProps = _c[1];
    function prop(i) {
        return props[i] ? props[i] : 0;
    }
    React.useEffect(function () {
        var _a;
        var s = o.settings;
        var v = o.value[0];
        setProps(s);
        setValue(v);
        (_a = thumbRef.current) === null || _a === void 0 ? void 0 : _a.style.setProperty('--width', pcent(s, v));
    }, [o]);
    function beforeOnChange(e) {
        var _a;
        var v = Number(e.target.value);
        o.value[0] = v;
        setValue(v);
        (_a = thumbRef.current) === null || _a === void 0 ? void 0 : _a.style.setProperty('--width', pcent(props, v));
        if (onChange)
            onChange(o);
    }
    var styles = Styles.of('Slider');
    return (React.createElement("div", { className: styles.uiSlider },
        React.createElement("label", { htmlFor: o.label }, o.label),
        React.createElement("div", { ref: thumbRef, className: styles.uiSliderThumbReplacement }),
        React.createElement("div", { className: styles.uiSliderValue }, value),
        React.createElement("input", { type: "range", name: o.label, min: prop(0), max: prop(1), step: prop(2), value: value, onChange: beforeOnChange })));
}
Config.register(UiUiSlider, 'slider', function (o, onChange) {
    var obj = o;
    var s = o.settings;
    obj.type = 'slider';
    obj.settings = Array.isArray(s)
        ? s
        : [s.min, s.max, s.step];
    obj.value = Array.isArray(o.value) ? o.value : [o.value];
    return React.createElement(UiUiSlider, { key: obj.label, o: obj, onChange: onChange });
});
//# sourceMappingURL=Slider.js.map