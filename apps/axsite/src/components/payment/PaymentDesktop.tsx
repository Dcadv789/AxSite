import React from 'react';
import { motion } from 'framer-motion';
import { PaymentBenefits } from './PaymentBenefits';
import { PaymentMachine } from './PaymentMachine';

export function PaymentDesktop() {
  const { benefits } = PaymentBenefits();

  return (
    <div className="hidden lg:grid grid-cols-12 gap-12 items-center">
      {/* Coluna esquerda - Benefícios */}
      <div className="col-span-4">
        <div className="space-y-6">
          {benefits.slice(0, 3).map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-white/20 transition-colors flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Coluna central - Imagem da máquina */}
      <div className="col-span-4 flex justify-center">
        <PaymentMachine />
      </div>

      {/* Coluna direita - Mais benefícios */}
      <div className="col-span-4">
        <div className="space-y-6">
          {benefits.slice(3, 6).map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-white/20 transition-colors flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}