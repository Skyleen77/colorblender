import type { RgbColor } from '../../types';

import { clamp } from '../utils';

export const brighten = (rgb: RgbColor, ratio: number): RgbColor => {
  const adjustBrightness = (color: number, factor: number) => {
    return clamp(
      Math.round(color + factor * (factor > 0 ? 255 - color : color)),
      0,
      255,
    );
  };

  return {
    r: adjustBrightness(rgb.r, ratio),
    g: adjustBrightness(rgb.g, ratio),
    b: adjustBrightness(rgb.b, ratio),
  };
};
