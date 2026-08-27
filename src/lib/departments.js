/** Unified light site shell — projector-friendly */
export const SITE_THEME = {
  shellBg: '#F5F7FA',
  headerGlass: 'rgba(255,255,255,0.72)',
  headerBg: '#FFFFFF',
  headerBorder: 'rgba(43, 46, 113, 0.12)',
  cardBg: '#FFFFFF',
  cardBorder: 'rgba(43, 46, 113, 0.12)',
  textPrimary: '#171A24',
  textMuted: '#5B6475',
  textHeading: '#2B2E71',
  navAccent: '#4EB67B',
  navInactive: 'rgba(43, 46, 113, 0.08)',
  navInactiveHover: 'rgba(43, 46, 113, 0.14)',
  navText: 'rgba(43, 46, 113, 0.7)',
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
    navActive: '#5191CE',
    heroFrom: '#2B2E71',
    heroTo: '#4EB67B',
    accent: '#2B2E71',
    accentSecondary: '#5191CE',
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
  networks: {
    id: 'networks',
    label: 'الشبكات',
    navActive: '#5DBB78',
    heroFrom: '#5DBB78',
    heroTo: '#2B2E71',
    accent: '#5DBB78',
    accentSecondary: '#5191CE',
    sceneVariant: 'network',
  },
  ai: {
    id: 'ai',
    label: 'الذكاء الاصطناعي',
    navActive: '#5191CE',
    heroFrom: '#5191CE',
    heroTo: '#2B2E71',
    accent: '#5191CE',
    accentSecondary: '#4EB67B',
    sceneVariant: 'torusKnot',
  },
  contest: {
    id: 'contest',
    label: 'المسابقة البرمجية',
    navActive: '#E6B84A',
    heroFrom: '#E6B84A',
    heroTo: '#2B2E71',
    accent: '#E6B84A',
    accentSecondary: '#5191CE',
    sceneVariant: 'stackCrystal',
  },
};

export const NAV_ITEMS = Object.values(DEPARTMENTS);

/** @param {string} id */
export function getDepartment(id) {
  return DEPARTMENTS[id] ?? DEPARTMENTS.software;
}
