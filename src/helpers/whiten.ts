import type { HwbColor, RgbColor } from '@colorblender/converter';

import { rgbToHwb } from '@colorblender/converter';
import { clamp } from './utils';

export const whiten = (rgb: RgbColor, ratio: number): HwbColor => {
  const hwb = rgbToHwb(rgb);
  hwb.w = clamp(hwb.w + hwb.w * ratio, 0, 100);
  return hwb;
};
