import React from 'react';
import { BarChart as ChartBar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function Scenario() {
  const { t } = useTranslation();

  const handleCtaClick = () => {
    window.open('https://wa.me/5511994561052?text=Ol%C3%A1,%20n%C3%A3o%20quero%20fazer%20parte%20das%20estat%C3%ADsticas%20negativa%20sobre%20empresas%20no%20Brasil.%20Quero%20resolver%20os%20problemas%20financeiros%20da%20minha%20empresa.', '_blank');
  };

  const failureReasons = [
    { reason: t('scenario.reasons.taxes'), percentage: 31 },
    { reason: t('scenario.reasons.sales'), percentage: 29 },
    { reason: t('scenario.reasons.financial'), percentage: 25 },
    { reason: t('scenario.reasons.management'), percentage: 25 },
    { reason: t('scenario.reasons.opportunity'), percentage: 13 },
    { reason: t('scenario.reasons.employees'), percentage: 12 },
    { reason: t('scenario.reasons.bureaucracy'), percentage: 10 },
    { reason: t('scenario.reasons.personal'), percentage: 5 },
    { reason: t('scenario.reasons.location'), percentage: 4 },
    { reason: t('scenario.reasons.others'), percentage: 3 },
    { reason: t('scenario.reasons.time'), percentage: 3 },
    { reason: t('scenario.reasons.force'), percentage: 3 },
    { reason: t('scenario.reasons.support'), percentage: 2 }
  ];

  // Dividir os motivos em duas colunas
  const firstColumnReasons = failureReasons.slice(0, 7); // Primeiros 7 itens
  const secondColumnReasons = failureReasons.slice(7); // Últimos 6 itens

  return (
    <section id="cenario" className="pt-12 md:pt-16 pb-12 md:pb-16 bg-[#FAFAFA] dark:bg-gray-800 scroll-mt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[20px] sm:text-[15px] font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wide">
            {t('scenario.title')}
          </h2>
          <p className="text-[24px] sm:text-[30px] text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light mb-4">
            {t('scenario.subtitle')}
          </p>
          <h3 className="text-[20px] font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-6">
            {t('scenario.failureTitle')}
          </h3>
        </div>

        {/* Layout Mobile */}
        <div className="lg:hidden">
          <div className="space-y-3 mb-8">
            {failureReasons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[15px] text-gray-700 dark:text-gray-300 font-medium">
                    {item.reason}
                  </span>
                  <span className="text-[15px] text-blue-600 dark:text-blue-400 font-semibold">
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mb-8">
            <p className="text-[12px] text-gray-500 dark:text-gray-400 italic">{t('scenario.source')}</p>
          </div>

          <div className="flex justify-center">
            <motion.div
              initial={false}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block w-full lg:w-auto"
            >
              <button 
                onClick={handleCtaClick}
                className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 px-8 py-3 rounded-full text-white text-base font-medium transition-all duration-300 hover:shadow-lg w-full lg:w-auto"
              >
                {t('scenario.cta')}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Layout Desktop - Duas Colunas */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 gap-12 mb-8">
            {/* Coluna da Esquerda - Primeiros 7 itens */}
            <div className="space-y-3">
              {firstColumnReasons.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[15px] text-gray-700 dark:text-gray-300 font-medium">
                      {item.reason}
                    </span>
                    <span className="text-[15px] text-blue-600 dark:text-blue-400 font-semibold">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Coluna da Direita - Últimos 6 itens */}
            <div className="space-y-3">
              {secondColumnReasons.map((item, index) => (
                <motion.div
                  key={index + 7}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index + 7) * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[15px] text-gray-700 dark:text-gray-300 font-medium">
                      {item.reason}
                    </span>
                    <span className="text-[15px] text-blue-600 dark:text-blue-400 font-semibold">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: (index + 7) * 0.1 }}
                      className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fonte */}
          <div className="mb-8">
            <p className="text-[12px] text-gray-500 dark:text-gray-400 italic text-center">{t('scenario.source')}</p>
          </div>

          {/* Botão centralizado entre as colunas */}
          <div className="flex justify-center">
            <motion.div
              initial={false}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button 
                onClick={handleCtaClick}
                className="bg-gray-900 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-blue-500 px-8 py-3 rounded-full text-white text-base font-medium transition-all duration-300 hover:shadow-lg"
              >
                {t('scenario.cta')}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}