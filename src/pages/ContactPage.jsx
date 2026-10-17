import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { PageHero } from '../components/Section';
import Title from '../components/Title';
import useLocalStorage from '../hooks/useLocalStorage';
import { SPECIALITIES, specialityBySlug } from '../data/site';
import { QUICK_SETTINGS } from '../config';

const isDraft = (v) => v && typeof v === 'object' && typeof v.name === 'string' && typeof v.dept === 'string' && typeof v.message === 'string';

export default function ContactPage({ page }) {
  const [params] = useSearchParams();
  const deptParam = params.get('dept');
  const [draft, setDraft] = useLocalStorage('contact-draft', { name: '', dept: '', message: '' }, isDraft);
  // Phone and email are deliberately NOT persisted - only the non-sensitive draft fields are.
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const dept = deptParam && specialityBySlug[deptParam] ? deptParam : draft.dept;
  const set = (k) => (e) => setDraft({ ...draft, dept, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (draft.name.trim().length < 2) err.name = 'Please enter your name.';
    if (!/^[0-9+()\-\s]{7,16}$/.test(phone)) err.phone = 'Enter a valid phone number.';
    if (email && !/^\S+@\S+\.\S+$/.test(email)) err.email = 'Enter a valid email address.';
    if (draft.message.trim().length < 5) err.message = 'Please add a short message.';
    setErrors(err);
    if (Object.keys(err).length) return;
    setDraft({ name: '', dept: '', message: '' });
    setPhone(''); setEmail('');
    setDone(true);
  };

  const c = QUICK_SETTINGS.contact;
  return (
    <>
      <Title text="Contact" />
      <PageHero title={page.title} intro={page.intro} crumbs={['Home', 'Contact']} />
      <div className="container-x grid gap-10 py-12 lg:grid-cols-5">
        <form onSubmit={submit} noValidate className="card space-y-4 p-6 lg:col-span-3">
          {done && (
            <div role="status" className="flex items-start gap-3 rounded-md bg-primary-soft p-4 text-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
              <p><strong>Demo only:</strong> your message was validated but not sent anywhere, and no appointment was booked. Nothing has left your browser.</p>
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="name">Name *</label>
            <input id="name" className="input" value={draft.name} onChange={set('name')} aria-invalid={!!errors.name} />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="phone">Phone *</label>
              <input id="phone" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" aria-invalid={!!errors.phone} />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="email">Email</label>
              <input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="dept">Department</label>
            <select id="dept" className="input" value={dept} onChange={set('dept')}>
              <option value="">General enquiry</option>
              {SPECIALITIES.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="message">Message *</label>
            <textarea id="message" rows={5} className="input" value={draft.message} onChange={set('message')} aria-invalid={!!errors.message} />
            {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
          </div>
          <button className="btn-primary">Send message</button>
          <p className="text-xs text-ink-muted">Your name, department and message draft are saved in this browser only (localStorage) so a refresh does not lose them. Phone and email are never stored.</p>
        </form>
        <aside className="space-y-4 lg:col-span-2">
          <div className="rounded-lg bg-primary-soft p-6 text-sm">
            <p className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-primary" />{c.phone}</p>
            <p className="mt-3 flex gap-3"><Phone className="h-5 w-5 shrink-0 text-accent" />Emergency: {c.emergency}</p>
            <p className="mt-3 flex gap-3"><Mail className="h-5 w-5 shrink-0 text-primary" />{c.email}</p>
            <p className="mt-3 flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-primary" />{c.address}</p>
          </div>
          <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-line text-sm text-ink-muted">Map placeholder (demo)</div>
        </aside>
      </div>
    </>
  );
}
