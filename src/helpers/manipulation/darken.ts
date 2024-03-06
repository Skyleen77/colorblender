import type { HslColor, RgbColor } from '@colorblender/converter';

import { rgbToHsl } from '@colorblender/converter';
import { clamp } from '../utils';

export const darken = (rgb: RgbColor, ratio: number): HslColor => {
  const hsl = rgbToHsl(rgb);
  hsl.l = clamp(hsl.l - hsl.l * ratio, 0, 100);
  return hsl;
};
