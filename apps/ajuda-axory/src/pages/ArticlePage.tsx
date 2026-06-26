import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import Markdown from '../components/content/Markdown';
import ArticleMeta from '../components/content/ArticleMeta';
import ArticleFeedback from '../components/content/ArticleFeedback';import NotFound from './NotFound';
import { articles } from '../data/articles';
import { collections } from '../data/collections';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) return <NotFound />;

  const collection = collections.find((c) => c.id === article.collectionId);
  const relatedArticles = articles.filter((a) => article.related.includes(a.slug));

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <Breadcrumbs
        crumbs={[
          { label: collection?.title ?? 'Categoria', href: `/c/${collection?.slug}` },
          { label: article.title },
        ]}
      />

      <header className="mt-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
          {article.title}
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {article.description}
        </p>
        <ArticleMeta article={article} />
      </header>
      <Markdown content={article.body} />
      <ArticleFeedback />

      {relatedArticles.length > 0 && (
        <div className="mt-10 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
            Artigos relacionados
          </h3>
          <div className="flex flex-col gap-2">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                to={`/a/${rel.slug}`}
                className="group flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-brand transition-colors"
              >
                <ChevronRight
                  size={13}
                  className="shrink-0 text-gray-300 group-hover:text-brand"
                />
                {rel.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
