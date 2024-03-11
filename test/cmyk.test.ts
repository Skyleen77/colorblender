import { colorblender, extend } from '../src';
import cmykExtension from '../src/extensions/cmyk';

const color1 = colorblender({ r: 167, g: 40, b: 13 });

extend([cmykExtension]);

describe('cmyk extension', () => {
  it('should converts color to CMYK correctly', () => {
    expect(color1.cmyk()).toStrictEqual({
      c: 0,
      m: 76,
      y: 92,
      k: 35,
      a: 1,
    });
  });

  it('should create color correctly with CMYK entry', () => {
    expect(colorblender({ c: 0, m: 76, y: 92, k: 35 }).rgb()).toStrictEqual({
      r: 166,
      g: 40,
      b: 13,
      a: 1,
    });
  });

  it('should return cmyk string color format css', () => {
    expect(color1.cmykString('css')).toStrictEqual(
      'device-cmyk(0% 76% 92% 35%)',
    );
  });

  it('should return cmyk string color format default', () => {
    expect(color1.cmykString()).toStrictEqual('0%, 76%, 92%, 35%');
  });
});
