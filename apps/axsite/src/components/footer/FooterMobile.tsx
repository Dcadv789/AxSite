import React from 'react';
import { useTranslation } from 'react-i18next';

export function FooterMobile() {
  const { t } = useTranslation();

  return (
    <div className="lg:hidden px-6 pt-12 pb-8">
      <div className="flex flex-col items-center text-center">
        <img
          src="https://img.axory.com.br/insecure/rs:fit:1440:1080/q:95/plain/https://storage.axory.com.br/imagens-saas-sites/Logo_axory_branco.svg@webp"
          alt="Axory Capital"
          className="h-[70px] w-auto brightness-0 invert mb-6"
        />
        <p className="text-gray-400 leading-relaxed mb-8 px-4 max-w-xs">
          {t('footer.slogan')}
        </p>
        <div className="text-gray-400 text-sm border-t border-gray-800 dark:border-gray-700 w-full pt-8 px-4">
          {t('footer.rights')}
        </div>
      </div>
    </div>
  );
}