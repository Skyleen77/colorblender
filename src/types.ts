import type {
  CmykColor,
  HcgColor,
  HexColor,
  HsiColor,
  HslColor,
  HsvColor,
  HwbColor,
  LabColor,
  LchColor,
  RgbColor,
  XyzColor,
} from '@colorblender/converter';

type WithAlpha<O> = O & { a: number };
export type RgbaColor = WithAlpha<RgbColor>;
export type HslaColor = WithAlpha<HslColor>;
export type HsvaColor = WithAlpha<HsvColor>;
export type HsiaColor = WithAlpha<HsiColor>;
export type HwbaColor = WithAlpha<HwbColor>;
export type HcgaColor = WithAlpha<HcgColor>;
export type XyzaColor = WithAlpha<XyzColor>;
export type LabaColor = WithAlpha<LabColor>;
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
