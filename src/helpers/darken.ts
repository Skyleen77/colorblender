import { rgbToHsl } from '@colorblender/converter';
import type { HslaColor, RgbaColor } from '../types';

export const darken = (rgba: RgbaColor, ratio: number): HslaColor => {
  const hsl = rgbToHsl({
    r: rgba.r,
    g: rgba.g,
    b: rgba.b,
  });
  hsl.l -= hsl.l * ratio;

  return {
    ...hsl,
    a: rgba.a,
  };
};
