import type { Converter, RgbColor } from '../../types';

import { hslToRgb } from './hsl';
import { hsvToRgb } from './hsv';

export const converters: Converter[] = [
  { format: ['r', 'g', 'b'], converter: (c: RgbColor) => c },
  { format: ['h', 's', 'l'], converter: hslToRgb },
  { format: ['h', 's', 'v'], converter: hsvToRgb },
];
