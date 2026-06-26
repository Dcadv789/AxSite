export type ProductStatus = 'active' | 'soon';

export interface Product {
  id: string;
  name: string;
  status: ProductStatus;
  tagline: string;
  accent: string;
}

export interface Collection {
  id: string;
  slug: string;
  productId: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface Article {
  id: string;
  slug: string;
  collectionId: string;
  title: string;
  description: string;
  keywords: string[];
  body: string;
  related: string[];
  /** Data de criação/publicação original (ISO). Se omitida, usa updatedAt. */
  createdAt?: string;
  updatedAt: string;
}
