import {
  Camera,
  CircleAlert,
  Download,
  Heart,
  Palette,
  PanelLeftOpen,
  Search,
  Settings,
  ShieldCheck,
  Zap,
} from '@gyeonghokim/lucide-lit';
import { html, LitElement, type PropertyValues } from 'lit';
import {
  customElement,
  eventOptions,
  property,
  state,
} from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import {
  DEFAULT_DEMO_STATE,
  ICONS,
  type IconId,
} from './demo-app.constants';
import { DEMO_APP_STYLES } from './demo-app.styles';

void Camera;
void CircleAlert;
void Download;
void Heart;
void Palette;
void PanelLeftOpen;
void Search;
void Settings;
void ShieldCheck;
void Zap;

@customElement('lucide-lit-demo')
class LucideLitDemo extends LitElement {
  static styles = DEMO_APP_STYLES;

  @property({ type: String, attribute: 'selected-icon' })
  declare selectedIcon: IconId;

  @property({ type: Number })
  declare size: number;

  @property({ type: String })
  declare color: string;

  @property({ type: Number, attribute: 'stroke-width' })
  declare strokeWidth: number;

  @property({ type: Boolean, attribute: 'absolute-stroke-width' })
  declare absoluteStrokeWidth: boolean;

  @state()
  private activeIcon: (typeof ICONS)[number] = ICONS[0];

  @state()
  private activeCodeSample = '';

  constructor() {
    super();
    this.selectedIcon = DEFAULT_DEMO_STATE.selectedIcon;
    this.size = DEFAULT_DEMO_STATE.size;
    this.color = DEFAULT_DEMO_STATE.color;
    this.strokeWidth = DEFAULT_DEMO_STATE.strokeWidth;
    this.absoluteStrokeWidth = DEFAULT_DEMO_STATE.absoluteStrokeWidth;
    this.syncDerivedState();
  }

  protected willUpdate(changedProperties: PropertyValues<this>): void {
    if (
      changedProperties.has('selectedIcon') ||
      changedProperties.has('size') ||
      changedProperties.has('color') ||
      changedProperties.has('strokeWidth') ||
      changedProperties.has('absoluteStrokeWidth')
    ) {
      this.syncDerivedState();
    }
  }

  private syncDerivedState(): void {
    const active =
      ICONS.find((icon) => icon.id === this.selectedIcon) ?? ICONS[0];
    this.activeIcon = active;
    this.activeCodeSample = this.buildCodeSample(active);
  }

  private selectIcon(iconId: IconId): void {
    this.selectedIcon = iconId;
  }

  @eventOptions({ passive: true })
  private handleIconClick(event: Event): void {
    const target = event.currentTarget as HTMLButtonElement;
    const iconId = target.dataset.iconId as IconId | undefined;
    if (!iconId) {
      return;
    }
    this.selectIcon(iconId);
  }

  @eventOptions({ passive: true })
  private updateSize(event: Event): void {
    this.size = Number((event.currentTarget as HTMLInputElement).value);
  }

  @eventOptions({ passive: true })
  private updateColor(event: Event): void {
    this.color = (event.currentTarget as HTMLInputElement).value;
  }

  @eventOptions({ passive: true })
  private updateStrokeWidth(event: Event): void {
    this.strokeWidth = Number((event.currentTarget as HTMLInputElement).value);
  }

  @eventOptions({ passive: true })
  private updateAbsoluteStrokeWidth(event: Event): void {
    this.absoluteStrokeWidth = (
      event.currentTarget as HTMLInputElement
    ).checked;
  }

  private buildCodeSample(active: (typeof ICONS)[number]): string {
    return `import { html } from 'lit';
import { ${active.importName} } from '@gyeonghokim/lucide-lit';

void ${active.importName};

html\`
  <${active.tag}
    size="${this.size}"
    color="${this.color}"
    stroke-width="${this.strokeWidth}"
    ${this.absoluteStrokeWidth ? 'absolute-stroke-width' : ''}
    role="img"
    aria-label="${active.label}"
  ></${active.tag}>
\`;`;
  }

