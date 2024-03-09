import type { RgbaColor } from '../../types';

export const mix = (
  color1: RgbaColor,
  color2: RgbaColor,
  weight: number = 0.5,
): RgbaColor => {
  const p = weight;
  const w = 2 * p - 1;
  const a = color1.a - color2.a;

  const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
  const w2 = 1 - w1;

  return {
    r: w1 * color1.r + w2 * color2.r,
    g: w1 * color1.g + w2 * color2.g,
    b: w1 * color1.b + w2 * color2.b,
    a: color1.a * p + color2.a * (1 - p),
  };
};
