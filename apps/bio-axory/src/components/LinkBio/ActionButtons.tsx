import { useState } from "react";
import { FaWhatsapp, FaPix } from "react-icons/fa6";
import { Share } from "lucide-react";
import PixModal from "./PixModal";

const WHATSAPP_NUMBER = "5511994561052";
const WHATSAPP_MESSAGE = "Oi, vim do link da bio. Quero marcar o diagnóstico financeiro gratuito!";

const ActionButtons = () => {
  const [pixModalOpen, setPixModalOpen] = useState(false);

  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank", "noopener,noreferrer");
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Axory",
        url: window.location.href,
      });
    }
  };

  return (
    <>
      <nav className="bg-card px-5 py-4" aria-label="Ações principais">
        <div className="flex gap-3">
          {/* WhatsApp Button */}
          <button 
            onClick={handleWhatsApp}
            className="flex-[1.5] bg-bpo-blue hover:opacity-90 transition-colors rounded-2xl py-4 px-4 flex items-center justify-center gap-2 shadow-button"
            aria-label="Entrar em contato pelo WhatsApp"
          >
            <FaWhatsapp className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
            <span className="text-primary-foreground font-bold text-base tracking-wide">
              WHATSAPP
            </span>
          </button>

          {/* PIX Button */}
          <button 
            onClick={() => setPixModalOpen(true)}
            className="flex-1 bg-bpo-blue hover:opacity-90 transition-colors rounded-2xl py-4 px-4 flex items-center justify-center gap-2 shadow-button"
            aria-label="Ver chave PIX"
          >
            <FaPix className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
            <span className="text-primary-foreground font-bold text-base">
              PIX
            </span>
          </button>

          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="bg-bpo-blue hover:opacity-90 transition-colors rounded-2xl py-4 px-4 flex items-center justify-center shadow-button"
            aria-label="Compartilhar página"
          >
            <Share className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <PixModal open={pixModalOpen} onOpenChange={setPixModalOpen} />
    </>
  );
};

export default ActionButtons;