import type { HwbColor, RgbColor } from '../../types';

import { rgbToHwb } from '../converters/hwb';
import { clamp } from '../utils';

export const blacken = (rgb: RgbColor, ratio: number): HwbColor => {
  const hwb = rgbToHwb(rgb);
  hwb.b = clamp(hwb.b + hwb.b * ratio, 0, 100);
  return hwb;
};
