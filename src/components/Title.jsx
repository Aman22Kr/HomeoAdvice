import { useEffect } from 'react';
import { BRAND } from '../config';

// React 18 does not hoist <title>, so set document.title in an effect.
export default function Title({ text }) {
  useEffect(() => {
    document.title = text ? `${text} | ${BRAND}` : `${BRAND} | Multi-Speciality Hospital & Research Centre (Demo)`;
  }, [text]);
  return null;
}
