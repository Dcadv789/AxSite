import { lazy, Suspense } from "react";
import Header from "@/components/LinkBio/Header";
import HeroCard from "@/components/LinkBio/HeroCard";
import ActionButtons from "@/components/LinkBio/ActionButtons";
import SocialSection from "@/components/LinkBio/SocialSection";

// Lazy load below-the-fold components to reduce initial JS bundle
const ServicesSection = lazy(() => import("@/components/LinkBio/ServicesSection"));
const PersonalServicesSection = lazy(() => import("@/components/LinkBio/PersonalServicesSection"));
const SystemsSection = lazy(() => import("@/components/LinkBio/SystemsSection"));
const AxHubSection = lazy(() => import("@/components/LinkBio/AxHubSection"));
const SchedulingSection = lazy(() => import("@/components/LinkBio/SchedulingSection"));
const Footer = lazy(() => import("@/components/LinkBio/Footer"));

// Minimal loading placeholder
const SectionFallback = () => (
  <div className="h-32 flex items-center justify-center" role="status" aria-label="Carregando seção">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen font-inter gradient-header">
      <Header />
      <div className="bg-card rounded-t-[2.5rem] rounded-b-[2.5rem] -mt-4 relative z-10">
        <div className="max-w-md mx-auto flex flex-col px-4 py-6 pb-8">
          <HeroCard />
          <ActionButtons />
          <SocialSection />
          <Suspense fallback={<SectionFallback />}>
            <ServicesSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <PersonalServicesSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <SystemsSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <AxHubSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <SchedulingSection />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;