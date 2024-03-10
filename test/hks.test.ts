import { colorblender, extend } from '../src';
import hksExtension from '../src/extensions/hks';

const color1 = colorblender({ r: 167, g: 40, b: 13 });

extend([hksExtension]);

describe('hks extension', () => {
  it('should converts color to HKS correctly', () => {
    expect(color1.hks()).toStrictEqual('82-K');
  });

  it('should create color correctly with HKS entry', () => {
    expect(colorblender('82-K').hex()).toStrictEqual('#9E3D21');
  });
});
