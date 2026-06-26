import { Link } from 'react-router-dom';
import { ArrowLeft, SearchX } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-400 mx-auto mb-6">
            <SearchX size={28} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Página não encontrada
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">
            O artigo ou página que você procura não existe ou foi removido.
          </p>
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
