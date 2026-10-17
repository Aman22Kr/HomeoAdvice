import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, Stethoscope, UserRound, ClipboardCheck, ChevronLeft, ChevronRight, ArrowRight, Star, Play, Check } from 'lucide-react';
import Img from '../components/Img';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';
import Accordion from '../components/Accordion';
import { SectionHeading } from '../components/Section';
import useMotion from '../hooks/useMotion';
import { BRAND, QUICK_SETTINGS } from '../config';
import { IMAGES, FEATURED, WHY, HIGHLIGHTS, INTERNATIONAL, SERVICES, STATS, CLINICS, FAQS } from '../data/site';

const SLIDES = [
  { h: 'Leading Multi-Speciality Hospital', t: 'Advanced, compassionate care close to home.' },
  { h: 'All Specialities Under One Roof', t: 'Centres of Excellence for every stage of life.' },
  { h: '24/7 Emergency & Pharmacy', t: 'Round-the-clock response when it matters most.' },
  { h: 'International Patient Care', t: 'A seamless journey from enquiry to discharge.' },
  { h: 'Precision Imaging, Exceptional Care', t: 'Accurate diagnostics with modern technology.' },
];

function Hero() {
  const [i, setI] = useState(0);
  const m = useMotion();
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);
  const s = SLIDES[i];
  const inner = (
    <div>
      <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl">{s.h}</h1>
      <p className="mt-4 max-w-xl text-lg text-white/85">{s.t}</p>
      <Link to="/contact" className="btn-accent mt-8">Book Your Consultation <ArrowRight className="h-4 w-4" /></Link>
    </div>
  );
  return (
    <section className="relative flex min-h-[460px] items-center overflow-hidden md:min-h-[600px]">
      <Img src={IMAGES.building} alt={`${BRAND} hospital building`} className="absolute inset-0 h-full w-full object-cover" loading="eager" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08303d]/90 via-[#08303d]/65 to-transparent" />
      <div className="container-x relative py-16">
        {m.enabled ? (
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, x: m.distance }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -m.distance }} transition={{ duration: m.duration, ease: m.ease }}>{inner}</motion.div>
          </AnimatePresence>
        ) : inner}
      </div>
      <div className="absolute bottom-5 left-0 right-0">
        <div className="container-x flex items-center gap-3">
          <button type="button" aria-label="Previous slide" onClick={() => setI((i + SLIDES.length - 1) % SLIDES.length)} className="rounded-full bg-white/20 p-2 text-white hover:bg-accent"><ChevronLeft className="h-4 w-4" /></button>
          {SLIDES.map((_, n) => <button key={n} type="button" aria-label={`Slide ${n + 1}`} aria-current={n === i} onClick={() => setI(n)} className={`h-2 rounded-full transition-all ${n === i ? 'w-8 bg-accent' : 'w-2 bg-white/60'}`} />)}
          <button type="button" aria-label="Next slide" onClick={() => setI((i + 1) % SLIDES.length)} className="rounded-full bg-white/20 p-2 text-white hover:bg-accent"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
    </section>
  );
}

