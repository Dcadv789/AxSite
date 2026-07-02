import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import { collections } from './data/collections';
import { articles } from './data/articles';
import { products } from './data/products';

interface PrerenderData {
  url: string;
}

interface HeadElement {
  type: string;
  props: Record<string, string>;
}

function headFor(url: string) {
  const elements = new Set<HeadElement>();
  let title = 'Central de Ajuda — Axory';
  let description = 'Tutoriais, guias e respostas para usar os produtos Axory.';

  if (url.startsWith('/a/')) {
    const slug = url.replace('/a/', '').replace(/\/$/, '');
    const a = articles.find((x) => x.slug === slug);
    if (a) {
      title = `${a.title} — Ajuda Axory`;
      description = a.description;
    }
  } else if (url.startsWith('/c/')) {
    const slug = url.replace('/c/', '').replace(/\/$/, '');
    const c = collections.find((x) => x.slug === slug);
    if (c) {
      title = `${c.title} — Ajuda Axory`;
      description = c.description;
    }
  }

  elements.add({ type: 'meta', props: { name: 'description', content: description } });
  return { lang: 'pt-BR', title, elements };
}

export async function prerender(data: PrerenderData) {
  const html = renderToString(
    <StaticRouter location={data.url}>
      <App />
    </StaticRouter>
  );

  // Enfileira todas as rotas conhecidas para serem pré-renderizadas.
  const links = new Set<string>(['/']);
  collections.forEach((c) => links.add(`/c/${c.slug}`));
  articles.forEach((a) => links.add(`/a/${a.slug}`));
  products.forEach((p) => {
    if (p.status === 'soon') links.add(`/p/${p.id}`);
  });

  return { html, links, head: headFor(data.url) };
}
