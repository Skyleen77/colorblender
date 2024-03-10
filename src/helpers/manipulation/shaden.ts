import type { HcgColor, RgbColor } from '../../types';

import { rgbToHcg } from '../converters/hcg';
import { clamp } from '../utils';

export const shaden = (rgb: RgbColor, ratio: number): HcgColor => {
  const hcg = rgbToHcg(rgb);
  hcg.g = clamp(hcg.g - hcg.g * ratio, 0, 100);
  return hcg;
};
