import type { HslColor, RgbColor } from '../../types';

import { rgbToHsl } from '../converters/hsl';

export const complement = (rgb: RgbColor): HslColor => {
  const hsl = rgbToHsl(rgb);
  hsl.h = (hsl.h + 180) % 360;
  return hsl;
};
