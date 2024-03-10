import { colorblender, extend } from '../src';
import appleExtension from '../src/extensions/apple';

const color1 = colorblender({ r: 167, g: 40, b: 13 });

extend([appleExtension]);

describe('ansi extension', () => {
  it('should converts color to Apple correctly', () => {
    expect(color1.apple()).toStrictEqual({ r: 42919, g: 10280, b: 3341, a: 1 });
  });
});
