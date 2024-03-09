import { colorblender, extend } from '../src';
import xyzExtension from '../src/extensions/xyz';

const color1 = colorblender({ r: 167, g: 40, b: 13 });

extend([xyzExtension]);

describe('xyz extension', () => {
  it('should converts color to XYZ correctly', () => {
    expect(color1.xyz()).toStrictEqual({
      x: 17,
      y: 10,
      z: 1,
      a: 1,
    });
  });

  it('should create color correctly with XYZ entry', () => {
    expect(colorblender({ x: 17, y: 10, z: 1 }).rgb()).toStrictEqual({
      r: 168,
      g: 42,
      b: 0,
      a: 1,
    });
  });
});
