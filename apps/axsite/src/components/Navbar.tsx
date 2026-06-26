import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Target, Gift, Sparkles, CreditCard, HelpCircle, Languages, Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { GTMEvents, gtmEvent } from '../utils/gtm';

// Logo da Axory servida pelo proxy de imagens (img.axory.com.br).
// Dark mode usa a versão branca; light mode usa a versão azul/cinza.
const LOGO_DARK = 'https://img.axory.com.br/insecure/rs:fit:1440:1080/q:95/plain/https://storage.axory.com.br/imagens-saas-sites/Logo_axory_branco.svg@webp';
const LOGO_LIGHT = 'https://img.axory.com.br/insecure/rs:fit:1440:1080/q:95/plain/https://storage.axory.com.br/imagens-saas-sites/Ativo_35_-_Logo_Azul_Cinza_feb1hr%20(1).svg@webp';

interface NavItem {
  name: string;
  url: string;
  icon: React.ElementType;
}

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('Início');
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const items: NavItem[] = [
    { name: t('nav.home'), url: '#inicio', icon: Home },
    { name: t('nav.challenges'), url: '#desafios', icon: Target },
    { name: t('nav.benefits'), url: '#beneficios', icon: Gift },
    { name: t('nav.services'), url: '#servicos', icon: Sparkles },
    { name: t('nav.plans'), url: '#planos', icon: CreditCard },
    { name: 'AxPay', url: '#solucoes-pagamento', icon: CreditCard },
    { name: t('nav.faq'), url: '#faq', icon: HelpCircle },
  ];

  const handleScheduleClick = () => {
    // Track GTM event
    GTMEvents.ctaClick('Agendar Reunião', 'Navbar');
    GTMEvents.whatsappClick('navbar_schedule', 'diagnostic');
    
    window.open('https://wa.me/5511994561052?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20e%20quero%20agendar%20o%20diagn%C3%B3stico%20financeiro%20GRATUITO%20para%20minha%20empresa.', '_blank');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;
      
      const scrollPosition = window.scrollY + 100;
      
      const currentSection = items.find(item => {
        const element = document.querySelector(item.url);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;
          return scrollPosition >= elementTop && scrollPosition < elementBottom;
        }
        return false;
      });

      if (currentSection) {
        setActiveTab(currentSection.name);
        
        // Track section view
        GTMEvents.sectionView(currentSection.name);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling, items]);

  const scrollToSection = (sectionId: string, itemName: string) => {
    setIsScrolling(true);
    setIsMenuOpen(false);
    
    // Track navigation click
    gtmEvent('navigation_click', {
      section_name: itemName,
      section_url: sectionId
    });
    
    if (sectionId === '#inicio') {
      // Scroll para o topo
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setActiveTab(itemName);
    } else {
      // Scroll para a seção específica
      const element = document.querySelector(sectionId);
      if (element) {
        const navHeight = 80; // Altura da navbar
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - navHeight,
          behavior: 'smooth'
        });
        setActiveTab(itemName);
      }
    }
    
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    scrollToSection(item.url, item.name);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Track logo click
    gtmEvent('logo_click', {
      location: 'navbar'
    });
    
    scrollToSection('#inicio', t('nav.home'));
  };

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === 'pt-BR' ? 'en-US' : 'pt-BR';
    
    // Track language change
    GTMEvents.languageChange(currentLang, newLang);
    
    i18n.changeLanguage(newLang);
  };

  const handleThemeToggle = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    
    // Track theme change
    GTMEvents.themeChange(newTheme);
    
    toggleDarkMode();
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* Container Mobile */}
        <div className="md:hidden flex justify-center pt-4 px-4">
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 backdrop-blur-lg py-3 px-6 rounded-full shadow-lg pointer-events-auto transition-colors duration-300 w-full max-w-sm">
            <div className="flex items-center gap-4">
              <a 
                href="#inicio" 
                onClick={handleLogoClick} 
                className="flex items-center cursor-pointer"
              >
                <img
                  src={isDarkMode ? LOGO_DARK : LOGO_LIGHT}
                  alt="Logo Axory"
                  className="h-8 w-auto hover:opacity-80 transition-opacity"
                  width={32}
                  height={32}
                  loading="eager"
                />
              </a>
              
              <button
                onClick={handleThemeToggle}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Alternar tema"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
              
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Alternar idioma"
              >
                <Languages className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Abrir menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Container Desktop */}
        <div className="hidden md:flex justify-center sm:pt-4">
          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 backdrop-blur-lg py-3 px-6 rounded-full shadow-lg pointer-events-auto transition-colors duration-300">
            <div className="flex items-center gap-2 px-4">
              <a 
                href="#inicio" 
                onClick={handleLogoClick} 
                className="flex items-center cursor-pointer"
              >
                <img
                  src={isDarkMode ? LOGO_DARK : LOGO_LIGHT}
                  alt="Logo Axory"
                  className="h-8 w-auto hover:opacity-80 transition-opacity"
                  width={32}
                  height={32}
                  loading="eager"
                />
              </a>
            </div>

            <button
              onClick={handleThemeToggle}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Alternar tema"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Alternar idioma"
            >
              <Languages className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;

              return (
                <a
                  key={item.name}
                  href={item.url}
                  onClick={(e) => handleClick(e, item)}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-4 py-3 rounded-full transition-colors",
                    "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400",
                    isActive && "text-blue-600 dark:text-blue-400"
                  )}
                >
                  <span className="hidden md:inline">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 dark:bg-blue-400 rounded-b-full">
                        <div className="absolute w-12 h-6 bg-blue-400/20 dark:bg-blue-400/30 rounded-full blur-md -bottom-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-blue-400/20 dark:bg-blue-400/30 rounded-full blur-md -bottom-1" />
                        <div className="absolute w-4 h-4 bg-blue-400/20 dark:bg-blue-400/30 rounded-full blur-sm -bottom-1 left-2" />
                      </div>
                    </motion.div>
                  )}
                </a>
              );
            })}

            <button 
              onClick={handleScheduleClick}
              className="bg-blue-600 dark:bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {t('nav.schedule')}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mx-4 mt-2"
            >
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg pointer-events-auto transition-colors duration-300 overflow-hidden">
                <div className="py-2">
                  {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.name;

                    return (
                      <a
                        key={item.name}
                        href={item.url}
                        onClick={(e) => handleClick(e, item)}
                        className={cn(
                          "flex items-center gap-3 px-6 py-3 transition-colors cursor-pointer",
                          isActive ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" : "text-gray-600 dark:text-gray-300"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </a>
                    );
                  })}

                  <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                    <button 
                      onClick={handleScheduleClick}
                      className="w-full bg-blue-600 dark:bg-blue-500 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {t('nav.schedule')}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay para fechar o menu ao clicar fora */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}