import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, FileQuestion, DollarSign, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ChallengesListProps {
  isMobile?: boolean;
}

export function ChallengesList({ isMobile = false }: ChallengesListProps) {
  const { t } = useTranslation();

  const challenges = [
    {
      icon: TrendingDown,
      title: t('challenges.items.results.title'),
      question: t('challenges.items.results.question')
    },
    {
      icon: FileQuestion,
      title: t('challenges.items.disorganization.title'),
      question: t('challenges.items.disorganization.question')
    },
    {
      icon: DollarSign,
      title: t('challenges.items.cashflow.title'),
      question: t('challenges.items.cashflow.question')
    },
    {
      icon: Target,
      title: t('challenges.items.decisions.title'),
      question: t('challenges.items.decisions.question')
    }
  ];

  return (
    <div className={`space-y-${isMobile ? '4' : '6'}`}>
      {challenges.map((challenge, index) => {
        const Icon = challenge.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: index * 0.1 + (isMobile ? 0 : 0.3) }}
            className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-gray-200 dark:border-gray-600 group hover:-translate-y-1"
          >
            <div className={`flex items-center gap-${isMobile ? '4' : '6'}`}>
              <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors flex-shrink-0`}>
                <Icon className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-blue-600 dark:text-blue-400`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-[${isMobile ? '16px' : '18px'}] font-semibold text-gray-900 dark:text-white mb-2`}>
                  {challenge.title}
                </h3>
                <p className={`text-[${isMobile ? '14px' : '16px'}] text-gray-600 dark:text-gray-300 leading-relaxed`}>
                  {challenge.question}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}