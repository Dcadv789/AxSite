import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '../../lib/cn';

type Vote = 'yes' | 'no' | null;

export default function ArticleFeedback() {
  const [vote, setVote] = useState<Vote>(null);

  return (
    <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 py-8 px-6">
      {vote === null ? (
        <>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Este artigo foi útil?
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setVote('yes')}
              className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-brand hover:text-brand transition-colors"
            >
              <ThumbsUp size={15} />
              Sim, ajudou!
            </button>
            <button
              onClick={() => setVote('no')}
              className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-red-400 hover:text-red-500 transition-colors"
            >
              <ThumbsDown size={15} />
              Não muito
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full',
              vote === 'yes' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-100 dark:bg-red-900/30 text-red-500'
            )}
          >
            {vote === 'yes' ? <ThumbsUp size={18} /> : <ThumbsDown size={18} />}
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {vote === 'yes' ? 'Ótimo! Fico feliz em ter ajudado.' : 'Obrigado pelo feedback!'}
          </p>
          {vote === 'no' && (
            <p className="text-xs text-gray-500">
              Entre em contato com o suporte Axory se precisar de mais ajuda.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
