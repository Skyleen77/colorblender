import { colorblender, extend } from '../src';
import copicExtension from '../src/extensions/copic';

const color1 = colorblender({ r: 167, g: 40, b: 13 });

extend([copicExtension]);

describe('copic extension', () => {
  it('should converts color to Copic correctly', () => {
    expect(color1.copic()).toStrictEqual('Burnt Umber E29');
  });

  it('should create color correctly with Copic entry', () => {
    expect(colorblender('Burnt Umber E29').hex()).toStrictEqual('#884636');
  });
});
