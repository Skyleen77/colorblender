import type {
  LchColor,
  RgbColor,
  RgbaColor,
  ToStringFormat,
} from '../../types';

import { rgbToLab, labToRgb } from './lab';
import { roundColor } from '../utils';

export const rgbToLch = (rgb: RgbColor, rounded?: boolean): LchColor => {
  const { l, a, b } = rgbToLab(rgb);
  let h;

  const hr = Math.atan2(b, a);
  h = (hr * 360) / 2 / Math.PI;

  if (h < 0) {
    h += 360;
  }

  const c = Math.sqrt(a * a + b * b);

  const lch = { l, c, h };

  return rounded ? roundColor(lch) : lch;
};

export const lchToRgb = (lch: LchColor, rounded?: boolean): RgbColor => {
  const l = lch.l;
  const c = lch.c;
  const h = lch.h;

  const hr = (h / 360) * 2 * Math.PI;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);

  const lab = { l, a, b };
  const rgb = labToRgb(lab);

  return rounded ? roundColor(rgb) : rgb;
};

export const lchToString = (rgba: RgbaColor, format: ToStringFormat) => {
  const { a, ...rgb } = rgba;
  const { l, c, h } = rgbToLch(rgb, true);

  if (format === 'css') {
    if (a < 1) {
      return `lch(${l}% ${c} ${h} / ${a})`;
    }
    return `lch(${l}% ${c} ${h})`;
  }

  return `${l}%, ${c}, ${h}${a < 1 ? `, ${a}` : ''}`;
};
