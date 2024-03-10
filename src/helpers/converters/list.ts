import type { HexColor, RgbColor } from '../../types';

import { findClosestColor } from '../findClosestColor';
import { hexToRgb, rgbToHex } from './hex';
import { roundColor } from '../utils';

export const rgbToList = <T extends string>(
  rgb: RgbColor,
  list: Record<string, string>,
): T => {
  const hex = rgbToHex(rgb);
  const closestColor = findClosestColor(list, hex);
  return closestColor.name as T;
};

export const listToRgb = <T extends string>(
  string: T,
  list: Record<string, string>,
  rounded?: boolean,
): RgbColor => {
  const color: HexColor = list[string];

  let rgb: RgbColor;

  if (color) {
    rgb = hexToRgb(color);
  } else {
    rgb = { r: -1, g: -1, b: -1 };
  }

  return rounded ? roundColor(rgb) : rgb;
};
