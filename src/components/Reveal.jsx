import { motion } from 'framer-motion';
import useMotion from '../hooks/useMotion';

export default function Reveal({ children, delay = 0, className = '' }) {
  const m = useMotion();
  if (!m.enabled) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: m.distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: m.duration, delay: delay * m.stagger, ease: m.ease }}
    >
      {children}
    </motion.div>
  );
}
