import type {
  CmykColor,
  HcgColor,
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
export type HexaColor = string;

export type AnyColor =
  | HexaColor
  | RgbColor
  | RgbaColor
  | HslColor
  | HslaColor
  | HsvColor
  | HsvaColor
  | HsiColor
  | HsiaColor
  | HwbColor
  | HwbaColor
  | HcgColor
  | HcgaColor
  | XyzColor
  | XyzaColor
  | LabColor
  | LabaColor
  | LchColor
  | LchaColor
  | CmykColor
  | CmykaColor;
