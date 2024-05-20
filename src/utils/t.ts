export namespace T {
  export type KVP<VT> = { [key: string]: VT };
  export type N1 = [number];
  export type N2 = [number, number];
  export type N3 = [number, number, number];
  export type N4 = [number, number, number, number];
  export type N5 = [number, number, number, number, number];
  export type N6 = [number, number, number, number, number, number];
  //
  export type S1 = [string];
  export type S2 = [string, string];
  export type S3 = [string, string, string];
  export type S4 = [string, string, string, string];
  export type S5 = [string, string, string, string, string];
  export type S6 = [string, string, string, string, string, string];
  //
  export type N = number;
  //
  export type SETnVAL<SETTINGS = any, VALUE = any> = {
    settings: SETTINGS;
    value: VALUE;
  };
  export type justSET<SETTINGS> = {
    settings: SETTINGS;
  };
  export type justVAL<VALUE> = {
    value: VALUE;
  };
}
