import { Link } from 'react-router-dom';
import { ExternalLink, Mail, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { pageContainerClass } from './layout/PageContainer';
import { products } from '../data/products';
import { cn } from '../lib/cn';

export default function Footer() {
  const activeProducts = products.filter((p) => p.status === 'active');

  return (
    <footer className="mt-auto border-t border-gray-800 bg-gray-900 text-white dark:border-gray-800 dark:bg-gray-950">
      <div className={cn(pageContainerClass, 'py-12 lg:py-14')}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Logo e marca */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-flex flex-col gap-4 transition-opacity hover:opacity-90"
            >
              <Logo variant="onDark" className="h-12 sm:h-14" />
              <p className="max-w-xs text-sm leading-relaxed text-gray-400">
                Central de ajuda e documentação dos produtos Axory. Tutoriais,
                políticas e guias para você tirar o máximo da plataforma.
              </p>
            </Link>
          </div>

          {/* Produtos */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Produtos
            </h3>
            <ul className="space-y-2.5">
              {activeProducts.map((product) => (
                <li key={product.id}>
                  <Link
                    to="/"
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://axory.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Site institucional
                  <ExternalLink size={12} className="opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Links úteis */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Ajuda
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Página inicial
                </Link>
              </li>
              <li>
                <Link
                  to="/a/como-funciona-o-axchat"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Como funciona o AxChat
                </Link>
              </li>
              <li>
                <Link
                  to="/a/o-que-e-axdeal"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  O que é o AxDeal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Contato
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contato@axory.com.br"
                  className="flex items-center gap-2.5 text-sm text-gray-300 transition-colors hover:text-white"
                >
                  <Mail size={16} className="shrink-0 text-gray-500" />
                  contato@axory.com.br
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511994561052"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-gray-300 transition-colors hover:text-white"
                >
                  <MessageCircle size={16} className="shrink-0 text-gray-500" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://axory.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-300 transition-colors hover:text-white"
                >
                  axory.com.br
                  <ExternalLink size={12} className="opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-800 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Axory. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-600">
            Consultoria financeira e soluções digitais para o seu negócio.
          </p>
        </div>
      </div>
    </footer>
  );
}
