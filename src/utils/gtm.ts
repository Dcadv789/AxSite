// Utilitários para Google Tag Manager
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Inicializar dataLayer se não existir
window.dataLayer = window.dataLayer || [];

// Função para enviar eventos personalizados para o GTM
export function gtmEvent(eventName: string, parameters: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters
    });
  }
}

// Eventos específicos para o site da Axory
export const GTMEvents = {
  // Navegação
  pageView: (pageName: string) => {
    gtmEvent('page_view', {
      page_title: pageName,
      page_location: window.location.href
    });
  },

  // Interações com CTAs
  ctaClick: (ctaName: string, location: string) => {
    gtmEvent('cta_click', {
      cta_name: ctaName,
      cta_location: location,
      page_location: window.location.href
    });
  },

  // WhatsApp clicks
  whatsappClick: (source: string, message?: string) => {
    gtmEvent('whatsapp_click', {
      source: source,
      message_type: message || 'default',
      page_location: window.location.href
    });
  },

  // Formulário de contato
  formSubmit: (formName: string, success: boolean) => {
    gtmEvent('form_submit', {
      form_name: formName,
      success: success,
      page_location: window.location.href
    });
  },

  // Navegação por seções
  sectionView: (sectionName: string) => {
    gtmEvent('section_view', {
      section_name: sectionName,
      page_location: window.location.href
    });
  },

  // Interação com planos
  planInteraction: (planName: string, action: string) => {
    gtmEvent('plan_interaction', {
      plan_name: planName,
      action: action,
      page_location: window.location.href
    });
  },

  // Mudança de idioma
  languageChange: (fromLang: string, toLang: string) => {
    gtmEvent('language_change', {
      from_language: fromLang,
      to_language: toLang,
      page_location: window.location.href
    });
  },

  // Mudança de tema
  themeChange: (theme: string) => {
    gtmEvent('theme_change', {
      theme: theme,
      page_location: window.location.href
    });
  }
};

// Função para rastrear scroll depth
export function trackScrollDepth() {
  let maxScroll = 0;
  const milestones = [25, 50, 75, 90, 100];
  const triggered = new Set<number>();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !triggered.has(milestone)) {
          triggered.add(milestone);
          gtmEvent('scroll_depth', {
            scroll_depth: milestone,
            page_location: window.location.href
          });
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

// Função para rastrear tempo na página
export function trackTimeOnPage() {
  const startTime = Date.now();
  const intervals = [30, 60, 120, 300]; // 30s, 1min, 2min, 5min
  const triggered = new Set<number>();

  const checkTime = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    intervals.forEach(interval => {
      if (timeSpent >= interval && !triggered.has(interval)) {
        triggered.add(interval);
        gtmEvent('time_on_page', {
          time_seconds: interval,
          page_location: window.location.href
        });
      }
    });
  };

  const intervalId = setInterval(checkTime, 5000); // Check every 5 seconds
  
  return () => {
    clearInterval(intervalId);
  };
}