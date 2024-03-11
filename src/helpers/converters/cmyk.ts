import type {
  CmykColor,
  RgbColor,
  RgbaColor,
  ToStringFormat,
} from '../../types';

import { roundColor } from '../utils';

export const rgbToCmyk = (rgb: RgbColor, rounded?: boolean): CmykColor => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const k = Math.min(1 - r, 1 - g, 1 - b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;

  const cmyk = { c: c * 100, m: m * 100, y: y * 100, k: k * 100 };

  return rounded ? roundColor(cmyk) : cmyk;
};

export const cmykToRgb = (cmyk: CmykColor, rounded?: boolean): RgbColor => {
  const c = cmyk.c / 100;
  const m = cmyk.m / 100;
  const y = cmyk.y / 100;
  const k = cmyk.k / 100;

  const r = 1 - Math.min(1, c * (1 - k) + k);
  const g = 1 - Math.min(1, m * (1 - k) + k);
  const b = 1 - Math.min(1, y * (1 - k) + k);

  const rgb = { r: r * 255, g: g * 255, b: b * 255 };

  return rounded ? roundColor(rgb) : rgb;
};

export const cmykToString = (rgba: RgbaColor, format: ToStringFormat) => {
  const { a, ...rgb } = rgba;
  const { c, m, y, k } = rgbToCmyk(rgb, true);

  if (format === 'css') {
    if (a < 1) {
      return `device-cmyk(${c}% ${m}% ${y}% ${k}% / ${a})`;
    }
    return `device-cmyk(${c}% ${m}% ${y}% ${k}%)`;
  }

  return `${c}%, ${m}%, ${y}%, ${k}%${a < 1 ? `, ${a}` : ''}`;
};
