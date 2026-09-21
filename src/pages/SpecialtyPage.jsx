import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import Hero from '../components/Hero/Hero';
import Reveal from '../components/Reveal/Reveal';
import StaggerGrid from '../components/StaggerGrid/StaggerGrid';
import AnimatedCard, { AnimatedIcon } from '../components/AnimatedCard/AnimatedCard';
import GlowCallout from '../components/GlowCallout/GlowCallout';
import TiltCard from '../components/TiltCard/TiltCard';
import Typewriter from '../components/Typewriter/Typewriter';
import MagneticButton from '../components/MagneticButton/MagneticButton';
import CountUp from '../components/CountUp/CountUp';
import QuizSteps from '../components/QuizSteps/QuizSteps';
import SectionNav from '../components/SectionNav/SectionNav';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useUiSound } from '../hooks/useUiSound';
import { getDepartment } from '../lib/departments';
import { getSpecialtyContent } from '../data/specialtyContent';
import {
  fadeIn,
  scaleFade,
  reducedMotionVariants,
  layoutTransition,
  celebrate,
} from '../lib/animations';

const MotionDiv = motion.div;
const MotionSpan = motion.span;

function FutureGroup({ title, items, accent, borderSoft }) {
  return (
    <div className="space-y-3">
      <h3 className="text-base sm:text-lg font-bold" style={{ color: accent }}>
        {title}
      </h3>
      <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((item) => (
          <AnimatedCard
            key={item.title}
            className="bg-[var(--card-bg)] p-4 sm:p-5 rounded-xl border shadow-sm min-h-[44px]"
            style={borderSoft}
          >
            <p className="text-sm sm:text-base font-bold mb-1.5" style={{ color: accent }}>
              {item.title}
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-muted)]">{item.body}</p>
          </AnimatedCard>
        ))}
      </StaggerGrid>
    </div>
  );
}

function roleColor(tone, accent) {
  if (tone === 'accent') return accent;
  if (tone === 'blue') return '#5191CE';
  if (tone === 'gold') return '#E6B84A';
  return accent;
}

/**
 * Shared specialty landing (software).
 * @param {{ departmentId?: string }} props
 */
