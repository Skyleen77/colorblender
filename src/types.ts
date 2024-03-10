export type HexColor = string;

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface HsvColor {
  h: number;
  s: number;
  v: number;
}

export interface HwbColor {
  h: number;
  w: number;
  b: number;
}

export interface HcgColor {
  h: number;
  c: number;
  g: number;
}

export interface CmykColor {
  c: number;
  m: number;
  y: number;
  k: number;
}

export interface XyzColor {
  x: number;
  y: number;
  z: number;
}

export interface LabColor {
  l: number;
  a: number;
  b: number;
}

export interface LchColor {
  l: number;
  c: number;
  h: number;
}

export interface AppleColor {
  r: number;
  g: number;
  b: number;
}

export interface HsiColor {
  h: number;
  s: number;
  i: number;
}

export type GrayColor = number;

export type ColorObject = {
  name: string;
  hex: string;
};

type WithAlpha<O> = O & { a: number };
export type RgbaColor = WithAlpha<RgbColor>;
export type HslaColor = WithAlpha<HslColor>;
export type HsvaColor = WithAlpha<HsvColor>;
export type HsiaColor = WithAlpha<HsiColor>;
export type HwbaColor = WithAlpha<HwbColor>;
export type HcgaColor = WithAlpha<HcgColor>;
export type XyzaColor = WithAlpha<XyzColor>;
export type LabaColor = LabColor & { alpha: number };
export type LchaColor = WithAlpha<LchColor>;
export type CmykaColor = WithAlpha<CmykColor>;

export type ColorWithoutAlpha =
  | RgbColor
  | HslColor
  | HsvColor
  | HsiColor
  | HwbColor
  | HcgColor
  | XyzColor
  | LabColor
  | LchColor
  | CmykColor;

export type ColorWithAlpha =
  | RgbaColor
  | HslaColor
  | HsvaColor
  | HsiaColor
  | HwbaColor
  | HcgaColor
  | XyzaColor
  | LabaColor
  | LchaColor
  | CmykaColor;

export type AnyColor = HexColor | ColorWithoutAlpha | ColorWithAlpha;

export interface Converter {
  format: string[] | 'NAME' | 'KEYWORD';
  converter: (color: Omit<AnyColor, string>) => RgbColor;
}
