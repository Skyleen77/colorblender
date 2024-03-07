import type { RgbColor } from '../../types';

export const negate = (rgb: RgbColor): RgbColor => {
  return {
    r: 255 - rgb.r,
    g: 255 - rgb.g,
    b: 255 - rgb.b,
  };
};