function QuickTiles() {
  const tiles = [
    [Phone, 'For an Appointment', 'Consult our experts on your healthcare needs.', '/contact'],
    [Stethoscope, 'Our Specialities', 'Comprehensive services under one roof.', '/specialities'],
    [UserRound, 'Consult A Doctor', 'Leading multi-speciality experts.', '/contact'],
    [ClipboardCheck, 'Health Checkup', 'Structured packages to screen your health.', '/master-health-check-up'],
  ];
  return (
    <section className="relative z-10 -mt-10">
      <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map(([I, t, d, to], n) => (
          <Reveal key={t} delay={n}>
            <Link to={to} className="card card-hover flex h-full gap-4 p-5">
              <I className="h-9 w-9 shrink-0 text-accent" aria-hidden="true" />
              <span><span className="block font-semibold">{t}</span><span className="text-sm text-ink-muted">{d}</span></span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Enquiry() {
  const nav = useNavigate();
  const [visited, setVisited] = useState('No');
  return (
    <form onSubmit={(e) => { e.preventDefault(); nav(`/contact?visited=${visited}`); }} className="card space-y-4 p-6">
      <h3 className="font-sans text-lg font-semibold">Quick enquiry</h3>
      <fieldset>
        <legend className="mb-2 text-sm">Have you visited us before?</legend>
        <div className="flex gap-6">
          {['Yes', 'No'].map((v) => (
            <label key={v} className="flex items-center gap-2 text-sm"><input type="radio" name="visited" checked={visited === v} onChange={() => setVisited(v)} />{v}</label>
          ))}
        </div>
      </fieldset>
      <button className="btn-primary w-full">Continue to contact form</button>
    </form>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <QuickTiles />

      <section className="section">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-2">Welcome to {BRAND}</p>
            <h2 className="text-3xl font-bold md:text-4xl">Leading Multi-Speciality Hospital</h2>
            <p className="mt-4 text-ink-muted">{BRAND} was built with a simple yet powerful purpose: to provide quality medical service to the less privileged rural population at a level on par with hospitals of metropolitan cities. Our focus is advanced care, compassionate support and reliable treatment close to home.</p>
            <Link to="/about-us" className="btn-outline mt-6">Know more</Link>
          </Reveal>
          <Reveal delay={1}><Img src={IMAGES.care} alt="Doctors providing care" className="aspect-[4/3] w-full rounded-lg object-cover shadow-card" /></Reveal>
        </div>
        <div className="container-x mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-lg bg-primary-soft p-6 text-center">
              <p className="font-display text-3xl font-bold text-primary md:text-4xl"><CountUp value={s.value} /></p>
              <p className="mt-1 text-sm text-ink-muted">{s.label}</p>
            </div>
          ))}
          <p className="col-span-full text-center text-xs text-ink-muted">Figures are sample data for the demo.</p>
        </div>
      </section>

      <section className="section bg-surface-alt">
        <div className="container-x">
          <SectionHeading eyebrow="What we do" title="We Deliver Quality Care" text="Your health is our priority. With state-of-the-art facilities, evidence-based practice and continuous improvement, we support your well-being at every step." />
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {['Skilled and compassionate multi-speciality professionals', 'Cutting-edge technology and advanced facilities'].map((t) => (
              <Reveal key={t}><div className="card flex items-center gap-3 p-5"><Check className="h-6 w-6 text-accent" />{t}</div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Centres of Excellence" title="Specialty Services" text="Our institution offers an extensive suite of multi-speciality services and dedicated Centres of Excellence for diverse healthcare needs." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {FEATURED.map((s, n) => (
              <Reveal key={s.slug} delay={n % 5}>
                <Link to={`/${s.slug}`} className="card card-hover flex h-full flex-col items-center p-5 text-center">
                  <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary"><Icon name={s.icon} className="h-7 w-7" /></span>
                  <h3 className="font-sans text-base font-semibold">{s.name}</h3>
                  <p className="mt-2 text-xs text-ink-muted">{s.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center"><Link to="/specialities" className="btn-primary">Know More</Link></div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary py-16 text-white dark:text-surface">
        <div className="container-x grid items-center gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Precision Imaging, Exceptional Care</p>
            <h2 className="mt-2 text-3xl font-bold !text-white md:text-4xl dark:!text-surface">Where Technology Meets Compassion</h2>
            <p className="mt-4 opacity-90">We prioritise accurate diagnostics, and our infrastructure reflects our commitment to exceptional care.</p>
            <Link to="/contact" className="btn-accent mt-6">Book For a Consultation</Link>
          </Reveal>
          <Reveal delay={1}><Img src={IMAGES.building} alt="Hospital infrastructure" className="aspect-video w-full rounded-lg object-cover" /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Why choose us" title={`Why Choose ${BRAND}`} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(([t, d, ic], n) => (
              <Reveal key={t} delay={n % 4}>
                <div className="card h-full p-5">
                  <Icon name={ic} className="mb-3 h-9 w-9 text-accent" />
                  <h3 className="font-sans text-base font-semibold">{t}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <ul className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {HIGHLIGHTS.map((h) => <li key={h} className="flex items-start gap-2 text-sm"><Star className="mt-0.5 h-4 w-4 shrink-0 fill-accent text-accent" />{h}</li>)}
          </ul>
        </div>
      </section>

      <section className="section bg-primary-soft">
        <div className="container-x">
          <SectionHeading eyebrow={`The ${BRAND} World of Care`} title="International Patient Care" text="Experience world-class treatment tailored to your needs, with a seamless, supportive and compassionate journey." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INTERNATIONAL.map((t, n) => (
              <Reveal key={t} delay={n % 4}><div className="card flex items-center gap-3 p-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white dark:text-surface">{n + 1}</span><span className="text-sm font-medium">{t}</span></div></Reveal>
            ))}
          </div>
          <div className="mt-8 text-center"><Link to="/international-patient" className="btn-primary">Learn more</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Services" title="Our Services" text="Expert medical care and personalised support through all-in-one integrated healthcare services." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, n) => (
              <Reveal key={s.title} delay={n % 3}>
                <Link to={s.to} className="card card-hover group block overflow-hidden">
                  <Img src={s.image} alt={s.title} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="p-5"><h3 className="flex items-center gap-2 font-sans text-lg font-semibold"><Icon name={s.icon} className="h-5 w-5 text-accent" />{s.title}</h3><p className="mt-1 text-sm text-ink-muted">{s.text}</p></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface-alt">
        <div className="container-x">
          <SectionHeading eyebrow="Free Camps" title="Programs for the Society we Care" text="Through healthcare camps, awareness programmes and community initiatives, we are committed to nurturing a healthier society." />
          <div className="grid gap-6 md:grid-cols-2">
            {[[IMAGES.healthCamp, 'Free health check-up at a nearby village'], [IMAGES.eyeCamp, 'Free eye camp at a nearby village']].map(([src, t]) => (
              <Reveal key={t}><figure className="card overflow-hidden"><Img src={src} alt={t} className="aspect-video w-full object-cover" /><figcaption className="p-4 font-semibold">{t}</figcaption></figure></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Video Library" title="Informative healthcare videos from multi-speciality experts" />
          <div className="grid gap-5 md:grid-cols-3">
            {['Anniversary highlights', 'Surgical procedure explained', 'Kidney Day awareness'].map((t) => (
              <Link key={t} to="/video-gallery" className="card card-hover flex aspect-video flex-col items-center justify-center gap-3 bg-primary-soft p-4 text-center">
                <Play className="h-10 w-10 rounded-full bg-accent p-2 text-white" /><span className="font-semibold">{t}</span><span className="text-xs text-ink-muted">Sample placeholder</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-primary-soft">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-bold">Have a Question? Get In Touch</h2>
            <p className="mt-3 text-ink-muted">Give us a call or send a message.</p>
            <p className="mt-6 font-semibold">{BRAND}</p>
            <p className="text-sm text-ink-muted">{QUICK_SETTINGS.contact.address}</p>
            <p className="mt-2 text-sm">{QUICK_SETTINGS.contact.phone} &middot; {QUICK_SETTINGS.contact.email}</p>
            <p className="text-sm">Emergency: {QUICK_SETTINGS.contact.emergency}</p>
          </Reveal>
          <Reveal delay={1}><Enquiry /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x max-w-4xl">
          <SectionHeading title="Health Care FAQ's" text="Reach out to our staff if you have additional questions or specific concerns." />
          <Accordion items={FAQS.slice(0, 6)} />
          <div className="mt-6 text-center"><Link to="/faq" className="btn-outline">All FAQs</Link></div>
        </div>
      </section>

      <section className="bg-surface-alt py-12">
        <div className="container-x">
          <h2 className="mb-6 text-center text-2xl font-bold">Locate Your Nearest Clinics</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CLINICS.map((c) => <Link key={c} to="/contact?topic=clinics" className="card card-hover p-4 text-center text-sm font-medium">{c}</Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
