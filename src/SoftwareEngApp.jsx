import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import Hero from './components/Hero/Hero';
import Reveal from './components/Reveal/Reveal';
import StaggerGrid from './components/StaggerGrid/StaggerGrid';
import AnimatedCard, { AnimatedIcon } from './components/AnimatedCard/AnimatedCard';
import GlowCallout from './components/GlowCallout/GlowCallout';
import TiltCard from './components/TiltCard/TiltCard';
import Typewriter from './components/Typewriter/Typewriter';
import MagneticButton from './components/MagneticButton/MagneticButton';
import CountUp from './components/CountUp/CountUp';
import QuizSteps from './components/QuizSteps/QuizSteps';
import SectionNav from './components/SectionNav/SectionNav';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import {
  fadeIn,
  scaleFade,
  reducedMotionVariants,
  layoutTransition,
  celebrate,
} from './lib/animations';

const MotionDiv = motion.div;
const MotionSpan = motion.span;

const CODE_OUTPUT =
  'Hello, World! أهلاً بك في قسم هندسة البرمجيات بجامعة اللاذقية 🚀';

const questions = [
  { text: 'تحب تحل الألغاز والمشاكل المنطقية؟', points: 25 },
  { text: 'تفضل بناء أشياء جديدة بنفسك بدلاً من الحفظ؟', points: 25 },
  { text: 'عندما يعطل تطبيق في هاتفك، تستمتع بمعرفة سبب العطل؟', points: 25 },
  { text: 'تطمح لتطوير مواقع، ألعاب، أو تطبيقات ذكية مستقبلاً؟', points: 25 },
];

const courses = [
  {
    id: 1,
    name: 'أساسيات البرمجة',
    icon: '💻',
    desc: 'كيف تحول أفكارك لتعليمات يفهمها الكمبيوتر وينفذها.',
    details:
      'بهذه المادة بتتعلم لغة التواصل مع الكمبيوتر! كيف تخبر الجهاز يفكر، يحسب، ويتخذ قرارات بناءً على الشروط، وكيف تبني برنامج بسيط من الزيرو خطوة بخطوة.',
  },
  {
    id: 2,
    name: 'قواعد البيانات',
    icon: '🗄️',
    desc: 'طريقة حفظ وتنظيم ملايين المعلومات بذكاء وسرعة.',
    details:
      'تخيل تطبيق مثل فيسبوك أو واتساب، وين بروح كلامك وصورك؟ بداخل قواعد البيانات! بتتعلم كيف ترتب المعلومات بجداول وتسترجعها بثواني بدون ما تضيع.',
  },
  {
    id: 3,
    name: 'تطوير المواقع والتطبيقات',
    icon: '🌐',
    desc: 'تصميم الشاشات والواجهات التي يراها ويستخدمها الناس.',
    details:
      'هنا بتتعلم كيف تصمم الشاشة، الأزرار، الألوان، والأشكال اللي بشوفها المستخدم بموقعه أو هاتفه، وتخلي الأزرار تتفاعل لما يكبس عليها.',
  },
];

const myths = [
  {
    myth: 'هندسة البرمجيات هي فقط تصليح كمبيوترات وتنزيل فورمات!',
    fact: 'الفرع يعلمك تحليل المشاكل وبناء أنظمة برمجية كاملة، قواعد بيانات، ومواقع وتطبيقات ذكية.',
  },
  {
    myth: 'لازم تكون عبقري بالرياضيات لتنجح بالبرمجة.',
    fact: 'التفكير المنطقي وتسلسل الخطوات (Algorithms) أهم بكثير من تعقيدات الرياضيات العالية.',
  },
  {
    myth: 'هندسة البرمجيات فقط كتابة أكواد',
    fact: 'التخصص مليء بكل أنواع المفاهيم البرمجية والتحليلية، مثل تحليل البيانات، هندسة الأنظمة، وإدارة المشاريع.',
  },
  {
    myth: 'الـ AI سيستبدل التخصص',
    fact: 'الذكاء الاصطناعي يستبدل المبرمجين وليس مهندسي البرمجيات؛ لأن الهندسة تعتمد على فهم المشكلات وتصميم الأنظمة وحل العقبات المعقدة.',
  },
];

