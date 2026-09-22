import { useRef } from 'react';
import { motion } from 'motion/react';
import PageMasthead from '../components/PageMasthead/PageMasthead';
import Reveal from '../components/Reveal/Reveal';
import StaggerGrid from '../components/StaggerGrid/StaggerGrid';
import AnimatedCard from '../components/AnimatedCard/AnimatedCard';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import ScrollLine from '../components/ScrollLine/ScrollLine';
import { useScrollStagger } from '../hooks/useScrollStagger';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { duration, stagger, EASE_OUT } from '../lib/animations';
import { getDepartment, SITE_THEME } from '../lib/departments';
import { getShellContent } from '../data/shellContent';

const MotionDiv = motion.div;

/** ── Semester card sub-component ── */
function SemesterCard({ semester, dept }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    <div
      className="rounded-3xl border surface-card overflow-hidden flex flex-col"
      style={{ borderColor: `${dept.accentSecondary}33` }}
    >
      {/* card header */}
      <div
        className="px-6 py-4 flex items-center gap-3"
        style={{ backgroundColor: `${dept.accentSecondary}14` }}
      >
        <div
          className="w-1 h-6 rounded-full shrink-0"
          style={{ backgroundColor: dept.accentSecondary }}
        />
        <h4 className="text-lg sm:text-xl font-bold" style={{ color: SITE_THEME.textHeading }}>
          {semester.title}
        </h4>
      </div>

      {/* featured courses */}
      <div className="p-6 space-y-6 flex-1">
        {semester.featured.map((course, ci) => (
          <MotionDiv
            key={course.name}
            initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: duration.base, delay: ci * stagger.word, ease: EASE_OUT }}
            className="space-y-1.5"
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: dept.accentSecondary }}
                aria-hidden
              />
              <h5
                className="text-base sm:text-lg font-bold"
                style={{ color: SITE_THEME.textHeading }}
              >
                {course.name}
              </h5>
            </div>
            <p
              className="text-sm sm:text-base leading-relaxed pe-2"
              style={{ color: SITE_THEME.textMuted }}
            >
              {course.body}
            </p>
          </MotionDiv>
        ))}

        {/* remaining courses chip list */}
        {semester.rest.length > 0 && (
          <div
            className="rounded-xl px-4 py-3 mt-2"
            style={{ backgroundColor: `${dept.accent}08` }}
          >
            <p className="text-sm font-bold mb-2" style={{ color: dept.accentSecondary }}>
              مواد أخرى في هذا الفصل:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 list-none p-0 m-0">
              {semester.rest.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-1.5 text-sm sm:text-base"
                  style={{ color: SITE_THEME.textMuted }}
                >
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: dept.accentSecondary }}
                    aria-hidden
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * علوم أساسية — detailed year-by-year breakdown.
 * @param {{ onNavigate?: (id: string) => void }} props
 */
export default function BasicsPage({ onNavigate }) {
  const content = getShellContent('basics');
  const dept = getDepartment('basics');
  const { hero } = content;
  const tableRef = useRef(null);
  useScrollStagger(tableRef, 'tbody tr');

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

      <main className="w-full px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-5xl 3xl:max-w-6xl mx-auto space-y-16 sm:space-y-24 3xl:space-y-32">

          {/* ══ YEARS 1 → 2, joined by a timeline that fills as you scroll ══ */}
          <div className="flex gap-6 lg:gap-10">
            <ScrollLine
              color={dept.accentSecondary}
              className="hidden md:block shrink-0 self-stretch"
            />
            <div className="flex-1 min-w-0 space-y-16 sm:space-y-24 3xl:space-y-32">

              {/* ══ YEAR 1 ══ */}
              <section id="year1" className="scroll-mt-24 space-y-8">
                <SectionTitle
                  text={content.year1.title}
                  accentColor={dept.accentSecondary}
                  size="lg"
                  className="mb-0"
                />
                <Reveal>
                  <p
                    className="text-base sm:text-lg leading-relaxed max-w-3xl"
                    style={{ color: SITE_THEME.textMuted }}
                  >
                    {content.year1.intro}
                  </p>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SemesterCard semester={content.year1.s1} dept={dept} />
                  <SemesterCard semester={content.year1.s2} dept={dept} />
                </div>

                <Reveal>
                  <p
                    className="text-base sm:text-lg leading-relaxed max-w-3xl font-medium"
                    style={{ color: SITE_THEME.textHeading }}
                  >
                    {content.year1.closing}
                  </p>
                  <p
                    className="mt-2 text-base sm:text-lg leading-relaxed max-w-3xl"
                    style={{ color: SITE_THEME.textMuted }}
                  >
                    {content.year1.closingS2}
                  </p>
                </Reveal>
              </section>

              {/* ══ YEAR 2 ══ */}
              <section id="year2" className="scroll-mt-24 space-y-8">
                <SectionTitle
                  text={content.year2.title}
                  accentColor={dept.accent}
                  size="lg"
                  className="mb-0"
                />
                <Reveal>
                  <p
                    className="text-base sm:text-lg leading-relaxed max-w-3xl"
                    style={{ color: SITE_THEME.textMuted }}
                  >
                    {content.year2.intro}
                  </p>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SemesterCard semester={content.year2.s1} dept={dept} />
                  <SemesterCard semester={content.year2.s2} dept={dept} />
                </div>

                <Reveal>
                  <p
                    className="text-base sm:text-lg leading-relaxed max-w-3xl font-medium"
                    style={{ color: SITE_THEME.textHeading }}
                  >
                    {content.year2.closing}
                  </p>
                  <p
                    className="mt-2 text-base sm:text-lg leading-relaxed max-w-3xl"
                    style={{ color: SITE_THEME.textMuted }}
                  >
                    {content.year2.closingS2}
                  </p>
                </Reveal>
              </section>

            </div>
          </div>

          {/* ══ FULL CURRICULUM TABLE ══ */}
          <section id="table" ref={tableRef} className="scroll-mt-24 space-y-6">
            <SectionTitle text="الخطة الدراسية" accentColor={dept.accentSecondary} className="mb-2" />
            <div>
              <div
                className="overflow-x-auto rounded-3xl border surface-card"
                style={{ borderColor: SITE_THEME.cardBorder }}
              >
                <table className="w-full text-sm sm:text-base border-collapse min-w-[30rem]">
                  <thead>
                    <tr style={{ backgroundColor: `${dept.accent}10` }}>
                      <th
                        className="px-4 py-3 text-right font-bold text-sm uppercase tracking-wide whitespace-nowrap"
                        style={{
                          color: SITE_THEME.textHeading,
                          borderBottom: `2px solid ${dept.accentSecondary}`,
                        }}
                      >
                        السنة
                      </th>
                      <th
                        className="px-4 py-3 text-right font-bold text-sm uppercase tracking-wide"
                        style={{
                          color: SITE_THEME.textHeading,
                          borderBottom: `2px solid ${dept.accentSecondary}`,
                        }}
                      >
                        الفصل الأول
                      </th>
                      <th
                        className="px-4 py-3 text-right font-bold text-sm uppercase tracking-wide"
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
                          className="px-4 py-4 font-bold align-top whitespace-nowrap"
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
                          <ol className="list-none p-0 m-0 space-y-1.5">
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
                          <ol className="list-none p-0 m-0 space-y-1.5">
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
            </div>
          </section>

          {/* ══ SUMMARY "ماذا يعني كل ذلك؟" ══ */}
          <section className="space-y-6">
            <SectionTitle text="ماذا يعني كل ذلك؟" accentColor={dept.accentSecondary} className="mb-4" />
            <Reveal className="space-y-4 max-w-3xl">
              {content.summaryParagraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-base sm:text-lg leading-relaxed"
                  style={{ color: SITE_THEME.textMuted }}
                >
                  {para}
                </p>
              ))}
            </Reveal>

            {/* Specialization path cards */}
            <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {content.conclusionPaths.map((path) => {
                const trackDept = getDepartment(path.id);
                // External tracks render as a real link; internal ones switch the tab.
                const linkProps = path.href
                  ? { as: 'a', href: path.href, rel: 'noopener noreferrer' }
                  : { as: 'button', onClick: () => onNavigate?.(path.id) };
                return (
                  <AnimatedCard
                    key={path.id}
                    {...linkProps}
                    className="text-right rounded-3xl border surface-card p-6 flex flex-col gap-3 cursor-pointer w-full h-full sm:last:col-span-2 lg:last:col-span-1"
                    style={{ borderColor: `${trackDept.accent}44` }}
                  >
                    <span
                      className="block h-1.5 w-12 rounded-full"
                      style={{ backgroundColor: trackDept.accent }}
                      aria-hidden
                    />
                    <span
                      className="text-lg sm:text-xl font-bold leading-snug"
                      style={{ color: trackDept.accent }}
                    >
                      {path.title}
                    </span>
                    <span
                      className="text-sm font-semibold mt-auto"
                      style={{ color: trackDept.accent }}
                    >
                      استكشف المسار ←
                    </span>
                  </AnimatedCard>
                );
              })}
            </StaggerGrid>
          </section>

          {/* ══ NOTE ASIDE ══ */}
          <Reveal>
            <aside
              className="rounded-3xl px-6 sm:px-10 py-8 sm:py-10 border"
              style={{
                background: `linear-gradient(135deg, ${dept.heroFrom}12, ${dept.heroTo}18)`,
                borderColor: `${dept.accentSecondary}44`,
              }}
            >
              <h3
                className="text-xl sm:text-2xl font-bold mb-3"
                style={{ color: SITE_THEME.textHeading }}
              >
                {content.noteTitle}
              </h3>
              <p
                className="text-base sm:text-lg leading-relaxed max-w-3xl"
                style={{ color: SITE_THEME.textMuted }}
              >
                {content.noteBody}
              </p>
            </aside>
          </Reveal>

        </div>
      </main>
    </div>
  );
}
