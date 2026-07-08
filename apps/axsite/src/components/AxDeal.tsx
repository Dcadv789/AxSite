import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, LayoutDashboard, Wallet, ShoppingCart, BarChart3, Boxes } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GTMEvents } from '../utils/gtm';

// URL canônica do ERP AXDEAL (subdomínio próprio).
// IMPORTANTE p/ SEO: link <a href> real e estático, URL completa com https:// e barra
// final, âncora descritiva, sem rel="nofollow" e sem redirecionamento intermediário.
const AXDEAL_URL = 'https://axdeal.axory.com.br/';

export function AxDeal() {
  const { t } = useTranslation();

  const features = [
    { icon: ShoppingCart, label: t('axdeal.features.commercial') },
    { icon: Wallet, label: t('axdeal.features.financial') },
    { icon: BarChart3, label: t('axdeal.features.results') },
    { icon: LayoutDashboard, label: t('axdeal.features.dashboard') },
  ];

  return (
    <section
      id="axdeal"
      className="pt-12 md:pt-16 pb-12 md:pb-16 bg-[#FAFAFA] dark:bg-gray-800 scroll-mt-16 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-blue-600 dark:bg-blue-700 px-6 py-12 md:px-14 md:py-16 shadow-xl"
        >
          {/* Detalhe decorativo */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-white/5 blur-2xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            {/* Texto */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white text-xs font-semibold uppercase tracking-wider px-4 py-1.5 mb-6">
                <Boxes className="w-4 h-4" />
                {t('axdeal.badge')}
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                {t('axdeal.title')}
              </h2>

              <p className="text-base md:text-lg text-blue-50 leading-relaxed mb-8 max-w-xl">
                {t('axdeal.description')}
              </p>

              {/* CTA — link real e estático para o subdomínio do AXDEAL */}
              <a
                href={AXDEAL_URL}
                title="AXDEAL — ERP da Axory Capital Group"
                target="_blank"
                rel="noopener"
                onClick={() => GTMEvents.ctaClick('Acessar AXDEAL', 'AxDeal Section')}
                className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-8 py-3.5 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                {t('axdeal.cta')}
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>

            {/* Recursos */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    className="flex flex-col gap-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-5"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                    <span className="text-sm font-medium text-white leading-snug">
                      {feature.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
