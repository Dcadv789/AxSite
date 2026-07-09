import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HeroSocialLinks } from './HeroSocialLinks';
import { HeroStats } from './HeroStats';

export function HeroMobile() {
  const { t } = useTranslation();

  const handleCtaClick = () => {
    window.open('https://wa.me/5511994561052?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20e%20quero%20agendar%20o%20diagn%C3%B3stico%20financeiro%20GRATUITO%20para%20minha%20empresa.', '_blank');
  };

  return (
    <motion.div
      initial={false}
      className="md:hidden px-4 pt-12 pb-6 contain-layout"
    >
      <div className="text-center space-y-8">
        <motion.div initial={false}>
          <h1 className="text-4xl font-medium tracking-tight text-white leading-tight mb-4">
            {t('hero.title')}
          </h1>
        </motion.div>

        <motion.div initial={false}>
          <p className="text-lg text-gray-200 dark:text-gray-300 text-justify leading-relaxed px-2">
            {t('hero.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={false}
          className="relative contain-paint"
        >
          {/* Efeito de luz mobile otimizado */}
          <div className="absolute inset-0 -inset-x-12 -inset-y-12 opacity-40">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-white/20 rounded-full blur-3xl will-change-transform"></div>
          </div>
          
          {/* Imagem LCP mobile otimizada - modo light COM BORDAS ARREDONDADAS */}
          <picture>
            <source 
              srcSet="/hero/light-400.webp 400w, /hero/light-300.webp 300w"
              sizes="(max-width: 480px) 300px, 400px"
              type="image/webp"
            />
            <img
              src="/hero/light-400.webp"
              alt="Banner ilustrativo da Axory mostrando gestão financeira digital"
              className="w-full h-auto relative z-10 block dark:hidden hero-image rounded-3xl"
              width={400}
              height={300}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />
          </picture>
          
          {/* Imagem modo dark mobile COM BORDAS ARREDONDADAS */}
          <picture>
            <source 
              srcSet="/hero/dark-400.webp 400w, /hero/dark-300.webp 300w"
              sizes="(max-width: 480px) 300px, 400px"
              type="image/webp"
            />
            <img
              src="/hero/dark-400.webp"
              alt="Banner ilustrativo da Axory mostrando gestão financeira digital"
              className="w-full h-auto relative z-10 hidden dark:block hero-image rounded-3xl"
              width={400}
              height={300}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />
          </picture>
        </motion.div>

        <motion.div initial={false}>
          <HeroSocialLinks isMobile />
        </motion.div>

        <motion.div initial={false}>
          <HeroStats isMobile />
        </motion.div>

        <motion.div initial={false}>
          <button
            onClick={handleCtaClick}
            className="w-full bg-white hover:bg-gray-100 py-4 px-8 rounded-full text-[#0131FF] dark:text-gray-800 text-lg font-semibold transition-all duration-300 hover:shadow-lg shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            aria-label="Agendar diagnóstico financeiro gratuito"
          >
            {t('hero.cta')}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}