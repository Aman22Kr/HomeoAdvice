import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="container-x py-24 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-2 text-4xl font-bold">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-ink-muted">The page you are looking for does not exist or has moved.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className="btn-primary">Back to home</Link>
        <Link to="/specialities" className="btn-outline">Browse specialities</Link>
      </div>
    </section>
  );
}
