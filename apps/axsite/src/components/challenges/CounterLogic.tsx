import { useState, useEffect, useRef } from 'react';

export function useCounterLogic() {
  const [counter, setCounter] = useState(10000); // Começa em +10 mil
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer mais rigoroso para aguardar scroll adequado
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Só inicia quando pelo menos 50% da seção está visível no mobile, 60% no desktop
        const threshold = window.innerWidth < 768 ? 0.5 : 0.6;
        
        if (entry.isIntersecting && entry.intersectionRatio >= threshold && !hasStarted) {
          // Delay menor no mobile para melhor experiência
          const delay = window.innerWidth < 768 ? 500 : 1000;
          
          setTimeout(() => {
            setIsVisible(true);
            setHasStarted(true);
          }, delay);
        }
      },
      { 
        threshold: [0.3, 0.4, 0.5, 0.6, 0.7, 0.8], // Múltiplos thresholds para maior precisão
        rootMargin: window.innerWidth < 768 ? '-20px 0px -20px 0px' : '-50px 0px -50px 0px' // Margem menor no mobile
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Contador regressivo com timing preciso - 30 segundos total (7,5s por estágio)
  useEffect(() => {
    if (!isVisible || hasFinished) return;

    const interval = setInterval(() => {
      setCounter(prev => {
        // TIMING PRECISO PARA 7,5 SEGUNDOS POR ESTÁGIO:
        // Estágio 1: +10.000 até +2.500 = 7.500 de diferença em 7,5s
        // Estágio 2: +2.500 até -250.000 = 252.500 de diferença em 7,5s  
        // Estágio 3: -250.000 até -625.000 = 375.000 de diferença em 7,5s
        // Estágio 4: -625.000 até -1.000.000 = 375.000 de diferença em 7,5s
        
        let decrement;
        
        if (prev > 2500) {
          // Estágio 1: 7.500 ÷ (7,5s × 20 intervalos/s) = 50 por intervalo
          decrement = 50;
        } else if (prev > -250000) {
          // Estágio 2: 252.500 ÷ (7,5s × 20 intervalos/s) = 1.683 por intervalo
          decrement = 1683;
        } else if (prev > -625000) {
          // Estágio 3: 375.000 ÷ (7,5s × 20 intervalos/s) = 2.500 por intervalo
          decrement = 2500;
        } else {
          // Estágio 4: 375.000 ÷ (7,5s × 20 intervalos/s) = 2.500 por intervalo
          decrement = 2500;
        }
        
        const newValue = prev - decrement;
        
        // Para quando chegar em -1 milhão
        if (newValue <= -1000000) {
          setHasFinished(true);
          return -1000000;
        }
        
        return newValue;
      });
    }, 50); // Intervalo de 50ms = 20 vezes por segundo

    return () => clearInterval(interval);
  }, [isVisible, hasFinished]);

  return {
    counter,
    hasFinished,
    sectionRef
  };
}