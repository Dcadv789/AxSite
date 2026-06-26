import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCounterLogic } from './challenges/CounterLogic';
import { CounterDisplay } from './challenges/CounterDisplay';
import { ProgressiveMessage } from './challenges/ProgressiveMessage';
import { ChallengesList } from './challenges/ChallengesList';

export function Challenges() {
  const { t } = useTranslation();
  const { counter, hasFinished, sectionRef } = useCounterLogic();

  const handleCtaClick = () => {
    window.open('https://wa.me/5511994561052?text=Ol%C3%A1!%20Passei%20por%20alguns%20desafios%20que%20vi%20no%20site%20e%20quero%20resolver%20os%20problemas%20financeiros%20da%20minha%20empresa.', '_blank');
  };

  return (
    <section 
      ref={sectionRef}
      id="desafios" 
      className="pt-12 md:pt-16 pb-12 md:pb-16 bg-gray-100 dark:bg-gray-900 scroll-mt-16 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[20px] sm:text-[15px] font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wide">
            {t('challenges.title')}
          </h2>
          <p className="text-[24px] sm:text-[30px] text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            {t('challenges.subtitle')}
          </p>
        </div>

        {/* Layout Desktop */}
        <div className="hidden lg:grid grid-cols-2 gap-16 items-start mb-12">
          {/* Coluna Esquerda - Contador Regressivo Moderno */}
          <div className="flex flex-col items-center justify-center min-h-[600px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center sticky top-24"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {t('challenges.counterTitle')}
              </h3>
              
              <CounterDisplay counter={counter} hasFinished={hasFinished} />
              <ProgressiveMessage counter={counter} hasFinished={hasFinished} />
            </motion.div>
          </div>

          {/* Coluna Direita - Desafios */}
          <div className="min-h-[600px] flex items-center">
            <ChallengesList />
          </div>
        </div>

        {/* Layout Mobile */}
        <div className="lg:hidden">
          {/* Contador Mobile */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center w-full max-w-sm"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {t('challenges.counterTitle')}
              </h3>
              
              <CounterDisplay counter={counter} hasFinished={hasFinished} isMobile />
              <ProgressiveMessage counter={counter} hasFinished={hasFinished} isMobile />
            </motion.div>
          </div>

          {/* Desafios Mobile */}
          <ChallengesList isMobile />
        </div>

        <div className="mt-12 text-center">
          <motion.div
            initial={false}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block w-full lg:w-auto"
          >
            <button 
              onClick={handleCtaClick}
              className="bg-blue-600 dark:bg-blue-500 md:bg-gray-900 md:dark:bg-gray-700 md:hover:bg-blue-600 md:dark:hover:bg-blue-500 px-8 py-3 rounded-full text-white text-base font-medium transition-all duration-300 w-full lg:w-auto"
            >
              {t('challenges.cta')}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}