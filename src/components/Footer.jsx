import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { SPECIALITIES, NAV } from '../data/site';
import { BRAND, QUICK_SETTINGS } from '../config';
import { Logo } from './Header';

const col = (label) => NAV.find((n) => n.label === label).children;
const H = ({ children }) => <h3 className="mb-4 font-sans text-base font-semibold text-white">{children}</h3>;
const A = ({ to, children }) => <li><Link to={to} className="text-sm text-white/75 hover:text-accent">{children}</Link></li>;

export default function Footer() {
  const c = QUICK_SETTINGS.contact;
  const spec = SPECIALITIES.filter((s) => s.featured).concat(SPECIALITIES.slice(0, 6)).slice(0, 14);
  return (
    <footer className="bg-[#0b2f3b] text-white">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Logo light />
          <p className="mt-4 text-sm text-white/75">{BRAND} is a demo multi-speciality hospital website recreated as a static React application.</p>
          <div className="mt-4 flex gap-3">
            {[Facebook, Instagram, Youtube].map((I, i) => (
              <a key={i} href="#/contact" aria-label="Social link (demo)" className="rounded-full bg-white/10 p-2 hover:bg-accent"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <H>Centres of Excellence</H>
          <ul className="space-y-2">
            {spec.map((s) => <A key={s.slug} to={`/${s.slug}`}>{s.name}</A>)}
            <A to="/specialities">All Specialities</A>
          </ul>
        </div>
        <div>
          <H>About Us</H>
          <ul className="space-y-2">{col('About Us').map((l) => <A key={l.to} to={l.to}>{l.label}</A>)}</ul>
          <div className="mt-6"><H>Patient Care Service</H></div>
          <ul className="space-y-2">{col('Patient Care Service').map((l) => <A key={l.to} to={l.to}>{l.label}</A>)}</ul>
        </div>
        <div>
          <H>Quick Links</H>
          <ul className="space-y-2">
            <A to="/terms-services">Terms &amp; Services</A><A to="/privacy-policy">Privacy Policy</A><A to="/disclaimer">Disclaimer</A>
            <A to="/contact">Contact</A><A to="/careers">Careers</A><A to="/academics">Academics</A><A to="/sitemap">Sitemap</A><A to="/faq">FAQ</A>
          </ul>
        </div>
        <div className="space-y-3 text-sm text-white/80">
          <H>Get in touch</H>
          <p className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" />{c.email}</p>
          <p className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" />{c.phone}</p>
          <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{c.address}</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        &copy; {new Date().getFullYear()} {BRAND}. Demo website - sample content, no real medical services. Data you enter stays in your browser.
      </div>
    </footer>
  );
}
