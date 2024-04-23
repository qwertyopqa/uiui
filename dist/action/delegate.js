import { setElemPos, getDragabbleArea } from '../utils/dom';
import { limit } from '../utils/numbers';
import { UtilLayer } from '../ui/utils/GlobalLayer';
function brInfo(el) {
    var _a = el.getBoundingClientRect(), t = _a.top, l = _a.left, b = _a.bottom, r = _a.right, w = _a.width, h = _a.height;
    return { t: t, l: l, b: b, r: r, w: w, h: h };
}
function getInfo(el, p) {
    var _a = brInfo(el), t = _a.t, l = _a.l, b = _a.b, r = _a.r, w = _a.w, h = _a.h;
    return Object.assign({ t: t, l: l, b: b, r: r, w: w, h: h }, {
        pos: { x: p.x - l, y: p.y - t },
        ori: p,
    });
}
export var DragDelegate = function (tgt, sets) {
    var process = function (el, ev, type) {
        ev.preventDefault();
        var info = getInfo(el, { x: ev.clientX, y: ev.clientY });
        if (sets[type])
            sets[type](info);
        if (sets.all)
            sets.all(info, type);
    };
    var onDrag = function (ev) {
        if (!sets.dragging && !sets.all)
            return;
        process(tgt, ev, 'dragging');
    };
    var onRelease = function (ev) {
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', onRelease);
        if (!sets.released && !sets.all)
            return;
        process(tgt, ev, 'released');
    };
    tgt.onmousedown = function (ev) {
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', onRelease);
        if (!sets.pressed && !sets.all)
            return;
        process(tgt, ev, 'pressed');
    };
};
export var DragOnParentDelegate = function (tgt, sets) {
    var parent = tgt.parentElement;
    DragDelegate(tgt, {
        all: function (info, type) {
            if (type === 'pressed') {
                UtilLayer.setRole('dragging');
            }
            else if (type === 'released') {
                UtilLayer.resetRole();
            }
            var s = { w: info.w, h: info.h };
            if (!sets.elementCenter) {
                sets.elementCenter = { x: s.w / 2, y: s.h / 2 }; // We're assumning the center of the obj is it's absolute center
            }
            var area = getDragabbleArea(tgt, parent);
            var pp = {
                x: info.ori.x - area.cB.left - sets.elementCenter.x,
                y: info.ori.y - area.cB.top - sets.elementCenter.y,
            };
            var nInfo = info;
            nInfo.normalized = {
                x: limit(pp.x / area.w),
                y: limit(pp.y / area.h),
            };
            nInfo.constrained = {
                x: nInfo.normalized.x * area.w,
                y: nInfo.normalized.y * area.h,
            };
            if (!sets.dontSetPos) {
                setElemPos(tgt, nInfo.constrained); // dunno ... should we delagate this at all?
            }
            if (sets[type])
                sets[type](nInfo);
            if (sets.all)
                sets.all(nInfo, type);
        },
    });
};
//# sourceMappingURL=delegate.js.map