import Reveal from '../components/Reveal/Reveal';
import { getDepartment, SITE_THEME } from '../lib/departments';

/**
 * @param {{ departmentId: string }} props
 */
export default function ComingSoonPage({ departmentId }) {
  const dept = getDepartment(departmentId);

  return (
    <main className="flex-1 w-full px-4 sm:px-6 py-8">
      <div className="w-full max-w-7xl mx-auto">
        <Reveal>
          <section
            className="text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden mb-8 border"
            style={{
              background: `linear-gradient(to bottom right, ${dept.heroFrom}, ${dept.heroTo})`,
              borderColor: SITE_THEME.cardBorder,
            }}
          >
            <div
              className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-30"
              style={{ backgroundColor: dept.accent }}
            />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-black mb-2">{dept.label}</h2>
              <p className="text-slate-200 text-sm sm:text-base">
                قريبا
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal className="min-h-[40vh] flex flex-col items-center justify-center text-center py-12">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl mb-4 shadow-sm border"
            style={{
              backgroundColor: `${dept.accent}18`,
              color: dept.accent,
              borderColor: `${dept.accent}33`,
            }}
          >
            ✨
          </div>
          <h3
            className="text-2xl font-bold mb-2"
            style={{ color: SITE_THEME.textHeading }}
          >
            قريباً...
          </h3>
          <p className="max-w-sm text-sm sm:text-base" style={{ color: SITE_THEME.textMuted }}>
            المحتوى الخاص بهذه الصفحة قيد الإعداد حالياً ليكون بمستوى تطلعاتكم.
          </p>
        </Reveal>
      </div>
    </main>
  );
}
