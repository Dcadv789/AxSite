import { useState } from "react";
import ServicesModal from "./ServicesModal";

const WHATSAPP_NUMBER = "5511994561052";

const services = [
  {
    title: "BPO Financeiro",
    description: "Gestão por especialistas.",
    cta: "Acesse já",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_300/v1767986265/BPO_jzt0ja.png",
  },
  {
    title: "Consultoria Empresarial",
    description: "Análise e planejamento estratégico.",
    cta: "Saiba mais",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_300/v1767986265/Consultoria_e1nvm8.png",
  },
  {
    title: "Treinamentos",
    description: "Capacitação para sua equipe.",
    cta: "Conhecer",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_300/v1767986266/Treinamentos_ufgelz.png",
  },
  {
    title: "Antecipação de Recebíveis",
    description: "Acelere seu fluxo de caixa.",
    cta: "Antecipar",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_300/v1768257251/Antecipa%C3%A7%C3%A3o_de_Receb%C3%ADveis_yf2sq0.png",
  },
  {
    title: "Gestão de Inadimplência",
    description: "Reduza perdas e recupere valores.",
    cta: "Recuperar",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_300/v1768257251/Gest%C3%A3o_de_Inadimpl%C3%AAncia_ldsqgn.png",
  },
  {
    title: "Análise de Investimentos",
    description: "Decisões embasadas em dados.",
    cta: "Investir",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_300/v1768257251/An%C3%A1lise_de_Investimentos_lbwees.png",
  },
  {
    title: "Gestão de Risco",
    description: "Proteja seu negócio de incertezas.",
    cta: "Proteger",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_300/v1768257251/Gest%C3%A3o_de_Riscos_jtxydp.png",
  },
];

const getWhatsAppUrl = (serviceTitle: string) => {
  const message = `Oi, vim do link da bio. Quero saber mais sobre ${serviceTitle}!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const ServicesSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="bg-card px-5 py-5 border-t border-border pb-10" aria-labelledby="services-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="services-heading" className="text-foreground font-bold text-lg">Serviço para empresas</h2>
        <button 
          onClick={() => setModalOpen(true)}
          className="text-primary text-sm font-medium hover:underline"
          aria-label="Ver mais serviços para empresas"
        >
          Ver mais
        </button>
      </div>

      <div 
        className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1"
        role="list"
        aria-label="Lista de serviços empresariais"
      >
        {services.map((service, index) => (
          <a
            key={index}
            href={getWhatsAppUrl(service.title)}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            className="min-w-[270px] h-[210px] flex-shrink-0 rounded-2xl overflow-hidden relative block"
            aria-label={`Contato via WhatsApp sobre ${service.title}`}
          >
            {/* Background Image */}
            <img 
              src={service.image} 
              alt={`${service.title} - ${service.description}`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              fetchPriority={index === 0 ? "high" : "low"}
              width="270"
              height="210"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" aria-hidden="true" />
            
            {/* Badge no topo */}
            <div className="absolute top-4 right-4">
              <span className="bg-white/20 text-white text-[10px] font-medium px-2 py-1 rounded-full backdrop-blur-sm">
                {service.cta}
              </span>
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-bold text-white text-sm mb-1">
                {service.title}
              </h3>
              <p className="text-white/80 text-xs leading-relaxed">
                {service.description}
              </p>
            </div>
          </a>
        ))}
      </div>

      <ServicesModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};

export default ServicesSection;
