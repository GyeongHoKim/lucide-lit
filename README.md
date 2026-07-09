# Lucide Lit

Lucide icons as Lit custom elements.

Each icon is registered as a web component, so you can use Lucide icons in Lit
templates as regular HTML tags such as `<lucide-camera>`,
`<lucide-circle-alert>`, and `<lucide-search>`.

Try the interactive demo: https://gyeonghokim.github.io/lucide-lit/

## Installation

```sh
pnpm add @gyeonghokim/lucide-lit lit
```

```sh
npm install @gyeonghokim/lucide-lit lit
```

```sh
yarn add @gyeonghokim/lucide-lit lit
```

```sh
bun add @gyeonghokim/lucide-lit lit
```

`lit` is a peer dependency, so it should be installed by your application.

## Quick start

Import the icons you want to use as **side-effect imports**. Importing the icon
module registers its custom element — no `void` workarounds needed.

```ts
import { LitElement, html } from 'lit';
import '@gyeonghokim/lucide-lit/icons/camera';

class UploadButton extends LitElement {
  render() {
    return html`
      <button>
        <lucide-camera size="20" aria-hidden="true"></lucide-camera>
        Upload
      </button>
    `;
  }
}

customElements.define('upload-button', UploadButton);
```

You can also import an icon once in an application entry file and use its tag in
any Lit template loaded after that import.

```ts
import '@gyeonghokim/lucide-lit/icons/search';
```

```html
<lucide-search></lucide-search>
```

## Icon names

Lucide icon component names map to kebab-case custom element tags:

| Import name | Custom element |
| --- | --- |
| `Camera` | `<lucide-camera>` |
| `CircleAlert` | `<lucide-circle-alert>` |
| `PanelLeftOpen` | `<lucide-panel-left-open>` |

Browse the available icon names in the Lucide icon directory:
https://lucide.dev/icons

## Customizing icons

Icons use Lucide's default SVG styling: `size="24"`, `color="currentColor"`,
`stroke-width="2"`, `fill="none"`, and rounded stroke caps and joins.

```html
<lucide-camera
  size="32"
  color="tomato"
  stroke-width="1.5"
></lucide-camera>
```

Supported attributes:

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | number | `24` | Sets both SVG width and height. |
| `color` | string | `currentColor` | Sets the SVG stroke color. |
| `stroke-width` | number | `2` | Sets the SVG stroke width. |
| `absolute-stroke-width` | boolean | `false` | Keeps the visual stroke width consistent when `size` changes. |
| `class` | string | none | Adds classes to the host and the rendered SVG. |
| `aria-hidden` | string | automatic | Controls whether assistive technology ignores the icon. |
| `aria-label` | string | none | Labels a meaningful icon. |
| `title` | string | none | Adds a title attribute to the rendered SVG. |
| `role` | string | none | Sets the rendered SVG role. |

Use Lit property or boolean attribute bindings when values are dynamic:

```ts
html`
  <lucide-camera
    .size=${32}
    .color=${'tomato'}
    .strokeWidth=${1.5}
    .absoluteStrokeWidth=${true}
  ></lucide-camera>
`;
```

```ts
html`
  <lucide-camera
    size=${this.iconSize}
    ?absolute-stroke-width=${this.keepStrokeWidth}
  ></lucide-camera>
`;
```

## Styling

Because the default stroke color is `currentColor`, icons usually inherit color
from the surrounding text or from the host element.

```css
button {
  color: rebeccapurple;
}

lucide-camera {
  color: var(--accent-color);
}
```

```html
<button>
  <lucide-camera size="18" aria-hidden="true"></lucide-camera>
  Take photo
</button>
```

The SVG is rendered inside the custom element's shadow root. Prefer the public
attributes above for size, color, stroke width, and accessibility rather than
styling internal SVG selectors from outside the component.

## Accessibility

Decorative icons should be hidden from assistive technology:

```html
<lucide-camera aria-hidden="true"></lucide-camera>
```

Meaningful icons should have an accessible name:

```html
<lucide-camera role="img" aria-label="Open camera"></lucide-camera>
```

If you do not pass `aria-label`, `title`, `role`, `aria-hidden`, or slotted
content, the icon defaults to `aria-hidden="true"`.

## Bundle behavior

Prefer individual side-effect imports for each icon your component renders.
Each import registers only that icon's custom element, keeping your bundle
small:

```ts
import '@gyeonghokim/lucide-lit/icons/camera';
import '@gyeonghokim/lucide-lit/icons/search';
```

If you need to reference the icon class directly (for TypeScript types, or
to pass it as a value), use a named import from the main entry point:

```ts
import { Camera, type Camera as CameraType } from '@gyeonghokim/lucide-lit';
```

Avoid namespace imports unless you intentionally need to reference many icons
or are using a bundler that does not support tree-shaking:

```ts
import * as lucideIcons from '@gyeonghokim/lucide-lit';
```

## Custom icons

Use `createLucideIcon` when you want to register an icon from a Lucide-style
icon node.

```ts
import { createLucideIcon } from '@gyeonghokim/lucide-lit';

export const BrandMark = createLucideIcon('BrandMark', [
  ['path', { d: 'M4 4h16v16H4z' }],
  ['path', { d: 'M8 8h8v8H8z' }],
]);
```

```html
<lucide-brand-mark></lucide-brand-mark>
```

## Server-side rendering

Icon modules register custom elements when they are imported, so they need a
browser environment with `customElements`.

For SSR frameworks, import icons from client-only modules or load them
dynamically in the browser:

```ts
if (typeof window !== 'undefined') {
  const { Camera } = await import('@gyeonghokim/lucide-lit');
  void Camera;
}
```
