import { colorblender, extend } from '../src';
import a11yExtension from '../src/extensions/a11y';

const color1 = colorblender({ r: 167, g: 40, b: 13 });
const color2 = colorblender({ r: 28, g: 252, b: 185 });

extend([a11yExtension]);

describe('a11y extension', () => {
  it('should return luminosity', () => {
    expect(color1.luminosity()).toBe(0.0976213184127798);
  });

  it('should return contrast', () => {
    expect(color1.contrast(color2)).toBe(5.308885390786212);
  });

  it('should return readability', () => {
    expect(color1.isReadable(color2)).toBe(true);
  });

  it('should return readability AAA large', () => {
    expect(
      color1.isReadable(color2, {
        level: 'AAA',
        size: 'large',
      }),
    ).toBe(true);
  });

  it('should return readability AAA large', () => {
    expect(
      color1.isReadable(color2, {
        level: 'AA',
        size: 'normal',
      }),
    ).toBe(true);
  });
});
