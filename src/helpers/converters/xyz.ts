import type { RgbColor, RgbaColor, XyzColor } from '../../types';

import { roundColor } from '../utils';

export const rgbToXyz = (rgb: RgbColor, rounded?: boolean): XyzColor => {
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
  g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
  b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;

  const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
  const y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
  const z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;

  const xyz = { x: x * 100, y: y * 100, z: z * 100 };

  return rounded ? roundColor(xyz) : xyz;
};

export const xyzToRgb = (xyz: XyzColor, rounded?: boolean): RgbColor => {
  const x = xyz.x / 100;
  const y = xyz.y / 100;
  const z = xyz.z / 100;
  let r;
  let g;
  let b;

  r = x * 3.2404542 + y * -1.5371385 + z * -0.4985314;
  g = x * -0.969266 + y * 1.8760108 + z * 0.041556;
  b = x * 0.0556434 + y * -0.2040259 + z * 1.0572252;

  r = r > 0.0031308 ? 1.055 * r ** (1.0 / 2.4) - 0.055 : r * 12.92;
  g = g > 0.0031308 ? 1.055 * g ** (1.0 / 2.4) - 0.055 : g * 12.92;
  b = b > 0.0031308 ? 1.055 * b ** (1.0 / 2.4) - 0.055 : b * 12.92;

  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);

  const rgb = { r: r * 255, g: g * 255, b: b * 255 };

  return rounded ? roundColor(rgb) : rgb;
};

export const xyzToString = (rgba: RgbaColor) => {
  const { a, ...rgb } = rgba;
  const { x, y, z } = rgbToXyz(rgb, true);

  return `${x}, ${y}, ${z}${a < 1 ? `, ${a}` : ''})`;
};
