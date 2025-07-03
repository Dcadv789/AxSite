import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { PaymentHeader } from './payment/PaymentHeader';
import { PaymentDesktop } from './payment/PaymentDesktop';
import { PaymentMobile } from './payment/PaymentMobile';
import { PaymentFeatures } from './payment/PaymentFeatures';
import { PaymentCTA } from './payment/PaymentCTA';

export function PaymentSolutions() {
  return (
    <section id="solucoes-pagamento" className="pt-12 md:pt-16 pb-12 md:pb-16 bg-white dark:bg-gray-900 scroll-mt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PaymentHeader />
        <PaymentDesktop />
        <PaymentMobile />
        <PaymentFeatures />
        <PaymentCTA />
      </div>
    </section>
  );
}