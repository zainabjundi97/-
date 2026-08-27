import { getDepartment } from '../../lib/departments';

/**
 * Compact light masthead for shell pages (home / basics). No 3D scene.
 * @param {{
 *   departmentId: string,
 *   badge: string,
 *   headingWords: { text: string, accent?: boolean }[],
 *   subtitle: string,
 *   ctas?: { label: string, href: string, type: 'scroll' | 'tab' }[],
 *   onNavigate?: (id: string) => void,
 * }} props
 */
export default function PageMasthead({
  departmentId,
  badge,
  headingWords,
  subtitle,
  ctas = [],
  onNavigate,
}) {
  const dept = getDepartment(departmentId);
  const headline = headingWords.map((word) => word.text).join(' ');

  const handleCta = (cta, event) => {
    event.preventDefault();
    if (cta.type === 'tab' && onNavigate) {
      onNavigate(cta.href);
      return;
    }
    const id = cta.href?.startsWith('#') ? cta.href.slice(1) : cta.href;
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <header
      className="w-full relative overflow-hidden border-b"
      style={{
        background: `linear-gradient(120deg, ${dept.heroFrom}14 0%, ${dept.heroTo}18 45%, #F5F7FA 100%)`,
        borderColor: 'rgba(43, 46, 113, 0.1)',
      }}
    >
      <div
        className="absolute inset-y-0 left-0 w-1/2 max-w-md pointer-events-none opacity-40 blur-3xl"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, ${dept.accentSecondary}33, transparent 70%)`,
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <span
          className="inline-block text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full border mb-4"
          style={{
            color: dept.accent,
            backgroundColor: `${dept.accentSecondary}18`,
            borderColor: `${dept.accentSecondary}44`,
          }}
        >
          {badge}
        </span>

        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight max-w-3xl leading-tight mb-3"
          style={{ color: '#2B2E71' }}
        >
          {headingWords.map((word, index) => (
            <span
              key={`${word.text}-${index}`}
              style={word.accent ? { color: dept.accentSecondary } : undefined}
            >
              {word.text}
              {index < headingWords.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>
        <span className="sr-only">{headline}</span>

        <p
          className="text-sm sm:text-base leading-relaxed max-w-2xl mb-6"
          style={{ color: '#5B6475' }}
        >
          {subtitle}
        </p>

        {ctas.length > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {ctas.map((cta, index) => {
              const isPrimary = index === 0;
              return (
                <a
                  key={cta.label}
                  href={cta.type === 'tab' ? `#${cta.href}` : cta.href}
                  onClick={(event) => handleCta(cta, event)}
                  className={`min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isPrimary
                      ? 'text-white shadow-sm'
                      : 'bg-white border hover:bg-[#F5F7FA]'
                  }`}
                  style={
                    isPrimary
                      ? { backgroundColor: dept.accentSecondary }
                      : { color: dept.accent, borderColor: 'rgba(43, 46, 113, 0.14)' }
                  }
                >
                  {cta.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
