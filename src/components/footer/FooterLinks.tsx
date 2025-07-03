import React from 'react';
import { useTranslation } from 'react-i18next';

interface FooterLinksProps {
  setIsPrivacyModalOpen: (open: boolean) => void;
  setIsTermsModalOpen: (open: boolean) => void;
}

export function FooterLinks({ setIsPrivacyModalOpen, setIsTermsModalOpen }: FooterLinksProps) {
  const { t } = useTranslation();

  const links = {
    empresa: [
      { label: t('footer.about'), href: '#' },
      { label: t('footer.links.plans'), href: '#planos' },
      { label: t('footer.privacy'), href: '#', onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setIsPrivacyModalOpen(true);
      }},
      { label: t('footer.terms'), href: '#', onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setIsTermsModalOpen(true);
      }},
      { label: 'FAQ', href: '#faq' },
    ],
    servicos: [
      { label: t('services.items.consulting.title'), href: '#servicos', onClick: () => {
        const tabsElement = document.querySelector('[role="tablist"]');
        const consultoriaTab = tabsElement?.querySelector('[value="consultoria-empresarial"]') as HTMLButtonElement;
        if (consultoriaTab) consultoriaTab.click();
      }},
      { label: t('services.items.bpo.title'), href: '#servicos', onClick: () => {
        const tabsElement = document.querySelector('[role="tablist"]');
        const bpoTab = tabsElement?.querySelector('[value="bpo-financeiro"]') as HTMLButtonElement;
        if (bpoTab) bpoTab.click();
      }},
      { label: t('services.items.receivables.title'), href: '#servicos', onClick: () => {
        const tabsElement = document.querySelector('[role="tablist"]');
        const antecipacaoTab = tabsElement?.querySelector('[value="antecipacao-recebiveis"]') as HTMLButtonElement;
        if (antecipacaoTab) antecipacaoTab.click();
      }},
      { label: t('services.items.digital.title'), href: '#servicos', onClick: () => {
        const tabsElement = document.querySelector('[role="tablist"]');
        const solucoesTab = tabsElement?.querySelector('[value="solucoes-digitais"]') as HTMLButtonElement;
        if (solucoesTab) solucoesTab.click();
      }},
      { label: t('services.items.tools.title'), href: '#servicos', onClick: () => {
        const tabsElement = document.querySelector('[role="tablist"]');
        const hubTab = tabsElement?.querySelector('[value="hub-ferramentas"]') as HTMLButtonElement;
        if (hubTab) hubTab.click();
      }},
      { label: t('services.items.mentoring.title'), href: '#servicos', onClick: () => {
        const tabsElement = document.querySelector('[role="tablist"]');
        const mentoriaTab = tabsElement?.querySelector('[value="mentoria-treinamentos"]') as HTMLButtonElement;
        if (mentoriaTab) mentoriaTab.click();
      }},
    ],
  };

  return (
    <>
      {/* Links - Empresa */}
      <div className="lg:col-span-2 lg:ml-8">
        <div>
          <h3 className="text-lg font-medium mb-4">{t('footer.about')}</h3>
          <ul className="space-y-1">
            {links.empresa.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  onClick={link.onClick}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Links - Serviços */}
      <div className="lg:col-span-2">
        <div>
          <h3 className="text-lg font-medium mb-4">{t('footer.links.services')}</h3>
          <ul className="space-y-1">
            {links.servicos.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  onClick={link.onClick}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}