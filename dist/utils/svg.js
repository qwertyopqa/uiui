import { V2, M2, N } from './vec';
export function ellipse(c, r, aS, aD, phi) {
    if (phi === void 0) { phi = 0; }
    c = typeof c === 'number' ? V2(c) : c;
    r = typeof r === 'number' ? V2(r) : r;
    var rM = M2.radToRot(phi);
    var s = V2.add(c, M2.times(rM, V2.fromRad(aS, r)));
    var e = V2.add(c, M2.times(rM, V2.fromRad(aS + aD, r)));
    var a = V2(aD > Math.PI, aD > 0);
    //
    var fM = V2.str(s);
    var fA = "".concat(V2.str(r), " ").concat(N.radToAngle(phi), " ").concat(V2.str(a), " ").concat(V2.str(e));
    return "M ".concat(fM, " A ").concat(fA);
}
//# sourceMappingURL=svg.js.map