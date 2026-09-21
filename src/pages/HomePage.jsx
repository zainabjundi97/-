import PageMasthead from '../components/PageMasthead/PageMasthead';
import Reveal from '../components/Reveal/Reveal';
import StaggerGrid from '../components/StaggerGrid/StaggerGrid';
import AnimatedCard, { AnimatedIcon } from '../components/AnimatedCard/AnimatedCard';
import TiltCard from '../components/TiltCard/TiltCard';
import GlowCallout from '../components/GlowCallout/GlowCallout';
import MagneticButton from '../components/MagneticButton/MagneticButton';
import CountUp from '../components/CountUp/CountUp';
import { useUiSound } from '../hooks/useUiSound';
import { getDepartment, DEPARTMENTS, SITE_THEME } from '../lib/departments';
import { getShellContent } from '../data/shellContent';

/** Accent bar + heading — shared shape used by every section on this page. */
function SectionTitle({ children, accentColor }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1.5 h-7 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
      <h2 className="text-xl sm:text-2xl font-extrabold" style={{ color: SITE_THEME.textHeading }}>
        {children}
      </h2>
    </div>
  );
}

/**
 * الصفحة الرئيسية — التعريف بالكلية
 * @param {{ onNavigate?: (id: string) => void }} props
 */
export default function HomePage({ onNavigate }) {
  const content = getShellContent('home');
  const dept = getDepartment('home');
  const { hero } = content;
  const { play } = useUiSound();

  const handlePathSelect = (id) => {
    play('confirm');
    onNavigate?.(id);
  };

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
        <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20">

          {/* ── Intro Paragraphs ── */}
          <Reveal className="space-y-4 max-w-3xl">
            {content.introParagraphs.map((para, i) => (
              <p
                key={i}
                className="text-base sm:text-lg leading-loose"
                style={{ color: i === 0 ? SITE_THEME.textHeading : SITE_THEME.textMuted }}
              >
                {para}
              </p>
            ))}
          </Reveal>

            
          {/* ── Two Stages ── */}
          <section className="space-y-6">
            <Reveal>
              <SectionTitle accentColor={dept.accentSecondary}>مرحلتا الدراسة</SectionTitle>
            </Reveal>
            <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.stages.map((stage) => {
                const accentColor =
                  stage.accentKey === 'accentSecondary' ? dept.accentSecondary : dept.accent;
                return (
                  <AnimatedCard
                    key={stage.id}
                    className="rounded-2xl border bg-[var(--card-bg)] shadow-sm overflow-hidden flex flex-col"
                    style={{ borderColor: `${accentColor}44` }}
                  >
                    {/* top accent bar */}
                    <div className="h-1.5 w-full" style={{ backgroundColor: accentColor }} />
                    <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span
                          className="text-xs font-bold uppercase tracking-widest"
                          style={{ color: accentColor }}
                        >
                          {stage.label}
                        </span>
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
                        >
                          {stage.duration}
                        </span>
                      </div>
                      <h3
                        className="text-lg sm:text-xl font-bold"
                        style={{ color: SITE_THEME.textHeading }}
                      >
                        {stage.title}
                      </h3>
                      <p
                        className="text-sm sm:text-base leading-relaxed flex-1"
                        style={{ color: SITE_THEME.textMuted }}
                      >
                        {stage.body}
                      </p>
                    </div>
                  </AnimatedCard>
                );
              })}
            </StaggerGrid>
          </section>

          {/* ── Three Paths ── */}
          <section className="space-y-6">
            <Reveal>
              <SectionTitle accentColor={dept.accentSecondary}>{content.pathsTitle}</SectionTitle>
            </Reveal>
            <StaggerGrid className="grid grid-cols-1 max-w-md gap-4">
              {content.paths.map((path) => {
                const trackDept = DEPARTMENTS[path.id];
                return (
                  <TiltCard key={path.id} className="h-full">
                    <AnimatedCard
                      as="button"
                      disableHoverMotion
                      onClick={() => handlePathSelect(path.id)}
                      className="text-right rounded-2xl border bg-[var(--card-bg)] p-5 flex flex-col gap-2 cursor-pointer shadow-sm transition-shadow hover:shadow-md w-full h-full"
                      style={{ borderColor: `${trackDept.accent}44` }}
                    >
                      <AnimatedIcon className="text-3xl">{path.icon}</AnimatedIcon>
                      <span
                        className="text-base sm:text-lg font-bold leading-snug mt-1"
                        style={{ color: trackDept.accent }}
                      >
                        {path.title}
                      </span>
                      <p
                        className="text-xs sm:text-sm leading-relaxed"
                        style={{ color: SITE_THEME.textMuted }}
                      >
                        {path.description}
                      </p>
                      <span
                        className="text-xs font-semibold mt-auto pt-2 flex items-center gap-1"
                        style={{ color: trackDept.accent }}
                      >
                        استكشف المسار ←
                      </span>
                    </AnimatedCard>
                  </TiltCard>
                );
              })}
            </StaggerGrid>
          </section>

          {/* ── Summary Curriculum Table ── */}
          <section id="table" className="scroll-mt-24 space-y-6">
            <Reveal>
              <SectionTitle accentColor={dept.accentSecondary}>{content.tableTitle}</SectionTitle>
            </Reveal>

            {/* Mobile: stacked year cards (no horizontal scroll) */}
            <Reveal className="space-y-4 sm:hidden">
              {content.tableData.map((row) => (
                <div
                  key={row.year}
                  className="rounded-2xl border bg-[var(--card-bg)] shadow-sm overflow-hidden"
                  style={{ borderColor: SITE_THEME.cardBorder }}
                >
                  <div
                    className="px-4 py-3 font-bold text-sm"
                    style={{ backgroundColor: `${dept.accent}10`, color: dept.accent }}
                  >
                    {row.year}
                  </div>
                  <div className="grid grid-cols-1 divide-y" style={{ borderColor: SITE_THEME.cardBorder }}>
                    {[
                      { title: 'الفصل الأول', courses: row.s1 },
                      { title: 'الفصل الثاني', courses: row.s2 },
                    ].map((term) => (
                      <div key={term.title} className="px-4 py-3">
                        <p
                          className="text-xs font-bold uppercase tracking-wide mb-2"
                          style={{ color: SITE_THEME.textHeading }}
                        >
                          {term.title}
                        </p>
                        <ol className="list-none p-0 m-0 space-y-1">
                          {term.courses.map((course, ci) => (
                            <li key={ci} className="flex items-baseline gap-2 text-sm">
                              <span
                                className="shrink-0 text-xs font-bold tabular-nums"
                                style={{ color: dept.accentSecondary }}
                              >
                                {ci + 1}.
                              </span>
                              <span style={{ color: SITE_THEME.textMuted }}>{course}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Reveal>

            {/* sm and up: full table */}
            <Reveal className="hidden sm:block">
              <div
                className="overflow-x-auto rounded-2xl border shadow-sm"
                style={{ borderColor: SITE_THEME.cardBorder }}
              >
                <table className="w-full text-sm border-collapse min-w-[560px]">
                  <thead>
                    <tr style={{ backgroundColor: `${dept.accent}10` }}>
                      <th
                        className="px-4 py-3 text-right font-bold text-xs uppercase tracking-wide whitespace-nowrap"
                        style={{
                          color: SITE_THEME.textHeading,
                          borderBottom: `2px solid ${dept.accentSecondary}`,
                        }}
                      >
                        السنة
                      </th>
                      <th
                        className="px-4 py-3 text-right font-bold text-xs uppercase tracking-wide"
                        style={{
                          color: SITE_THEME.textHeading,
                          borderBottom: `2px solid ${dept.accentSecondary}`,
                        }}
                      >
                        الفصل الأول
                      </th>
                      <th
                        className="px-4 py-3 text-right font-bold text-xs uppercase tracking-wide"
                        style={{
                          color: SITE_THEME.textHeading,
                          borderBottom: `2px solid ${dept.accentSecondary}`,
                        }}
                      >
                        الفصل الثاني
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.tableData.map((row, ri) => (
                      <tr
                        key={row.year}
                        style={{
                          backgroundColor: ri % 2 === 0 ? 'var(--card-bg)' : `${dept.heroFrom}08`,
                        }}
                      >
                        <td
                          className="px-4 py-4 font-bold align-top whitespace-nowrap text-sm"
                          style={{
                            color: dept.accent,
                            borderBottom: `1px solid ${SITE_THEME.cardBorder}`,
                          }}
                        >
                          {row.year}
                        </td>
                        <td
                          className="px-4 py-4 align-top"
                          style={{ borderBottom: `1px solid ${SITE_THEME.cardBorder}` }}
                        >
                          <ol className="list-none p-0 m-0 space-y-1">
                            {row.s1.map((course, ci) => (
                              <li key={ci} className="flex items-baseline gap-2">
                                <span
                                  className="shrink-0 text-xs font-bold tabular-nums"
                                  style={{ color: dept.accentSecondary }}
                                >
                                  {ci + 1}.
                                </span>
                                <span style={{ color: SITE_THEME.textMuted }}>{course}</span>
                              </li>
                            ))}
                          </ol>
                        </td>
                        <td
                          className="px-4 py-4 align-top"
                          style={{ borderBottom: `1px solid ${SITE_THEME.cardBorder}` }}
                        >
                          <ol className="list-none p-0 m-0 space-y-1">
                            {row.s2.map((course, ci) => (
                              <li key={ci} className="flex items-baseline gap-2">
                                <span
                                  className="shrink-0 text-xs font-bold tabular-nums"
                                  style={{ color: dept.accentSecondary }}
                                >
                                  {ci + 1}.
                                </span>
                                <span style={{ color: SITE_THEME.textMuted }}>{course}</span>
                              </li>
                            ))}
                          </ol>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </section>

          {/* ── Bridge to BasicsPage ── */}
          <GlowCallout
            className="rounded-2xl border px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"
            style={{
              background: `linear-gradient(135deg, ${dept.heroFrom}10, ${dept.heroTo}16)`,
              borderColor: `${dept.accentSecondary}44`,
            }}
          >
            <p
              className="text-sm sm:text-base leading-relaxed flex-1"
              style={{ color: SITE_THEME.textMuted }}
            >
              {content.bridgeText}
            </p>
            <MagneticButton
              type="button"
              onClick={() => {
                play('confirm');
                onNavigate?.('basics');
              }}
              className="shrink-0 min-h-[44px] px-6 py-3 rounded-xl text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: dept.accent }}
            >
              {content.bridgeCta}
            </MagneticButton>
          </GlowCallout>

        </div>
      </main>
    </div>
  );
}
