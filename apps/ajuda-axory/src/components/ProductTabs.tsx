import { cn } from '../lib/cn';
import type { Product } from '../types';

interface ProductTabsProps {
  products: Product[];
  activeId: string;
  onChange: (id: string) => void;
}

export default function ProductTabs({ products, activeId, onChange }: ProductTabsProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {products.map((product) => {
        const isActive = product.id === activeId;
        const isSoon = product.status === 'soon';

        return (
          <button
            key={product.id}
            onClick={() => !isSoon && onChange(product.id)}
            disabled={isSoon}
            className={cn(
              'relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
              isActive && !isSoon
                ? 'bg-white text-gray-900 shadow-md ring-1 ring-gray-200 dark:bg-gray-800 dark:text-white dark:ring-gray-700'
                : isSoon
                  ? 'bg-white/10 text-white/60 cursor-not-allowed'
                  : 'bg-white/15 text-white hover:bg-white/25 cursor-pointer'
            )}
          >
            <span
              className={cn(
                'h-2 w-2 rounded-full',
                isActive && !isSoon ? 'bg-brand' : isSoon ? 'bg-white/30' : 'bg-white/50'
              )}
            />
            {product.name}
            {isSoon && (
              <span className="ml-1 inline-flex items-center rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/70">
                Em breve
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
