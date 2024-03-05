import type { HwbColor, RgbColor } from '@colorblender/converter';

import { rgbToHwb } from '@colorblender/converter';

export const blacken = (rgb: RgbColor, ratio: number): HwbColor => {
  const hwb = rgbToHwb(rgb);
  hwb.b += hwb.b * ratio;
  return hwb;
};
