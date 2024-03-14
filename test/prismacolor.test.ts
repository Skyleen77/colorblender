import { colorblender, extend } from '../src';
import prismacolorExtension from '../src/extensions/prismacolor';

const color1 = colorblender({ r: 167, g: 40, b: 13 });

extend([prismacolorExtension]);

describe('prismacolor extension', () => {
  it('should converts color to PrismaColor correctly', () => {
    expect(color1.prismacolor()).toStrictEqual('Terra Cotta PC 944');
  });

  it('should create color correctly with PrismaColor entry', () => {
    expect(colorblender('Jade Green PC 1021').hex()).toStrictEqual('#73DBBA');
  });
});
