import type { RgbColor } from '../../types';
import { luminosity } from './luminosity';

export const contrast = (rgb1: RgbColor, rgb2: RgbColor): number => {
  const lum1 = luminosity(rgb1);
  const lum2 = luminosity(rgb2);

  const maxLum = Math.max(lum1, lum2);
  const minLum = Math.min(lum1, lum2);

  return (maxLum + 0.05) / (minLum + 0.05);
};
