import { useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/Section';
import Title from '../components/Title';
import { runSearch, SEARCH_TYPES } from '../utils/search';
import { useApp } from '../context/AppContext';

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const { addHistory, history, clearHistory } = useApp();
  const q = params.get('q') || '';
  const type = SEARCH_TYPES.includes(params.get('type')) ? params.get('type') : 'All';
  const sort = params.get('sort') === 'az' ? 'az' : 'relevance';
  const results = useMemo(() => runSearch(q, { type, sort }), [q, type, sort]);
  useEffect(() => { if (q) addHistory(q); }, [q, addHistory]);
  const update = (patch) => setParams({ q, type, sort, ...patch }, { replace: true });

  return (
    <>
      <Title text={q ? `Search: ${q}` : 'Search'} />
      <PageHero title="Search" intro={q ? `${results.length} result(s) for "${q}"` : 'Type a query to search the site.'} crumbs={['Home', 'Search']} />
      <div className="container-x py-10">
        <form onSubmit={(e) => { e.preventDefault(); update({ q: new FormData(e.target).get('q') }); }} className="mb-6 flex gap-2">
          <input name="q" defaultValue={q} key={q} className="input" placeholder="Search..." aria-label="Search" />
          <button className="btn-primary">Search</button>
        </form>
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {SEARCH_TYPES.map((t) => (
            <button key={t} type="button" aria-pressed={type === t} onClick={() => update({ type: t })} className={`rounded-full px-4 py-1.5 text-sm ${type === t ? 'bg-primary text-white dark:text-surface' : 'bg-surface-alt text-ink-muted'}`}>{t}</button>
          ))}
          <select className="input ml-auto w-auto" value={sort} onChange={(e) => update({ sort: e.target.value })} aria-label="Sort results">
            <option value="relevance">Most relevant</option><option value="az">A &rarr; Z</option>
          </select>
        </div>
        {!q ? (
          history.length > 0 && <p className="text-sm text-ink-muted">Recent: {history.map((h) => <Link key={h} className="mr-3 text-primary underline" to={`/search?q=${encodeURIComponent(h)}`}>{h}</Link>)} <button className="underline" onClick={clearHistory}>clear</button></p>
        ) : results.length === 0 ? (
          <p className="rounded-lg border border-dashed border-line p-12 text-center text-ink-muted">No results. Try a speciality such as &ldquo;cardiology&rdquo; or a topic like &ldquo;insurance&rdquo;.</p>
        ) : (
          <ul className="space-y-3">
            {results.map((r) => (
              <li key={r.type + r.to + r.title}>
                <Link to={r.to} className="card card-hover block p-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">{r.type}</span>
                  <span className="block font-semibold">{r.title}</span>
                  <span className="line-clamp-2 text-sm text-ink-muted">{r.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
