import type { HcgColor, RgbColor, RgbaColor } from '../../types';

import { roundColor } from '../utils';

export const rgbToHcg = (rgb: RgbColor, rounded?: boolean): HcgColor => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(Math.max(r, g), b);
  const min = Math.min(Math.min(r, g), b);
  const c = max - min;
  let grayscale;
  let h;

  if (c < 1) {
    grayscale = min / (1 - c);
  } else {
    grayscale = 0;
  }

  if (c <= 0) {
    h = 0;
  } else if (max === r) {
    h = ((g - b) / c) % 6;
  } else if (max === g) {
    h = 2 + (b - r) / c;
  } else {
    h = 4 + (r - g) / c;
  }

  h /= 6;
  h %= 1;

  const hcg = { h: h * 360, c: c * 100, g: grayscale * 100 };

  return rounded ? roundColor(hcg) : hcg;
};

export const hcgToRgb = (hcg: HcgColor, rounded?: boolean): RgbColor => {
  const h = hcg.h / 360;
  const c = hcg.c / 100;
  const g = hcg.g / 100;

  if (c === 0.0) {
    return { r: g * 255, g: g * 255, b: g * 255 };
  }

  const pure = [0, 0, 0];
  const hi = (h % 1) * 6;
  const v = hi % 1;
  const w = 1 - v;
  let mg = 0;

  switch (Math.floor(hi)) {
    case 0:
      pure[0] = 1;
      pure[1] = v;
      pure[2] = 0;
      break;
    case 1:
      pure[0] = w;
      pure[1] = 1;
      pure[2] = 0;
      break;
    case 2:
      pure[0] = 0;
      pure[1] = 1;
      pure[2] = v;
      break;
    case 3:
      pure[0] = 0;
      pure[1] = w;
      pure[2] = 1;
      break;
    case 4:
      pure[0] = v;
      pure[1] = 0;
      pure[2] = 1;
      break;
    default:
      pure[0] = 1;
      pure[1] = 0;
      pure[2] = w;
  }

  mg = (1.0 - c) * g;

  const rgb = {
    r: (c * pure[0] + mg) * 255,
    g: (c * pure[1] + mg) * 255,
    b: (c * pure[2] + mg) * 255,
  };

  return rounded ? roundColor(rgb) : rgb;
};

export const hcgToString = (rgba: RgbaColor) => {
  const { a, ...rgb } = rgba;
  const { h, c, g } = rgbToHcg(rgb, true);

  return `${h}°, ${c}, ${g}${a < 1 ? `, ${a}` : ''}`;
};
