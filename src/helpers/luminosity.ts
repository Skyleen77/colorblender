import type { RgbColor } from '@colorblender/converter';

export const luminosity = (rgb: RgbColor): number => {
  const toLum = (value: number): number => {
    const chan = value / 255;
    return chan <= 0.04045 ? chan / 12.92 : ((chan + 0.055) / 1.055) ** 2.4;
  };

  const rLum = toLum(rgb.r);
  const gLum = toLum(rgb.g);
  const bLum = toLum(rgb.b);

  return 0.2126 * rLum + 0.7152 * gLum + 0.0722 * bLum;
};
