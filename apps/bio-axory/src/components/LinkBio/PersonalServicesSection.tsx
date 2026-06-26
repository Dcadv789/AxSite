import { useState } from "react";
import PersonalServicesModal from "./PersonalServicesModal";

const WHATSAPP_NUMBER = "5511994561052";

const personalServices = [
  {
    title: "Mentoria Estratégia Pessoal",
    description: "Acompanhamento exclusivo para você.",
    cta: "Saiba mais",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_300/v1768269200/Mentoria_Estrategia_Pessoal_cep2ri.png",
  },
  {
    title: "Framework Controle Total",
    description: "Domine suas finanças pessoais.",
    cta: "Conhecer",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_300/v1768269200/Framework_Controle_Total_e4cmjd.png",
  },
  {
    title: "Consultoria em Investimentos",
    description: "Orientação para seus investimentos.",
    cta: "Investir",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_300/v1768269199/Carteira_de_Investimentos_ueki0u.png",
  },
  {
    title: "Gestão de Dívidas",
    description: "Reorganize sua vida financeira.",
    cta: "Resolver",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_300/v1768269199/Gest%C3%A3o_de_Dividas_mwf49b.png",
  },
  {
    title: "Planejamento de Aposentadoria",
    description: "Garanta sua tranquilidade futura.",
    cta: "Começar",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_300/v1768257456/Planejamento_de_Aposentadoria_qzbv4c.png",
  },
  {
    title: "Planejamento Sucessório",
    description: "Proteja o futuro da sua família.",
    cta: "Planejar",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_300/v1768257457/Planejamento_Sucess%C3%B3rio_vfvadr.png",
  },
];

const getWhatsAppUrl = (serviceTitle: string) => {
  const message = `Oi, vim do link da bio. Quero saber mais sobre ${serviceTitle}!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const PersonalServicesSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="bg-card px-5 py-5 border-t border-border" aria-labelledby="personal-services-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="personal-services-heading" className="text-foreground font-bold text-lg">Serviços para pessoas</h2>
        <button 
          onClick={() => setModalOpen(true)}
          className="text-primary text-sm font-medium hover:underline"
          aria-label="Ver mais serviços para pessoas"
        >
          Ver mais
        </button>
      </div>

      <div 
        className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1"
        role="list"
        aria-label="Lista de serviços pessoais"
      >
        {personalServices.map((service, index) => (
          <a
            key={index}
            href={getWhatsAppUrl(service.title)}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            className="min-w-[270px] h-[210px] flex-shrink-0 rounded-2xl overflow-hidden relative flex flex-col justify-between block"
            aria-label={`Contato via WhatsApp sobre ${service.title}`}
          >
            {service.image ? (
              <>
                <img 
                  src={service.image} 
                  alt={`${service.title} - ${service.description}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="270"
                  height="210"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" aria-hidden="true" />
              </>
            ) : (
              <div 
                className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" 
                aria-hidden="true"
              />
            )}
            <div className="relative flex justify-end p-4">
              <span className="bg-white/20 text-white text-[10px] font-medium px-2 py-1 rounded-full backdrop-blur-sm">
                {service.cta}
              </span>
            </div>
            <div className="relative p-4">
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

      <PersonalServicesModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};

export default PersonalServicesSection;