const stackRoles = [
  {
    id: 'frontend',
    icon: '🎨',
    title: 'الواجهة (Frontend)',
    titleClass: 'text-sky-400',
    borderClass: 'border-sky-500/40',
    activeRing: 'ring-sky-400/40',
    body: 'هو كل شيء بشوفه المستخدم وبيتفاعل معه بعيونه: الأزرار، الألوان، القوائم، والأشكال.',
    calloutClass: 'bg-sky-950/40 border-sky-900/30 text-sky-200',
    calloutLabel: 'مثال المطعم',
    calloutText: 'طاولة الطعام، قائمة الوجبات (المنيو)، والديكور اللي بتجلس فيه.',
    calloutEmoji: '🍔',
  },
  {
    id: 'backend',
    icon: '⚙️',
    title: 'الخلفية (Backend)',
    titleClass: 'text-purple-400',
    borderClass: 'border-purple-500/40',
    activeRing: 'ring-purple-400/40',
    body: 'هو العقل الخفي والمحرك! بيحفظ معلوماتك، بيتأكد من كلمة السر، وبيجيب البيانات من قعدة البيانات.',
    calloutClass: 'bg-purple-950/40 border-purple-900/30 text-purple-200',
    calloutLabel: 'مثال المطعم',
    calloutText: 'المطبخ والطباخين اللي بيحضروا الأكل ورائهم المخزن بدون ما تشوفهم.',
    calloutEmoji: '👨‍🍳',
  },
  {
    id: 'fullstack',
    icon: '🚀',
    title: 'الفول ستاك (Full-Stack)',
    titleClass: 'text-amber-400',
    borderClass: 'border-amber-500/40',
    activeRing: 'ring-amber-400/40',
    body: 'مهندس البرمجيات الشامل اللي بيقدر يبني الشاشة (Frontend) والمحرك الخفي (Backend) مع بعض!',
    calloutClass: 'bg-amber-950/40 border-amber-900/30 text-amber-200',
    calloutLabel: 'النتيجة',
    calloutText: 'شخص قادر يصمم المطعم بأكمله ويعرف يديره من الطاولة حتى المطبخ!',
    calloutEmoji: '⭐',
  },
];

