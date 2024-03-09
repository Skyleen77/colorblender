<div align="center">
  <p></p>
  <img src="./logo.png" width="300" />
  <p></p>

  <p>A powerful and fully typed color library.</p>
</div>

## Features

- **Fully typed** - Written in TypeScript
- **Tiny** - Less than 3kb gzipped
- **Fast** - 3x faster than the most popular color library
- **Simple** - Chainable methods
- **Complete** - Supports a lot of color models
- **Conversion** - Convert between any of the supported color models
- **Extension** - Extend the library with others color models, manipulation, and analysis methods
- **Support** - Support all browsers and Node.js

## Installation

```bash
npm install colorblender
```

## Import

```typescript
import { colorblender } from 'colorblender';
```

## Usage

### Create colorblender instance

```typescript
// Random Color
colorblender();
// HEX
colorblender('#FFF');
colorblender('#FFFFFF');
colorblender('#FFFFFFFF');
// RGB
colorblender({ r: 255, g: 255, b: 255 });
colorblender({ r: 255, g: 255, b: 255, a: 1 });
// HSL
colorblender({ h: 360, s: 100, l: 100 });
colorblender({ h: 360, s: 100, l: 100, a: 1 });
// HSV
colorblender({ h: 360, s: 100, v: 100 });
colorblender({ h: 360, s: 100, v: 100, a: 1 });
// HWB (with extension hwb)
colorblender({ h: 0, s: 0, i: 1 });
colorblender({ h: 0, s: 0, i: 1, a: 1 });
// HCG (with extension hcg)
colorblender({ h: 0, c: 0, g: 100 });
colorblender({ h: 0, c: 0, g: 100, a: 1 });
// CMYK (with extension cmyk)
colorblender({ c: 0, m: 0, y: 0, k: 0 });
colorblender({ c: 0, m: 0, y: 0, k: 0, a: 1 });
// XYZ (with extension xyz)
colorblender({ x: 95, y: 100, z: 108.9 });
colorblender({ x: 95, y: 100, z: 108.9, a: 1 });
// LAB (with extension lab)
colorblender({ l: 100, a: 0, b: 0 });
colorblender({ l: 100, a: 0, b: 0, alpha: 1 }); // for lab, you need to use alpha instead of a
// LCH (with extension lch)
colorblender({ l: 100, c: 0, h: 0 });
colorblender({ l: 100, c: 0, h: 0, a: 1 });
```

### Methods

#### Conversion

<details>
<summary><b><code>.hex()</code></b></summary><br>

```typescript
colorblender({ r: 255, g: 255, b: 255 }).hex(); // #FFFFFF
colorblender({ r: 255, g: 255, b: 255, a: 0.5 }).hex(); // #FFFFFF80
```

</details>

<details>
<summary><b><code>.rgbNumber()</code></b></summary><br>

```typescript
colorblender('#FFF').rgbNumber(); // 16777215
```

</details>

<details>
<summary><b><code>.rgb(raw = false)</code></b></summary><br>

```typescript
colorblender('#FFF').rgb(); // { r: 255, g: 255, b: 255, a: 1 }
colorblender('#FFFFFF80').rgb(); // { r: 255, g: 255, b: 255, a: 0.5 }
```

</details>

<details>
<summary><b><code>.hsl(raw = false)</code></b></summary><br>

```typescript
colorblender('#FFF').hsl(); // { h: 0, s: 0, l: 100, a: 1 }
colorblender('#FFFFFF80').hsl(); // { h: 0, s: 0, l: 100, a: 0.5 }
colorblender({ r: 167, g: 40, b: 13 }).hsv(true); // { h: 10.51948051948052, s: 85.55555555555554, l: 35.294117647058826, a: 1 }
```

</details>

<details>
<summary><b><code>.hsv(raw = false)</code></b></summary><br>

```typescript
colorblender('#FFF').hsv(); // { h: 0, s: 0, v: 100, a: 1 }
colorblender('#FFFFFF80').hsv(); // { h: 0, s: 0, v: 100, a: 0.5 }
colorblender({ r: 167, g: 40, b: 13 }).hsv(true); // { h: 10.519480519480492, s: 92.21556886227545, v: 65.49019607843137, a: 1 }
```

</details>

