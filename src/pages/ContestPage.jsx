import { useState } from 'react';
import Reveal from '../components/Reveal/Reveal';
import CountUp from '../components/CountUp/CountUp';
import { SITE_THEME } from '../lib/departments';
import { getContestContent } from '../data/contestContent';
import { useUiSound } from '../hooks/useUiSound';

const GOLD = '#E6B84A';
const NAVY = '#2B2E71';

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-1.5 h-7 rounded-full shrink-0"
        style={{ backgroundColor: GOLD }}
        aria-hidden
      />
      <h2
        className="text-xl sm:text-2xl font-extrabold"
        style={{ color: SITE_THEME.textHeading }}
      >
        {children}
      </h2>
    </div>
  );
}

/**
 * المسابقة البرمجية — arena layout (not a specialty clone).
 */
export default function ContestPage() {
  const content = getContestContent();
  const { play } = useUiSound();
  const [puzzleStep, setPuzzleStep] = useState(0);

  const advancePuzzle = () => {
    if (puzzleStep === 0) {
      play('confirm');
    } else {
      play('success');
    }
    setPuzzleStep((step) => step + 1);
  };

  return (
    <div className="w-full flex-1 flex flex-col overflow-x-hidden bg-[#F5F7FA]">
      <header
        className="relative w-full overflow-hidden text-white"
        style={{
          background: `linear-gradient(to bottom right, ${NAVY}, ${GOLD})`,
        }}
      >
        <div
          className="absolute inset-x-0 bottom-0 h-1.5"
          style={{ backgroundColor: GOLD }}
          aria-hidden
        />
        <div
          className="absolute -left-16 top-8 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ backgroundColor: GOLD }}
          aria-hidden
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16">
          <span
            className="inline-block text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full border mb-4"
            style={{
              color: NAVY,
              backgroundColor: GOLD,
              borderColor: GOLD,
            }}
          >
            {content.badge}
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-3xl"
            style={{ color: GOLD }}
          >
            {content.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90 max-w-2xl">
            {content.subtitle}
          </p>
        </div>
      </header>

      <main className="w-full px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto space-y-14 sm:space-y-16">
          <Reveal>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 list-none p-0 m-0">
              {content.stats.map((stat) => (
                <li
                  key={stat.label}
                  className="rounded-2xl border px-5 py-5 text-center"
                  style={{
                    borderColor: GOLD,
                    backgroundColor: `${GOLD}22`,
                  }}
                >
                  <p
                    className="text-3xl sm:text-4xl font-black tabular-nums"
                    style={{ color: GOLD }}
                  >
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-sm" style={{ color: SITE_THEME.textMuted }}>
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <section className="space-y-6">
            <Reveal className="space-y-2 max-w-3xl">
              <SectionTitle>{content.roundTitle}</SectionTitle>
              <p
                className="text-sm sm:text-base pe-5"
                style={{ color: SITE_THEME.textMuted }}
              >
                {content.roundSubtitle}
              </p>
            </Reveal>

            <ol className="relative list-none p-0 m-0 space-y-0">
              <div
                className="absolute top-3 bottom-3 w-0.5 end-5 sm:end-6"
                style={{ backgroundColor: GOLD }}
                aria-hidden
              />
              {content.steps.map((step, index) => (
                <li key={step.id} className="relative">
                  <Reveal className="grid grid-cols-[1fr_auto] gap-4 sm:gap-6 py-5 sm:py-6">
                    <div className="min-w-0 space-y-1.5 pe-2">
                      <h3
                        className="text-lg sm:text-xl font-bold"
                        style={{ color: SITE_THEME.textHeading }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-sm sm:text-base leading-relaxed max-w-2xl"
                        style={{ color: SITE_THEME.textMuted }}
                      >
                        {step.body}
                      </p>
                    </div>
                    <span
                      className="relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full text-sm font-black shrink-0"
                      style={{ backgroundColor: GOLD, color: NAVY }}
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-6">
            <Reveal>
              <SectionTitle>{content.typesTitle}</SectionTitle>
            </Reveal>
            <ul
              className="list-none p-0 m-0 divide-y border-y"
              style={{ borderColor: `${GOLD}66` }}
            >
              {content.types.map((item) => (
                <li key={item.id}>
                  <Reveal className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                    <h3
                      className="sm:w-48 shrink-0 text-base sm:text-lg font-bold"
                      style={{ color: GOLD }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm sm:text-base leading-relaxed"
                      style={{ color: SITE_THEME.textMuted }}
                    >
                      {item.body}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-6">
            <Reveal>
              <SectionTitle>{content.whyTitle}</SectionTitle>
            </Reveal>
            <ul
              className="grid grid-cols-1 md:grid-cols-3 gap-px list-none p-0 m-0 rounded-2xl overflow-hidden border"
              style={{ borderColor: GOLD, backgroundColor: GOLD }}
            >
              {content.why.map((item) => (
                <li key={item.id} className="bg-white p-5 sm:p-6">
                  <Reveal>
                    <h3
                      className="text-base sm:text-lg font-bold mb-2"
                      style={{ color: GOLD }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: SITE_THEME.textMuted }}>
                      {item.body}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>

          <Reveal>
            <section
              className="rounded-2xl border p-5 sm:p-8 space-y-4"
              style={{
                borderColor: GOLD,
                backgroundColor: `${GOLD}14`,
              }}
            >
              <SectionTitle>{content.puzzleTitle}</SectionTitle>
              <p
                className="text-sm sm:text-base leading-relaxed max-w-3xl"
                style={{ color: SITE_THEME.textPrimary }}
              >
                {content.puzzlePrompt}
              </p>

              {puzzleStep >= 1 && (
                <p
                  className="text-sm sm:text-base leading-relaxed rounded-xl px-4 py-3"
                  style={{
                    backgroundColor: `${GOLD}28`,
                    color: SITE_THEME.textHeading,
                  }}
                >
                  {content.puzzleHint}
                </p>
              )}

              {puzzleStep >= 2 && (
                <p
                  className="text-sm sm:text-base leading-relaxed rounded-xl px-4 py-3 border"
                  style={{
                    borderColor: GOLD,
                    backgroundColor: '#FFFFFF',
                    color: SITE_THEME.textPrimary,
                  }}
                >
                  {content.puzzleAnswer}
                </p>
              )}

              {puzzleStep < 2 && (
                <button
                  type="button"
                  onClick={advancePuzzle}
                  className="min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold transition"
                  style={{
                    backgroundColor: GOLD,
                    color: NAVY,
                  }}
                >
                  {puzzleStep === 0 ? content.puzzleHintLabel : content.puzzleAnswerLabel}
                </button>
              )}
            </section>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
