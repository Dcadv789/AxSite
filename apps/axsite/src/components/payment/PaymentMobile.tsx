import React from 'react';
import { motion } from 'framer-motion';
import { PaymentBenefits } from './PaymentBenefits';
import { PaymentMachine } from './PaymentMachine';

export function PaymentMobile() {
  const { benefits } = PaymentBenefits();

  return (
    <div className="lg:hidden">
      {/* Imagem da máquina */}
      <div className="flex justify-center mb-12">
        <PaymentMachine isMobile />
      </div>

      {/* Benefícios em grid mobile */}
      <div className="grid grid-cols-1 gap-6 mb-12">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-white/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-blue-600 dark:text-white" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}