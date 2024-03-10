import { colorblender, extend } from '../src';
import ansiExtension from '../src/extensions/ansi';

const color1 = colorblender({ r: 167, g: 40, b: 13 });

extend([ansiExtension]);

describe('ansi extension', () => {
  it('should converts color to Ansi16 correctly', () => {
    expect(color1.ansi16()).toStrictEqual({ ansi16: 31 });
  });

  it('should converts color to Ansi256 correctly', () => {
    expect(color1.ansi256()).toStrictEqual({ ansi256: 130 });
  });

  it('should create color correctly with Ansi16 entry', () => {
    expect(colorblender({ ansi16: 31 }).hex()).toStrictEqual('#800000');
  });

  it('should create color correctly with Ansi256 entry', () => {
    expect(colorblender({ ansi256: 130 }).hex()).toStrictEqual('#993300');
  });
});
