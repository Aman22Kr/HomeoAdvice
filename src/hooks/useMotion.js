import { useReducedMotion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const DURATION = { SLOW: 0.9, NORMAL: 0.55, FAST: 0.3, OFF: 0 };
const DISTANCE = { SUBTLE: 10, MEDIUM: 24, STRONG: 48 };
const STAGGER = { SLOW: 0.14, NORMAL: 0.09, FAST: 0.05, OFF: 0 };

export default function useMotion() {
  const { speed, intensity } = useApp();
  const reduced = useReducedMotion();
  const enabled = speed !== 'OFF' && !reduced;
  return {
    enabled,
    duration: DURATION[speed],
    distance: DISTANCE[intensity],
    stagger: STAGGER[speed],
    ease: [0.22, 0.61, 0.36, 1],
  };
}
