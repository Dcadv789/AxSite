import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Carlos Silva",
    role: "CEO",
    company: "TechSolutions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
    content: "A DC Advisors transformou nossa gestão financeira completamente. A equipe demonstrou um profissionalismo excepcional e entregou resultados além das nossas expectativas.",
  },
  {
    id: 2,
    name: "Ana Beatriz",
    role: "Diretora Financeira",
    company: "InnovateX",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
    content: "Reduzimos custos em 25% em apenas 6 meses. A abordagem estratégica e personalizada fez toda a diferença para nosso negócio.",
  },
  {
    id: 3,
    name: "Ricardo Mendes",
    role: "Fundador",
    company: "StartupFlow",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop",
    content: "Equipe excepcional com conhecimento técnico impressionante. Cada sugestão implementada trouxe resultados mensuráveis para nossa empresa.",
  },
  {
    id: 4,
    name: "Mariana Costa",
    role: "CFO",
    company: "GrowthTech",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    content: "Melhor decisão que tomamos para nossa empresa. A DC Advisors não só melhorou nossos processos, mas também nos ajudou a crescer de forma sustentável.",
  },
  {
    id: 5,
    name: "Paulo Rodrigues",
    role: "Diretor de Operações",
    company: "FutureHub",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&auto=format&fit=crop",
    content: "A parceria com a DC Advisors foi transformadora. Conseguimos otimizar processos e aumentar nossa eficiência operacional significativamente.",
  }
];

export function Testimonials() {
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicamos os depoimentos para criar uma sequência contínua
  const displayTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];
  
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number;
    const speed = 0.5; // Velocidade mais suave
    const itemWidth = 408; // Largura de cada item (400px + 8px gap)
    const resetThreshold = -(testimonials.length * itemWidth); // Ponto de reset

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      
      if (!isPaused) {
        setPosition(prev => {
          let newPosition = prev - (speed * delta / 16);
          
          // Se passamos do ponto de reset, voltamos para a posição equivalente
          // no próximo conjunto, mantendo a continuidade visual
          if (newPosition < resetThreshold) {
            newPosition = newPosition + (testimonials.length * itemWidth);
          }
          
          return newPosition;
        });
      }
      
      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <section id="depoimentos" className="py-24 bg-gradient-to-b from-gray-50 to-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[20px] sm:text-[15px] font-bold text-gray-900 mb-6 uppercase tracking-wide">
              DEPOIMENTOS
            </h2>
            <p className="text-[24px] sm:text-[30px] text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              O que nossos clientes dizem sobre nós
            </p>
          </motion.div>
        </div>

        <div 
          className="relative overflow-hidden" 
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div 
            className="flex gap-8"
            style={{
              x: position,
              transition: 'none'
            }}
          >
            {displayTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="w-[400px] flex-shrink-0"
              >
                <div className="bg-white rounded-xl p-8 border-2 border-gray-100 shadow-[0_4px_20px_-4px_rgba(16,24,40,0.08)] h-[420px] flex flex-col">
                  <div className="mb-6">
                    <Quote className="w-12 h-12 text-blue-600" />
                  </div>
                  
                  <div className="flex-grow">
                    <p className="text-gray-700 text-lg leading-relaxed line-clamp-6">
                      {testimonial.content}
                    </p>
                  </div>

                  <div className="pt-8 mt-auto border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-100">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">
                          {testimonial.role} · {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}