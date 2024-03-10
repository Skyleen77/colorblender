import { colorblender, extend } from '../src';
import nameExtension from '../src/extensions/name';

const color1 = colorblender({ r: 167, g: 40, b: 13 });

extend([nameExtension]);

describe('name extension', () => {
  it('should converts color to Name correctly', () => {
    expect(color1.name()).toStrictEqual('Tabasco');
  });

  it('should create color correctly with Name entry', () => {
    expect(colorblender('White').rgb()).toStrictEqual({
      r: 255,
      g: 255,
      b: 255,
      a: 1,
    });
  });
});
