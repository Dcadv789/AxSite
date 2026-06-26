import { useState } from "react";
import AxHubModal from "./AxHubModal";

const AxHubSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-card px-5 py-5 border-t border-border" aria-labelledby="axhub-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="axhub-heading" className="text-foreground font-bold text-lg">AxHub</h2>
          <span className="text-primary text-xs font-semibold bg-primary/10 px-2 py-1 rounded-full">
            Novidade
          </span>
        </div>

        <img 
          src="https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_400/v1768337739/Banner_Link_bvrjl4.png"
          srcSet="https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_400/v1768337739/Banner_Link_bvrjl4.png 400w, https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_600/v1768337739/Banner_Link_bvrjl4.png 600w"
          sizes="(max-width: 400px) 400px, 600px"
          alt="AxHub - Plataforma de gestão financeira"
          className="rounded-2xl overflow-hidden aspect-[16/9] mb-4 w-full object-cover"
          loading="lazy"
          decoding="async"
          width="400"
          height="225"
        />

        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-bpo-blue hover:bg-bpo-blue/90 text-white font-semibold py-4 rounded-xl transition-colors text-sm"
          aria-label="Acessar AxHub gratuitamente"
        >
          Acessar gratuitamente
        </button>
      </section>

      <AxHubModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default AxHubSection;
