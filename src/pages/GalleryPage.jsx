import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { PageHero } from '../components/Section';
import Title from '../components/Title';
import Img from '../components/Img';
import { GALLERY } from '../data/site';

export default function GalleryPage({ page }) {
  const [sel, setSel] = useState(null);
  useEffect(() => {
    if (sel == null) return undefined;
    const k = (e) => e.key === 'Escape' && setSel(null);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [sel]);
  return (
    <>
      <Title text={page.title} />
      <PageHero title={page.title} intro={page.intro} crumbs={['Home', page.title]} />
      <div className="container-x grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY.map((src, i) => (
          <button key={src} type="button" onClick={() => setSel(i)} className="group overflow-hidden rounded-lg" aria-label={`Open photo ${i + 1}`}>
            <Img src={src} alt={`Gallery photo ${i + 1}`} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </button>
        ))}
      </div>
      {sel != null && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true" onClick={() => setSel(null)}>
          <button type="button" aria-label="Close" className="absolute right-4 top-4 text-white"><X className="h-7 w-7" /></button>
          <Img src={GALLERY[sel]} alt={`Gallery photo ${sel + 1}`} className="max-h-[85vh] max-w-full rounded" />
        </div>
      )}
    </>
  );
}
