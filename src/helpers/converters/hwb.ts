import type { HwbColor, RgbColor } from '../../types';
import { roundColor } from '../utils';
import { rgbToHsl } from './hsl';

export const rgbToHwb = (rgb: RgbColor, rounded?: boolean): HwbColor => {
  const r = rgb.r;
  const g = rgb.g;
  let b = rgb.b;
  const h = rgbToHsl(rgb).h;
  const w = (1 / 255) * Math.min(r, Math.min(g, b));

  b = 1 - (1 / 255) * Math.max(r, Math.max(g, b));

  const hwb = { h, w: w * 100, b: b * 100 };

  return rounded ? roundColor(hwb) : hwb;
};

export const hwbToRgb = (hwb: HwbColor, rounded?: boolean): RgbColor => {
  const h = hwb.h / 360;
  let wh = hwb.w / 100;
  let bl = hwb.b / 100;
  const ratio = wh + bl;
  let f;

  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  const i = Math.floor(6 * h);
  const v = 1 - bl;
  f = 6 * h - i;

  if ((i & 0x01) !== 0) {
    f = 1 - f;
  }

  const n = wh + f * (v - wh);

  let r;
  let g;
  let b;

  switch (i) {
    default:
    case 6:
    case 0:
      r = v;
      g = n;
      b = wh;
      break;
    case 1:
      r = n;
      g = v;
      b = wh;
      break;
    case 2:
      r = wh;
      g = v;
      b = n;
      break;
    case 3:
      r = wh;
      g = n;
      b = v;
      break;
    case 4:
      r = n;
      g = wh;
      b = v;
      break;
    case 5:
      r = v;
      g = wh;
      b = n;
      break;
  }

  const rgb = { r: r * 255, g: g * 255, b: b * 255 };

  return rounded ? roundColor(rgb) : rgb;
};
