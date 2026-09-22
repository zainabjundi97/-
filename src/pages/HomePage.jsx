import { useRef } from 'react';
import PageMasthead from '../components/PageMasthead/PageMasthead';
import Reveal from '../components/Reveal/Reveal';
import StaggerGrid from '../components/StaggerGrid/StaggerGrid';
import AnimatedCard, { AnimatedIcon } from '../components/AnimatedCard/AnimatedCard';
import TiltCard from '../components/TiltCard/TiltCard';
import GlowCallout from '../components/GlowCallout/GlowCallout';
import MagneticButton from '../components/MagneticButton/MagneticButton';
import CountUp from '../components/CountUp/CountUp';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import ScrollLine from '../components/ScrollLine/ScrollLine';
import { useUiSound } from '../hooks/useUiSound';
import { useScrollStagger } from '../hooks/useScrollStagger';
import { getDepartment, SITE_THEME } from '../lib/departments';
import { getShellContent } from '../data/shellContent';

/**
 * الصفحة الرئيسية — التعريف بالكلية
 * @param {{ onNavigate?: (id: string) => void }} props
 */
export default function HomePage({ onNavigate }) {
  const content = getShellContent('home');
  const dept = getDepartment('home');
  const { hero } = content;
  const { play } = useUiSound();
  const tableRef = useRef(null);
  useScrollStagger(tableRef, 'tbody tr, .year-card');

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

      <main className="w-full px-4 sm:px-6 py-12 sm:py-20">
        <div
          className="max-w-5xl 3xl:max-w-6xl mx-auto space-y-16 sm:space-y-24 3xl:space-y-32"
          style={{ '--grad-from': dept.accentSecondary, '--grad-to': dept.heroTo }}
        >

          {/* ── Intro Paragraphs ── */}
          <Reveal className="space-y-4 max-w-3xl">
            {content.introParagraphs.map((para, i) => (
              <p
                key={i}
                className="text-base sm:text-lg 3xl:text-xl leading-loose"
                style={{ color: i === 0 ? SITE_THEME.textHeading : SITE_THEME.textMuted }}
              >
                {para}
              </p>
            ))}
          </Reveal>

          {/* ── Key numbers ── */}
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {content.stats.map((stat) => (
              <AnimatedCard
                key={stat.label}
                className="rounded-3xl border surface-card px-6 py-7 text-center flex flex-col items-center gap-2"
                style={{ borderColor: `${dept.accentSecondary}33` }}
              >
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-gradient text-5xl sm:text-6xl font-extrabold leading-none tabular-nums"
                />
                <span
                  className="text-sm sm:text-base font-semibold"
                  style={{ color: SITE_THEME.textMuted }}
                >
                  {stat.label}
                </span>
              </AnimatedCard>
            ))}
          </StaggerGrid>

          {/* ── Two Stages ── */}
          <section className="space-y-6">
            <SectionTitle text="مرحلتا الدراسة" accentColor={dept.accentSecondary} />
            {/* Timeline connecting stage 1 → stage 2 (fills as you scroll) */}
            <ScrollLine
              orientation="horizontal"
              color={dept.accentSecondary}
              className="hidden sm:block mx-[25%]"
            />
            <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {content.stages.map((stage) => {
                const accentColor =
                  stage.accentKey === 'accentSecondary' ? dept.accentSecondary : dept.accent;
                return (
                  <AnimatedCard
                    key={stage.id}
                    className="rounded-3xl border surface-card overflow-hidden flex flex-col h-full"
                    style={{ borderColor: `${accentColor}44` }}
                  >
                    {/* top accent bar */}
                    <div className="h-1.5 w-full" style={{ backgroundColor: accentColor }} />
                    <div className="p-6 sm:p-8 flex flex-col gap-3 flex-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span
                          className="text-sm font-bold uppercase tracking-widest"
                          style={{ color: accentColor }}
                        >
                          {stage.label}
                        </span>
                        <span
                          className="text-sm font-semibold px-3 py-1 rounded-full"
                          style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
                        >
                          {stage.duration}
                        </span>
                      </div>
                      <h3
                        className="text-xl sm:text-2xl font-bold"
                        style={{ color: SITE_THEME.textHeading }}
                      >
                        {stage.title}
                      </h3>
                      <p
                        className="text-base sm:text-lg leading-relaxed flex-1"
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
            <SectionTitle text={content.pathsTitle} accentColor={dept.accentSecondary} />
            <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.paths.map((path) => {
                const trackDept = getDepartment(path.id);
                // External tracks render as a real link; internal ones switch the tab.
                const linkProps = path.href
                  ? { as: 'a', href: path.href, rel: 'noopener noreferrer', onClick: () => play('confirm') }
                  : { as: 'button', onClick: () => handlePathSelect(path.id) };
                return (
                  <TiltCard key={path.id} className="h-full sm:last:col-span-2 lg:last:col-span-1">
                    <AnimatedCard
                      {...linkProps}
                      disableHoverMotion
                      className="text-right rounded-3xl border surface-card p-6 flex flex-col gap-2 cursor-pointer w-full h-full"
                      style={{ borderColor: `${trackDept.accent}44` }}
                    >
                      <AnimatedIcon className="text-3xl">{path.icon}</AnimatedIcon>
                      <span
                        className="text-lg sm:text-xl font-bold leading-snug mt-1"
                        style={{ color: trackDept.accent }}
                      >
                        {path.title}
                      </span>
                      <p
                        className="text-sm sm:text-base leading-relaxed"
                        style={{ color: SITE_THEME.textMuted }}
                      >
                        {path.description}
                      </p>
                      <span
                        className="text-sm font-semibold mt-auto pt-2 flex items-center gap-1"
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
          <section id="table" ref={tableRef} className="scroll-mt-24 space-y-6">
            <SectionTitle text={content.tableTitle} accentColor={dept.accentSecondary} />

            {/* Mobile: stacked year cards (no horizontal scroll) */}
            <div className="space-y-4 sm:hidden">
              {content.tableData.map((row) => (
                <div
                  key={row.year}
                  className="year-card rounded-3xl border surface-card overflow-hidden"
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
            </div>

            {/* sm and up: full table */}
            <div className="hidden sm:block">
              <div
                className="overflow-x-auto rounded-3xl border surface-card"
                style={{ borderColor: SITE_THEME.cardBorder }}
              >
                <table className="w-full text-sm sm:text-base border-collapse min-w-[28rem]">
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
            </div>
          </section>

          {/* ── Bridge to BasicsPage ── */}
          <GlowCallout
            className="rounded-3xl border px-6 py-8 sm:px-10 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center gap-5"
            style={{
              background: `linear-gradient(135deg, ${dept.heroFrom}10, ${dept.heroTo}16)`,
              borderColor: `${dept.accentSecondary}44`,
            }}
          >
            <p
              className="text-base sm:text-lg leading-relaxed flex-1"
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
              className="shrink-0 min-h-[44px] px-7 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-white shadow-lg transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: dept.accent }}
            >
              {content.bridgeCta}
            </MagneticButton>
          </GlowCallout>

          {/* ── Useful links (external) ── */}
          <section className="space-y-6">
            <SectionTitle text={content.linksTitle} accentColor={dept.accentSecondary} />
            <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.links.map((link) => {
                const linkDept = getDepartment(link.id);
                return (
                  <TiltCard key={link.id} className="h-full">
                    <AnimatedCard
                      as="a"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      disableHoverMotion
                      onClick={() => play('confirm')}
                      className="text-right rounded-3xl border surface-card p-6 flex flex-col gap-2 cursor-pointer w-full h-full"
                      style={{ borderColor: `${linkDept.accent}44` }}
                    >
                      <AnimatedIcon className="text-3xl">{link.icon}</AnimatedIcon>
                      <span
                        className="text-lg sm:text-xl font-bold leading-snug mt-1"
                        style={{ color: linkDept.accent }}
                      >
                        {link.title}
                      </span>
                      <p
                        className="text-sm sm:text-base leading-relaxed"
                        style={{ color: SITE_THEME.textMuted }}
                      >
                        {link.description}
                      </p>
                      <span
                        className="text-sm font-semibold mt-auto pt-2 flex items-center gap-1"
                        style={{ color: linkDept.accent }}
                      >
                        {link.cta} ↗
                      </span>
                    </AnimatedCard>
                  </TiltCard>
                );
              })}
            </StaggerGrid>
          </section>
        </div>
      </main>
    </div>
  );
}
