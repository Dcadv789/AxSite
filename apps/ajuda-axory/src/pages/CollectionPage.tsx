import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Clock, FileText } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import NotFound from './NotFound';
import { collections } from '../data/collections';
import { articles } from '../data/articles';

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) return <NotFound />;

  const collectionArticles = articles.filter((a) => a.collectionId === collection.id);

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <Breadcrumbs crumbs={[{ label: collection.title }]} />

      <header className="mt-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {collection.title}
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {collection.description}
        </p>
        <p className="mt-3 text-xs text-gray-400">
          {collectionArticles.length}{' '}
          {collectionArticles.length === 1 ? 'artigo' : 'artigos'}
        </p>
      </header>

      <div className="divide-y divide-gray-100 dark:divide-gray-800 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {collectionArticles.map((article) => (
          <Link
            key={article.id}
            to={`/a/${article.slug}`}
            className="group flex items-center gap-4 px-5 py-4 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10 text-brand">
              <FileText size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-brand transition-colors text-sm">
                {article.title}
              </h3>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                {article.description}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
                <Clock size={11} />
                {article.updatedAt}
              </span>
              <ChevronRight
                size={14}
                className="text-gray-300 dark:text-gray-600 group-hover:text-brand group-hover:translate-x-0.5 transition-all"
              />
            </div>
          </Link>
        ))}
        {collectionArticles.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-gray-400 bg-white dark:bg-gray-900">
            Nenhum artigo nesta categoria ainda.
          </div>
        )}
      </div>
    </div>
  );
}
