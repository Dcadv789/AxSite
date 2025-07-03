import React, { Suspense, lazy } from 'react';
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";

// Lazy loading de componentes não críticos
const Challenges = lazy(() => import("./components/Challenges").then(module => ({ default: module.Challenges })));
const Scenario = lazy(() => import("./components/Scenario").then(module => ({ default: module.Scenario })));
const Benefits = lazy(() => import("./components/Benefits").then(module => ({ default: module.Benefits })));
const Services = lazy(() => import("./components/Services").then(module => ({ default: module.Services })));
const Plans = lazy(() => import("./components/Plans").then(module => ({ default: module.Plans })));
const PaymentSolutions = lazy(() => import("./components/PaymentSolutions").then(module => ({ default: module.PaymentSolutions })));
const FAQ = lazy(() => import("./components/FAQ").then(module => ({ default: module.FAQ })));
const Contact = lazy(() => import("./components/Contact").then(module => ({ default: module.Contact })));
const Footer = lazy(() => import("./components/Footer").then(module => ({ default: module.Footer })));

// Loading fallback otimizado
const SectionFallback = () => (
  <div className="section min-h-[200px] flex items-center justify-center bg-gray-50 dark:bg-gray-800">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-10 w-10"></div>
      <div className="flex-1 space-y-2 py-1">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <Hero />
      
      <Suspense fallback={<SectionFallback />}>
        <Challenges />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <Scenario />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <Benefits />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <Services />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <Plans />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <PaymentSolutions />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <FAQ />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;