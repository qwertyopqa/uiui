export namespace N {
  export const radToAngle = (a: number) => (a / (2 * Math.PI)) * 360;
  export const ev = (c: boolean) => (c ? 1 : 0);
}

export function V2(x: number | boolean, y: number | boolean | null = null) {
  x = typeof x === 'boolean' ? (x ? 1 : 0) : x;
  y = typeof y === 'boolean' ? (y ? 1 : 0) : y;
  y = y ?? x;
  return { x, y };
}
export type V2 = ReturnType<typeof V2>;
V2.add = (a: V2, b: V2) => V2(a.x + b.x, a.y + b.y);
V2.times = (a: V2, b: V2) => a.x * b.x + a.y * b.y;
V2.fromRad = (a: number, radius: number | V2 = 1) => {
  radius = typeof radius === 'number' ? V2(radius) : radius;
  return V2(radius.x * Math.cos(a), radius.y * Math.sin(a));
};
V2.str = (v: V2) => `${v.x} ${v.y}`;
export function M2(a: V2, b: V2) {
  return { a, b };
}
export type M2 = ReturnType<typeof M2>;
M2.times = (m: M2, c: V2) => V2(V2.times(m.a, c), V2.times(m.b, c));
M2.radToRot = (a: number) =>
  M2(V2(Math.cos(a), -Math.sin(a)), V2(Math.sin(a), Math.cos(a)));
