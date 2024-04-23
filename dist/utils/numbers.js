export var decimalsCount = function (n) {
    if (Math.floor(n) === n)
        return 0;
    return n.toString().split('.')[1].length || 0;
};
export var fixDigits = function (n, d) {
    return n.toFixed(d) * 1;
};
export var fixDigitsLike = function (n, ref) {
    return fixDigits(n, decimalsCount(ref));
};
export var limit = function (n, min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 1; }
    return Math.min(Math.max(n, min), max);
};
var StepCtrl = /** @class */ (function () {
    function StepCtrl(min, max, step) {
        this.min = min;
        this.max = max;
        this.step = step;
        this.range = max - min;
        this.stepDigits = decimalsCount(step);
    }
    StepCtrl.fromArray = function (a) {
        return new StepCtrl(a[0], a[1], a[2]);
    };
    StepCtrl.prototype.filter = function (v) {
        v = limit(v, this.min, this.max);
        var adj = v % this.step;
        adj = this.step - Math.abs(adj) < 0.000000001 ? 0 : adj;
        return fixDigits(v - adj, this.stepDigits);
    };
    StepCtrl.prototype.normalize = function (v) {
        v = this.filter(v);
        return fixDigits((v - this.min) / this.range, this.stepDigits);
    };
    StepCtrl.prototype.denormalize = function (v) {
        v = this.range * limit(v) + this.min;
        v = this.filter(v);
        return fixDigits(v, this.stepDigits);
    };
    return StepCtrl;
}());
export { StepCtrl };
//# sourceMappingURL=numbers.js.map