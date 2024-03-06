import type { RgbColor } from '@colorblender/converter';

export const negate = (rgb: RgbColor): RgbColor => {
  return {
    r: 255 - rgb.r,
    g: 255 - rgb.g,
    b: 255 - rgb.b,
  };
};
