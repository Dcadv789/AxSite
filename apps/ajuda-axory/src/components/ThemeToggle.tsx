import { Moon, Sun } from 'lucide-react';
import { useThemeContext } from '../contexts/ThemeContext';
import { cn } from '../lib/cn';

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useThemeContext();

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg',
        'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
        'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
        className
      )}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
