import Reveal from './Reveal';

export function SectionHeading({ eyebrow, title, text, center = true }) {
  return (
    <Reveal className={`mb-10 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h2 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-ink-muted">{text}</p>}
    </Reveal>
  );
}

export function PageHero({ title, intro, crumbs = [] }) {
  return (
    <header className="bg-primary-soft">
      <div className="container-x py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-3 text-sm text-ink-muted">
          {crumbs.map((c, i) => (
            <span key={i}>{c}{i < crumbs.length - 1 && ' / '}</span>
          ))}
        </nav>
        <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-3xl text-ink-muted">{intro}</p>}
      </div>
    </header>
  );
}
