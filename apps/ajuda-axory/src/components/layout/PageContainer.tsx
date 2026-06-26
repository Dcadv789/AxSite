import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'main';
}

/** Mesmo alinhamento e largura máxima em todas as páginas (home e docs). */
export const pageContainerClass =
  'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

export default function PageContainer({
  children,
  className,
  as: Tag = 'div',
}: PageContainerProps) {
  return <Tag className={cn(pageContainerClass, className)}>{children}</Tag>;
}
