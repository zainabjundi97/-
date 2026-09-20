import { motion } from 'motion/react';
import PageMasthead from '../components/PageMasthead/PageMasthead';
import Reveal from '../components/Reveal/Reveal';
import { DEPARTMENTS, getDepartment, SITE_THEME } from '../lib/departments';
import { getShellContent } from '../data/shellContent';

/** ── Semester card sub-component ── */
function SemesterCard({ semester, dept }) {
  return (
    <div
      className="rounded-2xl border bg-[var(--card-bg)] shadow-sm overflow-hidden flex flex-col"
      style={{ borderColor: `${dept.accentSecondary}33` }}
    >
      {/* card header */}
      <div
        className="px-5 py-3 flex items-center gap-3"
        style={{ backgroundColor: `${dept.accentSecondary}14` }}
      >
        <div
          className="w-1 h-6 rounded-full shrink-0"
          style={{ backgroundColor: dept.accentSecondary }}
        />
        <h4 className="text-base font-bold" style={{ color: SITE_THEME.textHeading }}>
          {semester.title}
        </h4>
      </div>

      {/* featured courses */}
      <div className="p-5 space-y-5 flex-1">
        {semester.featured.map((course, ci) => (
          <motion.div
            key={course.name}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.35, delay: ci * 0.08, ease: 'easeOut' }}
            className="space-y-1.5"
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: dept.accentSecondary }}
                aria-hidden
              />
              <h5
                className="text-sm sm:text-base font-bold"
                style={{ color: SITE_THEME.textHeading }}
              >
                {course.name}
              </h5>
            </div>
            <p
              className="text-sm leading-relaxed pe-2"
              style={{ color: SITE_THEME.textMuted }}
            >
              {course.body}
            </p>
          </motion.div>
        ))}

        {/* remaining courses chip list */}
        {semester.rest.length > 0 && (
          <div
            className="rounded-xl px-4 py-3 mt-2"
            style={{ backgroundColor: `${dept.accent}08` }}
          >
            <p className="text-xs font-bold mb-2" style={{ color: dept.accentSecondary }}>
              مواد أخرى في هذا الفصل:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 list-none p-0 m-0">
              {semester.rest.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-1.5 text-sm"
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
        <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20">

          {/* ══ YEAR 1 ══ */}
          <section id="year1" className="scroll-mt-24 space-y-8">
            <Reveal>
              <div className="flex items-center gap-3">
                <div
                  className="w-1.5 h-8 rounded-full shrink-0"
                  style={{ backgroundColor: dept.accentSecondary }}
                />
                <h2
                  className="text-2xl sm:text-3xl font-extrabold"
                  style={{ color: SITE_THEME.textHeading }}
                >
                  {content.year1.title}
                </h2>
              </div>
              <p
                className="mt-3 text-base sm:text-lg leading-relaxed max-w-3xl"
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
                className="text-sm sm:text-base leading-relaxed max-w-3xl font-medium"
                style={{ color: SITE_THEME.textHeading }}
              >
                {content.year1.closing}
              </p>
              <p
                className="mt-2 text-sm sm:text-base leading-relaxed max-w-3xl"
                style={{ color: SITE_THEME.textMuted }}
              >
                {content.year1.closingS2}
              </p>
            </Reveal>
          </section>

          {/* ══ YEAR 2 ══ */}
          <section id="year2" className="scroll-mt-24 space-y-8">
            <Reveal>
              <div className="flex items-center gap-3">
                <div
                  className="w-1.5 h-8 rounded-full shrink-0"
                  style={{ backgroundColor: dept.accent }}
                />
                <h2
                  className="text-2xl sm:text-3xl font-extrabold"
                  style={{ color: SITE_THEME.textHeading }}
                >
                  {content.year2.title}
                </h2>
              </div>
              <p
                className="mt-3 text-base sm:text-lg leading-relaxed max-w-3xl"
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
                className="text-sm sm:text-base leading-relaxed max-w-3xl font-medium"
                style={{ color: SITE_THEME.textHeading }}
              >
                {content.year2.closing}
              </p>
              <p
                className="mt-2 text-sm sm:text-base leading-relaxed max-w-3xl"
                style={{ color: SITE_THEME.textMuted }}
              >
                {content.year2.closingS2}
              </p>
            </Reveal>
          </section>

          {/* ══ FULL CURRICULUM TABLE ══ */}
          <section id="table" className="scroll-mt-24 space-y-6">
            <Reveal>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-1.5 h-7 rounded-full shrink-0"
                  style={{ backgroundColor: dept.accentSecondary }}
                />
                <h2
                  className="text-xl sm:text-2xl font-extrabold"
                  style={{ color: SITE_THEME.textHeading }}
                >
                  الخطة الدراسية
                </h2>
              </div>
            </Reveal>
            <Reveal>
              <div
                className="overflow-x-auto rounded-2xl border shadow-sm"
                style={{ borderColor: SITE_THEME.cardBorder }}
              >
                <table className="w-full text-sm border-collapse min-w-[600px]">
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
            </Reveal>
          </section>

          {/* ══ SUMMARY "ماذا يعني كل ذلك؟" ══ */}
          <section className="space-y-6">
            <Reveal className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-1.5 h-7 rounded-full shrink-0"
                  style={{ backgroundColor: dept.accentSecondary }}
                />
                <h2
                  className="text-xl sm:text-2xl font-extrabold"
                  style={{ color: SITE_THEME.textHeading }}
                >
                  ماذا يعني كل ذلك؟
                </h2>
              </div>
              {content.summaryParagraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: SITE_THEME.textMuted }}
                >
                  {para}
                </p>
              ))}
            </Reveal>

            {/* Specialization path cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {content.conclusionPaths.map((path, index) => {
                const trackDept = DEPARTMENTS[path.id];
                return (
                  <motion.button
                    key={path.id}
                    type="button"
                    onClick={() => onNavigate?.(path.id)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
                    className="text-right rounded-2xl border bg-[var(--card-bg)] p-5 flex flex-col gap-3 cursor-pointer shadow-sm transition-shadow hover:shadow-md w-full"
                    style={{ borderColor: `${trackDept.accent}44` }}
                  >
                    <span
                      className="block h-1.5 w-12 rounded-full"
                      style={{ backgroundColor: trackDept.accent }}
                      aria-hidden
                    />
                    <span
                      className="text-base font-bold leading-snug"
                      style={{ color: trackDept.accent }}
                    >
                      {path.title}
                    </span>
                    <span
                      className="text-xs font-semibold mt-auto"
                      style={{ color: trackDept.accent }}
                    >
                      استكشف المسار ←
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* ══ NOTE ASIDE ══ */}
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
                className="text-sm sm:text-base leading-relaxed max-w-3xl"
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
