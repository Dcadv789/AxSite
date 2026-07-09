import { useEffect } from 'react';
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Challenges } from "./components/Challenges";
import { Scenario } from "./components/Scenario";
import { Benefits } from "./components/Benefits";
import { Services } from "./components/Services";
import { Plans } from "./components/Plans";
// AxPay OCULTO TEMPORARIAMENTE (serviço suspenso) — reativar descomentando a
// linha abaixo e o <PaymentSolutions /> no JSX, e o item 'AxPay' no Navbar.tsx.
// import { PaymentSolutions } from "./components/PaymentSolutions";
import { AxDeal } from "./components/AxDeal";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import i18n from './i18n';

// Importação direta (sem lazy/Suspense): com SSG, o conteúdo é pré-renderizado
// no build; usar lazy fazia as seções "suspenderem" no servidor e gerava erros
// de hidratação (React #419). Direto = HTML completo + sem erro no console.

function App() {
  // Detecção de idioma APÓS a hidratação (efeito só roda no cliente, depois do
  // commit). O 1º render é sempre pt-BR — igual ao HTML pré-renderizado — então
  // não há mismatch de hidratação. Só troca para en-US quando for o caso.
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lang');
      const wantsEn = saved ? saved === 'en-US' : /^en/i.test(navigator.language || '');
      if (wantsEn && i18n.language !== 'en-US') {
        i18n.changeLanguage('en-US');
      }
    } catch {
      // localStorage/navigator indisponíveis — mantém pt-BR.
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <Hero />
      <Challenges />
      <Scenario />
      <Benefits />
      <Services />
      <Plans />
      {/* AxPay (Soluções de Pagamento) OCULTO TEMPORARIAMENTE — ver imports acima.
          Para reativar, coloque aqui: <PaymentSolutions /> */}
      <AxDeal />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
