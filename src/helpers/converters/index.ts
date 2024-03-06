import type { Converter, RgbColor } from '../../types';
import { hslToRgb, hsvToRgb } from './';

export const converters: Converter[] = [
  { format: ['r', 'g', 'b'], converter: (c: RgbColor) => c },
  { format: ['h', 's', 'l'], converter: hslToRgb },
  { format: ['h', 's', 'v'], converter: hsvToRgb },
];

export * from './hex';
export * from './hsl';
export * from './hsv';
