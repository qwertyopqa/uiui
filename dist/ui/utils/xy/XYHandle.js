var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import styles from './styles.module.scss';
import { getDragabbleArea, setElemPos } from '../../../utils/dom';
import { DragOnParentDelegate } from '../../../action/delegate';
function denorm(v, c, opts) {
    v[0] = c.x.denormalize(opts.flipX ? 1 - v[0] : v[0]);
    v[1] = c.y.denormalize(opts.flipY ? 1 - v[1] : v[1]);
    return v;
}
function norm(v, c, opts) {
    var r = [c.x.normalize(v[0]), c.y.normalize(v[1])];
    return [opts.flipX ? 1 - r[0] : r[0], opts.flipY ? 1 - r[1] : r[1]];
}
function updateDisplay(v, c, e, opts) {
    if (e === null)
        return;
    var avail = getDragabbleArea(e);
    var n = norm(v, c, opts);
    setElemPos(e, {
        x: n[0] * avail.w,
        y: n[1] * avail.h,
    });
}
function processOptions(o) {
    return __assign({ id: 'default', label: '', flipY: true, flipX: false }, (o || {}));
}
export function UiUiXYHandle(_a) {
    var value = _a.value, stepCtrls = _a.stepCtrls, onChange = _a.onChange, options = _a.options;
    var opts = processOptions(options);
    var xyHandleRef = React.useRef(null);
    React.useEffect(function () {
        updateDisplay(value, stepCtrls, xyHandleRef.current, opts);
    }, [value, opts, stepCtrls]);
    React.useEffect(function () {
        if (xyHandleRef.current === null)
            return;
        DragOnParentDelegate(xyHandleRef.current, {
            dontSetPos: true,
            all: function (_a) {
                var n = _a.normalized;
                var v = denorm([n.x, n.y], stepCtrls, opts);
                value[0] = v[0];
                value[1] = v[1];
                updateDisplay(value, stepCtrls, xyHandleRef.current, opts);
                if (onChange)
                    onChange(opts.id, value);
            },
        });
    }, [xyHandleRef, stepCtrls, value, onChange, opts]);
    return (React.createElement("div", { ref: xyHandleRef, className: styles.handle, "data-key": opts.id, role: "handle" }, opts.label));
}
//# sourceMappingURL=XYHandle.js.map