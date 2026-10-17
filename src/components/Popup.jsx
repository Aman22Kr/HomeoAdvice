import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND } from '../config';

export default function Popup() {
  const { popupSeen, setPopupSeen } = useApp();
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (popupSeen || pathname !== '/') return undefined;
    const t = setTimeout(() => setShow(true), 2500);
    return () => clearTimeout(t);
  }, [popupSeen, pathname]);
  if (!show) return null;
  const close = () => { setShow(false); setPopupSeen(true); };
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Health check-up offer" onClick={close}>
      <div className="relative w-full max-w-md rounded-lg bg-surface p-8 text-center shadow-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" aria-label="Close" onClick={close} className="absolute right-3 top-3 p-1"><X className="h-5 w-5" /></button>
        <p className="eyebrow">{BRAND} Master Health Check-up</p>
        <h2 className="mt-2 text-2xl font-bold">Prevention is better than cure</h2>
        <p className="mt-3 text-sm text-ink-muted">Explore our structured health check-up packages (sample offer).</p>
        <Link to="/master-health-check-up" onClick={close} className="btn-accent mt-6">View packages</Link>
      </div>
    </div>
  );
}
