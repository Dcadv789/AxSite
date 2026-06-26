import type { Article } from '../../types';
import manifest from '../axchat/manifest.json';

const contentModules = import.meta.glob('../axchat/content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const axchatArticles: Article[] = (manifest as Omit<Article, 'body'>[]).map((meta) => {
  const modulePath = `../axchat/content/${meta.slug}.md`;
  const body = contentModules[modulePath] ?? `# ${meta.title}\n\nConteúdo em atualização.`;
  return { ...meta, body };
});
