import type { HslColor, RgbColor } from '../../types';

import { rgbToHsl } from '../converters/hsl';
import { clamp } from '../utils';

export const saturate = (rgb: RgbColor, ratio: number): HslColor => {
  const hsl = rgbToHsl(rgb);
  hsl.s = clamp(hsl.s + hsl.s * ratio, 0, 100);
  return hsl;
};
