import { SPECIALITIES, SERVICES, PAGES, FAQS } from '../data/site';

export const SEARCH_TYPES = ['All', 'Specialities', 'Services', 'Pages', 'FAQs'];

let INDEX = null;
function buildIndex() {
  if (INDEX) return INDEX;
  INDEX = [
    ...SPECIALITIES.map((s) => ({
      type: 'Specialities', title: s.name, desc: s.desc, to: `/${s.slug}`, keywords: s.slug.replace(/-/g, ' '),
    })),
    ...SERVICES.map((s) => ({ type: 'Services', title: s.title, desc: s.text, to: s.to, keywords: '' })),
    ...Object.entries(PAGES).map(([slug, p]) => ({
      type: 'Pages', title: p.title, desc: p.intro || '', to: `/${slug}`, keywords: slug.replace(/-/g, ' '),
    })),
    ...FAQS.map((f, i) => ({ type: 'FAQs', title: f.q, desc: f.a, to: `/faq?open=${i}`, keywords: '' })),
  ];
  return INDEX;
}

export function runSearch(query, { type = 'All', sort = 'relevance' } = {}) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  const results = [];
  for (const item of buildIndex()) {
    if (type !== 'All' && item.type !== type) continue;
    const title = item.title.toLowerCase();
    const rest = `${item.desc} ${item.keywords}`.toLowerCase();
    let score = 0;
    let ok = true;
    for (const t of tokens) {
      if (title.startsWith(t)) score += 4;
      else if (title.includes(t)) score += 3;
      else if (rest.includes(t)) score += 1;
      else { ok = false; break; }
    }
    if (ok) results.push({ ...item, score });
  }
  results.sort((a, b) =>
    sort === 'az' ? a.title.localeCompare(b.title) : b.score - a.score || a.title.localeCompare(b.title));
  return results;
}
