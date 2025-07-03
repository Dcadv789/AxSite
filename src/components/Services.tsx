import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useTranslation } from 'react-i18next';
import { ServicesMobile } from './services.mobile';
import { BarChart3, Calculator, FileSpreadsheet, PiggyBank, TrendingUp, Users, LineChart, TrendingDown, Target, Wallet, BarChart2, ArrowUpRight, Banknote, Scale, Building, Receipt, CreditCard, FileText, DollarSign, FileCheck, UserCheck, Files, ClipboardList, BadgeCheck, Landmark, CandlestickChart, Coins, HandCoins, Briefcase, GraduationCap, Presentation as PresentationChart, Users2, Brain, Lightbulb, TrendingUp as TrendingUpIcon, Presentation, Gauge, KeyRound, RefreshCw, HelpCircle, FileSignature, HeadphonesIcon, TableProperties, Calculator as CalculatorIcon, BarChart, PiggyBank as PiggyBankIcon, LineChart as LineChartIcon, Activity, ClipboardList as ClipboardListIcon, DollarSign as DollarSignIcon, Laptop, Workflow } from 'lucide-react';

export function Services() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  const handleCtaClick = () => {
    window.open('https://wa.me/5511994561052?text=Ol%C3%A1,%20vim%20atrav%C3%A9s%20do%20site%20e%20quero%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Axory%20Capital.', '_blank');
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) {
    return <ServicesMobile />;
  }

  const services = [
    {
      id: "consultoria-empresarial",
      icon: BarChart3,
      title: t('services.items.consulting.title'),
      description: t('services.items.consulting.description'),
      content: (
        <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: t('services.items.consulting.services.diagnosis'),
              icon: LineChart
            },
            {
              title: t('services.items.consulting.services.growth'),
              icon: TrendingUp
            },
            {
              title: t('services.items.consulting.services.planning'),
              icon: Target
            },
            {
              title: t('services.items.consulting.services.pricing'),
              icon: Banknote
            },
            {
              title: t('services.items.consulting.services.viability'),
              icon: Scale
            },
            {
              title: t('services.items.consulting.services.cashflow'),
              icon: Wallet
            },
            {
              title: t('services.items.consulting.services.costs'),
              icon: TrendingDown
            },
            {
              title: t('services.items.consulting.services.restructuring'),
              icon: Building
            },
            {
              title: t('services.items.consulting.services.investments'),
              icon: BarChart2
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[160px] bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-400 flex flex-col items-center justify-center gap-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-600 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 group-hover:bg-blue-600 dark:group-hover:bg-blue-500">
                    {React.createElement(service.icon, {
                      className: "h-6 w-6 text-gray-900 dark:text-gray-100 group-hover:text-white transition-colors duration-300",
                      strokeWidth: 2
                    })}
                  </div>
                  
                  <div className="relative">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white text-center group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                      {service.title}
                    </h3>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full transform origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-3 right-3"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <ArrowUpRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: "bpo-financeiro",
      icon: Calculator,
      title: t('services.items.bpo.title'),
      description: t('services.items.bpo.description'),
      content: (
        <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: t('services.items.bpo.services.accounts'),
              icon: Receipt
            },
            {
              title: t('services.items.bpo.services.reconciliation'),
              icon: CreditCard
            },
            {
              title: t('services.items.bpo.services.reports'),
              icon: FileText
            },
            {
              title: t('services.items.bpo.services.cashflow'),
              icon: DollarSign
            },
            {
              title: t('services.items.bpo.services.invoices'),
              icon: FileCheck
            },
            {
              title: t('services.items.bpo.services.defaulters'),
              icon: UserCheck
            },
            {
              title: t('services.items.bpo.services.documentation'),
              icon: Files
            },
            {
              title: t('services.items.bpo.services.contracts'),
              icon: ClipboardList
            },
            {
              title: t('services.items.bpo.services.errors'),
              icon: BadgeCheck
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[160px] bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-400 flex flex-col items-center justify-center gap-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-600 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 group-hover:bg-blue-600 dark:group-hover:bg-blue-500">
                    {React.createElement(service.icon, {
                      className: "h-6 w-6 text-gray-900 dark:text-gray-100 group-hover:text-white transition-colors duration-300",
                      strokeWidth: 2
                    })}
                  </div>
                  
                  <div className="relative">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white text-center group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                      {service.title}
                    </h3>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full transform origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-3 right-3"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <ArrowUpRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: "antecipacao-recebiveis",
      icon: Users,
      title: t('services.items.receivables.title'),
      description: t('services.items.receivables.description'),
      content: (
        <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: t('services.items.receivables.services.credit'),
              icon: Landmark
            },
            {
              title: t('services.items.receivables.services.cashflow'),
              icon: CandlestickChart
            },
            {
              title: t('services.items.receivables.services.risk'),
              icon: TrendingDown
            },
            {
              title: t('services.items.receivables.services.liquidity'),
              icon: Coins
            },
            {
              title: t('services.items.receivables.services.alternative'),
              icon: HandCoins
            },
            {
              title: t('services.items.receivables.services.suppliers'),
              icon: Briefcase
            },
            {
              title: t('services.items.receivables.services.conditions'),
              icon: BadgeCheck
            },
            {
              title: t('services.items.receivables.services.support'),
              icon: HandCoins
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[160px] bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-400 flex flex-col items-center justify-center gap-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-600 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 group-hover:bg-blue-600 dark:group-hover:bg-blue-500">
                    {React.createElement(service.icon, {
                      className: "h-6 w-6 text-gray-900 dark:text-gray-100 group-hover:text-white transition-colors duration-300",
                      strokeWidth: 2
                    })}
                  </div>
                  
                  <div className="relative">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white text-center group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                      {service.title}
                    </h3>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full transform origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-3 right-3"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <ArrowUpRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: "solucoes-digitais",
      icon: TrendingUp,
      title: t('services.items.digital.title'),
      description: t('services.items.digital.description'),
      content: (
        <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: t('services.items.digital.services.certificate'),
              icon: KeyRound
            },
            {
              title: t('services.items.digital.services.renewal'),
              icon: RefreshCw
            },
            {
              title: t('services.items.digital.services.support'),
              icon: HelpCircle
            },
            {
              title: t('services.items.digital.services.signature'),
              icon: FileSignature
            },
            {
              title: t('services.items.digital.services.service'),
              icon: HeadphonesIcon
            },
            {
              title: t('services.items.digital.services.consulting'),
              icon: Laptop
            },
            {
              title: t('services.items.digital.services.transformation'),
              icon: Workflow
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[160px] bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-400 flex flex-col items-center justify-center gap-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-600 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 group-hover:bg-blue-600 dark:group-hover:bg-blue-500">
                    {React.createElement(service.icon, {
                      className: "h-6 w-6 text-gray-900 dark:text-gray-100 group-hover:text-white transition-colors duration-300",
                      strokeWidth: 2
                    })}
                  </div>
                  
                  <div className="relative">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white text-center group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                      {service.title}
                    </h3>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full transform origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-3 right-3"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <ArrowUpRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: "hub-ferramentas",
      icon: PiggyBank,
      title: t('services.items.tools.title'),
      description: t('services.items.tools.description'),
      isNew: true,
      content: (
        <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: t('services.items.tools.services.control'),
              icon: TableProperties
            },
            {
              title: t('services.items.tools.services.pricing'),
              icon: CalculatorIcon
            },
            {
              title: t('services.items.tools.services.cashflow'),
              icon: BarChart
            },
            {
              title: t('services.items.tools.services.investments'),
              icon: PiggyBankIcon
            },
            {
              title: t('services.items.tools.services.budget'),
              icon: LineChartIcon
            },
            {
              title: t('services.items.tools.services.indicators'),
              icon: Activity
            },
            {
              title: t('services.items.tools.services.subscriptions'),
              icon: ClipboardListIcon
            },
            {
              title: t('services.items.tools.services.prolabore'),
              icon: DollarSignIcon
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[160px] bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-400 flex flex-col items-center justify-center gap-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-600 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 group-hover:bg-blue-600 dark:group-hover:bg-blue-500">
                    {React.createElement(service.icon, {
                      className: "h-6 w-6 text-gray-900 dark:text-gray-100 group-hover:text-white transition-colors duration-300",
                      strokeWidth: 2
                    })}
                  </div>
                  
                  <div className="relative">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white text-center group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                      {service.title}
                    </h3>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full transform origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-3 right-3"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <ArrowUpRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: "mentoria-treinamentos",
      icon: FileSpreadsheet,
      title: t('services.items.mentoring.title'),
      description: t('services.items.mentoring.description'),
      content: (
        <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: t('services.items.mentoring.services.management'),
              icon: GraduationCap
            },
            {
              title: t('services.items.mentoring.services.pricing'),
              icon: PresentationChart
            },
            {
              title: t('services.items.mentoring.services.teams'),
              icon: Users2
            },
            {
              title: t('services.items.mentoring.services.leaders'),
              icon: Brain
            },
            {
              title: t('services.items.mentoring.services.lectures'),
              icon: Presentation
            },
            {
              title: t('services.items.mentoring.services.workshop'),
              icon: Lightbulb
            },
            {
              title: t('services.items.mentoring.services.costs'),
              icon: TrendingUpIcon
            },
            {
              title: t('services.items.mentoring.services.business'),
              icon: Target
            },
            {
              title: t('services.items.mentoring.services.profitability'),
              icon: Gauge
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[160px] bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-400 flex flex-col items-center justify-center gap-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-600 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 group-hover:bg-blue-600 dark:group-hover:bg-blue-500">
                    {React.createElement(service.icon, {
                      className: "h-6 w-6 text-gray-900 dark:text-gray-100 group-hover:text-white transition-colors duration-300",
                      strokeWidth: 2
                    })}
                  </div>
                  
                  <div className="relative">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white text-center group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                      {service.title}
                    </h3>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full transform origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-3 right-3"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <ArrowUpRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      )
    }
  ];

  return (
    <section id="servicos" className="pt-12 md:pt-16 pb-12 md:pb-16 bg-white dark:bg-gray-800 scroll-mt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[20px] sm:text-[15px] font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wide">
              {t('services.title')}
            </h2>
            <p className="text-[24px] sm:text-[30px] text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              {t('services.subtitle')}
            </p>
          </motion.div>
        </div>

        <Tabs defaultValue={services[0].id} className="w-full">
          <ScrollArea className="w-full">
            {/* Container com padding extra para acomodar a tag */}
            <div className="pt-4 pb-2">
              <TabsList className="mb-8 inline-flex w-full justify-start gap-1 bg-transparent p-0 relative overflow-visible">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <TabsTrigger
                      key={service.id}
                      value={service.id}
                      className="relative rounded-full text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 px-4 py-2 transition-all data-[state=active]:border data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400 data-[state=active]:bg-blue-600 dark:data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:bg-gray-50 dark:hover:bg-gray-600 overflow-visible"
                      style={{ position: 'relative', overflow: 'visible' }}
                    >
                      <Icon className="mr-1.5 h-4 w-4" />
                      {service.title}
                      {service.isNew && (
                        <span
                          className="absolute bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg border-2 border-white dark:border-gray-800"
                          style={{
                            position: 'absolute',
                            top: '-12px',
                            right: '-12px',
                            zIndex: 999999,
                            pointerEvents: 'none',
                            transform: 'scale(1)',
                            transformOrigin: 'center'
                          }}
                        >
                          Novo
                        </span>
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl"
              >
                {service.content}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-10 text-center">
          <motion.div
            initial={false}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button 
              onClick={handleCtaClick}
              className="bg-gray-900 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-blue-500 px-12 py-3 rounded-full text-white text-base font-medium transition-all duration-300 hover:shadow-lg"
            >
              {t('services.cta')}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}