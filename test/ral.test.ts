import { colorblender, extend } from '../src';
import ralExtension from '../src/extensions/ral';

const color1 = colorblender({ r: 167, g: 40, b: 13 });

extend([ralExtension]);

describe('ral extension', () => {
  it('should converts color to RAL correctly', () => {
    expect(color1.ral()).toStrictEqual('3013');
  });

  it('should create color correctly with RAL entry', () => {
    expect(colorblender('3013').hex()).toStrictEqual('#A12312');
  });
});
