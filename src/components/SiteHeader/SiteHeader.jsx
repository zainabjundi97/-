import { motion } from 'motion/react';
import { getDepartment, NAV_ITEMS, SITE_THEME } from '../../lib/departments';
import { navShell } from '../../lib/animations';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useUiSound } from '../../hooks/useUiSound';
import './SiteHeader.css';

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
 * Sticky floating glassmorphic site header.
 * @param {{ activeTab: string, onTabChange: (id: string) => void, theme?: string, onToggleTheme?: () => void }} props
 */
export default function SiteHeader({ activeTab, onTabChange, theme, onToggleTheme }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { play } = useUiSound();
  const activeDept = getDepartment(activeTab);
  const borderColor = activeDept.navActive ?? activeDept.accent;

  return (
    <header
      className="sticky top-0 z-50 w-full max-w-full overflow-x-hidden backdrop-blur-md border-b"
      style={{
        backgroundColor: SITE_THEME.headerGlass,
        borderBottomWidth: 2,
        borderBottomColor: borderColor,
      }}
    >
      <div className="w-full max-w-[90rem] mx-auto flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-4 px-3 py-2 sm:px-8 sm:py-3 lg:py-4">
        <div className="flex items-center gap-3 shrink-0 self-stretch lg:self-auto w-full lg:w-auto max-w-full">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full border backdrop-blur-md shrink-0 shadow-sm"
            style={{ borderColor: SITE_THEME.headerBorder, backgroundColor: SITE_THEME.cardBg }}
          >
            <SiteLogo />
          </div>
          <div className="min-w-0">
            <p className="text-sm leading-snug" style={{ color: SITE_THEME.textMuted }}>
              منصة طلاب البكالوريا
            </p>
            <p
              className="hidden lg:block text-sm leading-snug tracking-wide"
              style={{ color: SITE_THEME.brandBlue }}
            >
              YOUR ACADEMIC DESTINATION
            </p>
          </div>
        </div>

        <nav
          aria-label="أقسام الكلية"
          className="w-full max-w-full lg:w-auto lg:flex-1 flex justify-stretch lg:justify-center order-3 lg:order-none min-w-0"
        >
          <ul
            className="site-header-nav rounded-full border shadow-sm px-2 sm:px-4 lg:px-8 py-1 sm:py-2 lg:py-3 flex flex-nowrap items-center justify-start lg:justify-center gap-1 sm:gap-2 lg:gap-4 w-full max-w-full  lg:w-auto overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none"
            style={{ backgroundColor: SITE_THEME.cardBg, borderColor: SITE_THEME.cardBorder }}
          >
            {NAV_ITEMS.map((dept) => {
              const isActive = activeTab === dept.id;
              const activeBg = dept.navActive ?? dept.accent;
              const activeTextColor =
                dept.id === 'basics' ? SITE_THEME.textPrimary : SITE_THEME.navTextActive;

              return (
                <li key={dept.id} className="relative shrink-0 snap-start">
                  <button
                    type="button"
                    onClick={() => {
                      play('tap');
                      onTabChange(dept.id);
                    }}
                    className="relative min-h-[44px] px-4 rounded-full text-sm sm:text-base font-semibold transition-colors cursor-pointer whitespace-nowrap"
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

        <div className="shrink-0 self-auto justify-end items-center flex gap-2">
          <p
            className="hidden lg:inline-flex min-h-[44px] items-center rounded-full border shadow-sm px-4 py-2.5 text-sm sm:text-base font-semibold whitespace-nowrap"
            style={{
              color: SITE_THEME.textHeading,
              backgroundColor: SITE_THEME.cardBg,
              borderColor: SITE_THEME.cardBorder,
            }}
          >
            جامعة اللاذقية
          </p>
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'التبديل للوضع الفاتح' : 'التبديل للوضع الداكن'}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full border shadow-sm text-base shrink-0"
              style={{
                color: SITE_THEME.textHeading,
                backgroundColor: SITE_THEME.cardBg,
                borderColor: SITE_THEME.cardBorder,
              }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
