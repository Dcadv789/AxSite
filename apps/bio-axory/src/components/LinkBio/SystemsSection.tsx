import { useState } from "react";
import SystemsModal from "./SystemsModal";

const systems = [
  {
    title: "AxDeal",
    description: "App de cobranças inteligente.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_90,w_400/v1768937113/Ax.Deal_ylozxa.png",
    cta: "Acessar",
    url: "https://deal.axory.com.br",
  },
  {
    title: "AxDash",
    description: "Dashboard executivo em tempo real.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_90,w_400/v1768937113/Ax.Dash_dh3zri.png",
    cta: "Conhecer",
    url: "https://dash.axory.com.br",
  },
  {
    title: "AxHub",
    description: "Gestão financeira completa.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_90,w_400/v1768937113/Ax.HUB_k1z3ob.png",
    cta: "Acessar",
    url: "https://hub.axory.com.br",
  },
];

const SystemsSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="bg-card px-5 py-5 border-t border-border" aria-labelledby="systems-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="systems-heading" className="text-foreground font-bold text-lg">Nossos sistemas</h2>
        <button 
          onClick={() => setModalOpen(true)}
          className="text-primary text-sm font-medium hover:underline"
          aria-label="Ver mais sistemas"
        >
          Ver mais
        </button>
      </div>

      <div 
        className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1"
        role="list"
        aria-label="Lista de sistemas disponíveis"
      >
        {systems.map((system, index) => (
          <a
            key={index}
            href={system.url}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            className="min-w-[270px] h-[210px] flex-shrink-0 rounded-2xl overflow-hidden relative block"
            aria-label={`${system.cta} ${system.title}`}
          >
            <img 
              src={system.image}
              alt={`${system.title} - ${system.description}`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width="270"
              height="210"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" aria-hidden="true" />
            
            {/* Badge no topo */}
            <div className="absolute top-4 right-4">
              <span className="bg-white/20 text-white text-[10px] font-medium px-2 py-1 rounded-full backdrop-blur-sm">
                {system.cta}
              </span>
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-bold text-white text-sm mb-1">
                {system.title}
              </h3>
              <p className="text-white/80 text-xs leading-relaxed">
                {system.description}
              </p>
            </div>
          </a>
        ))}
      </div>

      <SystemsModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};

export default SystemsSection;
