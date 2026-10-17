import Title from '../components/Title';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Check } from 'lucide-react';
import { PageHero } from '../components/Section';
import Icon from '../components/Icon';
import Img from '../components/Img';
import { SPECIALITIES, IMAGES } from '../data/site';
import { useApp } from '../context/AppContext';
import { BRAND } from '../config';

export default function SpecialityDetail({ spec }) {
  const { favorites, toggleFavorite, addRecent, recent } = useApp();
  useEffect(() => { addRecent(spec.slug); }, [spec.slug, addRecent]);
  const saved = favorites.includes(spec.slug);
  const idx = SPECIALITIES.findIndex((s) => s.slug === spec.slug);
  const related = [1, 2, 3, 4].map((o) => SPECIALITIES[(idx + o) % SPECIALITIES.length]);
  const recents = recent.filter((r) => r !== spec.slug).map((r) => SPECIALITIES.find((s) => s.slug === r)).filter(Boolean).slice(0, 4);
  return (
    <>
      <Title text={spec.name} />
      <PageHero title={spec.name} intro={spec.desc} crumbs={['Home', 'Centres of Excellence', spec.name]} />
      <div className="container-x grid gap-10 py-12 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Img src={IMAGES.care} alt={`${spec.name} department`} className="aspect-video w-full rounded-lg object-cover" />
          <section>
            <h2 className="mb-3 text-2xl font-bold">About the department</h2>
            <p className="text-ink-muted">The {spec.name} department at {BRAND} brings together experienced clinicians, modern diagnostics and a patient-first approach. This is sample content for the demo - replace it with the department&rsquo;s real description, services and team.</p>
          </section>
          <section>
            <h2 className="mb-3 text-2xl font-bold">What you can expect</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {['Consultation with experienced specialists', 'On-site diagnostics and imaging', 'Clear treatment planning and cost guidance', 'Follow-up and rehabilitation support'].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{t}</li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="space-y-4">
          <div className="rounded-lg bg-primary-soft p-6">
            <Icon name={spec.icon} className="mb-3 h-10 w-10 text-primary" />
            <h3 className="font-sans text-lg font-semibold">Consult {spec.name}</h3>
            <Link to={`/contact?dept=${spec.slug}`} className="btn-accent mt-4 w-full">Book a consultation</Link>
            <button type="button" aria-pressed={saved} onClick={() => toggleFavorite(spec.slug)} className="btn-outline mt-3 w-full">
              <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />{saved ? 'Saved' : 'Save department'}
            </button>
          </div>
          <div className="card p-5">
            <h3 className="mb-2 font-sans text-base font-semibold">Related departments</h3>
            <ul className="space-y-1 text-sm">{related.map((r) => <li key={r.slug}><Link className="text-primary hover:underline" to={`/${r.slug}`}>{r.name}</Link></li>)}</ul>
          </div>
          {recents.length > 0 && (
            <div className="card p-5">
              <h3 className="mb-2 font-sans text-base font-semibold">Recently viewed</h3>
              <ul className="space-y-1 text-sm">{recents.map((r) => <li key={r.slug}><Link className="text-primary hover:underline" to={`/${r.slug}`}>{r.name}</Link></li>)}</ul>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
