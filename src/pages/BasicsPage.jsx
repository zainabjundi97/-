import PageMasthead from '../components/PageMasthead/PageMasthead';
import Reveal from '../components/Reveal/Reveal';
import { DEPARTMENTS, getDepartment, SITE_THEME } from '../lib/departments';
import { getShellContent } from '../data/shellContent';

/**
 * علوم أساسية — foundational academic pillars.
 * @param {{ onNavigate?: (id: string) => void }} props
 */
export default function BasicsPage({ onNavigate }) {
  const content = getShellContent('basics');
  const tracks = getShellContent('home').tracks;
  const dept = getDepartment('basics');
  const { hero } = content;
  const accents = [dept.accentSecondary, '#4EB67B', dept.accent, '#5191CE'];

  return (
    <div className="w-full flex-1 flex flex-col overflow-x-hidden">
      <PageMasthead
        departmentId="basics"
        badge={hero.badge}
        headingWords={hero.headingWords}
        subtitle={hero.subtitle}
        ctas={hero.ctas}
        onNavigate={onNavigate}
      />

      <main className="w-full px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto space-y-14 sm:space-y-16">
          <section id="foundations" className="scroll-mt-24 space-y-8">
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
                  {content.sectionTitle}
                </h2>
              </div>
              <p
                className="text-sm sm:text-base leading-relaxed pe-4"
                style={{ color: SITE_THEME.textMuted }}
              >
                {content.sectionSubtitle}
              </p>
            </Reveal>

            <ol className="space-y-0 list-none p-0 m-0">
              {content.foundations.map((item, index) => (
                <li
                  key={item.id}
                  className="border-b last:border-b-0"
                  style={{ borderColor: SITE_THEME.cardBorder }}
                >
                  <Reveal className="grid grid-cols-[auto_1fr] gap-4 sm:gap-6 py-6 sm:py-8">
                    <span
                      className="text-2xl sm:text-3xl font-black tabular-nums leading-none pt-0.5"
                      style={{ color: accents[index % accents.length] }}
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 space-y-2">
                      <h3
                        className="text-lg sm:text-xl font-bold"
                        style={{ color: SITE_THEME.textHeading }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm sm:text-base leading-relaxed max-w-3xl"
                        style={{ color: SITE_THEME.textMuted }}
                      >
                        {item.body}
                      </p>
                      {item.tracks?.length > 0 && (
                        <ul className="space-y-2 pt-2 list-none p-0 m-0">
                          {item.tracks.map((track) => {
                            const trackDept = DEPARTMENTS[track.id];
                            return (
                              <li
                                key={track.id}
                                className="text-sm leading-relaxed flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3"
                              >
                                <span
                                  className="font-semibold shrink-0"
                                  style={{ color: trackDept.accent }}
                                >
                                  {trackDept.label}
                                </span>
                                <span style={{ color: SITE_THEME.textMuted }}>{track.line}</span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </section>

          <Reveal>
            <aside
              className="rounded-2xl px-5 sm:px-8 py-6 sm:py-8 border"
              style={{
                background: `linear-gradient(135deg, ${dept.heroFrom}12, ${dept.heroTo}18)`,
                borderColor: `${dept.accentSecondary}44`,
              }}
            >
              <h3
                className="text-lg sm:text-xl font-bold mb-2"
                style={{ color: SITE_THEME.textHeading }}
              >
                {content.noteTitle}
              </h3>
              <p
                className="text-sm sm:text-base leading-relaxed mb-5 max-w-3xl"
                style={{ color: SITE_THEME.textMuted }}
              >
                {content.noteBody}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 list-none p-0 m-0">
                {tracks.map((track) => {
                  const trackDept = DEPARTMENTS[track.id];
                  return (
                    <li key={track.id}>
                      <button
                        type="button"
                        onClick={() => onNavigate?.(track.id)}
                        className="w-full min-h-[44px] h-full text-right rounded-xl border bg-white p-4 sm:p-5 flex flex-col gap-3 cursor-pointer transition shadow-sm"
                        style={{ borderColor: `${trackDept.accent}55` }}
                      >
                        <span
                          className="block h-1.5 w-12 rounded-full shrink-0"
                          style={{ backgroundColor: trackDept.accent }}
                          aria-hidden
                        />
                        <span
                          className="text-base sm:text-lg font-bold"
                          style={{ color: trackDept.accent }}
                        >
                          {track.title}
                        </span>
                        <span
                          className="text-sm leading-relaxed"
                          style={{ color: SITE_THEME.textMuted }}
                        >
                          {track.blurb}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
