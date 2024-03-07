import type { RgbColor } from '../../types';

export const grayscale = (rgb: RgbColor): RgbColor => {
  const value = rgb.r * 0.3 + rgb.g * 0.59 + rgb.b * 0.11;
  return { r: value, g: value, b: value };
};
