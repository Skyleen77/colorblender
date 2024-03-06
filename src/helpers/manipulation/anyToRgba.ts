import { RgbColor, hexToRgb } from '@colorblender/converter';
import type { AnyColor, RgbaColor } from '../../types';
import { converters } from '../converters';

const convertToRgba = (
  color: object,
  convertFunc: (color: object) => RgbColor,
): RgbaColor | null => {
  const alpha = 'a' in color ? (color as any).a : 1;
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
  for (const { format, converter } of converters) {
    if (format.every((component) => colorComponents.includes(component))) {
      return convertToRgba(color, converter);
    }
  }

  return null;
};