export default function SpecialtyPage({ departmentId = 'software' }) {
  const dept = getDepartment(departmentId);
  const content = getSpecialtyContent(departmentId);
  const accent = dept.accent;
  const accentHover = dept.accent;

  const prefersReducedMotion = usePrefersReducedMotion();
  const { play } = useUiSound();
  const enterVariants = prefersReducedMotion ? reducedMotionVariants : fadeIn;
  const modalVariants = prefersReducedMotion ? reducedMotionVariants : scaleFade;

  const [snippetLine, setSnippetLine] = useState(content.trySnippetLine);
  const [codeOutput, setCodeOutput] = useState('');
  const [typeReplayKey, setTypeReplayKey] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeStackId, setActiveStackId] = useState(content.stackRoles[0]?.id);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const runTimeoutRef = useRef(null);
  const modalCloseRef = useRef(null);
  const lastFocusRef = useRef(null);

  const stackRoles = useMemo(
    () =>
      content.stackRoles.map((role) => ({
        ...role,
        color: roleColor(role.tone, accent),
      })),
    [content.stackRoles, accent],
  );

  const activeStack =
    stackRoles.find((role) => role.id === activeStackId) ?? stackRoles[0];

  const closeModal = useCallback(() => {
    setSelectedCourse(null);
    if (lastFocusRef.current && typeof lastFocusRef.current.focus === 'function') {
      lastFocusRef.current.focus();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (runTimeoutRef.current) clearTimeout(runTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!selectedCourse) return undefined;

    lastFocusRef.current = document.activeElement;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      modalCloseRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedCourse, closeModal]);

  const handleAnswer = (points) => {
    play('confirm');
    const nextScore = score + points;
    setScore(nextScore);
    if (currentQuestion + 1 < content.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      if (nextScore >= 75) play('success');
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResult(false);
  };

  const runCode = () => {
    play('confirm');
    if (runTimeoutRef.current) clearTimeout(runTimeoutRef.current);
    const output = snippetLine.trim() || content.trySnippetLine;
    setIsRunning(true);
    setCodeOutput('');
    runTimeoutRef.current = setTimeout(() => {
      setCodeOutput(output);
      setTypeReplayKey((key) => key + 1);
      setIsRunning(false);
      runTimeoutRef.current = null;
    }, 600);
  };

  const borderSoft = { borderColor: `${accent}33` };
  const textAccent = { color: accent };

  return (
    <LayoutGroup>
      <div
        className="w-full flex-1 bg-[var(--shell-bg)] text-[var(--text-primary)] font-sans flex flex-col overflow-x-hidden relative"
        dir="rtl"
      >
        <Hero departmentId={departmentId} />
        <SectionNav accent={accent} />

        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1 space-y-12 md:space-y-16">
          <Reveal
            id="about"
            className="scroll-mt-24 transition duration-300 bg-[var(--card-bg)] p-6 md:p-8 rounded-2xl border shadow-sm space-y-4"
            style={borderSoft}
          >
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold flex items-center gap-2"
                style={textAccent}
              >
                {content.aboutTitle}
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed text-sm sm:text-base mt-4">
                {content.aboutBody}
              </p>
            </section>
          </Reveal>

          <section id="future" className="scroll-mt-24 space-y-6">
            <Reveal>
              <h2 className="text-xl sm:text-2xl font-bold" style={textAccent}>
                {content.futureTitle}
              </h2>
              {content.futureIntro && (
                <p className="text-[var(--text-muted)] leading-relaxed text-sm sm:text-base mt-3">
                  {content.futureIntro}
                </p>
              )}
            </Reveal>
            <Reveal className="space-y-8">
              <FutureGroup
                title={content.projectsTitle}
                items={content.projects}
                accent={accent}
                borderSoft={borderSoft}
              />
              <FutureGroup
                title={content.careersTitle}
                items={content.careers}
                accent={accent}
                borderSoft={borderSoft}
              />
              <FutureGroup
                title={content.contrastTitle}
                items={content.contrast}
                accent={accent}
                borderSoft={borderSoft}
              />
            </Reveal>
          </section>

          <section id="stories" className="scroll-mt-24 space-y-4 md:space-y-6">
            <Reveal>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-base shadow-sm bg-[var(--card-bg)]" style={borderSoft}>
                  🚀
                </span>
                <h2 className="text-xl sm:text-2xl font-bold" style={textAccent}>
                  {content.successStoriesTitle}
                </h2>
              </div>
            </Reveal>
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {content.successStories?.map((story) => (
                <AnimatedCard
                  key={story.title}
                  className="group relative overflow-hidden bg-[var(--card-bg)] p-5 sm:p-6 rounded-2xl border shadow-sm"
                  style={borderSoft}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                  />
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm"
                      style={{ backgroundColor: `${accent}1A`, color: accent }}
                    >
                      <AnimatedIcon>✨</AnimatedIcon>
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold px-2 py-1 rounded-full border" style={{ ...borderSoft, color: accent }}>
                      قصة نجاح
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={textAccent}>
                    {story.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed">
                    {story.body}
                  </p>
                </AnimatedCard>
              ))}
            </StaggerGrid>
          </section>

          <section id="faq" className="scroll-mt-24 space-y-6">
            <Reveal>
              <div className="flex items-center gap-3">
                <div
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-lg shadow-sm border"
                  style={{ backgroundColor: `${accent}12`, borderColor: `${accent}33`, color: accent }}
                >
                  ❓
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold" style={textAccent}>
                    {content.faqTitle}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">اضغط على السؤال لعرض الإجابة</p>
                </div>
              </div>
            </Reveal>

            <div className="rounded-2xl border overflow-hidden shadow-sm" style={{ borderColor: `${accent}33` }}>
              {content.faqs?.map((item, index) => {
                const isOpen = openFaqIndex === index;
                const isLast = index === (content.faqs?.length ?? 0) - 1;
                return (
                  <Reveal key={item.question}>
                    <div
                      className={`border-b ${isLast ? 'border-b-0' : ''}`}
                      style={{ borderColor: `${accent}22` }}
                    >
                      {/* Question row — clickable trigger */}
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="w-full min-h-[56px] flex items-center gap-4 px-5 sm:px-6 py-4 text-right transition-colors"
                        onMouseEnter={(event) => {
                          if (!isOpen) event.currentTarget.style.backgroundColor = `${accent}08`;
                        }}
                        onMouseLeave={(event) => {
                          if (!isOpen) event.currentTarget.style.backgroundColor = 'var(--card-bg)';
                        }}
                        style={{ backgroundColor: isOpen ? `${accent}08` : 'var(--card-bg)' }}
                      >
                        {/* Index badge */}
                        <span
                          className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold tabular-nums transition-colors"
                          style={{
                            backgroundColor: isOpen ? accent : `${accent}14`,
                            color: isOpen ? '#FFFFFF' : accent,
                          }}
                        >
                          {index + 1}
                        </span>

                        {/* Question text */}
                        <span
                          className="flex-1 text-sm sm:text-base font-bold text-right leading-snug"
                          style={{ color: isOpen ? accent : 'var(--text-primary)' }}
                        >
                          {item.question}
                        </span>

                        {/* Chevron */}
                        <MotionDiv
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="shrink-0 text-xs"
                          style={{ color: accent }}
                          aria-hidden
                        >
                          ▼
                        </MotionDiv>
                      </button>

                      {/* Answer — animated expand/collapse */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <MotionDiv
                            key="answer"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: 'easeInOut' }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div className="px-5 sm:px-6 pb-5 pt-1 flex gap-4">
                              {/* Left accent line */}
                              <div
                                className="shrink-0 w-0.5 rounded-full self-stretch"
                                style={{ backgroundColor: accent, opacity: 0.35 }}
                                aria-hidden
                              />
                              <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </MotionDiv>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section id="myths" className="scroll-mt-24 space-y-4 md:space-y-6">
            <Reveal>
              <h2 className="text-xl sm:text-2xl font-bold" style={textAccent}>
                {content.mythsTitle}
              </h2>
            </Reveal>
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {content.myths.map((item) => (
                <AnimatedCard
                  key={item.myth}
                  className="bg-[var(--card-bg)] p-5 sm:p-6 rounded-xl border shadow-sm"
                  style={borderSoft}
                >
                  <span className="text-[#c45c5c] font-bold text-sm">❌ خرافة:</span>
                  <p className="text-[var(--text-primary)] mt-1 text-sm sm:text-base">
                    &quot;{item.myth}&quot;
                  </p>
                  <span className="text-[#4EB67B] font-bold text-sm mt-3 block">
                    ✔ الحقيقة:
                  </span>
                  <p className="text-[var(--text-muted)] text-xs sm:text-sm">{item.fact}</p>
                </AnimatedCard>
              ))}
            </StaggerGrid>
          </section>

          <section id="courses" className="scroll-mt-24 space-y-6">
            <Reveal className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2
                className="text-xl sm:text-2xl font-bold flex items-center gap-2"
                style={textAccent}
              >
                {content.coursesTitle}
              </h2>
              <span className="text-xs font-medium" style={textAccent}>
                ✨ اضغط على المادة لقراءة الشرح المبسط
              </span>
            </Reveal>

            <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {content.courses.map((course) => (
                <TiltCard key={course.id} className="h-full">
                  <AnimatedCard
                    as="button"
                    disableHoverMotion
                    skipVariants
                    layoutId={
                      selectedCourse?.id === course.id
                        ? undefined
                        : `course-card-${departmentId}-${course.id}`
                    }
                    transition={layoutTransition}
                    onClick={() => setSelectedCourse(course)}
                    className="text-right bg-[var(--card-bg)] p-6 rounded-2xl border shadow-sm cursor-pointer group flex flex-col justify-between min-h-[44px] h-full w-full hover:shadow-md"
                    style={borderSoft}
                  >
                    <div>
                      <AnimatedIcon className="text-4xl mb-4">{course.icon}</AnimatedIcon>
                      <h3
                        className="font-bold text-lg mb-2"
                        style={textAccent}
                      >
                        {course.name}
                      </h3>
                      <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed mb-4">
                        {course.desc}
                      </p>
                    </div>
                    <div
                      className="text-xs font-semibold flex items-center gap-1 pt-2 border-t"
                      style={{ ...textAccent, borderColor: `${accent}33` }}
                    >
                      انقر للتوضيح المبسط ←
                    </div>
                  </AnimatedCard>
                </TiltCard>
              ))}
            </StaggerGrid>
          </section>

          <Reveal
            id="stack"
            className="scroll-mt-24 bg-[var(--card-bg)] p-6 md:p-8 rounded-2xl border shadow-sm space-y-6"
            style={borderSoft}
          >
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2
                className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2"
                style={textAccent}
              >
                {content.stackTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">{content.stackHint}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {stackRoles.map((role) => {
                const isActive = role.id === activeStackId;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setActiveStackId(role.id)}
                    className={`group relative text-right bg-[var(--shell-bg)] p-5 rounded-xl border space-y-3 min-h-[44px] cursor-pointer transition ${
                      isActive ? 'ring-2 opacity-100' : 'opacity-85 hover:opacity-100'
                    }`}
                    style={{
                      borderColor: `${role.color}66`,
                      ...(isActive ? { boxShadow: `0 0 0 2px ${role.color}55` } : {}),
                    }}
                  >
                    {isActive && !prefersReducedMotion && (
                      <MotionDiv
                        layoutId={`stack-active-${departmentId}`}
                        className="absolute inset-0 rounded-xl border-2 pointer-events-none"
                        style={{ borderColor: `${accent}80` }}
                        transition={layoutTransition}
                      />
                    )}
                    <div className="relative flex items-center gap-2">
                      <span className="text-2xl inline-block transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3">
                        {role.icon}
                      </span>
                      <h3
                        className="font-bold text-base sm:text-lg"
                        style={{ color: role.color }}
                      >
                        {role.title}
                      </h3>
                    </div>
                    <p className="relative text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed">
                      {role.body}
                    </p>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <MotionDiv
                key={activeStack.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={enterVariants}
              >
                <GlowCallout
                  className="p-3 sm:p-4 rounded-lg border text-xs sm:text-sm"
                  style={{
                    backgroundColor: `${activeStack.color}18`,
                    borderColor: `${activeStack.color}40`,
                    color: 'var(--text-heading)',
                  }}
                >
                  {activeStack.calloutEmoji}{' '}
                  <strong>{activeStack.calloutLabel}:</strong> {activeStack.calloutText}
                </GlowCallout>
              </MotionDiv>
            </AnimatePresence>
          </Reveal>

          <Reveal
            id="try"
            className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start"
          >
            <section
              className="bg-[var(--card-bg)] p-5 sm:p-6 rounded-2xl border shadow-sm space-y-4 h-full flex flex-col justify-between"
              style={borderSoft}
            >
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-[#4EB67B]">
                    {content.tryTitle}
                  </h2>
                  <MagneticButton
                    type="button"
                    onClick={runCode}
                    disabled={isRunning}
                    className="w-full sm:w-auto min-h-[44px] bg-[#4EB67B] hover:bg-[#3fa06a] text-white px-4 py-2.5 rounded-lg font-medium text-xs sm:text-sm transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-md active:scale-95"
                  >
                    {isRunning ? '⏳ جاري التشغيل...' : '▶ تشغيل (Run)'}
                  </MagneticButton>
                </div>

                <div
                  className="bg-[var(--shell-bg)] p-4 rounded-lg font-mono text-xs sm:text-sm border text-[var(--text-muted)] overflow-x-auto text-left"
                  style={borderSoft}
                  dir="ltr"
                >
                  <p className="text-[var(--text-muted)]">{content.trySnippetComment}</p>
                  <p className="flex flex-wrap items-baseline gap-x-0 gap-y-1">
                    <span>
                      <span style={{ color: accent }}>console</span>.
                      <span className="text-[#5191CE]">log</span>(
                      <span className="text-[var(--text-heading)]">&quot;</span>
                    </span>
                    <input
                      type="text"
                      value={snippetLine}
                      onChange={(event) => setSnippetLine(event.target.value)}
                      disabled={isRunning}
                      maxLength={80}
                      dir="ltr"
                      aria-label="نص الرسالة داخل console.log"
                      className="min-w-[12ch] flex-1 max-w-full bg-transparent border-b border-[#4EB67B]/50 focus:border-[#4EB67B] outline-none text-[var(--text-heading)] font-mono text-xs sm:text-sm px-0.5 py-0.5 disabled:opacity-60"
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && !isRunning) {
                          event.preventDefault();
                          runCode();
                        }
                      }}
                    />
                    <span className="text-[var(--text-heading)]">&quot;);</span>
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {codeOutput && (
                  <MotionDiv
                    key={`code-output-${typeReplayKey}`}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={enterVariants}
                    className="bg-[var(--shell-bg)] p-4 rounded-lg font-mono text-xs sm:text-sm border border-[#4EB67B]/40 text-[var(--text-heading)] mt-4"
                  >
                    <span className="text-[var(--text-muted)] block text-xs mb-1">
                      &gt; الشاشة الناتجة (Output):
                    </span>
                    <Typewriter
                      text={codeOutput}
                      replayKey={typeReplayKey}
                      showCursor
                    />
                  </MotionDiv>
                )}
              </AnimatePresence>
            </section>

            <section
              id="quiz"
              className="scroll-mt-24 bg-[var(--card-bg)] p-5 sm:p-6 rounded-2xl border text-center space-y-6 shadow-sm h-full flex flex-col justify-center"
              style={borderSoft}
            >
              <h2 className="text-xl sm:text-2xl font-bold" style={textAccent}>
                {content.quizTitle}
              </h2>

              {!showResult && (
                <div className="space-y-3 max-w-md mx-auto w-full">
                  <QuizSteps
                    total={content.questions.length}
                    current={currentQuestion}
                    accent={accent}
                  />
                  <div className="text-xs sm:text-sm text-[var(--text-muted)]">
                    السؤال {currentQuestion + 1} من {content.questions.length}
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {!showResult ? (
                  <MotionDiv
                    key={`q-${currentQuestion}`}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={enterVariants}
                    className="space-y-6 max-w-md mx-auto w-full"
                  >
                    <p className="text-base sm:text-lg font-medium text-[var(--text-primary)]">
                      {content.questions[currentQuestion].text}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                      <MagneticButton
                        type="button"
                        onClick={() =>
                          handleAnswer(content.questions[currentQuestion].points)
                        }
                        className="w-full sm:w-auto min-h-[44px] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer shadow-md hover:opacity-90"
                        style={{ backgroundColor: accent }}
                      >
                        نعم، ينطبق عليّ
                      </MagneticButton>
                      <MagneticButton
                        type="button"
                        onClick={() => handleAnswer(0)}
                        className="w-full sm:w-auto min-h-[44px] bg-[var(--shell-bg)] hover:bg-[var(--card-bg)] text-[var(--text-primary)] px-5 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer border"
                        style={borderSoft}
                      >
                        لا أظن ذلك
                      </MagneticButton>
                    </div>
                  </MotionDiv>
                ) : (
                  <MotionDiv
                    key="quiz-result"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={enterVariants}
                    className="space-y-4"
                  >
                    <MotionDiv
                      className="inline-block"
                      animate={
                        prefersReducedMotion || score < 75
                          ? undefined
                          : { scale: celebrate.scale }
                      }
                      transition={
                        prefersReducedMotion || score < 75
                          ? undefined
                          : { duration: 0.55, ease: 'easeOut' }
                      }
                    >
                      <CountUp
                        value={score}
                        suffix="%"
                        className="text-3xl sm:text-4xl font-extrabold text-[#4EB67B]"
                      />
                    </MotionDiv>

                    {score >= 75 && (
                      <MotionSpan
                        className="inline-flex items-center gap-2 rounded-full bg-[#4EB67B]/15 border border-[#4EB67B]/40 text-[var(--text-heading)] text-xs sm:text-sm font-semibold px-3 py-1.5"
                        initial="hidden"
                        animate="visible"
                        variants={
                          prefersReducedMotion
                            ? reducedMotionVariants
                            : celebrate.badge
                        }
                      >
                        ✓ ترشيح ممتاز
                      </MotionSpan>
                    )}

                    <p className="text-sm sm:text-lg text-[var(--text-primary)]">
                      {score >= 75 ? content.quizPass : content.quizFail}
                    </p>
                    <button
                      type="button"
                      onClick={resetQuiz}
                      className="min-h-[44px] bg-[var(--shell-bg)] hover:bg-[var(--card-bg)] text-[var(--text-primary)] px-4 py-2.5 rounded-lg text-xs sm:text-sm transition cursor-pointer border"
                      style={borderSoft}
                    >
                      إعادة الاختبار
                    </button>
                  </MotionDiv>
                )}
              </AnimatePresence>
            </section>
          </Reveal>
        </main>

        <AnimatePresence>
          {selectedCourse && (
            <MotionDiv
              key="course-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="course-modal-title"
              className="fixed inset-0 z-50 bg-[#171A24]/55 backdrop-blur-sm flex items-center justify-center p-4"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={enterVariants}
              onClick={closeModal}
            >
              <MotionDiv
                layoutId={
                  prefersReducedMotion
                    ? undefined
                    : `course-card-${departmentId}-${selectedCourse.id}`
                }
                transition={layoutTransition}
                variants={prefersReducedMotion ? modalVariants : undefined}
                initial={prefersReducedMotion ? 'hidden' : false}
                animate={prefersReducedMotion ? 'visible' : undefined}
                exit={prefersReducedMotion ? 'exit' : undefined}
                className="bg-[var(--card-bg)] border rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-4 relative"
                style={{ borderColor: `${accent}66` }}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  ref={modalCloseRef}
                  type="button"
                  onClick={closeModal}
                  aria-label="إغلاق"
                  className="absolute top-4 left-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--shell-bg)] rounded-full min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center text-sm transition cursor-pointer"
                >
                  ✕
                </button>
                <div className="flex items-center gap-3 pe-12">
                  <span className="text-4xl">{selectedCourse.icon}</span>
                  <h3
                    id="course-modal-title"
                    className="text-xl sm:text-2xl font-bold"
                    style={textAccent}
                  >
                    {selectedCourse.name}
                  </h3>
                </div>
                <div className="border-t my-2" style={{ borderColor: `${accent}33` }} />
                <p className="text-[var(--text-primary)] leading-relaxed text-sm sm:text-base">
                  {selectedCourse.details}
                </p>
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="min-h-[44px] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm transition cursor-pointer font-medium hover:opacity-90"
                    style={{ backgroundColor: accentHover }}
                  >
                    فهمت المبدأ 👍
                  </button>
                </div>
              </MotionDiv>
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
