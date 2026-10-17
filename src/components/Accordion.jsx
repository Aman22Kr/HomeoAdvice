import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items, initialOpen = -1 }) {
  const [open, setOpen] = useState(initialOpen);
  return (
    <div className="divide-y divide-line rounded-lg border border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3 className="font-sans">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold hover:bg-surface-alt"
              >
                {it.q}
                <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
            </h3>
            {isOpen && <p className="px-5 pb-5 text-sm leading-relaxed text-ink-muted">{it.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
