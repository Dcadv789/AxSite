import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function PaymentFeatures() {
  const { t } = useTranslation();

  const features = [
    t('paymentSolutions.features.items.allCards'),
    t('paymentSolutions.features.items.pix'),
    t('paymentSolutions.features.items.nfc'),
    t('paymentSolutions.features.items.battery'),
    t('paymentSolutions.features.items.touchScreen'),
    t('paymentSolutions.features.items.printer'),
    t('paymentSolutions.features.items.appManagement'),
    t('paymentSolutions.features.items.reports')
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8"
    >
      <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
        {t('paymentSolutions.features.title')}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"
          >
            <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0" />
            <span>{feature}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}