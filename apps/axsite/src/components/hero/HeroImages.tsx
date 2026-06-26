import React from 'react';
import { motion } from 'framer-motion';

export function HeroImages() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative w-full contain-layout"
    >
      {/* Efeito de luz otimizado */}
      <div className="absolute inset-0 -inset-x-20 -inset-y-20 opacity-60">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/20 rounded-full blur-3xl will-change-transform"></div>
      </div>
      
      {/* Imagem LCP otimizada - modo light COM BORDAS ARREDONDADAS */}
      <picture>
        <source 
          srcSet="https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_auto:best,w_800,h_600,c_fill/v1751258417/axsiteescuro2redondoreduzido_nb0wdo.webp 800w,
                  https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_auto:best,w_600,h_450,c_fill/v1751258417/axsiteescuro2redondoreduzido_nb0wdo.webp 600w,
                  https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_auto:best,w_400,h_300,c_fill/v1751258417/axsiteescuro2redondoreduzido_nb0wdo.webp 400w" 
          sizes="(max-width: 768px) 400px, (max-width: 1024px) 600px, 800px"
          type="image/webp"
        />
        <img
          src="https://res.cloudinary.com/ducd9j4tx/image/upload/f_auto,q_auto:best,w_800,h_600,c_fill/v1751258417/axsiteescuro2redondoreduzido_nb0wdo.png"
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
          srcSet="https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_auto:best,w_800,h_600,c_fill/v1751258131/axsiteclaro2redondoreduzido_apfqbv.webp 800w,
                  https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_auto:best,w_600,h_450,c_fill/v1751258131/axsiteclaro2redondoreduzido_apfqbv.webp 600w,
                  https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_auto:best,w_400,h_300,c_fill/v1751258131/axsiteclaro2redondoreduzido_apfqbv.webp 400w" 
          sizes="(max-width: 768px) 400px, (max-width: 1024px) 600px, 800px"
          type="image/webp"
        />
        <img
          src="https://res.cloudinary.com/ducd9j4tx/image/upload/f_auto,q_auto:best,w_800,h_600,c_fill/v1751258131/axsiteclaro2redondoreduzido_apfqbv.png"
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