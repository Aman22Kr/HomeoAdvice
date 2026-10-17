# HomeoAdvice - demo multi-speciality hospital website

A static, multi-page recreation of the layout and content structure of https://www.narayanihospital.com/ under the brand **HomeoAdvice**.
Built with Vite + React + JavaScript + Tailwind CSS + React Router (hash routing) + Lucide + Framer Motion.
It is a **demo**: all copy, numbers, phone numbers, addresses and job openings are sample data, and nothing is sent to any server.

## What is inside
- Home (hero slider, quick tiles, stats, specialities, why-choose, international care, services, camps, FAQ, clinics)
- All 43 Centres of Excellence as detail pages (`#/cardiology`, ...), plus an All Specialities page with filter/sort/save
- About, Patient Care, Facilities, Media, Events, Gallery (lightbox), Videos (placeholders), Careers, FAQ, Contact, Legal, Sitemap
- Global search overlay + `/search` results page (type filter, sort, empty state), saved departments, 404 page
- A small sample ad slot at the base of every page (`src/components/AdSlot.jsx`)

## Quick settings
Edit `src/config.js`: brand name, animation speed (`SLOW|NORMAL|FAST|OFF`), intensity (`SUBTLE|MEDIUM|STRONG`), storage namespace, contact details.
The brief left animation speed/intensity unset, so the defaults are NORMAL / MEDIUM. Visitors can change them from the gear icon in the header.
`prefers-reduced-motion` is respected.

## Run locally
```bash
npm install
npm run dev        # development server
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## Deploy to GitHub Pages (GitHub Actions)
Routing uses `HashRouter` and Vite uses a relative base (`./`), so the site works under any repository name and survives refreshes and direct links.
```bash
git init
git add .
git commit -m "HomeoAdvice website"
git branch -M main
git remote add origin https://github.com/Aman22kr/<your-repo>.git
git push -u origin main
```
Then in the repository: **Settings -> Pages -> Build and deployment -> Source: GitHub Actions**.
The workflow `.github/workflows/deploy.yml` builds and publishes on every push to `main`.
Your site will be at `https://aman22kr.github.io/<your-repo>/`.
Tip: after your first local `npm install`, commit `package-lock.json` and change `npm install` to `npm ci` in the workflow.

## localStorage
Theme, animation settings, saved departments, recently viewed, search history, and the contact-form draft (name, department, message only) are stored under the `homeoadvice:v1:` prefix.
It is specific to one browser on one device: it does not sync and is not a user account. Phone/email are never stored.
Invalid or outdated stored values fall back to defaults.

## Demo limitations
- Contact/enquiry forms validate only; no message is sent and no appointment is booked.
- Images are loaded from the reference website's public image URLs (with an inline fallback if one fails). Replace them with your own assets before real use.
- Colours/typography are an approximation chosen by eye, not extracted from the reference's CSS.
- The reference site's founder, logo and real contact details were deliberately replaced with neutral placeholders.
- Detail-page text for most departments is generic sample copy.
