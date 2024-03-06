import type { HexColor, RgbColor } from '../../types';

import { round, roundColor } from '../../helpers';

export function alphaToHex(alpha: number): string {
  return Math.round(alpha * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();
}

export const hexToAlpha = (hex: string, rounded?: boolean): number => {
  const alpha = parseInt(hex, 16) / 255;
  return rounded ? round(alpha, 3) : alpha;
};

export const rgbToHex = (rgb: RgbColor): HexColor => {
  const integer =
    ((Math.round(rgb.r) & 0xff) << 16) +
    ((Math.round(rgb.g) & 0xff) << 8) +
    (Math.round(rgb.b) & 0xff);
  const string = integer.toString(16).toUpperCase();
  return '000000'.substring(string.length) + string;
};

export const hexToRgb = (hex: HexColor, rounded?: boolean): RgbColor => {
  if (hex.charAt(0) === '#') {
    hex = hex.substring(1);
  }

  const match = hex.toString().match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!match) {
    return { r: 0, g: 0, b: 0 };
  }

  let colorString = match[0];

  if (match[0].length === 3) {
    colorString = colorString
      .split('')
      .map((char) => {
        return char + char;
      })
      .join('');
  }

  const integer = parseInt(colorString, 16);
  const r = (integer >> 16) & 0xff;
  const g = (integer >> 8) & 0xff;
  const b = integer & 0xff;

  const rgb = { r, g, b };

  return rounded ? roundColor(rgb) : rgb;
};
