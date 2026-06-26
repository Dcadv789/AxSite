import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PiggyBank,
  BarChart3,
  FolderKanban,
  Hourglass,
  Shield,
  HeartHandshake,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export function Benefits() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(t('benefits.items.savings.title'));
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const handleCtaClick = () => {
    window.open('https://wa.me/5511994561052?text=Ol%C3%A1,%20quero%20os%20benef%C3%ADcios%20que%20encontrei%20no%20site%20para%20a%20minha%20empresa.%20O%20que%20preciso?', '_blank');
  };

  const benefits = [
    {
      icon: PiggyBank,
      title: t('benefits.items.savings.title'),
      description: t('benefits.items.savings.description')
    },
    {
      icon: BarChart3,
      title: t('benefits.items.control.title'),
      description: t('benefits.items.control.description')
    },
    {
      icon: FolderKanban,
      title: t('benefits.items.organization.title'),
      description: t('benefits.items.organization.description')
    },
    {
      icon: Hourglass,
      title: t('benefits.items.time.title'),
      description: t('benefits.items.time.description')
    },
    {
      icon: Shield,
      title: t('benefits.items.security.title'),
      description: t('benefits.items.security.description')
    },
    {
      icon: HeartHandshake,
      title: t('benefits.items.support.title'),
      description: t('benefits.items.support.description')
    }
  ];

  const toggleItem = (title: string) => {
    setOpenItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <section id="beneficios" className="pt-12 md:pt-16 pb-12 md:pb-16 bg-gray-100 dark:bg-gray-900 scroll-mt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[20px] sm:text-[15px] font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wide">
              {t('benefits.title')}
            </h2>
            <p className="text-[24px] sm:text-[30px] text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              {t('benefits.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Versão Mobile */}
        <div className="lg:hidden space-y-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(benefit.title)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{benefit.title}</span>
                  </div>
                  <svg
                    className={cn(
                      "w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200",
                      openItems[benefit.title] ? "rotate-180" : ""
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {openItems[benefit.title] && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                        {benefit.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Versão Desktop */}
        <div className="hidden lg:flex flex-col items-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Lista de benefícios na lateral esquerda */}
              <TabsList className="lg:col-span-4 flex lg:flex-col bg-transparent p-0 h-full">
                {benefits.map((benefit) => (
                  <TabsTrigger
                    key={benefit.title}
                    value={benefit.title}
                    className="group relative w-full flex items-center gap-3 p-4 justify-start text-lg text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors data-[state=active]:bg-transparent data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-none"
                  >
                    {React.createElement(benefit.icon, {
                      className: "w-6 h-6 transition-colors group-data-[state=active]:text-blue-600 dark:group-data-[state=active]:text-blue-400"
                    })}
                    <span className="font-medium">{benefit.title}</span>
                    <div className="absolute right-0 top-0 bottom-0 w-[3px]">
                      <div className="h-full w-full bg-gray-200 dark:bg-gray-600" />
                      <div className="absolute inset-0 bg-blue-600 dark:bg-blue-400 transform scale-y-0 group-data-[state=active]:scale-y-100 transition-transform duration-300 ease-out origin-top" />
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Conteúdo na lateral direita */}
              <div className="lg:col-span-8 h-full">
                <div className="border-2 border-gray-200 dark:border-gray-600 rounded-xl p-8 h-full min-h-[360px] relative bg-white dark:bg-gray-700">
                  <AnimatePresence mode="wait">
                    {benefits.map((benefit) => (
                      <TabsContent
                        key={benefit.title}
                        value={benefit.title}
                        className="m-0 h-full absolute inset-0 p-8"
                      >
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-start gap-6"
                        >
                          {React.createElement(benefit.icon, {
                            className: "w-12 h-12 text-blue-600 dark:text-blue-400 flex-shrink-0"
                          })}
                          <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              {benefit.title}
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                              {benefit.description}
                            </p>
                          </div>
                        </motion.div>
                      </TabsContent>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </Tabs>
        </div>

        <div className="mt-12 text-center">
          <motion.div
            initial={false}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block w-full lg:w-auto"
          >
            <button 
              onClick={handleCtaClick}
              className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 px-12 py-3 rounded-full text-white text-base font-medium transition-all duration-300 hover:shadow-lg w-full lg:w-auto lg:bg-gray-900 lg:dark:bg-gray-700 lg:hover:bg-blue-600 lg:dark:hover:bg-blue-500"
            >
              {t('benefits.cta')}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}