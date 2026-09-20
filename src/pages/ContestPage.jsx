import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Reveal from '../components/Reveal/Reveal';
import CountUp from '../components/CountUp/CountUp';
import { SITE_THEME } from '../lib/departments';
import { getContestContent } from '../data/contestContent';
import { useUiSound } from '../hooks/useUiSound';

const GOLD = '#FFCC00';
const BLUE = '#5191CE';
const GREEN = '#4EB67B';

const MotionDiv = motion.div;

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

/** Puzzle phase constants */
const PHASE = { IDLE: 0, HINT: 1, SOLUTION: 2, SOLVED: 3 };

/** Runs the exact C++ watermelon logic */
function judgeWatermelon(w) {
  if (!Number.isInteger(w) || w < 1) return null;
  return w % 2 === 0 && w !== 2 ? 'YES' : 'NO';
}

export default function ContestPage() {
  const content = getContestContent();
  const { play } = useUiSound();

  // Puzzle state
  const [phase, setPhase] = useState(PHASE.IDLE);
  const [inputVal, setInputVal] = useState('');   // raw string from <input>
  const [submitted, setSubmitted] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false); // true after first valid submit
  const [shakeKey, setShakeKey] = useState(0);
  const inputRef = useRef(null);

  // Derived: parse the number and compute live judge output
  const parsedW = inputVal.trim() === '' ? null : parseInt(inputVal, 10);
  const liveOutput = parsedW !== null && !Number.isNaN(parsedW) ? judgeWatermelon(parsedW) : null;
  const isValidInput = liveOutput !== null;

  const handleSubmit = () => {
    if (!isValidInput) {
      setShakeKey((k) => k + 1);
      return;
    }
    play('success');
    setSubmitted(true);
    setHasAnswered(true);
    setPhase(PHASE.SOLVED);
  };

  const handleHint = () => {
    play('confirm');
    setPhase(PHASE.HINT);
  };

  const handleSolution = () => {
    play('confirm');
    setPhase(PHASE.SOLUTION);
  };

  const handleReset = () => {
    setPhase(PHASE.IDLE);
    setInputVal('');
    setSubmitted(false);
    setHasAnswered(false);
    setShakeKey(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="w-full flex-1 flex flex-col overflow-x-hidden bg-[#F5F7FA]">
      <header
        className="relative w-full overflow-hidden text-white"
        style={{ background: `linear-gradient(to bottom right, ${BLUE}, ${GOLD})` }}
      >
        <div className="absolute inset-x-0 bottom-0 h-1.5" style={{ backgroundColor: GOLD }} aria-hidden />
        <div
          className="absolute -left-16 top-8 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ backgroundColor: GOLD }}
          aria-hidden
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16">
          <span
            className="inline-block text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full border mb-4"
            style={{ color: BLUE, backgroundColor: GOLD, borderColor: GOLD }}
          >
            {content.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-3xl text-white">
            {content.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90 max-w-2xl">
            {content.subtitle}
          </p>
        </div>
      </header>

      <main className="w-full px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto space-y-14 sm:space-y-16">

          {/* ── تفاصيل المسابقة ── */}
          <Reveal>
            <div className="rounded-2xl border overflow-hidden shadow-sm" style={{ borderColor: `${GOLD}55` }}>
              <div
                className="px-5 sm:px-8 py-4 flex items-center gap-3 border-b"
                style={{ backgroundColor: `${GOLD}14`, borderColor: `${GOLD}44` }}
              >
                <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: GOLD }} aria-hidden />
                <h2 className="text-lg sm:text-xl font-extrabold" style={{ color: SITE_THEME.textHeading }}>
                  تفاصيل المسابقة
                </h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-3 list-none p-0 m-0 bg-white">
                <li className="px-6 py-7 flex flex-col gap-3 border-b sm:border-b-0 sm:border-e" style={{ borderColor: `${GOLD}33` }}>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-xl" style={{ backgroundColor: `${GOLD}18`, color: GOLD }}>👥</div>
                  <h3 className="text-base sm:text-lg font-bold" style={{ color: SITE_THEME.textHeading }}>الفريق</h3>
                  <p className="text-sm leading-relaxed" style={{ color: SITE_THEME.textMuted }}>
                    يتكون الفريق من{' '}<span className="font-extrabold" style={{ color: GOLD }}>3 أشخاص</span>{' '}يتنافسون مع الفرق الأخرى لحل المسائل بكفاءة عالية.
                  </p>
                </li>
                <li className="px-6 py-7 flex flex-col gap-3 border-b sm:border-b-0 sm:border-e" style={{ borderColor: `${GOLD}33` }}>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-xl" style={{ backgroundColor: `${GOLD}18`, color: GOLD }}>💻</div>
                  <h3 className="text-base sm:text-lg font-bold" style={{ color: SITE_THEME.textHeading }}>المسائل</h3>
                  <p className="text-sm leading-relaxed" style={{ color: SITE_THEME.textMuted }}>
                    تتضمن المسابقة من{' '}<span className="font-extrabold" style={{ color: GOLD }}>12 إلى 15 مسألة</span>{' '}برمجية متدرجة الصعوبة.
                  </p>
                </li>
                <li className="px-6 py-7 flex flex-col gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-xl" style={{ backgroundColor: `${GOLD}18`, color: GOLD }}>⏱️</div>
                  <h3 className="text-base sm:text-lg font-bold" style={{ color: SITE_THEME.textHeading }}>الوقت</h3>
                  <p className="text-sm leading-relaxed" style={{ color: SITE_THEME.textMuted }}>
                    يجب حل أكبر عدد ممكن من المسائل خلال{' '}<span className="font-extrabold" style={{ color: GOLD }}>5 ساعات</span>{' '}متواصلة.
                  </p>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <section className="rounded-2xl border bg-white p-5 sm:p-8 space-y-3" style={{ borderColor: `${GOLD}66` }}>
              <SectionTitle>{content.aboutTitle}</SectionTitle>
              <p className="text-sm sm:text-base leading-relaxed max-w-3xl" style={{ color: SITE_THEME.textPrimary }}>
                {content.aboutBody}
              </p>
            </section>
          </Reveal>

          <section className="space-y-6">
            <Reveal><SectionTitle>{content.benefitsTitle}</SectionTitle></Reveal>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0">
              {content.benefits.map((item) => (
                <li key={item.id} className="rounded-2xl border bg-white p-5 sm:p-6 min-h-[44px]" style={{ borderColor: `${GOLD}66` }}>
                  <Reveal>
                    <h3 className="text-base sm:text-lg font-bold mb-2" style={{ color: SITE_THEME.textHeading }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: SITE_THEME.textMuted }}>{item.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-6">
            <Reveal className="space-y-2 max-w-3xl">
              <SectionTitle>{content.careerTitle}</SectionTitle>
              <p className="text-sm sm:text-base pe-5" style={{ color: SITE_THEME.textMuted }}>{content.careerIntro}</p>
            </Reveal>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-px list-none p-0 m-0 rounded-2xl overflow-hidden border" style={{ borderColor: GOLD, backgroundColor: GOLD }}>
              {content.career.map((item) => (
                <li key={item.id} className="bg-white p-5 sm:p-6 min-h-[44px]">
                  <Reveal>
                    <h3 className="text-base sm:text-lg font-bold mb-2" style={{ color: GOLD }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: SITE_THEME.textMuted }}>{item.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0">
              {content.qualify.map((item) => (
                <li key={item.label} className="rounded-2xl border px-5 py-5 text-center" style={{ borderColor: BLUE, backgroundColor: `${BLUE}12` }}>
                  <p className="text-3xl sm:text-4xl font-black tabular-nums" style={{ color: BLUE }}>
                    {item.value === 10 ? <CountUp value={10} suffix={item.suffix} /> : <>{item.value}{item.suffix}</>}
                  </p>
                  <p className="mt-1 text-sm" style={{ color: SITE_THEME.textMuted }}>{item.label}</p>
                </li>
              ))}
            </ul>
          </section>

          <Reveal>
            <section className="rounded-2xl border p-5 sm:p-8 space-y-3" style={{ borderColor: GOLD, backgroundColor: `${GOLD}14` }}>
              <SectionTitle>{content.campTitle}</SectionTitle>
              <p className="text-sm sm:text-base leading-relaxed max-w-3xl font-medium" style={{ color: SITE_THEME.textHeading }}>{content.campLead}</p>
              <p className="text-sm sm:text-base leading-relaxed max-w-3xl" style={{ color: SITE_THEME.textPrimary }}>{content.campBody}</p>
            </section>
          </Reveal>

          <section className="space-y-6">
            <Reveal className="space-y-2 max-w-3xl">
              <SectionTitle>{content.startTitle}</SectionTitle>
              <p className="text-sm sm:text-base pe-5" style={{ color: SITE_THEME.textMuted }}>{content.startSubtitle}</p>
            </Reveal>
            <ol className="relative list-none p-0 m-0 space-y-0">
              <div className="absolute top-3 bottom-3 w-0.5 end-5 sm:end-6" style={{ backgroundColor: GOLD }} aria-hidden />
              {content.startSteps.map((step, index) => (
                <li key={step.id} className="relative">
                  <Reveal className="grid grid-cols-[1fr_auto] gap-4 sm:gap-6 py-5 sm:py-6">
                    <div className="min-w-0 space-y-1.5 pe-2">
                      <h3 className="text-lg sm:text-xl font-bold" style={{ color: SITE_THEME.textHeading }}>{step.title}</h3>
                      <p className="text-sm sm:text-base leading-relaxed max-w-2xl" style={{ color: SITE_THEME.textMuted }}>{step.body}</p>
                      {step.href && (
                        <a href={step.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[44px] text-sm font-semibold" style={{ color: BLUE }}>
                          {step.hrefLabel}
                        </a>
                      )}
                    </div>
                    <span className="relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full text-sm font-black shrink-0" style={{ backgroundColor: GOLD, color: BLUE }} aria-hidden>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ol>
          </section>

          {/* ══ PUZZLE SECTION — interactive judge ══ */}
          <Reveal>
            <section
              className="rounded-2xl border overflow-hidden shadow-sm"
              style={{ borderColor: GOLD }}
            >
              {/* ── Header bar ── */}
              <div
                className="px-5 sm:px-8 py-4 flex items-center justify-between gap-3 border-b"
                style={{ backgroundColor: `${GOLD}18`, borderColor: `${GOLD}55` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl" aria-hidden>🍉</span>
                  <SectionTitle>{content.puzzleTitle}</SectionTitle>
                </div>
                {phase !== PHASE.IDLE && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border transition hover:opacity-80 min-h-[32px]"
                    style={{ borderColor: `${GOLD}66`, color: SITE_THEME.textMuted }}
                  >
                    إعادة المحاولة ↺
                  </button>
                )}
              </div>

              <div className="p-5 sm:p-8 space-y-6" style={{ backgroundColor: `${GOLD}08` }}>

                {/* ── Intro text + link ── */}
                <div className="space-y-2 max-w-2xl">
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: SITE_THEME.textMuted }}>
                    {content.puzzleLead}
                  </p>
                  <a
                    href={content.puzzleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition hover:opacity-80"
                    style={{ color: BLUE, borderColor: `${BLUE}44`, backgroundColor: `${BLUE}0e` }}
                  >
                    <span>🔗</span> {content.puzzleLinkLabel}
                  </a>
                </div>

                {/* ── Problem statement card ── */}
                <div
                  className="rounded-2xl border p-5 sm:p-6 space-y-1.5"
                  style={{ borderColor: `${GOLD}55`, backgroundColor: '#FFFFFF' }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: GOLD }}>
                    المسألة
                  </p>
                  <p className="text-base sm:text-lg font-semibold leading-relaxed" style={{ color: SITE_THEME.textHeading }}>
                    {content.puzzlePrompt}
                  </p>
                  {/* Input format hint */}
                  <p className="text-xs pt-1" style={{ color: SITE_THEME.textMuted }}>
                    <span className="font-semibold">المدخل:</span> عدد صحيح موجب يمثل وزن البطيخة (مثال: 8، 2، 7)
                  </p>
                </div>

                {/* ── Judge simulator ── */}
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{ borderColor: `${GOLD}44` }}
                >
                  {/* simulator header */}
                  <div
                    className="px-4 py-2.5 flex items-center justify-between border-b"
                    style={{ backgroundColor: `${GOLD}14`, borderColor: `${GOLD}44` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex gap-1.5" aria-hidden>
                        <span className="w-2.5 h-2.5 rounded-full bg-red-300 opacity-70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 opacity-70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-300 opacity-70" />
                      </span>
                      <span
                        className="text-xs font-mono font-semibold"
                        style={{ color: SITE_THEME.textMuted }}
                      >
                        watermelon.cpp — judge
                      </span>
                    </div>
                    {/* Live output badge */}
                    <AnimatePresence mode="wait">
                      {liveOutput !== null && (
                        <MotionDiv
                          key={liveOutput}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.18 }}
                          className="text-xs font-extrabold px-2.5 py-1 rounded-full font-mono"
                          style={{
                            backgroundColor: liveOutput === 'YES' ? `${GREEN}25` : '#e0525222',
                            color: liveOutput === 'YES' ? GREEN : '#e05252',
                            border: `1px solid ${liveOutput === 'YES' ? GREEN : '#e05252'}55`,
                          }}
                        >
                          {liveOutput}
                        </MotionDiv>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* terminal body */}
                  <div className="bg-white px-5 py-4 space-y-3 font-mono text-sm">
                    {/* stdin line */}
                    <div className="flex items-center gap-3">
                      <span
                        className="shrink-0 text-xs select-none font-semibold"
                        style={{ color: GOLD }}
                      >
                        الدخل:
                      </span>
                      <MotionDiv
                        key={shakeKey}
                        animate={
                          !isValidInput && inputVal.trim() !== ''
                            ? { x: [0, -6, 6, -4, 4, -2, 2, 0] }
                            : { x: 0 }
                        }
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="flex-1"
                      >
                        <input
                          ref={inputRef}
                          type="number"
                          value={inputVal}
                          onChange={(e) => {
                            setInputVal(e.target.value);
                            setSubmitted(false);
                          }}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
                          placeholder="أدخل وزن البطيخة..."
                          dir="ltr"
                          min="1"
                          aria-label="وزن البطيخة"
                          disabled={phase === PHASE.SOLVED}
                          className="w-full bg-transparent outline-none text-sm font-mono"
                          style={{ color: SITE_THEME.textHeading }}
                        />
                      </MotionDiv>
                    </div>

                    {/* stdout line */}
                    <div className="flex items-center gap-3">
                      <span
                        className="shrink-0 text-xs select-none font-semibold"
                        style={{ color: GOLD }}
                      >
                        الخرج:
                      </span>
                      <div className="flex-1 min-h-[20px]">
                        <AnimatePresence mode="wait">
                          {liveOutput !== null ? (
                            <MotionDiv
                              key={liveOutput + inputVal}
                              initial={{ opacity: 0, y: 3 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="text-sm font-extrabold font-mono"
                              style={{ color: liveOutput === 'YES' ? GREEN : '#e05252' }}
                            >
                              {liveOutput}
                            </MotionDiv>
                          ) : (
                            <MotionDiv
                              key="empty"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs italic"
                              style={{ color: SITE_THEME.textMuted }}
                            >
                              {inputVal.trim() === '' ? 'في انتظار المدخل...' : 'مدخل غير صالح'}
                            </MotionDiv>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* divider */}
                    <div className="border-t" style={{ borderColor: `${GOLD}33` }} />

                    {/* submit row */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isValidInput || phase === PHASE.SOLVED}
                        className="min-h-[40px] px-5 py-2 rounded-xl text-xs font-bold transition disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ backgroundColor: GOLD, color: BLUE }}
                      >
                        ▶ تشغيل وتسليم
                      </button>

                      {/* Accepted verdict after submit */}
                      <AnimatePresence>
                        {submitted && phase === PHASE.SOLVED && (
                          <MotionDiv
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full"
                            style={{ backgroundColor: `${GREEN}20`, color: GREEN, border: `1px solid ${GREEN}55` }}
                          >
                            ✅ Accepted
                          </MotionDiv>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* ── Celebration after submit ── */}
                <AnimatePresence>
                  {phase === PHASE.SOLVED && (
                    <MotionDiv
                      initial={{ opacity: 0, scale: 0.93 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-2xl border p-5 flex items-center gap-4"
                      style={{ borderColor: `${GREEN}55`, backgroundColor: `${GREEN}0d` }}
                    >
                      <MotionDiv
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: [0.4, 1.3, 1], opacity: 1 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-3xl shrink-0"
                        aria-hidden
                      >
                        🎉
                      </MotionDiv>
                      <div>
                        <p className="text-sm font-extrabold" style={{ color: GREEN }}>
                          Accepted! — الكود مقبول
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: SITE_THEME.textMuted }}>
                          المُخرج لوزن{' '}
                          <span className="font-bold font-mono" style={{ color: GOLD }}>{parsedW}</span>
                          {' '}هو{' '}
                          <span
                            className="font-extrabold font-mono"
                            style={{ color: liveOutput === 'YES' ? GREEN : '#e05252' }}
                          >
                            {liveOutput}
                          </span>
                        </p>
                      </div>
                    </MotionDiv>
                  )}
                </AnimatePresence>

                {/* ── Hint / Solution buttons ── */}
                <div className="flex flex-wrap gap-3">
                  {phase === PHASE.IDLE && hasAnswered && (
                    <button
                      type="button"
                      onClick={handleHint}
                      className="min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold border transition hover:opacity-80"
                      style={{ borderColor: `${GOLD}66`, color: SITE_THEME.textMuted, backgroundColor: '#FFFFFF' }}
                    >
                      💡 {content.puzzleHintLabel}
                    </button>
                  )}
                  {(phase === PHASE.HINT || phase === PHASE.SOLVED) && phase !== PHASE.SOLUTION && hasAnswered && (
                    <button
                      type="button"
                      onClick={handleSolution}
                      className="min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold border transition hover:opacity-80"
                      style={{ borderColor: `${GOLD}66`, color: SITE_THEME.textMuted, backgroundColor: '#FFFFFF' }}
                    >
                      🔍 {content.puzzleAnswerLabel}
                    </button>
                  )}
                </div>

                {/* ── Hint panel ── */}
                <AnimatePresence>
                  {(phase === PHASE.HINT || phase === PHASE.SOLUTION) && (
                    <MotionDiv
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        className="rounded-2xl border p-5 flex gap-3"
                        style={{ borderColor: `${GOLD}55`, backgroundColor: `${GOLD}14` }}
                      >
                        <span className="text-lg shrink-0 mt-0.5" aria-hidden>💡</span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: GOLD }}>تلميح</p>
                          <p className="text-sm sm:text-base leading-relaxed" style={{ color: SITE_THEME.textHeading }}>
                            {content.puzzleHint}
                          </p>
                        </div>
                      </div>
                    </MotionDiv>
                  )}
                </AnimatePresence>

                {/* ── Solution panel ── */}
                <AnimatePresence>
                  {phase === PHASE.SOLUTION && (
                    <MotionDiv
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="space-y-4">
                        {/* Explanation */}
                        <div
                          className="rounded-2xl border p-5 flex gap-3"
                          style={{ borderColor: `${BLUE}44`, backgroundColor: `${BLUE}0a` }}
                        >
                          <span className="text-lg shrink-0 mt-0.5" aria-hidden>🔍</span>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: BLUE }}>الفكرة</p>
                            <p className="text-sm sm:text-base leading-relaxed" style={{ color: SITE_THEME.textPrimary }}>
                              {content.puzzleAnswer}
                            </p>
                          </div>
                        </div>

                        {/* Code block */}
                        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: `${GOLD}55` }}>
                          <div
                            className="px-4 py-2.5 flex items-center justify-between border-b"
                            style={{ backgroundColor: `${GOLD}14`, borderColor: `${GOLD}44` }}
                          >
                            <span
                              className="text-xs font-mono font-semibold"
                              style={{ color: SITE_THEME.textMuted }}
                            >
                              watermelon.cpp
                            </span>
                            <span className="flex gap-1.5" aria-hidden>
                              <span className="w-2.5 h-2.5 rounded-full bg-red-300 opacity-70" />
                              <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 opacity-70" />
                              <span className="w-2.5 h-2.5 rounded-full bg-green-300 opacity-70" />
                            </span>
                          </div>
                          <pre
                            dir="ltr"
                            className="bg-[#F5F7FA] p-5 font-mono text-xs sm:text-sm overflow-x-auto text-left leading-relaxed"
                            style={{ color: SITE_THEME.textHeading }}
                          >
                            <code>{content.puzzleCode}</code>
                          </pre>
                        </div>
                      </div>
                    </MotionDiv>
                  )}
                </AnimatePresence>

              </div>
            </section>
          </Reveal>

        </div>
      </main>
    </div>
  );
}
