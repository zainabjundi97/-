import { useState, useCallback } from 'react';
import SiteHeader from '../components/SiteHeader/SiteHeader';
import SiteFooter from '../components/SiteFooter/SiteFooter';
import HomePage from './HomePage';
import BasicsPage from './BasicsPage';
import SpecialtyPage from './SpecialtyPage';
import { SITE_THEME } from '../lib/departments';
import { useTheme } from '../hooks/useTheme';

function renderTab(activeTab, onNavigate) {
  switch (activeTab) {
    case 'home':
      return <HomePage key="home" onNavigate={onNavigate} />;
    case 'basics':
      return <BasicsPage key="basics" onNavigate={onNavigate} />;
    case 'software':
      return <SpecialtyPage key="software" departmentId="software" />;
    default:
      return <HomePage key="home" onNavigate={onNavigate} />;
  }
}

export default function AcademicApp() {
  const [activeTab, setActiveTab] = useState('home');
  const { theme, toggleTheme } = useTheme();

  const handleTabChange = useCallback((id) => {
    setActiveTab(id);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      dir="rtl"
      lang="ar"
      className="min-h-screen w-full flex flex-col font-sans overflow-x-clip"
      style={{
        backgroundColor: SITE_THEME.shellBg,
        color: SITE_THEME.textPrimary,
      }}
    >
      <SiteHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      {renderTab(activeTab, handleTabChange)}
      <SiteFooter activeTab={activeTab} />
    </div>
  );
}
