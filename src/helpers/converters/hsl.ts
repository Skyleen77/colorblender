import type {
  HslColor,
  RgbColor,
  RgbaColor,
  ToStringFormat,
} from '../../types';

import { roundColor } from '../../helpers/utils';

export const rgbToHsl = (rgb: RgbColor, rounded?: boolean): HslColor => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h;
  let s;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h! * 60, 360);

  if (h < 0) {
    h += 360;
  }

  const l = (min + max) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }

  const hsl = { h, s: s * 100, l: l * 100 };

  return rounded ? roundColor(hsl) : hsl;
};

export const hslToRgb = (hsl: HslColor, rounded?: boolean): RgbColor => {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;
  let t2;
  let t3;
  let val;
  let rgb = [0, 0, 0];

  if (s === 0) {
    val = l * 255;
    return { r: val, g: val, b: val };
  }

  if (l < 0.5) {
    t2 = l * (1 + s);
  } else {
    t2 = l + s - l * s;
  }

  const t1 = 2 * l - t2;

  for (let i = 0; i < 3; i++) {
    t3 = h + (1 / 3) * -(i - 1);
    if (t3 < 0) {
      t3++;
    }

    if (t3 > 1) {
      t3--;
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }

    rgb[i] = val * 255;
  }

  const returnedRgb = { r: rgb[0], g: rgb[1], b: rgb[2] };

  return rounded ? roundColor(returnedRgb) : returnedRgb;
};

export const hslToString = (rgba: RgbaColor, format: ToStringFormat) => {
  const { a, ...rgb } = rgba;
  const { h, s, l } = rgbToHsl(rgb, true);

  if (format === 'css') {
    if (a < 1) {
      return `hsla(${h}, ${s}%, ${l}%, ${a})`;
    }
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  return `${h}°, ${s}%, ${l}%${a < 1 ? `, ${a}` : ''}`;
};
