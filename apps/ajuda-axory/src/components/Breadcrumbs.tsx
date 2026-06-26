import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
      <Link to="/" className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors">
        <Home size={13} />
        <span className="hidden sm:inline">Início</span>
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={13} className="text-gray-300 dark:text-gray-600" />
          {crumb.href && i < crumbs.length - 1 ? (
            <Link to={crumb.href} className="hover:text-gray-900 dark:hover:text-white transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-white font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
