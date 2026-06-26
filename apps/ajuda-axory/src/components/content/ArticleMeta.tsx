import { formatArticleDateShort, resolveArticleDates } from '../../lib/formatArticleDate';
import type { Article } from '../../types';

interface ArticleMetaProps {
  article: Pick<Article, 'createdAt' | 'updatedAt' | 'keywords'>;
}

export default function ArticleMeta({ article }: ArticleMetaProps) {
  const { createdAt, updatedAt } = resolveArticleDates(article);

  return (
    <p className="mt-2 text-xs leading-relaxed text-gray-400 dark:text-gray-500">
      <span>Data: {formatArticleDateShort(createdAt)}</span>
      <span className="mx-2 text-gray-300 dark:text-gray-600">·</span>
      <span>Atualização: {formatArticleDateShort(updatedAt)}</span>
    </p>
  );
}
