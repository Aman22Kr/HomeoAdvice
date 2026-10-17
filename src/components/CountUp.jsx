import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import useMotion from '../hooks/useMotion';

export default function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { enabled, duration } = useMotion();
  const [n, setN] = useState(enabled ? 0 : value);

  useEffect(() => {
    if (!enabled) { setN(value); return undefined; }
    if (!inView) return undefined;
    let raf;
    const start = performance.now();
    const ms = Math.max(duration, 0.3) * 2000;
    const tick = (t) => {
      const p = Math.min((t - start) / ms, 1);
      setN(Math.round(value * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, enabled, duration, value]);

  return <span ref={ref}>{n.toLocaleString('en-IN')}+</span>;
}
