import { Icon } from './Icon.js';
import { toKebabCase, toPascalCase } from './shared/index.js';
import type { IconNode } from './types.js';

/**
 * Create a Lucide icon custom element class and register it as `lucide-${iconName}`.
 *
 * `iconName` is the Lucide slug (e.g. `arrow-up-1-0`) and is used verbatim for
 * the tag name so it always matches the `./icons/*` import path. Deriving it
 * from PascalCase would be lossy (`arrow-up-1-0` -> `arrow-up10`).
 */
export default function createLucideIcon(
  iconName: string,
  iconNode: IconNode,
): CustomElementConstructor {
  const tagName = toKebabCase(iconName);

  class LucideIcon extends Icon {
    constructor() {
      super();
      this.iconNode = iconNode;
      this.name = tagName;
    }
  }

  const tag = `lucide-${tagName}`;

  if (!customElements.get(tag)) {
    customElements.define(tag, LucideIcon);
  }

  Object.defineProperty(LucideIcon, 'name', { value: toPascalCase(iconName) });

  return LucideIcon as CustomElementConstructor;
}