export default function SoftwareEngApp() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const enterVariants = prefersReducedMotion ? reducedMotionVariants : fadeIn;
  const modalVariants = prefersReducedMotion ? reducedMotionVariants : scaleFade;

  const [codeOutput, setCodeOutput] = useState('');
  const [typeReplayKey, setTypeReplayKey] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeStackId, setActiveStackId] = useState('frontend');

  const runTimeoutRef = useRef(null);
  const modalCloseRef = useRef(null);
  const lastFocusRef = useRef(null);

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
    const nextScore = score + points;
    setScore(nextScore);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResult(false);
  };

  const runCode = () => {
    if (runTimeoutRef.current) clearTimeout(runTimeoutRef.current);
    setIsRunning(true);
    setCodeOutput('');
    runTimeoutRef.current = setTimeout(() => {
      setCodeOutput(CODE_OUTPUT);
      setTypeReplayKey((key) => key + 1);
      setIsRunning(false);
      runTimeoutRef.current = null;
    }, 600);
  };

  return (
    <LayoutGroup>
      <div
        className="w-full flex-1 bg-gradient-to-b from-violet-950 via-violet-950 to-violet-950 text-slate-100 font-sans flex flex-col overflow-x-hidden relative"
        dir="rtl"
      >
        <Hero departmentId="software" />
        <SectionNav />

        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1 space-y-12 md:space-y-16">
          <Reveal
            id="about"
            className="scroll-mt-24 transition duration-300 hover:bg-violet-900/40 bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-violet-900/30 backdrop-blur-sm shadow-xl space-y-4"
          >
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-violet-300 flex items-center gap-2">
                💡 ما هو تخصص هندسة البرمجيات؟
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base mt-4">
                هندسة البرمجيات (Software Engineering) هي الفرع الذي يجمع بين التفكير المنطقي والهندسي لبناء وتطوير البرامج والتطبيقات المعقدة. لا يقتصر المجال على كتابة الأكواد فحسب، بل يشمل تحليل احتياجات المستخدمين، تصميم بنية الأنظمة (Architecture)، إدارة قواعد البيانات، وتأمين البرمجيات لتكون عالية الكفاءة وسهلة الاستخدام.
              </p>
            </section>
          </Reveal>

          <section id="myths" className="scroll-mt-24 space-y-4 md:space-y-6">
            <Reveal>
              <h2 className="text-xl sm:text-2xl font-bold text-violet-200">
                ❓ حقيقة أم خرافة عن التخصص؟
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {myths.map((item) => (
                <Reveal
                  key={item.myth}
                  className="bg-slate-900/80 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-violet-900/30 shadow-lg"
                >
                  <span className="text-rose-400 font-bold text-sm">❌ خرافة:</span>
                  <p className="text-slate-200 mt-1 text-sm sm:text-base">
                    &quot;{item.myth}&quot;
                  </p>
                  <span className="text-emerald-400 font-bold text-sm mt-3 block">
                    ✔ الحقيقة:
                  </span>
                  <p className="text-slate-400 text-xs sm:text-sm">{item.fact}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="courses" className="scroll-mt-24 space-y-6">
            <Reveal className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-violet-200 flex items-center gap-2">
                📚 أهم 3 مواد ستدرسها بالفرع
              </h2>
              <span className="text-xs text-violet-400 font-medium">
                ✨ اضغط على المادة لقراءة الشرح المبسط
              </span>
            </Reveal>

            <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {courses.map((course) => (
                <TiltCard key={course.id} className="h-full">
                  <AnimatedCard
                    as="button"
                    disableHoverMotion
                    skipVariants
                    layoutId={
                      selectedCourse?.id === course.id
                        ? undefined
                        : `course-card-${course.id}`
                    }
                    transition={layoutTransition}
                    onClick={() => setSelectedCourse(course)}
                    className="text-right bg-slate-900/70 p-6 rounded-2xl border border-violet-900/30 backdrop-blur-sm shadow-lg cursor-pointer group flex flex-col justify-between min-h-[44px] h-full w-full hover:border-violet-500 hover:bg-slate-900/90"
                  >
                    <div>
                      <AnimatedIcon className="text-4xl mb-4">{course.icon}</AnimatedIcon>
                      <h3 className="font-bold text-violet-300 text-lg mb-2 group-hover:text-violet-200">
                        {course.name}
                      </h3>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                        {course.desc}
                      </p>
                    </div>
                    <div className="text-violet-400 text-xs font-semibold flex items-center gap-1 pt-2 border-t border-violet-900/40">
                      انقر للتوضيح المبسط ←
                    </div>
                  </AnimatedCard>
                </TiltCard>
              ))}
            </StaggerGrid>
          </section>

          <Reveal
            id="stack"
            className="scroll-mt-24 bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-violet-900/30 backdrop-blur-sm shadow-xl space-y-6"
          >
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-violet-200 flex items-center justify-center gap-2">
                ⚙️ كيف يعمل أي موقع أو تطبيق بالدنيا؟
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                اضغط على أي دور لفهمه — تخيل التطبيق مثل المطعم: ما يشوفه الزبون وما يحدث بالكواليس.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {stackRoles.map((role) => {
                const isActive = role.id === activeStackId;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setActiveStackId(role.id)}
                    className={`relative text-right bg-slate-950/70 p-5 rounded-xl border ${role.borderClass} space-y-3 min-h-[44px] cursor-pointer transition ${
                      isActive ? `ring-2 ${role.activeRing}` : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    {isActive &&
                      !prefersReducedMotion && (
                        <MotionDiv
                          layoutId="stack-active"
                          className="absolute inset-0 rounded-xl border-2 border-violet-400/50 pointer-events-none"
                          transition={layoutTransition}
                        />
                      )}
                    <div className="relative flex items-center gap-2">
                      <span className="text-2xl">{role.icon}</span>
                      <h3 className={`font-bold ${role.titleClass} text-base sm:text-lg`}>
                        {role.title}
                      </h3>
                    </div>
                    <p className="relative text-slate-300 text-xs sm:text-sm leading-relaxed">
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
                  className={`${activeStack.calloutClass} p-3 sm:p-4 rounded-lg border text-xs sm:text-sm`}
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
            <section className="bg-slate-900/90 p-5 sm:p-6 rounded-2xl border border-violet-900/40 shadow-xl space-y-4 backdrop-blur-md h-full flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-emerald-400">
                    💻 جرب شعور أول كود برمجي!
                  </h2>
                  <MagneticButton
                    type="button"
                    onClick={runCode}
                    disabled={isRunning}
                    className="w-full sm:w-auto min-h-[44px] bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-lg font-medium text-xs sm:text-sm transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-md active:scale-95"
                  >
                    {isRunning ? '⏳ جاري التشغيل...' : '▶ تشغيل الكود (Run)'}
                  </MagneticButton>
                </div>

                <div
                  className="bg-slate-950 p-4 rounded-lg font-mono text-xs sm:text-sm border border-violet-950 text-slate-300 overflow-x-auto text-left"
                  dir="ltr"
                >
                  <p className="text-slate-500">// C++ / JavaScript Code Example</p>
                  <p>
                    <span className="text-purple-400">console</span>.
                    <span className="text-blue-400">log</span>(
                    <span className="text-emerald-300">
                      &quot;مرحباً بك في تخصص هندسة البرمجيات!&quot;
                    </span>
                    );
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
                    className="bg-slate-950/90 p-4 rounded-lg font-mono text-xs sm:text-sm border border-emerald-500/30 text-emerald-400 mt-4"
                  >
                    <span className="text-slate-500 block text-xs mb-1">
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
              className="scroll-mt-24 bg-slate-900/60 p-5 sm:p-6 rounded-2xl border border-violet-900/30 text-center space-y-6 backdrop-blur-sm h-full flex flex-col justify-center"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-amber-300">
                ✨ هل التخصص يناسبك؟ (اختبار سريع)
              </h2>

              {!showResult && (
                <div className="space-y-3 max-w-md mx-auto w-full">
                  <QuizSteps total={questions.length} current={currentQuestion} />
                  <div className="text-xs sm:text-sm text-slate-400">
                    السؤال {currentQuestion + 1} من {questions.length}
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
                    <p className="text-base sm:text-lg font-medium text-slate-100">
                      {questions[currentQuestion].text}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                      <MagneticButton
                        type="button"
                        onClick={() =>
                          handleAnswer(questions[currentQuestion].points)
                        }
                        className="w-full sm:w-auto min-h-[44px] bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer shadow-md"
                      >
                        نعم، ينطبق عليّ
                      </MagneticButton>
                      <MagneticButton
                        type="button"
                        onClick={() => handleAnswer(0)}
                        className="w-full sm:w-auto min-h-[44px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer border border-violet-900/40"
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
                        className="text-3xl sm:text-4xl font-extrabold text-emerald-400"
                      />
                    </MotionDiv>

                    {score >= 75 && (
                      <MotionSpan
                        className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-semibold px-3 py-1.5"
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

                    <p className="text-sm sm:text-lg text-slate-200">
                      {score >= 75
                        ? 'لديك شغف وتفكير يناسب تخصص البرمجيات جداً.'
                        : 'التخصص يحتاج رغبة في حل المشاكل، يمكنك التجربة والاستكشاف أكثر!'}
                    </p>
                    <button
                      type="button"
                      onClick={resetQuiz}
                      className="min-h-[44px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-lg text-xs sm:text-sm transition cursor-pointer border border-violet-900/40"
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
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
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
                    : `course-card-${selectedCourse.id}`
                }
                transition={layoutTransition}
                variants={prefersReducedMotion ? modalVariants : undefined}
                initial={prefersReducedMotion ? 'hidden' : false}
                animate={prefersReducedMotion ? 'visible' : undefined}
                exit={prefersReducedMotion ? 'exit' : undefined}
                className="bg-slate-900 border border-violet-500/50 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-4 relative"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  ref={modalCloseRef}
                  type="button"
                  onClick={closeModal}
                  aria-label="إغلاق"
                  className="absolute top-4 left-4 text-slate-400 hover:text-white bg-slate-800 rounded-full min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center text-sm transition cursor-pointer"
                >
                  ✕
                </button>
                <div className="flex items-center gap-3 pe-12">
                  <span className="text-4xl">{selectedCourse.icon}</span>
                  <h3
                    id="course-modal-title"
                    className="text-xl sm:text-2xl font-bold text-violet-300"
                  >
                    {selectedCourse.name}
                  </h3>
                </div>
                <div className="border-t border-violet-900/50 my-2" />
                <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
                  {selectedCourse.details}
                </p>
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="min-h-[44px] bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm transition cursor-pointer font-medium"
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
