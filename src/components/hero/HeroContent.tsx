import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HeroSocialLinks } from './HeroSocialLinks';
import { HeroStats } from './HeroStats';

export function HeroContent() {
  const { t } = useTranslation();

  const handleCtaClick = () => {
    window.open('https://wa.me/5511994561052?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20e%20quero%20agendar%20o%20diagn%C3%B3stico%20financeiro%20GRATUITO%20para%20minha%20empresa.', '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="flex flex-col h-full justify-between"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="w-full"
      >
        <h2 className="text-lg font-medium text-gray-200 dark:text-gray-300 mb-10 text-justify leading-relaxed">
          {t('hero.subtitle')}
        </h2>
      </motion.div>

      <div className="w-full">
        <div className="flex flex-col space-y-12">
          {/* Redes sociais abaixo do texto */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="w-full"
          >
            <HeroSocialLinks />
          </motion.div>

          {/* Stats em linha única */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="w-full"
          >
            <HeroStats />
          </motion.div>

          {/* Botão centralizado e maior */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="w-full flex justify-center"
          >
            <button
              onClick={handleCtaClick}
              className="bg-white hover:bg-gray-100 px-12 py-4 rounded-full text-[#0131FF] dark:text-gray-800 text-lg font-semibold transition-all duration-300 hover:shadow-lg shadow-md"
            >
              {t('hero.cta')}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}