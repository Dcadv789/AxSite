import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LazyImage } from '../LazyImage';
import { HeroTitle } from './HeroTitle';
import { HeroContent } from './HeroContent';
import { HeroImages } from './HeroImages';

export function HeroDesktop() {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="hidden md:block relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 sm:pt-24 sm:pb-28"
    >
      <HeroTitle />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="grid grid-cols-12 gap-8"
      >
        <div className="col-span-12 lg:col-span-7 flex items-end">
          <HeroImages />
        </div>

        <div className="col-span-12 lg:col-span-5">
          <HeroContent />
        </div>
      </motion.div>
    </motion.div>
  );
}