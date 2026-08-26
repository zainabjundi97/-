/** Unified site shell — shared across all departments */
export const SITE_THEME = {
  shellBg: '#151d35',
  headerBg: '#1B296B',
  headerBorder: 'rgba(81, 145, 206, 0.22)',
  cardBg: 'rgba(27, 41, 107, 0.28)',
  cardBorder: 'rgba(81, 145, 206, 0.28)',
  textPrimary: '#f1f5f9',
  textMuted: '#94a3b8',
  textHeading: '#e2e8f0',
  navInactive: 'rgba(37, 57, 142, 0.55)',
  navInactiveHover: '#2B2E71',
  navAccent: '#4EB67B',
  navText: 'rgba(241, 245, 249, 0.75)',
  navTextActive: '#ffffff',
  footerBg: '#1B296B',
};

/** Department themes — accent + hero only; shell stays unified */
export const DEPARTMENTS = {
  home: {
    id: 'home',
    label: 'الصفحة الرئيسية',
    navActive: '#4EB67B',
    heroFrom: '#1B296B',
    heroTo: '#2a3f7a',
    accent: '#5191CE',
    accentSecondary: '#4EB67B',
    sceneVariant: 'layers',
  },
  basics: {
    id: 'basics',
    label: 'علوم أساسية',
    navActive: '#5191CE',
    heroFrom: '#1B296B',
    heroTo: '#498BC9',
    accent: '#4EB67B',
    accentSecondary: '#5191CE',
    sceneVariant: 'layers',
  },
  software: {
    id: 'software',
    label: 'هندسة البرمجيات',
    navActive: '#5DBB78',
    heroFrom: '#06030e',
    heroTo: '#2e1065',
    accent: '#a78bfa',
    accentSecondary: '#5DBB78',
    sceneVariant: 'network',
  },
  networks: {
    id: 'networks',
    label: 'الشبكات',
    navActive: '#5191CE',
    heroFrom: '#2B2E71',
    heroTo: '#5191CE',
    accent: '#5191CE',
    accentSecondary: '#4EB67B',
    sceneVariant: 'network',
  },
  ai: {
    id: 'ai',
    label: 'الذكاء الاصطناعي',
    navActive: '#E6B84A',
    heroFrom: '#4c1d95',
    heroTo: '#7957A8',
    accent: '#E6B84A',
    accentSecondary: '#a78bfa',
    sceneVariant: 'torusKnot',
  },
  contest: {
    id: 'contest',
    label: 'المسابقة البرمجية',
    navActive: '#E6B84A',
    heroFrom: '#171A24',
    heroTo: '#2B2E71',
    accent: '#5DBB78',
    accentSecondary: '#E6B84A',
    sceneVariant: 'stackCrystal',
  },
};

export const NAV_ITEMS = Object.values(DEPARTMENTS);

/** @param {string} id */
export function getDepartment(id) {
  return DEPARTMENTS[id] ?? DEPARTMENTS.software;
}
