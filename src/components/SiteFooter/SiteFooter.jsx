import { SITE_THEME } from '../../lib/departments';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full text-white py-3 text-center text-xs sm:text-sm flex-shrink-0 border-t-2"
      style={{
        backgroundColor: SITE_THEME.footerBg,
        borderTopColor: SITE_THEME.navAccent,
      }}
    >
      <div className="w-full px-3 sm:px-6">
        <p className="font-bold tracking-wide">
          وجهتك الأكاديمية © {year}
        </p>
        <p className="hidden sm:block text-xs text-slate-300 mt-1">
          منصة مخصصة لطلاب البكالوريا لمساعدتهم في اختيار مسارهم الأكاديمي بثقة وشغف.
        </p>
      </div>
    </footer>
  );
}
