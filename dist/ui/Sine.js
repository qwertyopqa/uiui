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
import { Config } from '../config';
import styles from './Sine.module.scss';
import { XY } from './utils/XY';
var rampShaderCode = "#version 300 es\nprecision highp float;\nfloat MPI2 = 6.2831853;\nout vec4 fragColor;\nuniform vec2 u_resolution;\nuniform float[2] c;\nint yAt(int x, float hy){\n  float nx = float(x) / u_resolution.x;\n  float y = sin(nx * c[0] * MPI2) * c[1];\n  return int(y * hy + hy);\n}\nvoid main(){\n  float hy = u_resolution.y * .5;\n  int x = int(gl_FragCoord.x);\n  int y = int(gl_FragCoord.y);\n  int dy = yAt(x, hy);\n  int pdy = yAt(x-1, hy);\n  float d = min(dy, pdy) <= y && y <= max(dy, pdy) ? 1. : 0.;\n  fragColor = vec4(vec3(d),1.);\n}";
export function UiUiSine(_a) {
    var o = _a.o, onChange = _a.onChange;
    var wrapperRef = React.useRef(null);
    var _b = React.useState(o.value), values = _b[0], setValues = _b[1];
    var stepCtrls = XY.Step.getCtrlsFromArray(o.settings);
    var options = {
        autoPlay: false,
    };
    function onHandleUpdate(id, v) {
        var _a;
        o.value[0] = v[0];
        o.value[1] = v[1];
        setValues(__spreadArray([], o.value, true));
        if (onChange)
            onChange(o);
        if ((_a = options.callbacks) === null || _a === void 0 ? void 0 : _a.refresh)
            options.callbacks.refresh();
    }
    var onUniformsUpdate = function (us) {
        if (!values)
            return;
        us.map(function (u) {
            u.value = u.name === 'c' ? values : u.value;
            return u;
        });
    };
    var bckgd = (React.createElement(XY.Canvas.Bckgd, { fragShaderCode: rampShaderCode, onUniformsUpdate: onUniformsUpdate, options: options }));
    return (React.createElement("div", { ref: wrapperRef, className: styles.uiSine },
        React.createElement(XY.Pad, { background: bckgd },
            React.createElement(XY.Handle, { value: values, stepCtrls: stepCtrls, onChange: onHandleUpdate, options: { flipX: true } }))));
}
function boot(o, onChange) {
    function enforceSettings(s) {
        if (!Array.isArray(s))
            return s;
        return {
            x: s.slice(0, 3),
            y: s.slice(3),
        };
    }
    o.settings = enforceSettings(o.settings);
    return React.createElement(UiUiSine, { key: o.label, o: o, onChange: onChange });
}
Config.register(UiUiSine, 'sine', boot);
//# sourceMappingURL=Sine.js.map