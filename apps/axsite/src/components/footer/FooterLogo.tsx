import React from 'react';
import { useTranslation } from 'react-i18next';

export function FooterLogo() {
  const { t } = useTranslation();

  return (
    <div className="lg:col-span-3">
      <div className="space-y-8">
        <img
          src="https://img.axory.com.br/insecure/rs:fit:524:128/q:95/plain/https://storage.axory.com.br/imagens-saas-sites/Logo_axory_branco.svg@webp"
          alt="Axory Capital"
          className="h-16 w-auto brightness-0 invert"
          width={262}
          height={64}
        />
        
        <p className="text-gray-400 leading-relaxed">
          {t('footer.slogan')}
        </p>
      </div>
    </div>
  );
}