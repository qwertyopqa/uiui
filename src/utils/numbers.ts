export type TWO_NUMBERS = [number, number];
export type THREE_NUMBERS = [number, number, number];
export type SIX_NUMBERS = [number, number, number, number, number, number];

export const decimalsCount = (n: number) => {
  if (Math.floor(n) === n) return 0;
  return n.toString().split('.')[1].length || 0;
};

export const fixDigits = (n: number, d: number): number => {
  return (n.toFixed(d) as any) * 1;
};
export const fixDigitsLike = (n: number, ref: number): number => {
  return fixDigits(n, decimalsCount(ref));
};

export const limit = (n: number, min: number = 0, max: number = 1): number => {
  return Math.min(Math.max(n, min), max);
};

export class StepCtrl {
  static fromArray(a: THREE_NUMBERS) {
    return new StepCtrl(a[0], a[1], a[2]);
  }

  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly range: number;
  protected stepDigits: number;
  constructor(min: number, max: number, step: number) {
    this.min = min;
    this.max = max;
    this.step = step;
    this.range = max - min;
    this.stepDigits = decimalsCount(step);
  }

  filter(v: number) {
    v = limit(v, this.min, this.max);
    let adj = v % this.step;
    adj = this.step - Math.abs(adj) < 0.000000001 ? 0 : adj;
    return fixDigits(v - adj, this.stepDigits);
  }

  normalize(v: number) {
    v = this.filter(v);
    return fixDigits((v - this.min) / this.range, this.stepDigits);
  }

  denormalize(v: number) {
    v = this.range * limit(v) + this.min;
    v = this.filter(v);
    return fixDigits(v, this.stepDigits);
  }
}
