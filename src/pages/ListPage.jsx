import { useMemo, useState } from 'react';
import { Search, CalendarDays } from 'lucide-react';
import { PageHero } from '../components/Section';
import Title from '../components/Title';
import Reveal from '../components/Reveal';

export default function ListPage({ page }) {
  const [q, setQ] = useState('');
  const [order, setOrder] = useState('new');
  const items = useMemo(() => {
    const t = q.toLowerCase().trim();
    const r = page.items.filter((i) => !t || `${i.title} ${i.text}`.toLowerCase().includes(t));
    return r.sort((a, b) => (order === 'new' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
  }, [q, order, page.items]);
  return (
    <>
      <Title text={page.title} />
      <PageHero title={page.title} intro={page.intro} crumbs={['Home', page.title]} />
      <div className="container-x py-12">
        <div className="mb-8 flex flex-wrap gap-3">
          <label className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-ink-muted" />
            <input className="input pl-9" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." aria-label="Search" />
          </label>
          <select className="input w-auto" value={order} onChange={(e) => setOrder(e.target.value)} aria-label="Sort by date">
            <option value="new">Newest first</option><option value="old">Oldest first</option>
          </select>
        </div>
        {items.length === 0 ? <p className="rounded-lg border border-dashed border-line p-10 text-center text-ink-muted">Nothing found.</p> : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((i, n) => (
              <Reveal key={i.title} delay={n % 3}>
                <article className="card card-hover h-full p-5">
                  <p className="mb-2 flex items-center gap-2 text-xs text-ink-muted"><CalendarDays className="h-4 w-4" />{new Date(i.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p>
                  <h3 className="font-sans text-lg font-semibold">{i.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{i.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
