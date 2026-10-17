import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { PageHero } from '../components/Section';
import Title from '../components/Title';
import { JOBS } from '../data/site';

export default function CareersPage({ page }) {
  const [q, setQ] = useState('');
  const [dept, setDept] = useState('All');
  const depts = ['All', ...new Set(JOBS.map((j) => j.dept))];
  const list = useMemo(() => JOBS.filter((j) => (dept === 'All' || j.dept === dept) && j.title.toLowerCase().includes(q.toLowerCase().trim())), [q, dept]);
  return (
    <>
      <Title text={page.title} />
      <PageHero title={page.title} intro={page.intro} crumbs={['Home', page.title]} />
      <div className="container-x max-w-4xl py-12">
        <div className="mb-6 flex flex-wrap gap-3">
          <label className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-ink-muted" />
            <input className="input pl-9" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search roles..." aria-label="Search roles" />
          </label>
          <select className="input w-auto" value={dept} onChange={(e) => setDept(e.target.value)} aria-label="Department">
            {depts.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        {list.length === 0 ? <p className="rounded-lg border border-dashed border-line p-10 text-center text-ink-muted">No openings match.</p> : (
          <ul className="space-y-3">
            {list.map((j) => (
              <li key={j.id} className="card flex flex-wrap items-center justify-between gap-3 p-5">
                <span><span className="block font-semibold">{j.title}</span><span className="text-sm text-ink-muted">{j.dept} &middot; {j.type}</span></span>
                <Link to={`/contact?dept=`} className="btn-outline">Enquire</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
