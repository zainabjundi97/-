import PageMasthead from '../components/PageMasthead/PageMasthead';
import Reveal from '../components/Reveal/Reveal';
import { getDepartment, SITE_THEME } from '../lib/departments';
import { getShellContent } from '../data/shellContent';

/**
 * علوم أساسية — foundational academic pillars.
 * @param {{ onNavigate?: (id: string) => void }} props
 */
export default function BasicsPage({ onNavigate }) {
  const content = getShellContent('basics');
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
              <button
                type="button"
                onClick={() => onNavigate?.('home')}
                className="min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition shadow-sm"
                style={{ backgroundColor: dept.accentSecondary }}
              >
                استكشف التخصصات من الرئيسية
              </button>
            </aside>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
