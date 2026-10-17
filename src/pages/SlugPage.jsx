import { useParams } from 'react-router-dom';
import { PAGES, specialityBySlug } from '../data/site';
import NotFound from './NotFound';
import SpecialityDetail from './SpecialityDetail';
import ContentPage from './ContentPage';
import SpecialitiesPage from './SpecialitiesPage';
import FaqPage from './FaqPage';
import ContactPage from './ContactPage';
import ListPage from './ListPage';
import GalleryPage from './GalleryPage';
import VideoPage from './VideoPage';
import CareersPage from './CareersPage';
import SitemapPage from './SitemapPage';

const TYPES = {
  content: ContentPage, specialities: SpecialitiesPage, faq: FaqPage, contact: ContactPage, list: ListPage,
  gallery: GalleryPage, video: VideoPage, careers: CareersPage, sitemap: SitemapPage,
};

// Mirrors the reference site's flat URLs: /cardiology, /about-us, /contact ...
export default function SlugPage() {
  const { slug } = useParams();
  if (Object.hasOwn(specialityBySlug, slug)) return <SpecialityDetail spec={specialityBySlug[slug]} />;
  if (Object.hasOwn(PAGES, slug)) {
    const page = PAGES[slug];
    const C = TYPES[page.type] || ContentPage;
    return <C page={page} slug={slug} />;
  }
  return <NotFound />;
}
