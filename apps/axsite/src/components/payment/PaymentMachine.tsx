import React from 'react';
import { motion } from 'framer-motion';

interface PaymentMachineProps {
  isMobile?: boolean;
}

export function PaymentMachine({ isMobile = false }: PaymentMachineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: isMobile ? 0 : 0.2 }}
      className="relative"
    >
      {/* Efeito de luz atrás da máquina */}
      <div className="absolute inset-0 -inset-x-8 -inset-y-8">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-[250px] h-[250px]' : 'w-[300px] h-[300px]'} bg-blue-500/20 dark:bg-white/20 rounded-full blur-3xl`}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-[150px] h-[150px]' : 'w-[200px] h-[200px]'} bg-blue-600/30 dark:bg-white/30 rounded-full blur-2xl`}></div>
      </div>
      
      <picture>
        <source 
          srcSet="https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_auto,w_280/v1751212557/maquininha1_qseydl.webp" 
          type="image/webp"
        />
        <img
          src="https://res.cloudinary.com/ducd9j4tx/image/upload/q_auto,w_280/v1751212557/maquininha1_qseydl.png"
          alt="Máquina de cartão AxPay - solução de pagamento moderna e eficiente"
          className={`w-full ${isMobile ? 'max-w-[200px]' : 'max-w-[280px]'} h-auto relative z-10 drop-shadow-2xl`}
          width={280}
          height={350}
          loading="lazy"
          decoding="async"
        />
      </picture>
      
      {/* Badge flutuante */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: isMobile ? 0.5 : 0.8 }}
        className={`absolute ${isMobile ? '-top-2 -right-2' : '-top-4 -right-4'} bg-green-500 text-white ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'} rounded-full font-medium shadow-lg z-20`}
      >
        Novo!
      </motion.div>
    </motion.div>
  );
}