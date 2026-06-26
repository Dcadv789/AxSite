import type { ElementType } from 'react';
import { Link } from 'react-router-dom';
import {
  Rocket, LayoutDashboard, Briefcase, Wallet, BarChart3,
  Database, Settings2, Zap, Layers, Users, ShieldCheck, ChevronRight,
  Scale, MessageCircle, BookOpen, Headphones, Share2, Plug, Code2,
  HelpCircle, History, Bot, Sparkles, Megaphone,
} from 'lucide-react';
import { cn } from '../lib/cn';
import type { Collection } from '../types';
import { articles } from '../data/articles';

const iconMap: Record<string, ElementType> = {
  Rocket, LayoutDashboard, Briefcase, Wallet, BarChart3,
  Database, Settings2, Zap, Layers, Users, ShieldCheck,
  Scale, MessageCircle, BookOpen, Headphones, Share2, Plug, Code2,
  HelpCircle, History, Bot, Sparkles, Megaphone,
};

interface CollectionCardProps {
  collection: Collection;
  className?: string;
}

export default function CollectionCard({ collection, className }: CollectionCardProps) {
  const Icon = iconMap[collection.icon] ?? Rocket;
  const count = articles.filter((a) => a.collectionId === collection.id).length;

  return (
    <Link
      to={`/c/${collection.slug}`}
      className={cn(
        'group flex flex-col gap-4 rounded-2xl border border-gray-200 dark:border-gray-800',
        'bg-white dark:bg-gray-900 p-6 hover:border-brand/40 hover:shadow-md',
        'transition-all duration-200 hover:-translate-y-0.5',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand">
          <Icon size={22} />
        </div>
        <ChevronRight
          size={16}
          className="text-gray-300 dark:text-gray-600 group-hover:text-brand group-hover:translate-x-0.5 transition-all mt-1"
        />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-base leading-snug">
          {collection.title}
        </h3>
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {collection.description}
        </p>
      </div>
      <div className="mt-auto pt-1">
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
          {count} {count === 1 ? 'artigo' : 'artigos'}
        </span>
      </div>
    </Link>
  );
}
