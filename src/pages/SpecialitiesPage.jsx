import Title from '../components/Title';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bookmark } from 'lucide-react';
import { PageHero } from '../components/Section';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import { SPECIALITIES } from '../data/site';
import { useApp } from '../context/AppContext';
import { BRAND } from '../config';

export default function SpecialitiesPage({ page }) {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('az');
  const [only, setOnly] = useState(false);
  const { favorites, toggleFavorite } = useApp();
  const list = useMemo(() => {
    const t = q.toLowerCase().trim();
    let r = SPECIALITIES.filter((s) => (!t || `${s.name} ${s.desc}`.toLowerCase().includes(t)) && (!only || s.featured));
    if (sort === 'az') r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'za') r = [...r].sort((a, b) => b.name.localeCompare(a.name));
    return r;
  }, [q, sort, only]);
  return (
    <>
      <Title text={page.title} />
      <PageHero title={page.title} intro={page.intro} crumbs={['Home', 'Centres of Excellence']} />
      <div className="container-x py-10">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <label className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-ink-muted" />
            <input className="input pl-9" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter specialities..." aria-label="Filter specialities" />
          </label>
          <select className="input w-auto" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
            <option value="az">A &rarr; Z</option><option value="za">Z &rarr; A</option><option value="default">Default order</option>
          </select>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={only} onChange={(e) => setOnly(e.target.checked)} />Featured only</label>
          <span className="text-sm text-ink-muted">{list.length} shown</span>
        </div>
        {list.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line p-12 text-center text-ink-muted">No specialities match &ldquo;{q}&rdquo;. <button className="underline" onClick={() => { setQ(''); setOnly(false); }}>Reset filters</button></div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((s, n) => (
              <Reveal key={s.slug} delay={n % 4}>
                <div className="card card-hover relative h-full p-5">
                  <button type="button" aria-pressed={favorites.includes(s.slug)} aria-label={`Save ${s.name}`} onClick={() => toggleFavorite(s.slug)} className="absolute right-3 top-3 p-1">
                    <Bookmark className={`h-5 w-5 ${favorites.includes(s.slug) ? 'fill-accent text-accent' : 'text-ink-muted'}`} />
                  </button>
                  <Link to={`/${s.slug}`} className="block">
                    <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary"><Icon name={s.icon} className="h-6 w-6" /></span>
                    <h3 className="font-sans text-base font-semibold">{s.name}</h3>
                    <p className="mt-1 text-xs text-ink-muted">{s.desc}</p>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
