import { NAV_ITEMS, SITE_THEME } from '../../lib/departments';

function SiteLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M50 10 C50 25, 55 30, 70 30 C55 30, 50 35, 50 50 C50 35, 45 30, 30 30 C45 30, 50 25, 50 10 Z"
        fill="#2EA879"
      />
      <path d="M25 45 C38 45, 45 55, 45 90 L25 90 Z" fill="#1B296B" />
      <path d="M75 45 C62 45, 55 55, 55 90 L75 90 Z" fill="#498BC9" />
    </svg>
  );
}

/**
 * Shared site header with department navigation.
 * @param {{ activeTab: string, onTabChange: (id: string) => void }} props
 */
export default function SiteHeader({ activeTab, onTabChange }) {
  return (
    <header
      className="w-full flex-shrink-0 z-50 shadow-md overflow-x-hidden"
      style={{
        backgroundColor: SITE_THEME.headerBg,
        borderBottom: `1px solid ${SITE_THEME.headerBorder}`,
      }}
    >
      <div className="w-full px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl border"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              borderColor: SITE_THEME.headerBorder,
            }}
          >
            <SiteLogo />
          </div>
          <div>
            <h1
              className="text-lg sm:text-xl font-black leading-tight"
              style={{ color: SITE_THEME.textPrimary }}
            >
              وجهتك الأكاديمية
            </h1>
            <p className="text-[10px] sm:text-xs font-bold text-[#498BC9] tracking-wider uppercase">
              YOUR ACADEMIC DESTINATION
            </p>
          </div>
        </div>

        <nav
          aria-label="أقسام الكلية"
          className="w-full md:w-auto md:flex-1 md:max-w-4xl"
        >
          <ul className="flex flex-wrap justify-center gap-2 w-full">
            {NAV_ITEMS.map((dept) => {
              const isActive = activeTab === dept.id;
              return (
                <li key={dept.id}>
                  <button
                    type="button"
                    onClick={() => onTabChange(dept.id)}
                    className="min-h-[44px] px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-white text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap"
                    style={{
                      backgroundColor: isActive ? dept.navActive : SITE_THEME.navInactive,
                      opacity: isActive ? 1 : 0.88,
                      transform: isActive ? 'scale(1.03)' : 'scale(1)',
                      boxShadow: isActive ? '0 4px 14px rgba(0,0,0,0.25)' : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = SITE_THEME.navInactiveHover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = SITE_THEME.navInactive;
                      }
                    }}
                  >
                    {dept.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
