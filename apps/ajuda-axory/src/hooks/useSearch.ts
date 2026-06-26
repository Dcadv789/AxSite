import { useState, useMemo } from 'react';
import { articles } from '../data/articles';
import { collections } from '../data/collections';
import type { Article } from '../types';

export interface SearchResult extends Article {
  collectionTitle: string;
}

export function useSearch(productId: string) {
  const [query, setQuery] = useState('');

  const results = useMemo((): SearchResult[] => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();

    const productCollectionIds = new Set(
      collections
        .filter(c => c.productId === productId)
        .map(c => c.id)
    );

    return articles
      .filter(a => {
        if (!productCollectionIds.has(a.collectionId)) return false;
        return (
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.keywords.some(k => k.toLowerCase().includes(q))
        );
      })
      .slice(0, 8)
      .map(a => {
        const col = collections.find(c => c.id === a.collectionId);
        return { ...a, collectionTitle: col?.title ?? '' };
      });
  }, [query, productId]);

  return { query, setQuery, results };
}
