import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, ChevronRight, ChevronDown, X,
  Rocket, LayoutDashboard, Briefcase, Wallet, BarChart3,
  Database, Settings2, Zap, Layers, Users, ShieldCheck, Scale,
  MessageCircle, BookOpen, Headphones, Share2, Plug, Code2,
  HelpCircle, History, Bot, Sparkles, Megaphone,
} from 'lucide-react';
import type { ElementType } from 'react';
import { cn } from '../../lib/cn';
import { collections } from '../../data/collections';
import { articles } from '../../data/articles';
import { sidebarGroupsByProduct } from '../../data/sidebarGroups';
import {
  getDefaultExpandedCollections,
  useDocsProduct,
} from '../../hooks/useDocsProduct';

const iconMap: Record<string, ElementType> = {
  Rocket, LayoutDashboard, Briefcase, Wallet, BarChart3,
  Database, Settings2, Zap, Layers, Users, ShieldCheck, Scale,
  MessageCircle, BookOpen, Headphones, Share2, Plug, Code2,
  HelpCircle, History, Bot, Sparkles, Megaphone,
};

interface DocsSidebarProps {
  onClose?: () => void;
}

export default function DocsSidebar({ onClose }: DocsSidebarProps) {
  const [query, setQuery] = useState('');
  const {
    activeProductId,
    activeCollectionId,
    activeArticleSlug,
  } = useDocsProduct();

  const sidebarGroups = sidebarGroupsByProduct[activeProductId] ?? sidebarGroupsByProduct.axdeal;

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    getDefaultExpandedCollections(activeProductId)
  );

  useEffect(() => {
    const next = getDefaultExpandedCollections(activeProductId);
    if (activeCollectionId) next[activeCollectionId] = true;
    setExpanded(next);
  }, [activeProductId, activeCollectionId]);
  const searchResults = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    const productCollectionIds = new Set(
      collections.filter((c) => c.productId === activeProductId).map((c) => c.id)
    );
    return articles
      .filter(
        (a) =>
          productCollectionIds.has(a.collectionId) &&
          (a.title.toLowerCase().includes(q) ||
            a.description.toLowerCase().includes(q))
      )
      .slice(0, 6);
  }, [query, activeProductId]);

  const toggleCollection = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="border-b border-gray-100 p-4 dark:border-gray-800">
        <div className="relative flex items-center">
          <Search size={15} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar..."
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 py-2 pl-9 pr-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/30"
          />
          {onClose && (
            <button
              onClick={onClose}
              className="ml-2 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
              aria-label="Fechar menu"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {searchResults.length > 0 && (
          <div className="mt-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
            {searchResults.map((article) => (
              <Link
                key={article.id}
                to={`/a/${article.slug}`}
                onClick={onClose}
                className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-brand"
              >
                {article.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Navigation tree */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-hide">
        {sidebarGroups.map((group) => (
          <div key={group.label} className="mb-6 last:mb-0">
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {group.label}
            </p>

            <div className="space-y-0.5">
              {group.collectionIds.map((collectionId) => {
                const collection = collections.find((c) => c.id === collectionId);
                if (!collection) return null;

                const Icon = iconMap[collection.icon] ?? Rocket;
                const isOpen = expanded[collection.id] ?? false;
                const isActiveCollection =
                  activeCollectionId === collection.id && !activeArticleSlug;
                const collectionArticles = articles.filter(
                  (a) => a.collectionId === collection.id
                );

                return (
                  <div key={collection.id}>
                    <div
                      className={cn(
                        'flex w-full items-center rounded-lg transition-colors',
                        isActiveCollection
                          ? 'bg-gray-100 dark:bg-gray-800'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-900'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => toggleCollection(collection.id)}
                        className="flex h-8 w-7 shrink-0 items-center justify-center text-gray-400"
                        aria-label={isOpen ? 'Recolher' : 'Expandir'}
                      >
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </button>
                      <Link
                        to={`/c/${collection.slug}`}
                        onClick={onClose}
                        className={cn(
                          'flex flex-1 items-center gap-1.5 py-1.5 pr-2 text-left text-sm min-w-0',
                          isActiveCollection
                            ? 'text-gray-900 dark:text-white font-medium'
                            : 'text-gray-700 dark:text-gray-300'
                        )}
                      >
                        <Icon size={15} className="shrink-0 text-gray-400" />
                        <span className="truncate">{collection.title}</span>
                      </Link>
                    </div>

                    {isOpen && (
                      <div className="ml-5 mt-0.5 space-y-0.5 border-l border-gray-200 dark:border-gray-800 pl-3">
                        {collectionArticles.map((article) => {
                          const isActive = activeArticleSlug === article.slug;
                          return (
                            <Link
                              key={article.id}
                              to={`/a/${article.slug}`}
                              onClick={onClose}
                              className={cn(
                                'block rounded-md px-2 py-1.5 text-[13px] leading-snug transition-colors',
                                isActive
                                  ? 'bg-brand-50 dark:bg-brand-500/10 text-brand font-medium'
                                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900'
                              )}
                            >
                              {article.title}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-gray-100 dark:border-gray-800 p-4">
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-brand transition-colors"
        >
          ← Voltar ao início
        </Link>
      </div>
    </aside>
  );
}
