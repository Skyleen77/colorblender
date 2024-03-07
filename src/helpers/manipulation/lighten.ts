import type { HslColor, RgbColor } from '../../types';

import { rgbToHsl } from '../converters';
import { clamp } from '../utils';

export const lighten = (rgb: RgbColor, ratio: number): HslColor => {
  const hsl = rgbToHsl(rgb);
  hsl.l = clamp(hsl.l + hsl.l * ratio, 0, 100);
  return hsl;
};
