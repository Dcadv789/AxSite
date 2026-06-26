import React, { useState } from 'react';
import { PrivacyModal } from './modals/PrivacyModal';
import { TermsModal } from './modals/TermsModal';
import { useTranslation } from 'react-i18next';
import { FooterMobile } from './footer/FooterMobile';
import { FooterLogo } from './footer/FooterLogo';
import { FooterLinks } from './footer/FooterLinks';
import { FooterContact } from './footer/FooterContact';

export function Footer() {
  const { t } = useTranslation();
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300">
      {/* Versão Mobile */}
      <FooterMobile />

      {/* Versão Desktop */}
      <div className="hidden lg:block pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid principal */}
          <div className="grid grid-cols-12 gap-5 pb-16 border-b border-gray-800 dark:border-gray-700">
            {/* Logo - DIMINUÍDA */}
            <FooterLogo />

            {/* Links */}
            <FooterLinks 
              setIsPrivacyModalOpen={setIsPrivacyModalOpen}
              setIsTermsModalOpen={setIsTermsModalOpen}
            />

            {/* Informações de contato - AUMENTADA */}
            <FooterContact />
          </div>

          {/* Copyright */}
          <div className="pt-8 text-center text-gray-400">
            <p>{t('footer.rights')}</p>
          </div>
        </div>
      </div>

      {/* Modais */}
      <PrivacyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
    </footer>
  );
}