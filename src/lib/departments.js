/** Site shell — theme-aware via CSS variables from src/index.css (light/dark). */
export const SITE_THEME = {
  shellBg: 'var(--shell-bg)',
  headerGlass: 'var(--header-glass)',
  headerBg: 'var(--card-bg)',
  headerBorder: 'var(--card-border)',
  cardBg: 'var(--card-bg)',
  cardBorder: 'var(--card-border)',
  textPrimary: 'var(--text-primary)',
  textMuted: 'var(--text-muted)',
  textHeading: 'var(--text-heading)',
  navAccent: '#4EB67B',
  navInactive: 'var(--nav-inactive)',
  navInactiveHover: 'var(--nav-inactive-hover)',
  navText: 'var(--nav-text)',
  navTextActive: '#FFFFFF',
  footerBg: '#2B2E71',
  brandBlue: '#5191CE',
  brandDark: '#2B2E71',
  brandGreen: '#4EB67B',
};

/**
 * Department themes — specialty accent is dominant.
 * home/basics use brand dark blue (not specialty tracks).
 */
export const DEPARTMENTS = {
  home: {
    id: 'home',
    label: 'الصفحة الرئيسية',
    navActive: '#4EB67B',
    heroFrom: '#2B2E71',
    heroTo: '#5191CE',
    accent: '#2B2E71',
    accentSecondary: '#4EB67B',
    sceneVariant: 'layers',
  },
  basics: {
    id: 'basics',
    label: 'علوم أساسية',
    navActive: '#7EB8E4',
    heroFrom: '#2B2E71',
    heroTo: '#4EB67B',
    accent: '#2B2E71',
    accentSecondary: '#7EB8E4',
    sceneVariant: 'layers',
  },
  software: {
    id: 'software',
    label: 'هندسة البرمجيات',
    navActive: '#7957A8',
    heroFrom: '#7957A8',
    heroTo: '#5a3f82',
    accent: '#7957A8',
    accentSecondary: '#4EB67B',
    sceneVariant: 'network',
  },
};

export const NAV_ITEMS = Object.values(DEPARTMENTS);

/** Tracks shown as path cards but hosted on external sites (not nav tabs). */
export const EXTERNAL_TRACKS = {
  networks: {
    id: 'networks',
    label: 'الشبكات',
    accent: '#5DBB78',
    accentSecondary: '#5191CE',
  },
};

/** @param {string} id */
export function getDepartment(id) {
  return DEPARTMENTS[id] ?? DEPARTMENTS.software;
}

/**
 * Theme for a path card: internal department first, then external track.
 * @param {string} id
 */
export function getTrackTheme(id) {
  return DEPARTMENTS[id] ?? EXTERNAL_TRACKS[id] ?? DEPARTMENTS.software;
}
