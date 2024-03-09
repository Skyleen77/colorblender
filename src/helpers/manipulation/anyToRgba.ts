import type { AnyColor, RgbaColor, RgbColor } from '../../types';

import { converters } from '../converters/converters';
import { hexToRgb } from '../converters/hex';

const convertToRgba = (
  color: object,
  convertFunc: (color: object) => RgbColor,
): RgbaColor | null => {
  if ('alpha' in color) {
    console.log('color', color);
  }
  let alpha = (
    'alpha' in color ? color.alpha : 'a' in color ? color.a : 1
  ) as number;
  if ('alpha' in color) {
    console.log('alpha', alpha);
  }
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
