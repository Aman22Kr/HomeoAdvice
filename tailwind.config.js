const v = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: v('primary'), dark: v('primary-dark'), soft: v('primary-soft') },
        accent: { DEFAULT: v('accent'), dark: v('accent-dark') },
        surface: { DEFAULT: v('surface'), alt: v('surface-alt') },
        ink: { DEFAULT: v('ink'), muted: v('muted') },
        line: v('line'),
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      maxWidth: { page: '1240px' },
      boxShadow: { card: '0 6px 24px -10px rgb(0 0 0 / 0.18)' },
    },
  },
  plugins: [],
};
