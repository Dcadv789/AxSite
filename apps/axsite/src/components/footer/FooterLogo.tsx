import React from 'react';
import { useTranslation } from 'react-i18next';

export function FooterLogo() {
  const { t } = useTranslation();

  return (
    <div className="lg:col-span-3">
      <div className="space-y-8">
        <img
          src="https://res.cloudinary.com/ducd9j4tx/image/upload/v1751041685/Ativo_25_n6x26v.svg"
          alt="Axory Capital"
          className="h-16 w-auto brightness-0 invert"
        />
        
        <p className="text-gray-400 leading-relaxed">
          {t('footer.slogan')}
        </p>
      </div>
    </div>
  );
}