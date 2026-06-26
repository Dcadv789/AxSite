import { Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { ThemeContext } from './contexts/ThemeContext';
import DocsLayout from './components/layout/DocsLayout';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ArticlePage from './pages/ArticlePage';
import ComingSoon from './pages/ComingSoon';
import NotFound from './pages/NotFound';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<DocsLayout />}>
          <Route path="/c/:slug" element={<CollectionPage />} />
          <Route path="/a/:slug" element={<ArticlePage />} />
        </Route>
        <Route path="/p/:product" element={<ComingSoon />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeContext.Provider>
  );
}
