import type { Converter } from './types';

import { Colorblender } from './colorblender';
import { converters } from './helpers/converters/converters';

export type Extensions = (
  Class: typeof Colorblender,
  converters: Converter[],
) => void;

const activeExtensions: Extensions[] = [];

export const extend = (extensions: Extensions[]): void => {
  extensions.forEach((extension) => {
    if (activeExtensions.indexOf(extension) < 0) {
      extension(Colorblender, converters);
      activeExtensions.push(extension);
    }
  });
};
