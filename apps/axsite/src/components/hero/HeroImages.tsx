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

      {/* Imagem LCP otimizada - modo light COM BORDAS ARREDONDADAS */}
      <picture>
        <source
          srcSet="https://img.axory.com.br/insecure/rs:fill:800:600/q:80/plain/https://storage.axory.com.br/imagens-saas-sites/1783558363210-axsiteescuro.png@webp 800w,
                  https://img.axory.com.br/insecure/rs:fill:600:450/q:80/plain/https://storage.axory.com.br/imagens-saas-sites/1783558363210-axsiteescuro.png@webp 600w,
                  https://img.axory.com.br/insecure/rs:fill:400:300/q:80/plain/https://storage.axory.com.br/imagens-saas-sites/1783558363210-axsiteescuro.png@webp 400w"
          sizes="(max-width: 768px) 400px, (max-width: 1024px) 600px, 800px"
          type="image/webp"
        />
        <img
          src="https://img.axory.com.br/insecure/rs:fill:800:600/q:80/plain/https://storage.axory.com.br/imagens-saas-sites/1783558363210-axsiteescuro.png@png"
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
          srcSet="https://img.axory.com.br/insecure/rs:fill:800:600/q:80/plain/https://storage.axory.com.br/imagens-saas-sites/1783558454045-axsiteclaro2redondo.png@webp 800w,
                  https://img.axory.com.br/insecure/rs:fill:600:450/q:80/plain/https://storage.axory.com.br/imagens-saas-sites/1783558454045-axsiteclaro2redondo.png@webp 600w,
                  https://img.axory.com.br/insecure/rs:fill:400:300/q:80/plain/https://storage.axory.com.br/imagens-saas-sites/1783558454045-axsiteclaro2redondo.png@webp 400w"
          sizes="(max-width: 768px) 400px, (max-width: 1024px) 600px, 800px"
          type="image/webp"
        />
        <img
          src="https://img.axory.com.br/insecure/rs:fill:800:600/q:80/plain/https://storage.axory.com.br/imagens-saas-sites/1783558454045-axsiteclaro2redondo.png@png"
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
