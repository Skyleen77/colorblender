import {
  RgbColor,
  cmykToRgb,
  hcgToRgb,
  hexToRgb,
  hsiToRgb,
  hslToRgb,
  hsvToRgb,
  hwbToRgb,
  labToRgb,
  lchToRgb,
  xyzToRgb,
} from '@colorblender/converter';
import type { AnyColor, RgbaColor } from '../types';

const convertToRgba = (
  color: object,
  convertFunc: (color: object) => RgbColor,
): RgbaColor | null => {
  const alpha = 'a' in color ? (color.a as number) : 1;
  const rgb = convertFunc(color);
  return { ...rgb, a: alpha };
};

export const anyToRgba = (color: AnyColor): RgbaColor | null => {
  if (typeof color === 'string') {
    const alpha =
      color.length === 9 ? parseInt(color.slice(7, 9), 16) / 255 : 1;
    const rgb = hexToRgb(color.length === 9 ? color.slice(0, 7) : color);
    return { ...rgb, a: alpha };
  }

  const colorComponents = Object.keys(color);
  if (
    colorComponents.includes('r') &&
    colorComponents.includes('g') &&
    colorComponents.includes('b')
  ) {
    return convertToRgba(color, (c: RgbColor) => c);
  }

  if (colorComponents.includes('h')) {
    if (colorComponents.includes('s')) {
      if (colorComponents.includes('l')) {
        return convertToRgba(color, hslToRgb);
      }
      if (colorComponents.includes('v')) {
        return convertToRgba(color, hsvToRgb);
      }
      if (colorComponents.includes('i')) {
        return convertToRgba(color, hsiToRgb);
      }
    }

    if (colorComponents.includes('w') && colorComponents.includes('b')) {
      return convertToRgba(color, hwbToRgb);
    }

    if (colorComponents.includes('c') && colorComponents.includes('g')) {
      return convertToRgba(color, hcgToRgb);
    }
  }

  if (
    colorComponents.includes('x') &&
    colorComponents.includes('y') &&
    colorComponents.includes('z')
  ) {
    return convertToRgba(color, xyzToRgb);
  }

  if (colorComponents.includes('l')) {
    if (colorComponents.includes('a') && colorComponents.includes('b')) {
      return convertToRgba(color, labToRgb);
    }

    if (colorComponents.includes('c') && colorComponents.includes('h')) {
      return convertToRgba(color, lchToRgb);
    }
  }

  if (
    colorComponents.includes('c') &&
    colorComponents.includes('m') &&
    colorComponents.includes('y') &&
    colorComponents.includes('k')
  ) {
    return convertToRgba(color, cmykToRgb);
  }

  return null;
};
