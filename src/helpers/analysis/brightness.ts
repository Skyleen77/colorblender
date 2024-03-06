import type { RgbColor } from '@colorblender/converter';

export const brightness = (rgb: RgbColor): number => {
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 / 255;
};
