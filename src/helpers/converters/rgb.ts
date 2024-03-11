import type { RgbaColor, ToStringFormat } from '../../types';

export const rgbToString = (rgba: RgbaColor, format: ToStringFormat) => {
  const { r, g, b, a = 1 } = rgba;

  if (format === 'css') {
    if (a < 1) {
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  }

  return `${r}, ${g}, ${b}${a < 1 ? `, ${a}` : ''}`;
};
