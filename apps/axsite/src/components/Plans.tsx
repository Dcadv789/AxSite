import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Star, Crown, Diamond, Gem, ChevronLeft, ChevronRight, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Plans() {
  const { t } = useTranslation();
  const [isAnnual, setIsAnnual] = useState(false);
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);

  const plans = [
    {
      id: "silver",
      icon: Star,
      discount: 10,
      color: "gray",
      checkColor: "text-gray-400",
      whatsappLink: "https://wa.me/5511994561052?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20e%20me%20interessei%20pelo%20plano%20SILVER.%20Como%20voc%C3%AAs%20podem%20me%20ajudar?"
    },
    {
      id: "gold",
      icon: Gem,
      discount: 10,
      color: "yellow",
      checkColor: "text-yellow-600",
      whatsappLink: "https://wa.me/5511994561052?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20e%20me%20interessei%20pelo%20plano%20GOLD.%20Como%20voc%C3%AAs%20podem%20me%20ajudar?"
    },
    {
      id: "platinum",
      icon: Crown,
      discount: 15,
      color: "blue",
      popular: true,
      checkColor: "text-blue-600",
      whatsappLink: "https://wa.me/5511994561052?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20e%20me%20interessei%20pelo%20plano%20PLATINUM.%20Como%20voc%C3%AAs%20podem%20me%20ajudar?"
    },
    {
      id: "diamond",
      icon: Diamond,
      discount: 15,
      color: "purple",
      checkColor: "text-purple-600",
      whatsappLink: "https://wa.me/5511994561052?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20e%20me%20interessei%20pelo%20plano%20DIAMOND.%20Como%20voc%C3%AAs%20podem%20me%20ajudar?"
    }
  ];

  const nextPlan = () => {
    setCurrentPlanIndex((prev) => (prev === plans.length - 1 ? 0 : prev + 1));
  };

  const previousPlan = () => {
    setCurrentPlanIndex((prev) => (prev === 0 ? plans.length - 1 : prev - 1));
  };

  const handleDragStart = (event: any, info: PanInfo) => {
    setDragStart(info.point.x);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const dragDistance = info.point.x - dragStart;
    const dragThreshold = 50; // Distância mínima para considerar como swipe

    if (Math.abs(dragDistance) > dragThreshold) {
      if (dragDistance > 0) {
        previousPlan();
      } else {
        nextPlan();
      }
    }
  };

  return (
    <section id="planos" className="pt-12 md:pt-16 pb-12 md:pb-16 scroll-mt-16 relative">
      {/* BG 1 - Fundo dividido (por baixo) - APENAS NO DARK MODE */}
      <div className="absolute inset-0 hidden dark:block">
        <div className="h-1/2 bg-gray-800"></div>
        <div className="h-1/2 bg-gray-900"></div>
      </div>
      
      {/* BG 1 - Fundo branco (por baixo) - APENAS NO LIGHT MODE */}
      <div className="absolute inset-0 block dark:hidden bg-white"></div>
      
      {/* BG 2 - Fundo escuro com bordas arredondadas (por cima) */}
      <div className="absolute inset-0 bg-gray-900 dark:bg-gray-100 rounded-t-[2rem] md:rounded-t-[3rem] rounded-b-[2rem] md:rounded-b-[3rem] transition-colors duration-300"></div>
      
      {/* Conteúdo da seção */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 text-white dark:text-blue-400" />
              <h2 className="text-[20px] sm:text-[15px] font-bold text-white dark:text-gray-900 uppercase tracking-wide">
                PLANOS DA AXORY
              </h2>
            </div>
            <p className="text-[24px] sm:text-[30px] text-gray-200 dark:text-gray-700 max-w-3xl mx-auto leading-relaxed font-light mb-8">
              {t('plans.subtitle')}
            </p>

            <div className="flex items-center justify-center">
              <div className="relative bg-white dark:bg-white rounded-full p-1 flex items-center w-[228px]">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`relative z-10 w-[110px] py-2 text-sm font-medium transition-colors duration-200 rounded-full ${
                    !isAnnual ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {t('plans.billing.monthly')}
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`relative z-10 w-[110px] py-2 text-sm font-medium transition-colors duration-200 rounded-full ${
                    isAnnual ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {t('plans.billing.annual')}
                </button>
                <div
                  className={`absolute inset-y-1 w-[108px] bg-blue-600 dark:bg-blue-500 rounded-full transition-transform duration-200 ${
                    isAnnual ? 'translate-x-[109px]' : 'translate-x-0.5'
                  }`}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Versão Mobile */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden px-6">
            <AnimatePresence mode="wait">
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                const isPopular = plan.popular;

                if (index !== currentPlanIndex) return null;

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    className="relative touch-pan-x"
                  >
                    <div className="relative">
                      <div 
                        className={`h-full rounded-2xl p-8 mt-4
                          ${isPopular 
                            ? 'bg-[#0131FF] dark:bg-blue-600 shadow-xl shadow-blue-500/20' 
                            : 'bg-white dark:bg-white border-2 border-gray-100 shadow-lg'
                          }
                        `}
                      >
                        {isPopular && (
                          <motion.div 
                            className={`absolute -top-3 z-20 ${
                              isAnnual ? 'left-4' : 'left-1/2 -translate-x-1/2'
                            }`}
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <span className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
                              {t('plans.popular')}
                            </span>
                          </motion.div>
                        )}

                        {isAnnual && (
                          <motion.div 
                            className="absolute -top-3 right-4 z-10"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                              {plan.discount}% {t('plans.discount')}
                            </span>
                          </motion.div>
                        )}

                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                            ${isPopular 
                              ? 'bg-white/20' 
                              : plan.color === 'gray' ? 'bg-gray-100' : 
                                plan.color === 'yellow' ? 'bg-yellow-100' :
                                plan.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'
                            }
                          `}>
                            <Icon className={`w-6 h-6
                              ${isPopular 
                                ? 'text-white' 
                                : plan.color === 'gray' ? 'text-gray-600' :
                                  plan.color === 'yellow' ? 'text-yellow-600' :
                                  plan.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                              }
                            `} />
                          </div>
                          <h3 className={`text-xl font-semibold ${isPopular ? 'text-white' : 'text-gray-900'}`}>
                            {t(`plans.${plan.id}.name`)}
                          </h3>
                        </div>

                        <div className="mb-6 h-12">
                          <p className={`text-sm leading-tight ${isPopular ? 'text-gray-200' : 'text-gray-600'}`}>
                            {t(`plans.${plan.id}.description`)}
                          </p>
                        </div>

                        <ul className="space-y-4 mb-8 min-h-[280px]">
                          {t(`plans.${plan.id}.features`, { returnObjects: true }).map((feature: string, featureIndex: number) => (
                            <li key={featureIndex} className="flex items-start gap-3">
                              <span className={`${isPopular ? 'text-gray-200' : 'text-gray-600'}`}>
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <a 
                          href={plan.whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block w-full py-3 px-6 rounded-full font-medium transition-all duration-300 text-center hover:scale-105
                            ${isPopular 
                              ? 'bg-white text-blue-600 hover:bg-gray-100' 
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                            }
                          `}
                        >
                          {t('plans.cta')}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button
            onClick={previousPlan}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextPlan}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Indicadores de página */}
          <div className="flex justify-center gap-2 mt-6">
            {plans.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPlanIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPlanIndex ? 'bg-blue-600 w-4' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Versão Desktop */}
        <div className="hidden lg:grid grid-cols-4 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isPopular = plan.popular;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${isPopular ? 'lg:-mt-8' : ''}`}
              >
                {isPopular && (
                  <motion.div 
                    className={`absolute -top-5 ${isAnnual ? 'left-4' : 'left-1/2 -translate-x-1/2'} z-20`}
                  >
                    <span className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                      {t('plans.popular')}
                    </span>
                  </motion.div>
                )}

                {isAnnual && (
                  <div className="absolute -top-5 right-4 z-10">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {plan.discount}% {t('plans.discount')}
                    </span>
                  </div>
                )}

                <div 
                  className={`h-full rounded-2xl p-8
                    ${isPopular 
                      ? 'bg-[#0131FF] dark:bg-blue-600 shadow-xl shadow-blue-500/20' 
                      : 'bg-white dark:bg-white border-2 border-gray-100 shadow-lg'
                    }
                  `}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                      ${isPopular 
                        ? 'bg-white/20' 
                        : plan.color === 'gray' ? 'bg-gray-100' : 
                          plan.color === 'yellow' ? 'bg-yellow-100' :
                          plan.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'
                      }
                    `}>
                      <Icon className={`w-6 h-6
                        ${isPopular 
                          ? 'text-white' 
                          : plan.color === 'gray' ? 'text-gray-600' :
                            plan.color === 'yellow' ? 'text-yellow-600' :
                            plan.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                        }
                      `} />
                    </div>
                    <h3 className={`text-xl font-semibold ${isPopular ? 'text-white' : 'text-gray-900'}`}>
                      {t(`plans.${plan.id}.name`)}
                    </h3>
                  </div>

                  <div className="mb-6 h-12">
                    <p className={`text-sm leading-tight ${isPopular ? 'text-gray-200' : 'text-gray-600'}`}>
                      {t(`plans.${plan.id}.description`)}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8 min-h-[280px]">
                    {t(`plans.${plan.id}.features`, { returnObjects: true }).map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <span className={`${isPopular ? 'text-gray-200' : 'text-gray-600'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a 
                    href={plan.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-3 px-6 rounded-full font-medium transition-all duration-300 text-center hover:scale-105
                      ${isPopular 
                        ? 'bg-white text-blue-600 hover:bg-gray-100' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                      }
                    `}
                  >
                    {t('plans.cta')}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}