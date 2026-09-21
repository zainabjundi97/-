import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SiteHeader from '../components/SiteHeader/SiteHeader';
import SiteFooter from '../components/SiteFooter/SiteFooter';
import HomePage from './HomePage';
import BasicsPage from './BasicsPage';
import SpecialtyPage from './SpecialtyPage';
import { SITE_THEME } from '../lib/departments';
import { fadeIn, reducedMotionVariants } from '../lib/animations';
import { ScrollTrigger } from '../lib/gsap';
import { scrollToTop } from '../lib/smoothScroll';
import { useTheme } from '../hooks/useTheme';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const MotionDiv = motion.div;

function renderTab(activeTab, onNavigate) {
  switch (activeTab) {
    case 'home':
      return <HomePage onNavigate={onNavigate} />;
    case 'basics':
      return <BasicsPage onNavigate={onNavigate} />;
    case 'software':
      return <SpecialtyPage departmentId="software" />;
    default:
      return <HomePage onNavigate={onNavigate} />;
  }
}

export default function AcademicApp() {
  const [activeTab, setActiveTab] = useState('home');
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleTabChange = useCallback((id) => {
    setActiveTab(id);
  }, []);

  // Old page has faded out: jump to top before the new page mounts, then re-measure triggers.
  const handleExitComplete = useCallback(() => {
    scrollToTop();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  return (
    <div
      dir="rtl"
      lang="ar"
      className="min-h-screen w-full flex flex-col font-sans overflow-x-clip"
      style={{ color: SITE_THEME.textPrimary }}
    >
      <SiteHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        <MotionDiv
          key={activeTab}
          className="w-full flex-1 flex flex-col"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={prefersReducedMotion ? reducedMotionVariants : fadeIn}
        >
          {renderTab(activeTab, handleTabChange)}
        </MotionDiv>
      </AnimatePresence>
      <SiteFooter activeTab={activeTab} />
    </div>
  );
}
