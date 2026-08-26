import Reveal from '../components/Reveal/Reveal';
import StaggerGrid from '../components/StaggerGrid/StaggerGrid';
import { getDepartment, SITE_THEME } from '../lib/departments';

const FUNDAMENTALS = [
  {
    icon: '💻',
    title: 'التفكير البرمجي والخوارزميات',
    body: 'حجر الأساس في التخصص؛ يتناول كيفية تحليل المشكلات وتفكيكها إلى خطوات منطقية متسلسلة تفهمها الآلة لتنفيذها بكفاءة عالية.',
    iconBg: '#498BC9',
  },
  {
    icon: '📐',
    title: 'الرياضيات البرمجية والتحليل',
    body: 'الرياضيات المتقطعة، الجبر الخطي، والاحتمالات. تشكل البنية الذهنية والرياضية لبناء الأنظمة الذكية والخوارزميات المعقدة.',
    iconBg: '#2EA879',
  },
  {
    icon: '🏗',
    title: 'بنيان الحواسيب وأنظمة التشغيل',
    body: 'فهم آلية عمل المكونات الصلبة (Hardware) وكيفية إدارة المعالج والذاكرة والموارد من قبل نظام التشغيل بشكل متكامل.',
    iconBg: '#5191CE',
  },
  {
    icon: '🗄',
    title: 'قواعد البيانات (Databases)',
    body: 'تعلم طرق تنظيم البيانات، تخزينها، واسترجاعها بأمان وبسرعة عالية، والتي تعتبر العمود الفقري لأي تطبيق أو نظام رقمي.',
    iconBg: '#498BC9',
  },
];

/**
 * @param {{ departmentId?: string }} props
 */
export default function HomePage({ departmentId = 'home' }) {
  const dept = getDepartment(departmentId);

  return (
    <main className="flex-1 w-full px-4 sm:px-6 py-8 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        <Reveal>
          <section
            className="text-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg relative overflow-hidden border"
            style={{
              background: `linear-gradient(to bottom right, ${dept.heroFrom}, ${dept.heroTo})`,
              borderColor: SITE_THEME.cardBorder,
            }}
          >
            <div
              className="absolute top-0 left-0 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-30"
              style={{ backgroundColor: dept.accentSecondary }}
            />
            <div
              className="absolute bottom-0 right-0 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-25"
              style={{ backgroundColor: dept.accent }}
            />

            <div className="relative z-10 max-w-3xl">
              <span
                className="inline-block px-3 py-1 rounded-full text-white text-xs font-bold mb-4 shadow"
                style={{ backgroundColor: dept.accentSecondary }}
              >
                دليل الطلاب المتميزين 🎓
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 leading-tight">
                أهلاً بفرسان البكالوريا في عالم الهندسة المعلوماتية 🚀
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed">
                مرحباً بكم في وجهتكم الأكاديمية الأولى! إذا كنتم تتساءلون عن ماهية هذا
                التخصص وما تنتظره عقولكم الشغوفة من علوم وتحديات، فهذه الصفحة هي مدخلكم
                الأساسي لفهم هيكلية الفرع ومبادئه.
              </p>
            </div>
          </section>
        </Reveal>

        <section className="space-y-6">
          <Reveal className="flex items-center gap-3">
            <div
              className="w-2 h-8 rounded-full"
              style={{ backgroundColor: dept.accentSecondary }}
            />
            <h3
              className="text-xl sm:text-2xl font-black"
              style={{ color: SITE_THEME.textHeading }}
            >
              الأساسيات الأكاديمية للفرع
            </h3>
          </Reveal>

          <StaggerGrid className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {FUNDAMENTALS.map((item) => (
              <Reveal
                key={item.title}
                className="p-5 sm:p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 text-right group backdrop-blur-sm"
                style={{
                  backgroundColor: SITE_THEME.cardBg,
                  borderColor: SITE_THEME.cardBorder,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-colors group-hover:text-white"
                  style={{
                    backgroundColor: `${item.iconBg}22`,
                    color: item.iconBg,
                  }}
                >
                  {item.icon}
                </div>
                <h4
                  className="text-lg sm:text-xl font-bold mb-2"
                  style={{ color: SITE_THEME.textHeading }}
                >
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: SITE_THEME.textMuted }}>
                  {item.body}
                </p>
              </Reveal>
            ))}
          </StaggerGrid>
        </section>
      </div>
    </main>
  );
}
