import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { QUICK_SETTINGS } from '../config';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

const isStrArray = (v) => Array.isArray(v) && v.every((x) => typeof x === 'string');
const oneOf = (list) => (v) => list.includes(v);

export const SPEEDS = ['SLOW', 'NORMAL', 'FAST', 'OFF'];
export const INTENSITIES = ['SUBTLE', 'MEDIUM', 'STRONG'];

export function AppProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light', oneOf(['light', 'dark']));
  const [speed, setSpeed] = useLocalStorage('anim-speed', QUICK_SETTINGS.animationSpeed, oneOf(SPEEDS));
  const [intensity, setIntensity] = useLocalStorage('anim-intensity', QUICK_SETTINGS.animationIntensity, oneOf(INTENSITIES));
  const [favorites, setFavorites] = useLocalStorage('favorites', [], isStrArray);
  const [recent, setRecent] = useLocalStorage('recent', [], isStrArray);
  const [history, setHistory] = useLocalStorage('search-history', [], isStrArray);
  const [popupSeen, setPopupSeen] = useLocalStorage('popup-seen', false, (v) => typeof v === 'boolean');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.motion = speed;
  }, [theme, speed]);

  const toggleFavorite = useCallback(
    (slug) => setFavorites((f) => (f.includes(slug) ? f.filter((x) => x !== slug) : [...f, slug])),
    [setFavorites],
  );
  const addRecent = useCallback(
    (slug) => setRecent((r) => [slug, ...r.filter((x) => x !== slug)].slice(0, 6)),
    [setRecent],
  );
  const addHistory = useCallback(
    (q) => {
      const t = q.trim();
      if (t.length < 2) return;
      setHistory((h) => [t, ...h.filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, 8));
    },
    [setHistory],
  );

  const value = useMemo(
    () => ({
      theme, setTheme, speed, setSpeed, intensity, setIntensity,
      favorites, toggleFavorite, recent, addRecent,
      history, addHistory, clearHistory: () => setHistory([]),
      popupSeen, setPopupSeen,
    }),
    [theme, speed, intensity, favorites, recent, history, popupSeen, setTheme, setSpeed, setIntensity,
      toggleFavorite, addRecent, addHistory, setHistory, setPopupSeen],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
