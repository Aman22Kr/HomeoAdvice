import { QUICK_SETTINGS } from '../config';

const NS = QUICK_SETTINGS.storageNamespace;

/** Safe read: returns `fallback` when missing, malformed, or failing validation. */
export function readStore(key, fallback, validate) {
  try {
    const raw = window.localStorage.getItem(NS + key);
    if (raw == null) return fallback;
    const value = JSON.parse(raw);
    if (validate && !validate(value)) return fallback;
    return value;
  } catch {
    return fallback;
  }
}

export function writeStore(key, value) {
  try {
    window.localStorage.setItem(NS + key, JSON.stringify(value));
  } catch {
    /* storage full or blocked (private mode) - the app keeps working in memory */
  }
}

export function removeStore(key) {
  try {
    window.localStorage.removeItem(NS + key);
  } catch {
    /* ignore */
  }
}
