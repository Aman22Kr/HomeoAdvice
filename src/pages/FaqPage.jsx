import Title from '../components/Title';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { PageHero } from '../components/Section';
import Accordion from '../components/Accordion';
import { FAQS } from '../data/site';
import { BRAND } from '../config';

export default function FaqPage({ page }) {
  const [params] = useSearchParams();
  const [q, setQ] = useState('');
  const open = Number(params.get('open'));
  const items = useMemo(() => {
    const t = q.toLowerCase().trim();
    return t ? FAQS.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(t)) : FAQS;
  }, [q]);
  return (
    <>
      <Title text="FAQ" />
      <PageHero title={page.title} intro={page.intro} crumbs={['Home', 'FAQ']} />
      <div className="container-x max-w-4xl py-12">
        <label className="relative mb-6 block">
          <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-ink-muted" />
          <input className="input pl-9" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search FAQs..." aria-label="Search FAQs" />
        </label>
        {items.length ? (
          <Accordion key={q} items={items} initialOpen={!q && Number.isInteger(open) && open >= 0 && open < items.length && params.has('open') ? open : -1} />
        ) : (
          <p className="rounded-lg border border-dashed border-line p-10 text-center text-ink-muted">No FAQs match your search.</p>
        )}
      </div>
    </>
  );
}
