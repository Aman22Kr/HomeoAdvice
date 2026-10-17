import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import AdSlot from './AdSlot';
import Popup from './Popup';

export default function Layout() {
  const { pathname } = useLocation();
  const [top, setTop] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    const on = () => setTop(window.scrollY > 500);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }} className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-white">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none"><Outlet /></main>
      <AdSlot />
      <Footer />
      <Popup />
      {top && (
        <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-5 z-40 rounded-full bg-accent p-3 text-white shadow-card"><ArrowUp className="h-5 w-5" /></button>
      )}
    </div>
  );
}
