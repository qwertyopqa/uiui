import React from 'react';
import { Config } from '../config';
import styles from './ColorRamp.module.scss';
import { XY } from './utils/XY';
var rampShaderCode = "#version 300 es\nprecision mediump float;\nfloat MPI2 = 6.2831853;\nout vec4 fragColor;\nuniform vec2 u_resolution;\nuniform float[6] c;\nvoid main(){\n  float x = gl_FragCoord.x/u_resolution.x;\n  vec3 cp = vec3(c[0],c[1],c[2]);\n  vec3 ci = vec3(c[3],c[4],c[5]);\n  vec3 c = (cos((x+(1.-cp))*MPI2)*.5+.5) * ci;\n  fragColor = vec4(c ,1.);\n}";
export function UiUiColorRamp(_a) {
    var o = _a.o, onChange = _a.onChange;
    var wrapperRef = React.useRef(null);
    var _b = React.useState(o.value), values = _b[0], setValues = _b[1];
    var defStepSet = [0, 1, 0.01];
    var stepCtrls = XY.Step.getCtrlsFromArray({ x: defStepSet, y: defStepSet });
    var options = {
        autoPlay: false,
    };
    function getV(id) {
        var i = 'rgb'.indexOf(id);
        if (i === -1)
            return [0, 0];
        return [values[i], values[i + 3]];
    }
    function setV(id, v) {
        var i = 'rgb'.indexOf(id);
        if (i === -1)
            return;
        values[i] = v[0];
        values[i + 3] = v[1];
        setValues(values);
    }
    function onUpdate(id, vs) {
        var _a;
        setV(id, vs);
        o.value = values;
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
    return (React.createElement("div", { ref: wrapperRef, className: styles.uiColorRamp },
        React.createElement(XY.Pad, { className: styles.cr_pad, background: React.createElement(XY.Canvas.Bckgd, { fragShaderCode: rampShaderCode, onUniformsUpdate: onUniformsUpdate, options: options }) },
            React.createElement(XY.Handle, { options: { id: 'r', label: 'R' }, value: getV('r'), stepCtrls: stepCtrls, onChange: onUpdate }),
            React.createElement(XY.Handle, { options: { id: 'g', label: 'G' }, value: getV('g'), stepCtrls: stepCtrls, onChange: onUpdate }),
            React.createElement(XY.Handle, { options: { id: 'b', label: 'B' }, value: getV('b'), stepCtrls: stepCtrls, onChange: onUpdate }))));
}
function boot(o, onChange) {
    return React.createElement(UiUiColorRamp, { key: o.label, o: o, onChange: onChange });
}
Config.register(UiUiColorRamp, 'color_ramp', boot);
//# sourceMappingURL=ColorRamp.js.map