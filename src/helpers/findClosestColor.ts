import type { ColorObject, HexColor } from '../types';
import { hexToRgb } from './converters';
import { colorDistance } from './utils';

export const findClosestColor = (
  colors: Record<string, HexColor>,
  targetHex: HexColor,
): ColorObject => {
  let closestColor: ColorObject = { name: '', hex: '' };
  let minDistance = Infinity;
  const targetColor = hexToRgb(targetHex);

  Object.entries(colors).forEach(([name, hex]) => {
    const rgb = hexToRgb(hex);
    const distance = colorDistance(rgb, targetColor);

    if (distance < minDistance) {
      minDistance = distance;
      closestColor = { name, hex };
    }
  });

  return closestColor;
};
