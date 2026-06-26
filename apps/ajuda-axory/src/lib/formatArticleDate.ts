/** Formata data ISO (YYYY-MM-DD) para exibição compacta em metadados. */
export function formatArticleDateShort(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return iso;

  return new Date(year, month - 1, day).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/** Formata data ISO (YYYY-MM-DD) para exibição em artigos. */
export function formatArticleDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return iso;

  return new Date(year, month - 1, day).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function resolveArticleDates(article: {
  createdAt?: string;
  updatedAt: string;
}): { createdAt: string; updatedAt: string } {
  return {
    createdAt: article.createdAt ?? article.updatedAt,
    updatedAt: article.updatedAt,
  };
}
