import type { HslColor, RgbColor } from '@colorblender/converter';

import { rgbToHsl } from '@colorblender/converter';

export const lighten = (rgb: RgbColor, ratio: number): HslColor => {
  const hsl = rgbToHsl(rgb);
  hsl.l += hsl.l * ratio;
  return hsl;
};
