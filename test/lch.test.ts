import { colorblender, extend } from '../src';
import lchExtension from '../src/extensions/lch';

const color1 = colorblender({ r: 167, g: 40, b: 13 });

extend([lchExtension]);

describe('lch extension', () => {
  it('should converts color to LCH correctly', () => {
    expect(color1.lch()).toStrictEqual({
      l: 37,
      c: 68,
      h: 42,
      a: 1,
    });
  });

  it('should create color correctly with LCH entry', () => {
    expect(colorblender({ l: 37, c: 68, h: 42 }).rgb()).toStrictEqual({
      r: 166,
      g: 38,
      b: 12,
      a: 1,
    });
  });

  it('should return lch string color format css', () => {
    expect(color1.lchString('css')).toStrictEqual('lch(37% 68 42)');
  });

  it('should return lch string color format default', () => {
    expect(color1.lchString()).toStrictEqual('37%, 68, 42');
  });
});
