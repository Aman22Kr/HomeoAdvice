import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Search, Phone, Mail, ChevronDown, Moon, Sun, Bookmark, Globe, CalendarCheck, Settings, Cross } from 'lucide-react';
import { NAV } from '../data/site';
import { BRAND, QUICK_SETTINGS } from '../config';
import { useApp, SPEEDS, INTENSITIES } from '../context/AppContext';
import SearchOverlay from './SearchOverlay';

export function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label={`${BRAND} home`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white dark:text-surface"><Cross className="h-6 w-6" /></span>
      <span className={`font-display text-2xl font-bold ${light ? 'text-white' : 'text-primary'}`}>{BRAND}</span>
    </Link>
  );
}

function DesktopItem({ item }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  if (!item.children) {
    return (
      <NavLink to={item.to} end className={({ isActive }) => `px-3 py-2 text-sm font-medium hover:text-primary ${isActive ? 'text-primary' : ''}`}>
        {item.label}
      </NavLink>
    );
  }
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}>
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-primary">
        {item.label} <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className={`absolute top-full z-50 pt-1 ${item.mega ? 'left-1/2 w-[min(900px,92vw)] -translate-x-1/2' : 'left-0 w-64'}`}>
          <ul className={`card max-h-[70vh] overflow-y-auto p-3 ${item.mega ? 'grid grid-cols-3 gap-x-4' : ''}`}>
            {item.children.map((c) => (
              <li key={c.to}>
                <Link to={c.to} className="block rounded px-3 py-1.5 text-sm hover:bg-primary-soft hover:text-primary">{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function SettingsPopover() {
  const [open, setOpen] = useState(false);
  const { speed, setSpeed, intensity, setIntensity } = useApp();
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const Seg = ({ list, value, set }) => (
    <div className="flex flex-wrap gap-1">
      {list.map((o) => (
        <button key={o} type="button" onClick={() => set(o)} aria-pressed={value === o}
          className={`rounded px-2 py-1 text-xs font-semibold ${value === o ? 'bg-primary text-white dark:text-surface' : 'bg-surface-alt text-ink-muted'}`}>{o}</button>
      ))}
    </div>
  );
  return (
    <div className="relative" ref={ref}>
      <button type="button" aria-label="Animation settings" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="p-2 hover:text-primary"><Settings className="h-5 w-5" /></button>
      {open && (
        <div className="card absolute right-0 top-full z-50 mt-1 w-64 space-y-3 p-4">
          <p className="text-sm font-semibold">Animation speed</p>
          <Seg list={SPEEDS} value={speed} set={setSpeed} />
          <p className="text-sm font-semibold">Intensity</p>
          <Seg list={INTENSITIES} value={intensity} set={setIntensity} />
          <p className="text-xs text-ink-muted">Saved in this browser only.</p>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const [sub, setSub] = useState(null);
  const { theme, setTheme, favorites } = useApp();
  const { pathname } = useLocation();
  useEffect(() => { setDrawer(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = drawer ? 'hidden' : ''; }, [drawer]);

  return (
    <>
      <div className="hidden bg-primary text-sm text-white dark:text-surface md:block">
        <div className="container-x flex items-center justify-between py-2">
          <div className="flex items-center gap-5">
            <a href={QUICK_SETTINGS.contact.phoneHref} className="flex items-center gap-1.5 hover:underline"><Phone className="h-4 w-4" />{QUICK_SETTINGS.contact.phone}</a>
            <a href={`mailto:${QUICK_SETTINGS.contact.email}`} className="flex items-center gap-1.5 hover:underline"><Mail className="h-4 w-4" />{QUICK_SETTINGS.contact.email}</a>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/international-patient" className="flex items-center gap-1.5 hover:underline"><Globe className="h-4 w-4" />International Patients</Link>
            <Link to="/contact?topic=clinics" className="hover:underline">Nearest Clinics</Link>
            <Link to="/contact" className="flex items-center gap-1.5 rounded bg-accent px-3 py-1 font-semibold hover:bg-accent-dark"><CalendarCheck className="h-4 w-4" />Book an Appointment</Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
        <div className="container-x flex h-[72px] items-center justify-between gap-4">
          <Logo />
          <nav className="hidden items-center lg:flex" aria-label="Main">
            {NAV.map((n) => <DesktopItem key={n.label} item={n} />)}
          </nav>
          <div className="flex items-center gap-1">
            <button type="button" aria-label="Search" onClick={() => setSearch(true)} className="p-2 hover:text-primary"><Search className="h-5 w-5" /></button>
            <Link to="/saved" aria-label="Saved specialities" className="relative p-2 hover:text-primary">
              <Bookmark className="h-5 w-5" />
              {favorites.length > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">{favorites.length}</span>}
            </Link>
            <button type="button" aria-label="Toggle dark mode" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 hover:text-primary">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <SettingsPopover />
            <button type="button" aria-label="Open menu" onClick={() => setDrawer(true)} className="p-2 lg:hidden"><Menu className="h-6 w-6" /></button>
          </div>
        </div>
      </header>

      {drawer && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawer(false)} />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-xl font-bold text-primary">{BRAND}</span>
              <button type="button" aria-label="Close menu" onClick={() => setDrawer(false)}><X className="h-6 w-6" /></button>
            </div>
            <ul className="divide-y divide-line">
              {NAV.map((n) => (
                <li key={n.label}>
                  {n.children ? (
                    <>
                      <button type="button" aria-expanded={sub === n.label} onClick={() => setSub(sub === n.label ? null : n.label)} className="flex w-full items-center justify-between py-3 font-medium">
                        {n.label}<ChevronDown className={`h-4 w-4 transition-transform ${sub === n.label ? 'rotate-180' : ''}`} />
                      </button>
                      {sub === n.label && (
                        <ul className="mb-3 space-y-1 border-l-2 border-primary/30 pl-3">
                          {n.children.map((c) => <li key={c.to}><Link to={c.to} className="block py-1 text-sm text-ink-muted hover:text-primary">{c.label}</Link></li>)}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link to={n.to} className="block py-3 font-medium">{n.label}</Link>
                  )}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-accent mt-6 w-full"><CalendarCheck className="h-4 w-4" />Book an Appointment</Link>
          </div>
        </div>
      )}
      {search && <SearchOverlay onClose={() => setSearch(false)} />}
    </>
  );
}
