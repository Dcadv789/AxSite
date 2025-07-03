import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function PaymentCTA() {
  const { t } = useTranslation();

  const handleCtaClick = () => {
    window.open('https://wa.me/5511994561052?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20e%20quero%20saber%20mais%20sobre%20as%20m%C3%A1quinas%20de%20cart%C3%A3o%20da%20Axory.', '_blank');
  };

  return (
    <div className="mt-12 text-center">
      <motion.div
        initial={false}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block"
      >
        <button 
          onClick={handleCtaClick}
          className="bg-blue-600 dark:bg-white hover:bg-blue-700 dark:hover:bg-gray-100 px-12 py-4 rounded-full text-white dark:text-gray-900 text-lg font-medium transition-all duration-300 hover:shadow-xl shadow-lg"
        >
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5" />
            {t('paymentSolutions.cta')}
          </div>
        </button>
      </motion.div>
      
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {t('paymentSolutions.ctaSubtext')}
      </p>
    </div>
  );
}