import { getDepartment, SITE_THEME } from '../../lib/departments';

/**
 * @param {{ activeTab: string }} props
 */
export default function SiteFooter({ activeTab }) {
  const dept = getDepartment(activeTab);
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full py-3 text-center text-xs sm:text-sm flex-shrink-0 border-t"
      style={{
        backgroundColor: SITE_THEME.headerGlass,
        borderTopWidth: 2,
        borderTopColor: dept.accent,
        color: SITE_THEME.textPrimary,
      }}
    >
      <div className="w-full px-3 sm:px-6">
        <p className="font-bold tracking-wide" style={{ color: SITE_THEME.brandDark }}>
          وجهتك الأكاديمية © {year}
        </p>
        <p className="hidden sm:block text-xs mt-1" style={{ color: SITE_THEME.textMuted }}>
          منصة مخصصة لطلاب البكالوريا لمساعدتهم في اختيار مسارهم الأكاديمي بثقة وشغف.
        </p>
      </div>
    </footer>
  );
}
