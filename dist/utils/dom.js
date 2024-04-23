export var getDragabbleArea = function (el, container) {
    if (!container) {
        container = el.parentElement;
    }
    var cB = container.getBoundingClientRect();
    var eB = el.getBoundingClientRect();
    return {
        w: cB.width - eB.width,
        h: cB.height - eB.height,
        eB: eB,
        cB: cB,
    };
};
export var setElemPos = function (el, pos) {
    el.style.left = "".concat(pos.x, "px");
    el.style.top = "".concat(pos.y, "px");
};
//# sourceMappingURL=dom.js.map