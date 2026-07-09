import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ptBR } from './locales/pt-BR';
import { enUS } from './locales/en-US';

// IMPORTANTE (SSG/hidratação): o idioma inicial é FIXO em pt-BR, tanto na
// pré-renderização (Node) quanto no primeiro render do cliente. Assim o HTML
// gerado no build bate exatamente com o que o React hidrata (sem "mismatch").
// A detecção do idioma do usuário acontece DEPOIS da hidratação, em main.tsx
// (chama i18n.changeLanguage('en-US') quando for o caso).
i18n
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': ptBR,
      'en-US': enUS,
    },
    lng: 'pt-BR',
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false,
    },
    react: {
      // Sem Suspense: os recursos já vêm no bundle (síncronos), evita suspender
      // durante o renderToString e durante a hidratação.
      useSuspense: false,
    },
  });

export default i18n;
