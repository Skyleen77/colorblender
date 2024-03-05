import type { HwbColor, RgbColor } from '@colorblender/converter';

import { rgbToHwb } from '@colorblender/converter';

export const whiten = (rgb: RgbColor, ratio: number): HwbColor => {
  const hwb = rgbToHwb(rgb);
  hwb.w += hwb.w * ratio;
  return hwb;
};