<details>
<summary><b><code>.hwb(raw = false)</code></b> extension <b>hwb</b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).hwb(); // { h: 11, w: 5, b: 35, a: 1 }
colorblender({ r: 167, g: 40, b: 13, a: 0.5 }).hwb(); // { h: 11, w: 5, b: 35, a: 0.5 }
colorblender({ r: 167, g: 40, b: 13 }).hwb(true); // { h: 10.51948051948052, w: 5.098039215686274, b: 34.509803921568626, , a: 1 }
```

</details>

<details>
<summary><b><code>.hcg(raw = false)</code></b> extension <b>hcg</b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).hcg(); // { h: 11, c: 60, g: 13, a: 1 }
colorblender({ r: 167, g: 40, b: 13, a: 0.5 }).hcg(); // { h: 11, c: 60, g: 13, a: 0.5 }
colorblender({ r: 167, g: 40, b: 13 }).hcg(true); // { h: 10.519480519480519, c: 60.3921568627451, g: 12.871287128712869, , a: 1 }
```

</details>

<details>
<summary><b><code>.cmyk(raw = false)</code></b> extension <b>cmyk</b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).cmyk(); // { c: 0, m: 76, y: 92, k: 35, a: 1 }
colorblender({ r: 167, g: 40, b: 13, a: 0.5 }).cmyk(); // { c: 0, m: 76, y: 92, k: 35, a: 0.5 }
colorblender({ r: 167, g: 40, b: 13 }).cmyk(true); // { c: 0, m: 76.04790419161677, y: 92.21556886227545, k: 34.509803921568626, , a: 1 }
```

</details>

<details>
<summary><b><code>.xyz(raw = false)</code></b> extension <b>xyz</b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).xyz(); // { x: 17, y: 10, z: 1, a: 1 }
colorblender({ r: 167, g: 40, b: 13, a: 0.5 }).xyz(); // { x: 17, y: 10, z: 1, a: 0.5 }
colorblender({ r: 167, g: 40, b: 13 }).xyz(true); // { x: 16.769891396698043, y: 9.764837423188144, z: 1.382502939864886, a: 1 }
```

</details>

<details>
<summary><b><code>.lab(raw = false)</code></b> extension <b>lab</b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).lab(); // { l: 37, a: 50, b: 45, alpha: 1 }
colorblender({ r: 167, g: 40, b: 13, a: 0.5 }).lab(); // { l: 37, a: 50, b: 45, alpha: 0.5 }
colorblender({ r: 167, g: 40, b: 13 }).lab(true); // { l: 37.41702066350787, a: 50.19034131619138, b: 45.43968063599927, alpha: 1 }
```

</details>

<details>
<summary><b><code>.lch(raw = false)</code></b> extension <b>lch</b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).lch(); // { l: 37, c: 68, h: 42, a: 1 }
colorblender({ r: 167, g: 40, b: 13, a: 0.5 }).lch(); // { l: 37, c: 68, h: 42, a: 0.5 }
colorblender({ r: 167, g: 40, b: 13 }).lch(true); // { l: 37.41702066350787, c: 67.70402453131862, h: 42.156026720919115, a: 1 }
```

</details>

#### Manipulation

<details>
<summary><b><code>.alpha(value: number)</code></b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).alpha(0.5).rgb(); // { r: 167, g: 40, b: 13, a: 0.5 }
```

</details>

<details>
<summary><b><code>.hue(value: number)</code></b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).hue(20).rgb(); // { r: 166, g: 64, b: 13, a: 1 }
```

</details>

