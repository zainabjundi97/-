import { useState, useCallback } from 'react';
import SiteHeader from '../components/SiteHeader/SiteHeader';
import SiteFooter from '../components/SiteFooter/SiteFooter';
import HomePage from './HomePage';
import ComingSoonPage from './ComingSoonPage';
import SoftwareEngApp from '../SoftwareEngApp';
import { SITE_THEME } from '../lib/departments';

function renderTab(activeTab) {
  switch (activeTab) {
    case 'home':
    case 'basics':
      return <HomePage departmentId={activeTab} />;
    case 'software':
      return <SoftwareEngApp />;
    case 'networks':
    case 'ai':
    case 'contest':
      return <ComingSoonPage departmentId={activeTab} />;
    default:
      return <HomePage departmentId="home" />;
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
        background: `linear-gradient(180deg, ${SITE_THEME.headerBg}22 0%, ${SITE_THEME.shellBg} 12rem)`,
        color: SITE_THEME.textPrimary,
      }}
    >
      <SiteHeader activeTab={activeTab} onTabChange={handleTabChange} />
      {renderTab(activeTab)}
      <SiteFooter activeTab={activeTab} />
    </div>
  );
}
