import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import ProductTabs from './ProductTabs';
import Logo from './Logo';
import { useSearch } from '../hooks/useSearch';
import { products } from '../data/products';
import { cn } from '../lib/cn';
interface HeroProps {
  activeProductId: string;
  onProductChange: (id: string) => void;
}

export default function Hero({ activeProductId, onProductChange }: HeroProps) {
  const navigate = useNavigate();
  const { query, setQuery, results } = useSearch(activeProductId);
  const [focused, setFocused] = useState(false);

  return (
    <div className="bg-brand-500 dark:bg-brand-700 py-14 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <Logo
          variant="onDark"
          className="mx-auto mb-9 h-11 w-auto sm:mb-10 sm:h-12"
        />
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Como podemos ajudar?
        </h1>
        <p className="mt-2 text-blue-100 text-base">
          Tutoriais, guias e respostas sobre os produtos Axory.
        </p>

        {/* Search */}
        <div className="relative mt-8">
          <div
            className={cn(
              'flex items-center gap-3 rounded-2xl bg-white dark:bg-gray-900 px-4 shadow-lg transition-shadow',
              focused ? 'ring-2 ring-white/60 shadow-xl' : ''
            )}
          >
            <Search size={18} className="shrink-0 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              placeholder="Buscar artigos, tutoriais..."
              className="h-12 flex-1 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none text-sm"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Search dropdown */}
          {results.length > 0 && focused && (
            <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 overflow-hidden">
              {results.map((result) => (
                <button
                  key={result.id}
                  onMouseDown={() => navigate(`/a/${result.slug}`)}
                  className="w-full flex flex-col items-start gap-0.5 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
                >
                  <span className="text-xs font-medium text-brand uppercase tracking-wide">
                    {result.collectionTitle}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {result.title}
                  </span>
                  <span className="text-xs text-gray-500 line-clamp-1">{result.description}</span>
                </button>
              ))}
            </div>
          )}

          {query.length >= 2 && results.length === 0 && focused && (
            <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 px-4 py-6 text-center">
              <p className="text-sm text-gray-500">Nenhum resultado para "{query}"</p>
            </div>
          )}
        </div>

        {/* Product Tabs */}
        <div className="mt-8">
          <ProductTabs
            products={products}
            activeId={activeProductId}
            onChange={onProductChange}
          />
        </div>
      </div>
    </div>
  );
}
