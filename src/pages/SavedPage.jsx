import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { PageHero } from '../components/Section';
import Title from '../components/Title';
import Icon from '../components/Icon';
import { specialityBySlug } from '../data/site';
import { useApp } from '../context/AppContext';

export default function SavedPage() {
  const { favorites, toggleFavorite, recent } = useApp();
  const saved = favorites.map((s) => specialityBySlug[s]).filter(Boolean);
  const recents = recent.map((s) => specialityBySlug[s]).filter(Boolean);
  return (
    <>
      <Title text="Saved departments" />
      <PageHero title="Saved departments" intro="Saved in this browser only - they do not sync across devices and are not tied to an account." crumbs={['Home', 'Saved']} />
      <div className="container-x space-y-12 py-12">
        <section>
          <h2 className="mb-4 text-2xl font-bold">Your saved list</h2>
          {saved.length === 0 ? (
            <p className="rounded-lg border border-dashed border-line p-10 text-center text-ink-muted">Nothing saved yet. Use the bookmark icon on <Link className="text-primary underline" to="/specialities">any speciality</Link>.</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {saved.map((s) => (
                <li key={s.slug} className="card flex items-center justify-between gap-3 p-4">
                  <Link to={`/${s.slug}`} className="flex items-center gap-3 font-semibold"><Icon name={s.icon} className="h-6 w-6 text-primary" />{s.name}</Link>
                  <button type="button" aria-label={`Remove ${s.name}`} onClick={() => toggleFavorite(s.slug)} className="p-2 text-ink-muted hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
          )}
        </section>
        {recents.length > 0 && (
          <section>
            <h2 className="mb-4 text-2xl font-bold">Recently viewed</h2>
            <div className="flex flex-wrap gap-2">{recents.map((s) => <Link key={s.slug} to={`/${s.slug}`} className="rounded-full bg-primary-soft px-4 py-1.5 text-sm text-primary">{s.name}</Link>)}</div>
          </section>
        )}
      </div>
    </>
  );
}
