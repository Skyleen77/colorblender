import type { RgbaColor, ToStringFormat } from '../../types';
import { roundColor } from '../utils';

export const rgbToString = (rgba: RgbaColor, format: ToStringFormat) => {
  const { a = 1, ...rgb } = rgba;
  const { r, g, b } = roundColor(rgb);

  if (format === 'css') {
    if (a < 1) {
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  }

  return `${r}, ${g}, ${b}${a < 1 ? `, ${a}` : ''}`;
};
