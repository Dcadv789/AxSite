import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useDocsProduct } from '../../hooks/useDocsProduct';

interface DocsUnifiedHeaderProps {
  onOpenSidebar?: () => void;
}

export default function DocsUnifiedHeader({ onOpenSidebar }: DocsUnifiedHeaderProps) {
  const { activeProduct } = useDocsProduct();

  return (
    <div
      className="flex shrink-0 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
      style={{ borderTopWidth: 3, borderTopColor: activeProduct.accent }}
    >
      {/* Coluna alinhada à sidebar (desktop) */}
      <div className="hidden lg:flex w-[260px] shrink-0 items-center border-r border-gray-200 px-4 py-3 dark:border-gray-800">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Documentação
          </p>
          <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
            {activeProduct.name}
          </p>
        </div>
      </div>

      {/* Coluna do conteúdo */}
      <div className="flex min-h-[52px] min-w-0 flex-1 items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {onOpenSidebar && (
          <button
            type="button"
            onClick={onOpenSidebar}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-300 lg:hidden"
            aria-label="Abrir menu"
          >
            <Menu size={18} />
          </button>
        )}

        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
          style={{ backgroundColor: activeProduct.accent }}
        >
          {activeProduct.name.slice(0, 2).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Central de Ajuda
          </p>
          <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
            {activeProduct.name}
          </p>
        </div>

        <Link
          to="/"
          className="hidden shrink-0 text-xs font-medium text-gray-400 hover:text-brand transition-colors sm:block"
        >
          Trocar produto
        </Link>
      </div>
    </div>
  );
}
