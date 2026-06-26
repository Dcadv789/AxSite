import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface OptimizedMotionProps extends MotionProps {
  children: React.ReactNode;
  reduceMotion?: boolean;
}

export function OptimizedMotion({ 
  children, 
  reduceMotion = false,
  ...props 
}: OptimizedMotionProps) {
  // Detecta preferência de movimento reduzido
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  if (prefersReducedMotion || reduceMotion) {
    return <div {...(props as any)}>{children}</div>;
  }

  return (
    <motion.div
      {...props}
      style={{
        willChange: 'transform, opacity',
        ...props.style,
      }}
    >
      {children}
    </motion.div>
  );
}