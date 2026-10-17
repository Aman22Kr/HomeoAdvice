import Title from '../components/Title';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PageHero } from '../components/Section';
import Reveal from '../components/Reveal';
import Img from '../components/Img';
import { BRAND } from '../config';

export default function ContentPage({ page }) {
  return (
    <>
      <Title text={page.title} />
      <PageHero title={page.title} intro={page.intro} crumbs={['Home', page.title]} />
      <div className="container-x grid gap-10 py-12 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {page.image && <Img src={page.image} alt={page.title} className="aspect-video w-full rounded-lg object-cover" />}
          {page.sections.map((s) => (
            <Reveal key={s.h}>
              <section>
                <h2 className="mb-3 text-2xl font-bold">{s.h}</h2>
                {s.p.filter(Boolean).map((t, i) => <p key={i} className="mb-3 text-ink-muted">{t}</p>)}
                {s.list && (
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {s.list.map((l) => <li key={l} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{l}</li>)}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}
        </div>
        <aside className="h-fit rounded-lg bg-primary-soft p-6">
          <h3 className="font-sans text-lg font-semibold">Need help?</h3>
          <p className="mt-2 text-sm text-ink-muted">Talk to our patient care team.</p>
          <Link to="/contact" className="btn-accent mt-4 w-full">Contact us</Link>
        </aside>
      </div>
    </>
  );
}
