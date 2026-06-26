import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function HeroTitle() {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.1]">
          {t('hero.title')}
        </h1>
      </motion.div>
    </div>
  );
}