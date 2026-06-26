import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Rocket } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../data/products';

export default function ComingSoon() {
  const { product } = useParams<{ product: string }>();
  const prod = products.find((p) => p.id === product);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand mx-auto mb-6">
            <Rocket size={28} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {prod?.name ?? 'Produto'} — Em breve
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            A documentação deste produto está sendo preparada pela equipe Axory.
            Em breve você encontrará tutoriais e guias completos aqui.
          </p>
          {prod?.tagline && (
            <p className="mt-2 text-sm text-gray-400">{prod.tagline}</p>
          )}
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
          >
            <ArrowLeft size={15} />
            Voltar ao início
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
