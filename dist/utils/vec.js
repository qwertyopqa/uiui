export var N;
(function (N) {
    N.radToAngle = function (a) { return (a / (2 * Math.PI)) * 360; };
    N.ev = function (c) { return (c ? 1 : 0); };
})(N || (N = {}));
export function V2(x, y) {
    if (y === void 0) { y = null; }
    x = typeof x === 'boolean' ? (x ? 1 : 0) : x;
    y = typeof y === 'boolean' ? (y ? 1 : 0) : y;
    y = y !== null && y !== void 0 ? y : x;
    return { x: x, y: y };
}
V2.add = function (a, b) { return V2(a.x + b.x, a.y + b.y); };
V2.times = function (a, b) { return a.x * b.x + a.y * b.y; };
V2.fromRad = function (a, radius) {
    if (radius === void 0) { radius = 1; }
    radius = typeof radius === 'number' ? V2(radius) : radius;
    return V2(radius.x * Math.cos(a), radius.y * Math.sin(a));
};
V2.str = function (v) { return "".concat(v.x, " ").concat(v.y); };
export function M2(a, b) {
    return { a: a, b: b };
}
M2.times = function (m, c) { return V2(V2.times(m.a, c), V2.times(m.b, c)); };
M2.radToRot = function (a) {
    return M2(V2(Math.cos(a), -Math.sin(a)), V2(Math.sin(a), Math.cos(a)));
};
//# sourceMappingURL=vec.js.map