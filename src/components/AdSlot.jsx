import { BRAND } from '../config';

// Small sponsor strip shown at the base of every page. Replace the body with a real
// ad-network snippet (e.g. AdSense) when going live; this is a static placeholder.
export default function AdSlot() {
  return (
    <aside aria-label="Advertisement" className="border-t border-line bg-surface-alt py-4">
      <div className="container-x">
        <p className="mb-1 text-center text-[10px] uppercase tracking-widest text-ink-muted">Advertisement</p>
        <div className="mx-auto flex h-[70px] max-w-[728px] items-center justify-center rounded border border-dashed border-primary/40 bg-surface px-4 text-center text-sm text-ink-muted">
          Your ad here - 728x90 sample slot &middot; {BRAND} Partner Space
        </div>
      </div>
    </aside>
  );
}
