import type { AnyColor, RgbaColor, RgbColor } from '../../types';

import { converters } from '../converters/converters';
import { hexToRgb } from '../converters/hex';

const convertColorByFormat = (
  color: string,
  format: string,
): RgbaColor | null => {
  const converter = converters.find((c) => c.format === format);
  if (converter) {
    const rgb = converter.converter(color);
    if (rgb.r !== -1) {
      return { ...rgb, a: 1 };
    }
  }
  return null;
};

const convertToRgba = (
  color: object,
  convertFunc: (color: object) => RgbColor,
): RgbaColor | null => {
  let alpha = (
    'alpha' in color ? color.alpha : 'a' in color ? color.a : 1
  ) as number;

  if (alpha < 0) alpha = 0;
  if (alpha > 1) alpha = 1;
  const rgb = convertFunc(color);

  return { ...rgb, a: alpha };
};

export const anyToRgba = (color: AnyColor): RgbaColor | null => {
  if (typeof color === 'string') {
    const formats = ['NAME', 'KEYWORD', 'RAL', 'HKS', 'COPIC', 'PRISMACOLOR'];

    for (const format of formats) {
      const rgb = convertColorByFormat(color, format);
      if (rgb) return rgb;
    }

    const hexColorRegex =
      /^#?([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
    if (!hexColorRegex.test(color)) {
      return null;
    }

    const alpha =
      color.length === 9 ? parseInt(color.slice(7, 9), 16) / 255 : 1;
    const rgbByHex = hexToRgb(color.length === 9 ? color.slice(0, 7) : color);
    return { ...rgbByHex, a: alpha };
  }

  const objectConverters = converters.filter(
    (converter) => typeof converter.format !== 'string',
  );

  const colorComponents = Object.keys(color);
  for (const { format, converter } of objectConverters) {
    if (
      (format as string[]).every((component) =>
        colorComponents.includes(component),
      )
    ) {
      return convertToRgba(color, converter);
    }
  }

  return null;
};
