import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Title from './components/Title';
import Home from './pages/Home';
import SlugPage from './pages/SlugPage';
import NotFound from './pages/NotFound';

const SearchPage = lazy(() => import('./pages/SearchPage'));
const SavedPage = lazy(() => import('./pages/SavedPage'));

const Loading = () => <div className="container-x py-24 text-center text-ink-muted" role="status">Loading...</div>;

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<><Title /><Home /></>} />
          <Route path="search" element={<SearchPage />} />
          <Route path="saved" element={<SavedPage />} />
          <Route path=":slug" element={<SlugPage />} />
          <Route path="*" element={<><Title text="Page not found" /><NotFound /></>} />
        </Route>
      </Routes>
    </Suspense>
  );
}
