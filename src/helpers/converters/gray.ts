import type { GrayColor, RgbColor } from '../../types';

import { roundColor } from '../utils';

export const rgbToGray = (rgb: RgbColor, rounded?: boolean): GrayColor => {
  const val = (rgb.r + rgb.g + rgb.b) / 3;
  const gray = (val / 255) * 100;

  return { gray: rounded ? Math.round(gray) : gray };
};

export const grayToRgb = (color: GrayColor, rounded?: boolean): RgbColor => {
  const gray = color.gray;

  const rgb = {
    r: (gray / 100) * 255,
    g: (gray / 100) * 255,
    b: (gray / 100) * 255,
  };

  return rounded ? roundColor(rgb) : rgb;
};
