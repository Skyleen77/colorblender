import type { HcgColor, RgbColor } from '../../types';

import { rgbToHcg } from '../converters/hcg';
import { clamp } from '../utils';

export const negateTones = (rgb: RgbColor): HcgColor => {
  const hcg = rgbToHcg(rgb);
  hcg.g = clamp(100 - hcg.g, 0, 100);
  return hcg;
};
