import { getDepartment, SITE_THEME } from '../../lib/departments';
import './SiteFooter.css';

const SOCIAL_LINKS = [
  {
    id: 'telegram',
    href: 'https://t.me/volunteer_team_it',
    label: 'تليغرام',
    Icon: TelegramIcon,
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/it_lattakia',
    label: 'إنستغرام',
    Icon: InstagramIcon,
  },
  {
    id: 'facebook',
    href: 'https://www.facebook.com/share/1H3WwCqj98/',
    label: 'فيسبوك',
    Icon: FacebookIcon,
  },
];

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21.5 3.4 2.7 10.6c-1.3.5-1.3 1.4-.2 1.8l4.8 1.5 1.8 5.7c.3.8 1.2 1 1.7.3l2.6-2.7 4.8 3.6c1 .7 1.8.3 2.1-1L22.8 4.3c.3-1.2-.6-1.8-1.3-.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v3H6v4h3v8h4v-8h3.2l.8-4H13V9c0-.6.4-1 1-1Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * @param {{ activeTab: string }} props
 */
export default function SiteFooter({ activeTab }) {
  const dept = getDepartment(activeTab);
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full py-4 text-center text-xs sm:text-sm flex-shrink-0 border-t"
      style={{
        backgroundColor: SITE_THEME.headerGlass,
        borderTopWidth: 2,
        borderTopColor: dept.accent,
        color: SITE_THEME.textPrimary,
      }}
    >
      <div className="w-full px-3 sm:px-6 flex flex-col items-center gap-3">
        <p className="font-bold tracking-wide" style={{ color: SITE_THEME.textHeading }}>
          وجهتك الأكاديمية © {year}
        </p>
        <ul className="flex items-center justify-center gap-2 list-none p-0 m-0">
          {SOCIAL_LINKS.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="site-footer-social inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border shadow-sm"
                style={{ color: SITE_THEME.textHeading, backgroundColor: SITE_THEME.cardBg, borderColor: SITE_THEME.cardBorder }}
              >
                <item.Icon />
              </a>
            </li>
          ))}
        </ul>
        <p className="hidden sm:block text-xs" style={{ color: SITE_THEME.textMuted }}>
          منصة مخصصة لطلاب البكالوريا لمساعدتهم في اختيار مسارهم الأكاديمي بثقة وشغف.
        </p>
      </div>
    </footer>
  );
}
