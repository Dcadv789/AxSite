import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface HeroStatsProps {
  isMobile?: boolean;
}

export function HeroStats({ isMobile = false }: HeroStatsProps) {
  const { t } = useTranslation();

  // Componentes de ícones inline
  const WalletIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/>
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>
    </svg>
  );

  const TargetIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );

  const TrendingUpIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
      <polyline points="16,7 22,7 22,13"/>
    </svg>
  );

  const PercentIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="5" x2="5" y2="19"/>
      <circle cx="6.5" cy="6.5" r="2.5"/>
      <circle cx="17.5" cy="17.5" r="2.5"/>
    </svg>
  );

  const stats = [
    { icon: <WalletIcon />, label: '+2,5M', description: t('hero.stats.managed') },
    { icon: <TargetIcon />, label: '100%', description: t('hero.stats.focus') },
    { icon: <TrendingUpIcon />, label: '99%', description: t('hero.stats.satisfaction') },
    { icon: <PercentIcon />, label: '29%', description: t('hero.stats.savings') },
  ];

  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-3 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0 + (index * 0.1) }}
            className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-md border border-white/20"
          >
            <div className="h-6 w-6 text-white mb-2 flex items-center justify-center">
              {stat.icon}
            </div>
            <span className="text-lg font-semibold text-white">{stat.label}</span>
            <span className="text-sm text-gray-200 text-center">{stat.description}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 + (index * 0.1) }}
          className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-white/20"
        >
          <div className="h-5 w-5 text-white mb-1 flex items-center justify-center">
            {stat.icon}
          </div>
          <span className="text-base font-semibold text-white">{stat.label}</span>
          <span className="text-xs text-gray-200 text-center">{stat.description}</span>
        </motion.div>
      ))}
    </div>
  );
}