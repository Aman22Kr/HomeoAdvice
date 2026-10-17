import { Link } from 'react-router-dom';
import { PageHero } from '../components/Section';
import Title from '../components/Title';
import { NAV, PAGES } from '../data/site';

export default function SitemapPage({ page }) {
  const groups = NAV.filter((n) => n.children && !n.mega);
  const extra = ['terms-services', 'privacy-policy', 'disclaimer', 'sitemap'];
  return (
    <>
      <Title text={page.title} />
      <PageHero title={page.title} intro={page.intro} crumbs={['Home', page.title]} />
      <div className="container-x grid gap-8 py-12 md:grid-cols-3">
        <div><h2 className="mb-3 font-sans text-lg font-semibold">Main</h2><ul className="space-y-1 text-sm"><li><Link className="text-primary hover:underline" to="/">Home</Link></li><li><Link className="text-primary hover:underline" to="/specialities">All Specialities</Link></li><li><Link className="text-primary hover:underline" to="/facilities">Facilities</Link></li><li><Link className="text-primary hover:underline" to="/contact">Contact</Link></li><li><Link className="text-primary hover:underline" to="/saved">Saved</Link></li></ul></div>
        {groups.map((g) => (
          <div key={g.label}><h2 className="mb-3 font-sans text-lg font-semibold">{g.label}</h2><ul className="space-y-1 text-sm">{g.children.map((c) => <li key={c.to}><Link className="text-primary hover:underline" to={c.to}>{c.label}</Link></li>)}</ul></div>
        ))}
        <div><h2 className="mb-3 font-sans text-lg font-semibold">Legal</h2><ul className="space-y-1 text-sm">{extra.map((s) => <li key={s}><Link className="text-primary hover:underline" to={`/${s}`}>{PAGES[s].title}</Link></li>)}</ul></div>
      </div>
    </>
  );
}
