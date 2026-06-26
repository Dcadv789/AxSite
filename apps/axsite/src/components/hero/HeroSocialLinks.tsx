import React from 'react';
import { motion } from 'framer-motion';

interface HeroSocialLinksProps {
  isMobile?: boolean;
}

export function HeroSocialLinks({ isMobile = false }: HeroSocialLinksProps) {
  const socialLinks = [
    { 
      name: 'Share2',
      href: 'https://wa.me/?text=Confira este serviço de consultoria financeira: https://axory.com.br',
      label: 'Compartilhar'
    },
    { 
      name: 'Instagram',
      href: 'https://www.instagram.com/axory.capital',
      label: 'Instagram'
    },
    { 
      name: 'Youtube',
      href: 'http://www.youtube.com/@AxoryCap',
      label: 'Youtube'
    },
    { 
      name: 'Linkedin',
      href: 'https://www.linkedin.com/company/axory',
      label: 'LinkedIn'
    }
  ];

  // Componentes de ícones inline para evitar problemas de importação
  const ShareIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );

  const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );

  const YoutubeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <path d="m10 15 5-3-5-3z"/>
    </svg>
  );

  const LinkedinIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );

  const getIcon = (name: string) => {
    switch (name) {
      case 'Share2': return <ShareIcon />;
      case 'Instagram': return <InstagramIcon />;
      case 'Youtube': return <YoutubeIcon />;
      case 'Linkedin': return <LinkedinIcon />;
      default: return <ShareIcon />;
    }
  };

  if (isMobile) {
    return (
      <div className="grid grid-cols-4 gap-3 mb-6">
        {socialLinks.map((social, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 + (index * 0.1) }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-14 bg-white/10 backdrop-blur-sm shadow-md rounded-full hover:shadow-lg border border-white/20 text-gray-200 hover:text-white transition-all"
            >
              {getIcon(social.name)}
              <span className="sr-only">{social.label}</span>
            </a>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-between w-full gap-4">
      {socialLinks.map((social, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 + (index * 0.1) }}
          whileHover={{ y: -2, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1"
        >
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors bg-white/10 backdrop-blur-sm shadow-md rounded-full hover:shadow-lg group border border-white/20 flex items-center justify-center w-full h-12"
          >
            {getIcon(social.name)}
            <span className="sr-only">{social.label}</span>
          </a>
        </motion.div>
      ))}
    </div>
  );
}