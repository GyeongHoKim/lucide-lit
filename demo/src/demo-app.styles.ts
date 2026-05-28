import { css } from 'lit';

export const DEMO_APP_STYLES = css`
  :host {
    display: block;
    min-height: 100vh;
    color: #1c2430;
    background:
      linear-gradient(180deg, #f8faf9 0%, #eef2f4 100%),
      #f8faf9;
    font-family:
      Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  main {
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
    padding: 32px 0;
  }

  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    padding: 20px 0 28px;
  }

  h1 {
    margin: 0;
    font-size: clamp(2rem, 6vw, 4.25rem);
    line-height: 0.95;
    letter-spacing: 0;
    color: #111827;
  }

  .intro {
    max-width: 560px;
    margin: 14px 0 0;
    color: #52606d;
    font-size: 1rem;
    line-height: 1.65;
  }

  .version {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 36px;
    padding: 0 12px;
    border: 1px solid #cfd8de;
    border-radius: 8px;
    color: #344255;
    background: #ffffff;
    white-space: nowrap;
  }

  .workspace {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
    gap: 18px;
    align-items: start;
  }

  .panel {
    border: 1px solid #d7dee4;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 18px 42px rgba(24, 40, 55, 0.08);
    overflow: hidden;
  }

  .preview {
    display: grid;
    place-items: center;
    min-height: 360px;
    padding: 32px;
    color: var(--demo-icon-color);
    background:
      linear-gradient(#dce4e9 1px, transparent 1px),
      linear-gradient(90deg, #dce4e9 1px, transparent 1px),
      #f6f8f9;
    background-size: 28px 28px;
  }

  .preview-icon {
    display: grid;
    place-items: center;
    width: min(280px, 70vw);
    aspect-ratio: 1;
    border: 1px solid #cfd8de;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: inset 0 0 0 8px #f5f7f8;
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 18px 20px;
    border-top: 1px solid #d7dee4;
  }

  .meta h2,
  .controls h2,
  .icons h2,
  .code h2 {
    margin: 0;
    font-size: 1rem;
    color: #111827;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    min-height: 32px;
    padding: 0 10px;
    border-radius: 8px;
    color: #0f5d56;
    background: #e5f4f1;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    font-size: 0.875rem;
  }

  .controls {
    display: grid;
    gap: 18px;
    padding: 20px;
  }

  label {
    display: grid;
    gap: 8px;
    color: #344255;
    font-size: 0.92rem;
    font-weight: 650;
  }

  .label-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .value {
    color: #697789;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    font-size: 0.86rem;
    font-weight: 500;
  }

  input[type='range'] {
    width: 100%;
    accent-color: #2563eb;
  }

  input[type='color'] {
    width: 100%;
    height: 42px;
    padding: 4px;
    border: 1px solid #cfd8de;
    border-radius: 8px;
    background: #ffffff;
  }

  .toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 14px;
    border: 1px solid #d7dee4;
    border-radius: 8px;
    background: #f8faf9;
    color: #344255;
    font-weight: 650;
  }

  input[type='checkbox'] {
    width: 20px;
    height: 20px;
    accent-color: #16a34a;
  }

  .icons {
    margin-top: 18px;
    padding: 20px;
  }

  .icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
    gap: 10px;
    margin-top: 14px;
  }

  button {
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr);
    align-items: center;
    gap: 10px;
    min-height: 48px;
    padding: 10px 12px;
    border: 1px solid #d7dee4;
    border-radius: 8px;
    color: #1c2430;
    background: #ffffff;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  button:hover {
    border-color: #9fb1bf;
    background: #f8faf9;
  }

  button[aria-pressed='true'] {
    border-color: #2563eb;
    color: #1d4ed8;
    background: #edf4ff;
    box-shadow: inset 0 0 0 1px #2563eb;
  }

  button span {
    min-width: 0;
    overflow-wrap: anywhere;
    font-weight: 650;
  }

  .code {
    margin-top: 18px;
    overflow: hidden;
  }

  .code h2 {
    padding: 18px 20px 0;
  }

  pre {
    margin: 0;
    padding: 18px 20px 20px;
    overflow: auto;
    color: #e5eef7;
    background: #17202b;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  @media (max-width: 820px) {
    main {
      width: min(100% - 24px, 640px);
      padding: 20px 0;
    }

    header,
    .workspace {
      grid-template-columns: 1fr;
    }

    header {
      display: grid;
    }

    .version {
      width: max-content;
    }

    .preview {
      min-height: 280px;
      padding: 24px;
    }
  }
`;