<details>
<summary><b><code>.negate()</code></b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).negate().rgb(); // { r: 88, b: 242, g: 215, a: 1 }
```

</details>

<details>
<summary><b><code>.lighten(ratio: number)</code></b></summary><br>

`ratio` is between 0 and 1.

```typescript
colorblender({ r: 167, g: 40, b: 13 }).lighten(0.2).rgb(); // { r: 200, b: 16, g: 48, a: 1 }
```

</details>

<details>
<summary><b><code>.darken(ratio: number)</code></b></summary><br>

`ratio` is between 0 and 1.

```typescript
colorblender({ r: 167, g: 40, b: 13 }).darken(0.2).rgb(); // { r: 134, b: 10, g: 32, a: 1 }
```

</details>

<details>
<summary><b><code>.saturate(ratio: number)</code></b></summary><br>

`ratio` is between 0 and 1.

```typescript
colorblender({ r: 167, g: 40, b: 13 }).saturate(0.2).rgb(); // { r: 180, b: 0, g: 32, a: 1 }
```

</details>

<details>
<summary><b><code>.desaturate(ratio: number)</code></b></summary><br>

`ratio` is between 0 and 1.

```typescript
colorblender({ r: 167, g: 40, b: 13 }).desaturate(0.2).rgb(); // { r: 152, b: 50, g: 28, a: 1 }
```

</details>

<details>
<summary><b><code>.fade(ratio: number)</code></b></summary><br>

`ratio` is between 0 and 1.

```typescript
colorblender({ r: 167, g: 40, b: 13, a: 1 }).fade(0.2).alpha(); // 0.8
```

</details>

<details>
<summary><b><code>.opaquer(ratio: number)</code></b></summary><br>

`ratio` is between 0 and 1.

```typescript
colorblender({ r: 167, g: 40, b: 13, a: 0.5 }).opaquer(0.2).alpha(); // 0.6
```

</details>

<details>
<summary><b><code>.grayscale()</code></b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).grayscale().rgb(); // { r: 75, b: 75, g: 75, a: 1 }
```

</details>

<details>
<summary><b><code>.rotate(amount = 15)</code></b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).rotate(20).hue(); // 31
```

</details>

<details>
<summary><b><code>.whiten(ratio: number)</code></b> extension <b>hwb</b></summary><br>

`ratio` is between 0 and 1.

```typescript
colorblender({ r: 167, g: 40, b: 13 }).whiten(0.2).rgb(); // { r: 167, b: 16, g: 42 }
```

</details>

<details>
<summary><b><code>.blacken(ratio: number)</code></b> extension <b>hwb</b></summary><br>

`ratio` is between 0 and 1.

```typescript
colorblender({ r: 167, g: 40, b: 13 }).blacken(0.2).rgb(); // { r: 149, b: 13, g: 37 }
```

</details>

<details>
<summary><b><code>.mix(color: AnyColor | Colorblender, weight = 0.5)</code></b> extension <b>mix</b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 })
  .mix({ r: 28, g: 252, b: 185 }, 0.2)
  .hex(); // #629263
```

</details>

<details>
<summary><b><code>.mixPalette(color: AnyColor | Colorblender, amount: number)</code></b> extension <b>mix</b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 })
  .mixPalette({ r: 28, g: 252, b: 185 }, 5)
  .map((c) => c.hex());
// [
//   '#904B2A',
//   '#796F46',
//   '#629263',
//   '#4AB580',
//   '#33D99C',
// ]
```

</details>

<details>
<summary><b><code>.tints(amount: number)</code></b> extension <b>mix</b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 })
  .tints(5)
  .map((c) => c.hex());
// [
//   '#B64C35',
//   '#C4705E',
//   '#D39486',
//   '#E2B7AE',
//   '#F0DBD7',
// ]
```

</details>

<details>
<summary><b><code>.shades(amount: number)</code></b> extension <b>mix</b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 })
  .shades(5)
  .map((c) => c.hex());
// [
//   '#8B210B',
//   '#6F1B09',
//   '#541407',
//   '#380D04',
//   '#1C0702',
// ]
```

</details>

<details>
<summary><b><code>.tones(amount: number)</code></b> extension <b>mix</b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 })
  .tones(5)
  .map((c) => c.hex());
// [
//   '#A13720',
//   '#9A4533',
//   '#945447',
//   '#8D635A',
//   '#87716D',
// ]
```

</details>

<details>
<summary><b><code>.harmonies(type: HarmonyType)</code></b> extension <b>harmony</b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 })
  .harmonies('analogous')
  .map((c) => c.hex()); // ['#A70D3E', '#A7290D', '#A7760D']

colorblender({ r: 167, g: 40, b: 13 })
  .harmonies('complementary')
  .map((c) => c.hex()); // ['#A7290D', '#0D8BA7']

colorblender({ r: 167, g: 40, b: 13 })
  .harmonies('split-complementary')
  .map((c) => c.hex()); // ['#A7290D', '#0DA776', '#0D3EA7']