  private renderIcon(
    iconId: IconId,
    options: { size: number; decorative?: boolean },
  ) {
    const active = ICONS.find((icon) => icon.id === iconId) ?? ICONS[0];
    const iconTag = unsafeStatic(active.tag);
    const ariaHidden = options.decorative ? 'true' : undefined;
    const ariaLabel = options.decorative ? undefined : active.label;
    const role = options.decorative ? undefined : 'img';

    return staticHtml`<${iconTag}
      .size=${options.size}
      .color=${this.color}
      .strokeWidth=${this.strokeWidth}
      .absoluteStrokeWidth=${this.absoluteStrokeWidth}
      aria-hidden=${ifDefined(ariaHidden)}
      aria-label=${ifDefined(ariaLabel)}
      role=${ifDefined(role)}
    ></${iconTag}>`;
  }

  render() {
    const active = this.activeIcon;

    return html`
      <main>
        <header>
          <div>
            <h1>Lucide Lit</h1>
            <p class="intro">
              Custom element icons for Lit templates, imported from
              @gyeonghokim/lucide-lit and rendered as lucide-* tags.
            </p>
          </div>
          <div class="version">Lit 3 + Vite</div>
        </header>

        <section class="workspace" aria-label="Lucide Lit interactive demo">
          <div>
            <div class="panel">
              <div
                class="preview"
                style=${styleMap({ '--demo-icon-color': this.color })}
              >
                <div class="preview-icon">
                  ${this.renderIcon(this.selectedIcon, { size: this.size })}
                </div>
              </div>
              <div class="meta">
                <h2>${active.label}</h2>
                <span class="tag">&lt;${active.tag}&gt;</span>
              </div>
            </div>

            <section class="panel icons" aria-labelledby="icons-heading">
              <h2 id="icons-heading">Icons</h2>
              <div class="icon-grid">
                ${guard(
                  [
                    this.selectedIcon,
                    this.color,
                    this.strokeWidth,
                    this.absoluteStrokeWidth,
                  ],
                  () =>
                    repeat(
                      ICONS,
                      (icon) => icon.id,
                      (icon) => html`
                        <button
                          type="button"
                          data-icon-id=${icon.id}
                          aria-pressed=${icon.id === this.selectedIcon}
                          @click=${this.handleIconClick}
                        >
                          ${this.renderIcon(icon.id, {
                            size: 24,
                            decorative: true,
                          })}
                          <span>${icon.label}</span>
                        </button>
                      `,
                    ),
                )}
              </div>
            </section>
          </div>

          <div>
            <section class="panel controls" aria-labelledby="controls-heading">
              <h2 id="controls-heading">Attributes</h2>

              <label>
                <span class="label-row">
                  <span>size</span>
                  <span class="value">${this.size}px</span>
                </span>
                <input
                  type="range"
                  min="16"
                  max="128"
                  step="2"
                  .value=${String(this.size)}
                  @input=${this.updateSize}
                />
              </label>

              <label>
                <span class="label-row">
                  <span>color</span>
                  <span class="value">${this.color}</span>
                </span>
                <input
                  type="color"
                  .value=${this.color}
                  @input=${this.updateColor}
                />
              </label>

              <label>
                <span class="label-row">
                  <span>stroke-width</span>
                  <span class="value">${this.strokeWidth}</span>
                </span>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.25"
                  .value=${String(this.strokeWidth)}
                  @input=${this.updateStrokeWidth}
                />
              </label>

              <label class="toggle">
                <span>absolute-stroke-width</span>
                <input
                  type="checkbox"
                  .checked=${this.absoluteStrokeWidth}
                  @change=${this.updateAbsoluteStrokeWidth}
                />
              </label>
            </section>

            <section class="panel code" aria-labelledby="code-heading">
              <h2 id="code-heading">Lit Template</h2>
              <pre><code>${this.activeCodeSample}</code></pre>
            </section>
          </div>
        </section>
      </main>
    `;
  }
}
