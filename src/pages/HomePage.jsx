import PageMasthead from '../components/PageMasthead/PageMasthead';
import Reveal from '../components/Reveal/Reveal';
import { getDepartment, DEPARTMENTS, SITE_THEME } from '../lib/departments';
import { getShellContent } from '../data/shellContent';

/**
 * الصفحة الرئيسية — welcome + intro to the three specialties.
 * @param {{ onNavigate?: (id: string) => void }} props
 */
export default function HomePage({ onNavigate }) {
  const content = getShellContent('home');
  const dept = getDepartment('home');
  const { hero } = content;

  return (
    <div className="w-full flex-1 flex flex-col overflow-x-hidden">
      <PageMasthead
        departmentId="home"
        badge={hero.badge}
        headingWords={hero.headingWords}
        subtitle={hero.subtitle}
        ctas={hero.ctas}
        onNavigate={onNavigate}
      />

      <main className="w-full px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto space-y-14 sm:space-y-16">
          <Reveal className="max-w-3xl mx-auto text-center space-y-3">
            <h2
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
              style={{ color: SITE_THEME.textHeading }}
            >
              {content.introTitle}
            </h2>
            <p
              className="text-sm sm:text-base leading-relaxed"
              style={{ color: SITE_THEME.textMuted }}
            >
              {content.introBody}
            </p>
          </Reveal>

          <section id="tracks" className="scroll-mt-24 space-y-8">
            <Reveal className="max-w-3xl space-y-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-1.5 h-7 rounded-full shrink-0"
                  style={{ backgroundColor: dept.accentSecondary }}
                />
                <h2
                  className="text-xl sm:text-2xl font-extrabold"
                  style={{ color: SITE_THEME.textHeading }}
                >
                  {content.tracksTitle}
                </h2>
              </div>
              <p
                className="text-sm sm:text-base leading-relaxed pe-4"
                style={{ color: SITE_THEME.textMuted }}
              >
                {content.tracksSubtitle}
              </p>
            </Reveal>

            <ul
              className="space-y-0 divide-y list-none p-0 m-0"
              style={{ borderColor: SITE_THEME.cardBorder }}
            >
              {content.tracks.map((track) => {
                const trackDept = DEPARTMENTS[track.id];
                return (
                  <li key={track.id} className="list-none">
                    <Reveal className="py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                      <div
                        className="w-1 self-stretch min-h-[3rem] rounded-full shrink-0 hidden sm:block"
                        style={{ backgroundColor: trackDept.accent }}
                        aria-hidden
                      />
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <h3
                          className="text-lg sm:text-xl font-bold"
                          style={{ color: trackDept.accent }}
                        >
                          {track.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: SITE_THEME.textMuted }}
                        >
                          {track.blurb}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigate?.(track.id)}
                        className="min-h-[44px] shrink-0 self-start sm:self-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition shadow-sm"
                        style={{ backgroundColor: trackDept.accent }}
                      >
                        استكشف المسار
                      </button>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
