import type {
  LabColor,
  RgbColor,
  RgbaColor,
  ToStringFormat,
} from '../../types';

import { rgbToXyz, xyzToRgb } from './xyz';
import { roundColor } from '../utils';

const LAB_FT = Math.pow(6 / 29, 3);

export const rgbToLab = (rgb: RgbColor, rounded?: boolean): LabColor => {
  const xyz = rgbToXyz(rgb);
  let x = xyz.x;
  let y = xyz.y;
  let z = xyz.z;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > LAB_FT ? x ** (1 / 3) : 7.787 * x + 16 / 116;
  y = y > LAB_FT ? y ** (1 / 3) : 7.787 * y + 16 / 116;
  z = z > LAB_FT ? z ** (1 / 3) : 7.787 * z + 16 / 116;

  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);

  const lab = { l, a, b };

  return rounded ? roundColor(lab) : lab;
};

export const labToRgb = (lab: LabColor, rounded?: boolean): RgbColor => {
  const l = lab.l;
  const a = lab.a;
  const b = lab.b;
  let x;
  let y;
  let z;

  y = (l + 16) / 116;
  x = a / 500 + y;
  z = y - b / 200;

  const y2 = y ** 3;
  const x2 = x ** 3;
  const z2 = z ** 3;
  y = y2 > LAB_FT ? y2 : (y - 16 / 116) / 7.787;
  x = x2 > LAB_FT ? x2 : (x - 16 / 116) / 7.787;
  z = z2 > LAB_FT ? z2 : (z - 16 / 116) / 7.787;

  // Illuminant D65 XYZ Tristrimulus Values
  // https://en.wikipedia.org/wiki/CIE_1931_color_space
  x *= 95.047;
  y *= 100;
  z *= 108.883;

  const xyz = { x, y, z };
  const rgb = xyzToRgb(xyz);

  return rounded ? roundColor(rgb) : rgb;
};

export const labToString = (rgba: RgbaColor, format: ToStringFormat) => {
  const { a: alpha, ...rgb } = rgba;
  const { l, a, b } = rgbToLab(rgb, true);

  if (format === 'css') {
    if (a < 1) {
      return `lab(${l}% ${a} ${b} / ${a})`;
    }
    return `lab(${l}% ${a} ${b})`;
  }

  return `${l}%, ${a}, ${b}${a < 1 ? `, ${a}` : ''}`;
};
