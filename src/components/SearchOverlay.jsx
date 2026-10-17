import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { runSearch } from '../utils/search';
import { useApp } from '../context/AppContext';

export default function SearchOverlay({ onClose }) {
  const [q, setQ] = useState('');
  const nav = useNavigate();
  const ref = useRef(null);
  const { history, addHistory, clearHistory } = useApp();
  const results = useMemo(() => runSearch(q).slice(0, 7), [q]);

  useEffect(() => {
    ref.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const go = (to, term) => {
    if (term) addHistory(term);
    onClose();
    nav(to);
  };
  const submit = (e) => {
    e.preventDefault();
    if (q.trim()) go(`/search?q=${encodeURIComponent(q.trim())}`, q);
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 p-4 pt-[10vh]" role="dialog" aria-modal="true" aria-label="Search" onClick={onClose}>
      <div className="mx-auto max-w-2xl rounded-lg bg-surface p-4 shadow-card" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={submit} className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" aria-hidden="true" />
          <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} className="input border-0 focus:ring-0" placeholder="Search specialities, services, FAQs..." aria-label="Search" />
          <button type="button" onClick={onClose} aria-label="Close search" className="p-2 text-ink-muted hover:text-ink"><X className="h-5 w-5" /></button>
        </form>
        <div className="mt-3 max-h-[55vh] overflow-y-auto border-t border-line pt-3">
          {q.trim() === '' && history.length > 0 && (
            <div>
              <div className="mb-2 flex items-center justify-between text-xs text-ink-muted">
                <span>Recent searches</span>
                <button type="button" className="underline" onClick={clearHistory}>Clear</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {history.map((h) => (
                  <button key={h} type="button" onClick={() => setQ(h)} className="flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 text-sm text-primary">
                    <Clock className="h-3 w-3" /> {h}
                  </button>
                ))}
              </div>
            </div>
          )}
          {q.trim() === '' && history.length === 0 && <p className="py-4 text-center text-sm text-ink-muted">Start typing to search.</p>}
          {q.trim() !== '' && results.length === 0 && <p className="py-4 text-center text-sm text-ink-muted">No results for &ldquo;{q}&rdquo;.</p>}
          <ul>
            {results.map((r) => (
              <li key={r.type + r.to + r.title}>
                <button type="button" onClick={() => go(r.to, q)} className="flex w-full items-start justify-between gap-3 rounded px-3 py-2 text-left hover:bg-surface-alt">
                  <span>
                    <span className="block text-sm font-semibold">{r.title}</span>
                    <span className="block text-xs text-ink-muted">{r.type}</span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 text-primary" />
                </button>
              </li>
            ))}
          </ul>
          {q.trim() !== '' && results.length > 0 && (
            <button type="button" onClick={submit} className="mt-2 w-full rounded bg-primary-soft py-2 text-sm font-semibold text-primary">See all results</button>
          )}
        </div>
      </div>
    </div>
  );
}
