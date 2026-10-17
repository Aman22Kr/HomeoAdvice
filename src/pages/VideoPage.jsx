import { Play } from 'lucide-react';
import { PageHero } from '../components/Section';
import Title from '../components/Title';

export default function VideoPage({ page }) {
  return (
    <>
      <Title text={page.title} />
      <PageHero title={page.title} intro={page.intro} crumbs={['Home', page.title]} />
      <div className="container-x grid gap-5 py-12 md:grid-cols-3">
        {['Hospital anniversary', 'Complex surgery explained', 'Kidney day awareness', 'Meet our doctors', 'Facility walkthrough', 'Patient stories'].map((t) => (
          <div key={t} className="card flex aspect-video flex-col items-center justify-center gap-3 bg-primary-soft p-4 text-center">
            <Play className="h-10 w-10 rounded-full bg-accent p-2 text-white" aria-hidden="true" />
            <span className="font-semibold">{t}</span>
            <span className="text-xs text-ink-muted">Placeholder - add your video embed here</span>
          </div>
        ))}
      </div>
    </>
  );
}
