import { getDepartment, SITE_THEME } from '../../lib/departments';

/**
 * @param {{ activeTab: string }} props
 */
export default function SiteFooter({ activeTab }) {
  const dept = getDepartment(activeTab);
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full text-white py-5 text-center text-sm flex-shrink-0 border-t-4"
      style={{ backgroundColor: SITE_THEME.footerBg, borderTopColor: dept.navActive }}
    >
      <div className="w-full px-4 sm:px-6 space-y-1">
        <p className="font-bold tracking-wide">وجهتك الأكاديمية © {year}</p>
        <p className="text-xs text-slate-300">
          منصة مخصصة لطلاب البكالوريا لمساعدتهم في اختيار مسارهم الأكاديمي بثقة وشغف.
        </p>
      </div>
    </footer>
  );
}
