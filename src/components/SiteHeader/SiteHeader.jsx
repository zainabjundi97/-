import { motion } from 'motion/react';
import { NAV_ITEMS, SITE_THEME } from '../../lib/departments';
import { navShell } from '../../lib/animations';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const MotionSpan = motion.span;

function SiteLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
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
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <header
      className="w-full flex-shrink-0 z-50 shadow-sm overflow-x-hidden"
      style={{
        backgroundColor: SITE_THEME.headerBg,
        borderBottom: `1px solid ${SITE_THEME.headerBorder}`,
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg border"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              borderColor: SITE_THEME.headerBorder,
            }}
          >
            <SiteLogo />
          </div>
          <div>
            <h1
              className="text-base sm:text-lg font-black leading-tight"
              style={{ color: SITE_THEME.textPrimary }}
            >
              وجهتك الأكاديمية
            </h1>
            <p className="hidden sm:block text-[10px] font-bold text-[#498BC9] tracking-wider uppercase">
              YOUR ACADEMIC DESTINATION
            </p>
          </div>
        </div>

        <nav aria-label="أقسام الكلية" className="w-full md:w-auto md:flex-1">
          <ul className="flex flex-wrap justify-center gap-1 sm:gap-1.5 w-full">
            {NAV_ITEMS.map((dept) => {
              const isActive = activeTab === dept.id;
              return (
                <li key={dept.id} className="relative">
                  <button
                    type="button"
                    onClick={() => onTabChange(dept.id)}
                    className={`relative min-h-[44px] px-2.5 sm:px-3.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-300/80 hover:text-white'
                    }`}
                  >
                    {isActive &&
                      (prefersReducedMotion ? (
                        <span
                          className="absolute inset-0 rounded-lg"
                          style={{ backgroundColor: SITE_THEME.navAccent }}
                        />
                      ) : (
                        <MotionSpan
                          layoutId={navShell.layoutId}
                          className="absolute inset-0 rounded-lg"
                          style={{ backgroundColor: SITE_THEME.navAccent }}
                          transition={navShell.transition}
                        />
                      ))}
                    <span className="relative z-10">{dept.label}</span>
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
