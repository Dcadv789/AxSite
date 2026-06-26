import { Link, useLocation } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { pageContainerClass } from './layout/PageContainer';
import { cn } from '../lib/cn';

function BrandText() {
  return (
    <div className="min-w-0">
      <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
        Central de Ajuda
      </p>
      <p className="truncate text-xs text-gray-500 dark:text-gray-400">
        Documentação dos produtos
      </p>
    </div>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/95">
      <div className={cn(pageContainerClass)}>
        <div
          className={cn(
            'grid h-14 items-center gap-4',
            isHome ? 'grid-cols-[1fr_auto]' : 'grid-cols-[1fr_auto_1fr]'
          )}
        >
          <Link
            to="/"
            className="justify-self-start transition-opacity hover:opacity-90"
          >
            <BrandText />
          </Link>

          {!isHome && (
            <Link
              to="/"
              className="justify-self-center transition-opacity hover:opacity-90"
              aria-label="Axory - Início"
            >
              <Logo className="h-7 sm:h-8" />
            </Link>
          )}

          <div className="flex shrink-0 items-center justify-self-end gap-1 sm:gap-2">
            <a
              href="https://axory.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white md:inline-flex"
            >
              axory.com.br
              <ExternalLink size={14} className="opacity-60" />
            </a>
            <a
              href="mailto:contato@axory.com.br"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white lg:inline-block"
            >
              Contato
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
