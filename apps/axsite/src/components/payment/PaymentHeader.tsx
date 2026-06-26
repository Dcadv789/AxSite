import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function PaymentHeader() {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <CreditCard className="w-6 h-6 text-blue-600 dark:text-white" />
          <h2 className="text-[20px] sm:text-[15px] font-bold text-gray-900 dark:text-white uppercase tracking-wide">
            {t('paymentSolutions.title')}
          </h2>
        </div>
        <p className="text-[24px] sm:text-[30px] text-gray-600 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
          {t('paymentSolutions.subtitle')}
        </p>
      </motion.div>
    </div>
  );
}