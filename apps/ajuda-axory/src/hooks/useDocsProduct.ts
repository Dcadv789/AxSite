import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { articles } from '../data/articles';
import { collections } from '../data/collections';
import { products } from '../data/products';
import { sidebarGroupsByProduct } from '../data/sidebarGroups';

export function getDefaultExpandedCollections(productId: string): Record<string, boolean> {
  const groups = sidebarGroupsByProduct[productId] ?? sidebarGroupsByProduct.axdeal;
  const initial: Record<string, boolean> = {};
  groups[0]?.collectionIds.forEach((id) => {
    initial[id] = true;
  });
  return initial;
}

export function useDocsProduct() {
  const location = useLocation();

  const activeArticleSlug = location.pathname.startsWith('/a/')
    ? location.pathname.replace('/a/', '')
    : null;
  const activeCollectionSlug = location.pathname.startsWith('/c/')
    ? location.pathname.replace('/c/', '')
    : null;

  const activeCollectionId = useMemo(() => {
    if (activeArticleSlug) {
      return articles.find((a) => a.slug === activeArticleSlug)?.collectionId ?? null;
    }
    if (activeCollectionSlug) {
      return collections.find((c) => c.slug === activeCollectionSlug)?.id ?? null;
    }
    return null;
  }, [activeArticleSlug, activeCollectionSlug]);

  const activeProductId = useMemo(() => {
    if (activeArticleSlug) {
      const article = articles.find((a) => a.slug === activeArticleSlug);
      const collection = collections.find((c) => c.id === article?.collectionId);
      return collection?.productId ?? 'axdeal';
    }
    if (activeCollectionSlug) {
      return collections.find((c) => c.slug === activeCollectionSlug)?.productId ?? 'axdeal';
    }
    return 'axdeal';
  }, [activeArticleSlug, activeCollectionSlug]);

  const activeProduct = products.find((p) => p.id === activeProductId) ?? products[0];

  return {
    activeProduct,
    activeProductId,
    activeCollectionId,
    activeArticleSlug,
    activeCollectionSlug,
  };
}
