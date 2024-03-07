import type { AnyColor, RgbaColor, RgbColor } from '../../types';
import { converters, hexToRgb } from '../converters';

const convertToRgba = (
  color: object,
  convertFunc: (color: object) => RgbColor,
): RgbaColor | null => {
  let alpha = 'a' in color ? (color as any).a : 1;
  if (alpha < 0) alpha = 0;
  if (alpha > 1) alpha = 1;
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
