import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

export function FAQ() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = React.useState("consultoria-empresarial");
  const [openQuestions, setOpenQuestions] = React.useState<{ [key: string]: boolean }>({});
  const [activeMobileCategory, setActiveMobileCategory] = React.useState<string | null>(null);

  const toggleQuestion = (questionId: string) => {
    setOpenQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const toggleMobileCategory = (categoryId: string) => {
    setActiveMobileCategory(prev => prev === categoryId ? null : categoryId);
  };

  return (
    <section id="faq" className="pt-12 md:pt-16 pb-12 md:pb-16 bg-gray-100 dark:bg-gray-800 scroll-mt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[20px] sm:text-[15px] font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wide">
              {t('faq.title')}
            </h2>
            <p className="text-[24px] sm:text-[30px] text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              {t('faq.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Versão Mobile */}
        <div className="lg:hidden space-y-4">
          {Object.entries(t('faq.categories', { returnObjects: true })).map(([key, category]) => (
            <div key={key} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleMobileCategory(key)}
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-white dark:bg-gray-800 relative"
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {category.title}
                </span>
                {key === 'hub-ferramentas' && (
                  <div className="absolute top-1/2 right-12 w-3 h-3 bg-blue-500 rounded-full transform -translate-y-1/2"></div>
                )}
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200",
                    activeMobileCategory === key ? "transform rotate-180" : ""
                  )}
                />
              </button>
              
              <AnimatePresence>
                {activeMobileCategory === key && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 space-y-4 bg-gray-50 dark:bg-gray-700">
                      {t(`faq.categories.${key}.questions`, { returnObjects: true }).map((faq: any, index: number) => (
                        <div key={index} className="border-b border-gray-200 dark:border-gray-600 last:border-0">
                          <button
                            onClick={() => toggleQuestion(`${key}-${index}`)}
                            className="w-full py-3 text-left flex items-center justify-between"
                          >
                            <span className="text-gray-700 dark:text-gray-300 pr-8">{faq.question}</span>
                            <ChevronDown
                              className={cn(
                                "w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 flex-shrink-0",
                                openQuestions[`${key}-${index}`] ? "transform rotate-180" : ""
                              )}
                            />
                          </button>
                          
                          <AnimatePresence>
                            {openQuestions[`${key}-${index}`] && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pb-3 text-gray-600 dark:text-gray-300">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Versão Desktop */}
        <div className="hidden lg:grid grid-cols-12 gap-8">
          {/* Sidebar com categorias */}
          <div className="col-span-3">
            <div className="sticky top-24 space-y-2">
              {Object.entries(t('faq.categories', { returnObjects: true })).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg transition-all duration-200 relative",
                    "hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400",
                    activeCategory === key
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-600 dark:text-gray-300"
                  )}
                >
                  {category.title}
                  {key === 'hub-ferramentas' && (
                    <div className="absolute top-1/2 right-3 w-3 h-3 bg-blue-500 rounded-full transform -translate-y-1/2"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de perguntas e respostas */}
          <div className="col-span-9">
            <div className="space-y-4">
              {t(`faq.categories.${activeCategory}.questions`, { returnObjects: true }).map((faq: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(`${activeCategory}-${index}`)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <span className="text-gray-900 dark:text-white font-medium">{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200",
                        openQuestions[`${activeCategory}-${index}`] ? "transform rotate-180" : ""
                      )}
                    />
                  </button>
                  
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-200",
                      openQuestions[`${activeCategory}-${index}`] ? "max-h-96" : "max-h-0"
                    )}
                  >
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}