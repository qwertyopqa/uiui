import { V2, M2, N } from './vec';
export function ellipse(
  c: number | V2,
  r: number | V2,
  aS: number,
  aD: number,
  phi: number = 0
) {
  c = typeof c === 'number' ? V2(c) : c;
  r = typeof r === 'number' ? V2(r) : r;
  const rM = M2.radToRot(phi);
  const s: V2 = V2.add(c, M2.times(rM, V2.fromRad(aS, r)));
  const e: V2 = V2.add(c, M2.times(rM, V2.fromRad(aS + aD, r)));
  const a: V2 = V2(aD > Math.PI, aD > 0);
  //
  const fM = V2.str(s);
  const fA = `${V2.str(r)} ${N.radToAngle(phi)} ${V2.str(a)} ${V2.str(e)}`;
  return `M ${fM} A ${fA}`;
}
