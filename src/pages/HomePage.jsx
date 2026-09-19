import { motion } from 'motion/react';
import PageMasthead from '../components/PageMasthead/PageMasthead';
import Reveal from '../components/Reveal/Reveal';
import { getDepartment, DEPARTMENTS, SITE_THEME } from '../lib/departments';
import { getShellContent } from '../data/shellContent';

/**
 * الصفحة الرئيسية — التعريف بالكلية
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
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-1.5 h-7 rounded-full shrink-0"
                  style={{ backgroundColor: dept.accentSecondary }}
                />
                <h2
                  className="text-xl sm:text-2xl font-extrabold"
                  style={{ color: SITE_THEME.textHeading }}
                >
                  مرحلتا الدراسة
                </h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.stages.map((stage, index) => {
                const accentColor =
                  stage.accentKey === 'accentSecondary' ? dept.accentSecondary : dept.accent;
                return (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.12, ease: 'easeOut' }}
                    className="rounded-2xl border bg-white shadow-sm overflow-hidden flex flex-col"
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
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ── Three Paths ── */}
          <section className="space-y-6">
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
                  {content.pathsTitle}
                </h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.paths.map((path, index) => {
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
                    className="text-right rounded-2xl border bg-white p-5 flex flex-col gap-3 cursor-pointer shadow-sm transition-shadow hover:shadow-md w-full"
                    style={{ borderColor: `${trackDept.accent}44` }}
                  >
                    <span
                      className="block h-1.5 w-12 rounded-full"
                      style={{ backgroundColor: trackDept.accent }}
                      aria-hidden
                    />
                    <span
                      className="text-base sm:text-lg font-bold leading-snug"
                      style={{ color: trackDept.accent }}
                    >
                      {path.title}
                    </span>
                    <span
                      className="text-xs font-semibold mt-auto flex items-center gap-1"
                      style={{ color: trackDept.accent }}
                    >
                      استكشف المسار ←
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* ── Summary Curriculum Table ── */}
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
                  {content.tableTitle}
                </h2>
              </div>
            </Reveal>
            <Reveal>
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
                          backgroundColor: ri % 2 === 0 ? '#FFFFFF' : `${dept.heroFrom}08`,
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
          <Reveal>
            <div
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
              <button
                type="button"
                onClick={() => onNavigate?.('basics')}
                className="shrink-0 min-h-[44px] px-6 py-3 rounded-xl text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90 whitespace-nowrap"
                style={{ backgroundColor: dept.accent }}
              >
                {content.bridgeCta}
              </button>
            </div>
          </Reveal>

        </div>
      </main>
    </div>
  );
}
