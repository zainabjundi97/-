import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Reveal from './components/Reveal/Reveal';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import {
  fadeUp,
  fadeIn,
  scaleFade,
  staggerContainer,
  reducedMotionVariants,
} from './lib/animations';

const MotionDiv = motion.div;
const MotionSpan = motion.span;
const MotionH1 = motion.h1;
const MotionP = motion.p;

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

export default function SoftwareEngApp() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = prefersReducedMotion ? reducedMotionVariants : fadeUp;
  const enterVariants = prefersReducedMotion ? reducedMotionVariants : fadeIn;
  const modalVariants = prefersReducedMotion ? reducedMotionVariants : scaleFade;

  const [codeOutput, setCodeOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const runTimeoutRef = useRef(null);

  const closeModal = useCallback(() => setSelectedCourse(null), []);

  useEffect(() => {
    return () => {
      if (runTimeoutRef.current) clearTimeout(runTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!selectedCourse) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
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
      setCodeOutput(
        'Hello, World! أهلاً بك في قسم هندسة البرمجيات بجامعة اللاذقية 🚀',
      );
      setIsRunning(false);
      runTimeoutRef.current = null;
    }, 600);
  };

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-b from-violet-950 via-violet-950 to-violet-950 text-slate-100 font-sans flex flex-col justify-between overflow-x-hidden relative"
      dir="rtl"
    >
      <header className="w-full py-12 md:py-20 text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#06030e] via-violet-950/80 to-transparent relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-violet-600/10 blur-3xl rounded-full pointer-events-none" />

        <MotionDiv
          className="max-w-7xl mx-auto relative"
          initial="hidden"
          animate="visible"
          variants={prefersReducedMotion ? reducedMotionVariants : staggerContainer}
        >
          <MotionSpan
            variants={variants}
            className="bg-violet-900/50 text-violet-300 text-xs sm:text-sm font-semibold px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full border border-violet-500/20 inline-block mb-4 backdrop-blur-md"
          >
            جامعة اللاذقية - قسم البرمجيات
          </MotionSpan>

          <MotionH1
            variants={variants}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-white drop-shadow-md"
          >
            اكتشف عالم <span className="text-violet-400">هندسة البرمجيات</span>
          </MotionH1>

          <MotionP
            variants={variants}
            className="text-slate-300/80 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl leading-relaxed"
          >
            أكثر من مجرد تكويد.. إنها صياغة المستقبل وبناء الأنظمة الذكية!
          </MotionP>
        </MotionDiv>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      </header>

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1 space-y-12 md:space-y-16">
        <Reveal className="transition duration-300 ease-in-out hover:scale-[1.01] hover:bg-violet-900/40 bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-violet-900/30 backdrop-blur-sm shadow-xl space-y-4 motion-reduce:hover:scale-100">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-violet-300 flex items-center gap-2">
              💡 ما هو تخصص هندسة البرمجيات؟
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base mt-4">
              هندسة البرمجيات (Software Engineering) هي الفرع الذي يجمع بين التفكير المنطقي والهندسي لبناء وتطوير البرامج والتطبيقات المعقدة. لا يقتصر المجال على كتابة الأكواد فحسب، بل يشمل تحليل احتياجات المستخدمين، تصميم بنية الأنظمة (Architecture)، إدارة قواعد البيانات، وتأمين البرمجيات لتكون عالية الكفاءة وسهلة الاستخدام.
            </p>
          </section>
        </Reveal>

        <Reveal className="space-y-4 md:space-y-6">
          <section className="space-y-4 md:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-violet-200">
            ❓ حقيقة أم خرافة عن التخصص؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none bg-slate-900/80 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-violet-900/30 shadow-lg">
              <span className="text-rose-400 font-bold text-sm">❌ خرافة:</span>
              <p className="text-slate-200 mt-1 text-sm sm:text-base">
                &quot;هندسة البرمجيات هي فقط تصليح كمبيوترات وتنزيل فورمات!&quot;
              </p>
              <span className="text-emerald-400 font-bold text-sm mt-3 block">✔ الحقيقة:</span>
              <p className="text-slate-400 text-xs sm:text-sm">
                الفرع يعلمك تحليل المشاكل وبناء أنظمة برمجية كاملة، قواعد بيانات، ومواقع وتطبيقات ذكية.
              </p>
            </div>
            <div className="transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none bg-slate-900/80 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-violet-900/30 shadow-lg">
              <span className="text-rose-400 font-bold text-sm">❌ خرافة:</span>
              <p className="text-slate-200 mt-1 text-sm sm:text-base">
                &quot;لازم تكون عبقري بالرياضيات لتنجح بالبرمجة.&quot;
              </p>
              <span className="text-emerald-400 font-bold text-sm mt-3 block">✔ الحقيقة:</span>
              <p className="text-slate-400 text-xs sm:text-sm">
                التفكير المنطقي وتسلسل الخطوات (Algorithms) أهم بكثير من تعقيدات الرياضيات العالية.
              </p>
            </div>
            <div className="transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none bg-slate-900/80 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-violet-900/30 shadow-lg">
              <span className="text-rose-400 font-bold text-sm">❌ خرافة:</span>
              <p className="text-slate-200 mt-1 text-sm sm:text-base">
                &quot;هندسة البرمجيات فقط كتابة أكواد&quot;
              </p>
              <span className="text-emerald-400 font-bold text-sm mt-3 block">✔ الحقيقة:</span>
              <p className="text-slate-400 text-xs sm:text-sm">
                التخصص مليء بكل أنواع المفاهيم البرمجية والتحليلية، مثل تحليل البيانات، هندسة الأنظمة، وإدارة المشاريع.
              </p>
            </div>
            <div className="transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none bg-slate-900/80 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-violet-900/30 shadow-lg">
              <span className="text-rose-400 font-bold text-sm">❌ خرافة:</span>
              <p className="text-slate-200 mt-1 text-sm sm:text-base">
                &quot;الـ AI سيستبدل التخصص&quot;
              </p>
              <span className="text-emerald-400 font-bold text-sm mt-3 block">✔ الحقيقة:</span>
              <p className="text-slate-400 text-xs sm:text-sm">
                الذكاء الاصطناعي يستبدل المبرمجين وليس مهندسي البرمجيات؛ لأن الهندسة تعتمد على فهم المشكلات وتصميم الأنظمة وحل العقبات المعقدة.
              </p>
            </div>
          </div>
          </section>
        </Reveal>

        <Reveal className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-violet-200 flex items-center gap-2">
              📚 أهم 3 مواد ستدرسها بالفرع
            </h2>
            <span className="text-xs text-violet-400 font-medium">
              ✨ اضغط على المادة لقراءة الشرح المبسط
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {courses.map((course) => (
              <button
                key={course.id}
                type="button"
                onClick={() => setSelectedCourse(course)}
                className="text-right bg-slate-900/70 p-6 rounded-2xl border border-violet-900/30 backdrop-blur-sm transition duration-300 hover:border-violet-500 hover:bg-slate-900/90 hover:-translate-y-1 shadow-lg cursor-pointer group flex flex-col justify-between min-h-[44px] motion-reduce:hover:transform-none"
              >
                <div>
                  <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300 inline-block motion-reduce:group-hover:scale-100">
                    {course.icon}
                  </div>
                  <h3 className="font-bold text-violet-300 text-lg mb-2 group-hover:text-violet-200">
                    {course.name}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {course.desc}
                  </p>
                </div>
                <div className="text-violet-400 text-xs font-semibold flex items-center gap-1 group-hover:translate-x-1 transition duration-300 pt-2 border-t border-violet-900/40 motion-reduce:group-hover:transform-none">
                  انقر للتوضيح المبسط ←
                </div>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-violet-900/30 backdrop-blur-sm shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-violet-200 flex items-center justify-center gap-2">
              ⚙️ كيف يعمل أي موقع أو تطبيق بالدنيا؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              تخيل أي تطبيق (مثل فيسبوك أو واتساب) مثل المطعم تماماً: قسم بشوفه الزبون وقسم شغال بالكواليس!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-slate-950/70 p-5 rounded-xl border border-sky-500/30 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎨</span>
                <h3 className="font-bold text-sky-400 text-base sm:text-lg">الواجهة (Frontend)</h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                هو كل شيء بشوفه المستخدم وبيتفاعل معه بعيونه: الأزرار، الألوان، القوائم، والأشكال.
              </p>
              <div className="bg-sky-950/40 p-2.5 rounded-lg border border-sky-900/30 text-xs text-sky-200">
                🍔 <strong>مثال المطعم:</strong> طاولة الطعام، قائمة الوجبات (المنيو)، والديكور اللي بتجلس فيه.
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border border-purple-500/30 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚙️</span>
                <h3 className="font-bold text-purple-400 text-base sm:text-lg">الخلفية (Backend)</h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                هو العقل الخفي والمحرك! بيحفظ معلوماتك، بيتأكد من كلمة السر، وبيجيب البيانات من قعدة البيانات.
              </p>
              <div className="bg-purple-950/40 p-2.5 rounded-lg border border-purple-900/30 text-xs text-purple-200">
                👨‍🍳 <strong>مثال المطعم:</strong> المطبخ والطباخين اللي بيحضروا الأكل ورائهم المخزن بدون ما تشوفهم.
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                <h3 className="font-bold text-amber-400 text-base sm:text-lg">الفول ستاك (Full-Stack)</h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                مهندس البرمجيات الشامل اللي بيقدر يبني الشاشة (Frontend) والمحرك الخفي (Backend) مع بعض!
              </p>
              <div className="bg-amber-950/40 p-2.5 rounded-lg border border-amber-900/30 text-xs text-amber-200">
                ⭐ <strong>النتيجة:</strong> شخص قادر يصمم المطعم بأكمله ويعرف يديره من الطاولة حتى المطبخ!
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          <section className="bg-slate-900/90 p-5 sm:p-6 rounded-2xl border border-violet-900/40 shadow-xl space-y-4 backdrop-blur-md h-full flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-emerald-400">
                  💻 جرب شعور أول كود برمجي!
                </h2>
                <button
                  type="button"
                  onClick={runCode}
                  disabled={isRunning}
                  className="w-full sm:w-auto min-h-[44px] bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-lg font-medium text-xs sm:text-sm transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-md active:scale-95"
                >
                  {isRunning ? '⏳ جاري التشغيل...' : '▶ تشغيل الكود (Run)'}
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs sm:text-sm border border-violet-950 text-slate-300 overflow-x-auto text-left" dir="ltr">
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
                  key="code-output"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={enterVariants}
                  className="bg-slate-950/90 p-4 rounded-lg font-mono text-xs sm:text-sm border border-emerald-500/30 text-emerald-400 mt-4"
                >
                  <span className="text-slate-500 block text-xs mb-1">
                    &gt; الشاشة الناتجة (Output):
                  </span>
                  {codeOutput}
                </MotionDiv>
              )}
            </AnimatePresence>
          </section>

          <section className="bg-slate-900/60 p-5 sm:p-6 rounded-2xl border border-violet-900/30 text-center space-y-6 backdrop-blur-sm h-full flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-300">
              ✨ هل التخصص يناسبك؟ (اختبار سريع)
            </h2>

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
                  <div className="text-xs sm:text-sm text-slate-400">
                    السؤال {currentQuestion + 1} من {questions.length}
                  </div>
                  <p className="text-base sm:text-lg font-medium text-slate-100">
                    {questions[currentQuestion].text}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleAnswer(questions[currentQuestion].points)}
                      className="w-full sm:w-auto min-h-[44px] bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer shadow-md"
                    >
                      نعم، ينطبق عليّ
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAnswer(0)}
                      className="w-full sm:w-auto min-h-[44px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer border border-violet-900/40"
                    >
                      لا أظن ذلك
                    </button>
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
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                    {score}%
                  </div>
                  <p className="text-sm sm:text-lg text-slate-200">
                    {score >= 75
                      ? 'ترشيح ممتاز! لديك شغف وتفكير يناسب تخصص البرمجيات جداً.'
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

      <footer className="w-full py-6 text-center text-slate-500 text-xs sm:text-sm border-t border-violet-950 mt-8">
        تم التطوير بواسطة React + Vite ✨
      </footer>

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
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-slate-900 border border-violet-500/50 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-4 relative"
              onClick={(event) => event.stopPropagation()}
            >
              <button
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
  );
}
