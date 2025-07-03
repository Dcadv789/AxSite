import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HeroDesktop } from './hero/HeroDesktop';
import { HeroMobile } from './hero/HeroMobile';

const Hero = memo(() => {
  const { t } = useTranslation();

  return (
    <section id="inicio" className="hero-section scroll-mt-16 contain-layout">
      {/* BG 1 - Fundo inteiro bg-gray-900 (por baixo) - APENAS NO DARK MODE */}
      <div className="absolute inset-0 hidden dark:block bg-gray-900"></div>
      
      {/* BG 2 - Fundo com cor e bordas arredondadas (por cima) */}
      <div className="hero-bg"></div>
      
      {/* Conteúdo da seção */}
      <div className="relative z-10">
        <HeroDesktop />
        <HeroMobile />
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export { Hero };