import React from 'react';
import { motion } from 'framer-motion';

export function HeroImages() {
  return (
    <motion.div
      initial={false}
      className="relative w-full contain-layout"
    >
      {/* Efeito de luz otimizado */}
      <div className="absolute inset-0 -inset-x-20 -inset-y-20 opacity-60">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/20 rounded-full blur-3xl will-change-transform"></div>
      </div>

      {/* Imagem LCP servida pelo MESMO domínio (public/hero) para o navegador
          reaproveitar a conexão do HTML e o LCP não pagar a abertura de conexão
          com outro domínio. */}
      <picture>
        <source
          srcSet="/hero/light-800.webp 800w, /hero/light-600.webp 600w, /hero/light-400.webp 400w"
          sizes="(max-width: 768px) 400px, (max-width: 1024px) 600px, 800px"
          type="image/webp"
        />
        <img
          src="/hero/light-800.webp"
          alt="Banner ilustrativo da Axory mostrando gestão financeira digital"
          className="w-full h-auto relative z-10 block dark:hidden hero-image rounded-3xl"
          width={800}
          height={600}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
      </picture>

      {/* Imagem modo dark COM BORDAS ARREDONDADAS */}
      <picture>
        <source
          srcSet="/hero/dark-800.webp 800w, /hero/dark-600.webp 600w, /hero/dark-400.webp 400w"
          sizes="(max-width: 768px) 400px, (max-width: 1024px) 600px, 800px"
          type="image/webp"
        />
        <img
          src="/hero/dark-800.webp"
          alt="Banner ilustrativo da Axory mostrando gestão financeira digital"
          className="w-full h-auto relative z-10 hidden dark:block hero-image rounded-3xl"
          width={800}
          height={600}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
      </picture>
    </motion.div>
  );
}