colorblender({ r: 167, g: 40, b: 13 })
  .harmonies('double-split-complementary')
  .map((c) => c.hex()); // ['#A70D3E', '#A7290D', '#A7760D', '#0DA776', '#0D3EA7']

colorblender({ r: 167, g: 40, b: 13 })
  .harmonies('tetradic')
  .map((c) => c.hex()); // ['#A7290D', '#3EA70D', '#0D8BA7', '#760DA7']

colorblender({ r: 167, g: 40, b: 13 })
  .harmonies('triadic')
  .map((c) => c.hex()); // ['#A7290D', '#0DA729', '#290DA7']

colorblender({ r: 167, g: 40, b: 13 })
  .harmonies('rectangle')
  .map((c) => c.hex()); // ['#A7290D', '#8BA70D', '#0D8BA7', '#290DA7']
```

</details>

#### Analysis

<details>
<summary><b><code>.isValid()</code></b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).isValid(); // true
colorblender({ r: 167, g: 40, a: 13 }).isValid(); // false
```

</details>

<details>
<summary><b><code>.isDark()</code></b></summary><br>

```typescript
colorblender({ r: 0, g: 0, b: 0 }).isDark(); // true
colorblender({ r: 255, g: 255, b: 255 }).isDark(); // false
```

</details>

<details>
<summary><b><code>.isLight()</code></b></summary><br>

```typescript
colorblender({ r: 0, g: 0, b: 0 }).isLight(); // false
colorblender({ r: 255, g: 255, b: 255 }).isLight(); // true
```

</details>

<details>
<summary><b><code>.isEqual(color: AnyColor | Colorblender)</code></b></summary><br>

```typescript
colorblender({ r: 0, g: 0, b: 0 }).isEqual({ r: 255, g: 255, b: 255 }); // false
colorblender({ r: 255, g: 255, b: 255 }).isEqual('#FFF'); // true
colorblender({ r: 255, g: 255, b: 255 }).isEqual(colorblender('#FFF')); // true
```

</details>

<details>
<summary><b><code>.brightness(raw = false)</code></b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).brightness(); // 0.29
colorblender({ r: 167, g: 40, b: 13 }).brightness(true); // 0.29370588235294115
```

</details>

<details>
<summary><b><code>.alpha()</code></b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13, a: 0.59 }).alpha(); // 0.59
```

</details>

<details>
<summary><b><code>.hue()</code></b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).hue(); // 11
```

</details>

<details>
<summary><b><code>.luminosity()</code></b> extension <b>a11y</b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).luminosity(); // 0.0976213184127798
```

</details>

<details>
<summary><b><code>.contrast(color: AnyColor | Colorblender)</code></b> extension <b>a11y</b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).contrast({ r: 28, g: 252, b: 185 }); // 5.308885390786212
```

</details>

<details>
<summary><b><code>.isReadable(color: AnyColor | Colorblender, options: ReadabilityOptions)</code></b> extension <b>a11y</b></summary><br>

```typescript
interface ReadabilityOptions {
  level?: 'AA' | 'AAA';
  size?: 'normal' | 'large';
}
```

```typescript
colorblender({ r: 167, g: 40, b: 13 }).isReadable(
  { r: 28, g: 252, b: 185 },
  {
    level: 'AAA',
    size: 'large',
  },
); // true
```

</details>

### Extensions

<details>
<summary><b><code>extend(extensions: Extension[])</code></b></summary><br>

```typescript
import { hwbExtension } from 'colorblender/extensions/hwb';
import { mixExtension } from 'colorblender/extensions/mix';

extend([hwbExtension, mixExtension]);
```

</details>

- **hwb** - HWB color model _0.86kb_
- **hcg** - HCG color model _0.68kb_
- **cmyk** - CMYK color model _0.5kb_
- **xyz** - XYZ color model _0.72kb_
- **lab** - LAB color model _1.1kb_
- **lch** - LCH color model _1.1kb_
- **mix** - Mix colors and create palettes _0.52kb_
- **a11y** - Accessibility analysis _0.48kb_
- **harmony** - Color harmonies _0.34kb_

## Issues

Please file an issue for bugs, missing documentation, or unexpected behavior.

[File an issue](https://github.com/Skyleen77/colorblender/issues)

## License

MIT

## Credits

The API was inspired by [color](https://www.npmjs.com/package/color) and [colord](https://www.npmjs.com/package/colord) libraries.
