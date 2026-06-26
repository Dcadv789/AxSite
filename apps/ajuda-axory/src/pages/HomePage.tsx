import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CollectionCard from '../components/CollectionCard';
import Footer from '../components/Footer';
import PageContainer from '../components/layout/PageContainer';import { collections } from '../data/collections';
import { products } from '../data/products';

export default function HomePage() {
  const [activeProductId, setActiveProductId] = useState('axdeal');

  const activeProduct = products.find((p) => p.id === activeProductId);
  const isSoon = activeProduct?.status === 'soon';

  const productCollections = collections
    .filter((c) => c.productId === activeProductId)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <Hero activeProductId={activeProductId} onProductChange={setActiveProductId} />

      <PageContainer as="main" className="flex-1 py-12">        {isSoon ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 text-2xl mb-4">
              🚧
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {activeProduct?.name} — Em breve
            </h2>
            <p className="mt-2 text-sm text-gray-500 max-w-md">
              A documentação do {activeProduct?.name} está sendo preparada.
              Em breve você encontrará tutoriais e guias completos aqui.
            </p>
            <p className="mt-4 text-xs text-gray-400">
              {activeProduct?.tagline}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Categorias do {activeProduct?.name}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Selecione uma categoria para ver os artigos disponíveis.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {productCollections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          </>
        )}
      </PageContainer>
      <Footer />
    </div>
  );
}
