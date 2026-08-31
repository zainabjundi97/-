import PageMasthead from '../components/PageMasthead/PageMasthead';
import Reveal from '../components/Reveal/Reveal';
import { getDepartment, DEPARTMENTS, SITE_THEME } from '../lib/departments';
import { getShellContent } from '../data/shellContent';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * الصفحة الرئيسية — welcome + intro to the three specialties.
 * @param {{ onNavigate?: (id: string) => void }} props
 */
export default function HomePage({ onNavigate }) {
  const content = getShellContent('home');
  const dept = getDepartment('home');
  const { hero } = content;
  const prefersReducedMotion = usePrefersReducedMotion();

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

          <section id="choose" className="scroll-mt-24 space-y-6">
            <Reveal className="max-w-3xl space-y-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-1.5 h-7 rounded-full shrink-0"
                  style={{ backgroundColor: dept.accentSecondary }}
                  aria-hidden
                />
                <h2
                  className="text-xl sm:text-2xl font-extrabold"
                  style={{ color: SITE_THEME.textHeading }}
                >
                  {content.chooseTitle}
                </h2>
              </div>
              <p
                className="text-sm sm:text-base leading-relaxed pe-4"
                style={{ color: SITE_THEME.textMuted }}
              >
                {content.chooseSubtitle}
              </p>
            </Reveal>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-3 list-none p-0 m-0">
              {content.chooseSteps.map((step, index) => (
                <li key={step.id}>
                  <Reveal className="h-full">
                    <button
                      type="button"
                      onClick={() => {
                        if (step.action.startsWith('#')) {
                          document.getElementById(step.action.slice(1))?.scrollIntoView({
                            behavior: prefersReducedMotion ? 'auto' : 'smooth',
                            block: 'start',
                          });
                          return;
                        }
                        onNavigate?.(step.action);
                      }}
                      className="w-full h-full min-h-[44px] text-right rounded-2xl border bg-white p-5 flex flex-col gap-2 cursor-pointer shadow-sm"
                      style={{ borderColor: SITE_THEME.cardBorder }}
                    >
                      <span
                        className="text-2xl font-black tabular-nums"
                        style={{ color: dept.accentSecondary }}
                        aria-hidden
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="text-base sm:text-lg font-bold"
                        style={{ color: SITE_THEME.textHeading }}
                      >
                        {step.title}
                      </span>
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: SITE_THEME.textMuted }}
                      >
                        {step.body}
                      </span>
                    </button>
                  </Reveal>
                </li>
              ))}
            </ol>
          </section>

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
