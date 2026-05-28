export const ICONS = [
  { id: 'camera', label: 'Camera', tag: 'lucide-camera', importName: 'Camera' },
  { id: 'search', label: 'Search', tag: 'lucide-search', importName: 'Search' },
  {
    id: 'circle-alert',
    label: 'CircleAlert',
    tag: 'lucide-circle-alert',
    importName: 'CircleAlert',
  },
  {
    id: 'panel-left-open',
    label: 'PanelLeftOpen',
    tag: 'lucide-panel-left-open',
    importName: 'PanelLeftOpen',
  },
  {
    id: 'download',
    label: 'Download',
    tag: 'lucide-download',
    importName: 'Download',
  },
  { id: 'heart', label: 'Heart', tag: 'lucide-heart', importName: 'Heart' },
  {
    id: 'palette',
    label: 'Palette',
    tag: 'lucide-palette',
    importName: 'Palette',
  },
  {
    id: 'settings',
    label: 'Settings',
    tag: 'lucide-settings',
    importName: 'Settings',
  },
  {
    id: 'shield-check',
    label: 'ShieldCheck',
    tag: 'lucide-shield-check',
    importName: 'ShieldCheck',
  },
  { id: 'zap', label: 'Zap', tag: 'lucide-zap', importName: 'Zap' },
] as const;

export type IconId = (typeof ICONS)[number]['id'];

export const DEFAULT_DEMO_STATE = {
  selectedIcon: 'camera' as IconId,
  size: 56,
  color: '#2563eb',
  strokeWidth: 2,
  absoluteStrokeWidth: false,
};
