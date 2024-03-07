<div align="center">
  <p></p>
  <img src="./logo.png" width="300" />
  <p></p>

  <p>A powerful and fully typed color library.</p>
</div>

## Features

- **Fully typed** - Written in TypeScript
- **Tiny** - Less than 10kb gzipped
- **Fast** - 3x faster than the most popular color library
- **Simple** - Chainable methods
- **Complete** - Supports a lot of color models
- **Conversion** - Convert between any of the supported color models
- **Plugins** - Extend the library with custom color models
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
// HWB
colorblender({ h: 0, s: 0, i: 1 });
colorblender({ h: 0, s: 0, i: 1, a: 1 });
// HCG
colorblender({ h: 0, w: 100, b: 0 });
colorblender({ h: 0, w: 100, b: 0, a: 1 });
// HSI
colorblender({ h: 360, c: 0, g: 100 });
colorblender({ h: 360, c: 0, g: 100, a: 1 });
// CMYK
colorblender({ c: 0, m: 0, y: 0, k: 0 });
colorblender({ c: 0, m: 0, y: 0, k: 0, a: 1 });
// XYZ
colorblender({ x: 95.047, y: 100, z: 108.883 });
colorblender({ x: 95.047, y: 100, z: 108.883, a: 1 });
// LAB
colorblender({ l: 100, a: 0, b: 0 });
colorblender({ l: 100, a: 0, b: 0, a: 1 });
// LCH
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
<summary><b><code>.hwb(raw = false)</code></b> extension <a href="https://www.npmjs.com/package/@colorblender/hwb"><b>@colorblender/hwb</b></a></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).hwb(); // { h: 11, w: 5, b: 35, a: 1 }
colorblender({ r: 167, g: 40, b: 13, a: 0.5 }).hwb(); // { h: 11, w: 5, b: 35, a: 0.5 }
colorblender({ r: 167, g: 40, b: 13 }).hwb(true); // { h: 10.51948051948052, w: 5.098039215686274, b: 34.509803921568626, , a: 1 }
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

```typescript
colorblender({ r: 167, g: 40, b: 13 }).lighten(0.2).rgb(); // { r: 200, b: 16, g: 48, a: 1 }
```

</details>

<details>
<summary><b><code>.darken(ratio: number)</code></b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).darken(0.2).rgb(); // { r: 134, b: 10, g: 32, a: 1 }
```

</details>

<details>
<summary><b><code>.saturate(ratio: number)</code></b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).saturate(0.2).rgb(); // { r: 180, b: 0, g: 32, a: 1 }
```

</details>

<details>
<summary><b><code>.desaturate(ratio: number)</code></b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).desaturate(0.2).rgb(); // { r: 152, b: 50, g: 28, a: 1 }
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
<summary><b><code>.mix(color: AnyColor | Colorblender, weight = 0.5)</code></b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 })
  .mix({ r: 28, g: 252, b: 185 }, 0.2)
  .rgb(); // { r: 139, g: 82, b: 47, a: 1 }
```

</details>

<details>
<summary><b><code>.mixMultiple(color: AnyColor | Colorblender, amount: number)</code></b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 })
  .mixMultiple({ r: 28, g: 252, b: 185 }, 3)
  .map((c) => c.rgb());
// [
//   { r: 132, b: 56, g: 93, a: 1 },
//   { r: 98, b: 99, g: 146, a: 1 },
//   { r: 63, b: 142, g: 199, a: 1 },
// ]
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
<summary><b><code>.luminosity()</code></b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).luminosity(); // 0.0976213184127798
```

</details>

<details>
<summary><b><code>.contrast(color: AnyColor | Colorblender)</code></b></summary><br>

```typescript
colorblender({ r: 167, g: 40, b: 13 }).contrast({ r: 28, g: 252, b: 185 }); // 0.0976213184127798
colorblender({ r: 167, g: 40, b: 13 }).contrast(
  colorblender({ r: 28, g: 252, b: 185 }),
); // 0.0976213184127798
```

</details>

### Extensions

- [@colorblender/hwb](https://www.npmjs.com/package/@colorblender/hwb)

## Issues

Please file an issue for bugs, missing documentation, or unexpected behavior.

[File an issue](https://github.com/Skyleen77/colorblender/issues)

## License

MIT
