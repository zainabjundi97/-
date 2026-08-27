import { useState, useCallback } from 'react';
import SiteHeader from '../components/SiteHeader/SiteHeader';
import SiteFooter from '../components/SiteFooter/SiteFooter';
import HomePage from './HomePage';
import BasicsPage from './BasicsPage';
import ComingSoonPage from './ComingSoonPage';
import SpecialtyPage from './SpecialtyPage';
import { SITE_THEME } from '../lib/departments';

function renderTab(activeTab, onNavigate) {
  switch (activeTab) {
    case 'home':
      return <HomePage key="home" onNavigate={onNavigate} />;
    case 'basics':
      return <BasicsPage key="basics" onNavigate={onNavigate} />;
    case 'software':
    case 'networks':
    case 'ai':
      return <SpecialtyPage key={activeTab} departmentId={activeTab} />;
    case 'contest':
      return <ComingSoonPage departmentId="contest" />;
    default:
      return <HomePage key="home" onNavigate={onNavigate} />;
  }
}

export default function AcademicApp() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = useCallback((id) => {
    setActiveTab(id);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      dir="rtl"
      lang="ar"
      className="min-h-screen w-full flex flex-col font-sans overflow-x-hidden"
      style={{
        backgroundColor: SITE_THEME.shellBg,
        color: SITE_THEME.textPrimary,
      }}
    >
      <SiteHeader activeTab={activeTab} onTabChange={handleTabChange} />
      {renderTab(activeTab, handleTabChange)}
      <SiteFooter activeTab={activeTab} />
    </div>
  );
}
