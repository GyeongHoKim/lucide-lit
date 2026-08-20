import { html, LitElement, nothing, type PropertyValues, svg } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import defaultAttributes from './defaultAttributes.js';
import { iconNodeToSvgFragment } from './iconNodeToSvgFragment.js';
import {
  hasA11yProp,
  mergeClasses,
  toKebabCase,
  toPascalCase,
} from './shared/index.js';
import type { IconNode } from './types.js';

export class Icon extends LitElement {
  static shadowRootOptions = { mode: 'open' as const };

  static properties = {
    iconNode: { type: Array, attribute: false },
    name: { type: String, attribute: false },
    size: { type: Number, attribute: 'size' },
    color: { type: String, attribute: 'color' },
    strokeWidth: { type: Number, attribute: 'stroke-width' },
    absoluteStrokeWidth: { type: Boolean, attribute: 'absolute-stroke-width' },
    className: { type: String, attribute: 'class', reflect: true },
    ariaLabel: { type: String, attribute: 'aria-label' },
    ariaHidden: { type: String, attribute: 'aria-hidden' },
    title: { type: String, attribute: 'title', useDefault: true },
    role: { type: String, attribute: 'role' },
  };

  declare iconNode: IconNode;

  declare name: string;

  declare size: number;

  declare color: string | undefined;

  declare strokeWidth: number | undefined;

  declare absoluteStrokeWidth: boolean | undefined;

  declare className: string;

  declare ariaLabel: string | null;

  declare ariaHidden: string | null;

  declare title: string;

  declare role: string | null;

  constructor() {
    super();
    this.iconNode = [];
    this.name = '';
    this.size = 24;
    this.className = '';
    this.ariaLabel = null;
    this.ariaHidden = null;
    this.title = '';
    this.role = null;
  }

  private _hasSlottedContent = false;

  private _onSlotChange = (): void => {
    this._refreshSlottedState();
  };

  private _refreshSlottedState(): void {
    const slot = this.renderRoot?.querySelector('slot');
    if (!(slot instanceof HTMLSlotElement)) return;
    const has = slot
      .assignedNodes()
      .some(
        (n) =>
          n.nodeType === Node.ELEMENT_NODE ||
          (n.nodeType === Node.TEXT_NODE &&
            (n.textContent?.trim().length ?? 0) > 0),
      );
    if (has !== this._hasSlottedContent) {
      this._hasSlottedContent = has;
      this.requestUpdate();
    }
  }

  override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    queueMicrotask(() => this._refreshSlottedState());
  }

  private _a11yPropsForCheck(): Record<string, unknown> {
    const o: Record<string, unknown> = {};
    if (this.ariaLabel != null && this.ariaLabel !== '')
      o['aria-label'] = this.ariaLabel;
    if (this.title != null && this.title !== '') o.title = this.title;
    if (this.role != null && this.role !== '') o.role = this.role;
    if (this.ariaHidden != null && this.ariaHidden !== '')
      o['aria-hidden'] = this.ariaHidden;
    return o;
  }

  private _defaultAriaHidden(): boolean {
    if (this._hasSlottedContent) return false;
    return !hasA11yProp(this._a11yPropsForCheck());
  }

  render() {
    const width = Number(this.size) || 24;
    const strokeW = Number(
      this.strokeWidth ?? Number(defaultAttributes['stroke-width']),
    );
    const calculatedStrokeWidth =
      this.absoluteStrokeWidth === true ? (strokeW * 24) / width : strokeW;

    const strokeColor = this.color ?? String(defaultAttributes.stroke);

    const classNames = mergeClasses(
      'lucide',
      ...(this.name
        ? [
            `lucide-${toKebabCase(toPascalCase(this.name))}`,
            `lucide-${toKebabCase(this.name)}`,
          ]
        : []),
      this.className,
    );

    const ariaHiddenAttr = (): string | typeof nothing => {
      if (this.ariaHidden != null) return this.ariaHidden;
      if (this._defaultAriaHidden()) return 'true';
      return nothing;
    };

    const inner = iconNodeToSvgFragment(this.iconNode);

    return html`
      ${svg`
        <svg
          xmlns=${defaultAttributes.xmlns}
          width=${width}
          height=${width}
          viewBox=${defaultAttributes.viewBox}
          fill=${defaultAttributes.fill}
          stroke=${strokeColor}
          stroke-width=${calculatedStrokeWidth}
          stroke-linecap=${defaultAttributes['stroke-linecap']}
          stroke-linejoin=${defaultAttributes['stroke-linejoin']}
          class=${classNames}
          aria-hidden=${ariaHiddenAttr()}
          aria-label=${this.ariaLabel ? this.ariaLabel : nothing}
          title=${this.title ? this.title : nothing}
          role=${this.role ? this.role : nothing}
        >
          ${unsafeSVG(inner)}
        </svg>
      `}
      <slot @slotchange=${this._onSlotChange}></slot>
    `;
  }
}
