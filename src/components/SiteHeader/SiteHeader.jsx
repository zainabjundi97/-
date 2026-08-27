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
        fill="#4EB67B"
      />
      <path d="M25 45 C38 45, 45 55, 45 90 L25 90 Z" fill="#2B2E71" />
      <path d="M75 45 C62 45, 55 55, 55 90 L75 90 Z" fill="#5191CE" />
    </svg>
  );
}

/**
 * Sticky floating glassmorphic site header (light chrome).
 * @param {{ activeTab: string, onTabChange: (id: string) => void }} props
 */
export default function SiteHeader({ activeTab, onTabChange }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <header
      className="sticky top-0 z-50 w-full overflow-x-hidden backdrop-blur-md border-b border-slate-200/80"
      style={{ backgroundColor: SITE_THEME.headerGlass }}
    >
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-4 px-4 sm:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-3 shrink-0 self-stretch lg:self-auto">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full border backdrop-blur-md shrink-0 bg-white shadow-sm"
            style={{ borderColor: SITE_THEME.headerBorder }}
          >
            <SiteLogo />
          </div>
          <div className="min-w-0">
            <p className="text-xs leading-snug" style={{ color: SITE_THEME.textMuted }}>
              منصة طلاب البكالوريا
            </p>
            <p
              className="hidden sm:block text-xs leading-snug tracking-wide"
              style={{ color: SITE_THEME.brandBlue }}
            >
              YOUR ACADEMIC DESTINATION
            </p>
          </div>
        </div>

        <nav
          aria-label="أقسام الكلية"
          className="w-full lg:w-auto lg:flex-1 flex justify-center order-3 lg:order-none"
        >
          <ul className="rounded-full bg-white border border-slate-200 shadow-sm px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 flex flex-wrap items-center justify-center gap-2 sm:gap-4 lg:gap-6 max-w-full">
            {NAV_ITEMS.map((dept) => {
              const isActive = activeTab === dept.id;
              const activeBg = dept.navActive ?? dept.accent;
              const activeTextColor =
                dept.id === 'contest' ? SITE_THEME.textPrimary : SITE_THEME.navTextActive;

              return (
                <li key={dept.id} className="relative">
                  <button
                    type="button"
                    onClick={() => onTabChange(dept.id)}
                    className="relative min-h-[44px] px-2.5 sm:px-3 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                    style={{
                      color: isActive ? activeTextColor : SITE_THEME.navText,
                    }}
                  >
                    {isActive &&
                      (prefersReducedMotion ? (
                        <span
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: activeBg }}
                        />
                      ) : (
                        <MotionSpan
                          layoutId={navShell.layoutId}
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: activeBg }}
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

        <div className="shrink-0 self-stretch lg:self-auto flex justify-end items-center">
          <p
            className="min-h-[44px] inline-flex items-center rounded-full bg-white border border-slate-200 shadow-sm px-4 py-2.5 text-sm font-semibold whitespace-nowrap"
            style={{ color: SITE_THEME.brandDark }}
          >
            جامعة اللاذقية
          </p>
        </div>
      </div>
    </header>
  );
}
