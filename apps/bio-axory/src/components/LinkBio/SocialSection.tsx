import { useState } from "react";
import { Globe, Mail } from "lucide-react";
import { FaInstagram, FaYoutube, FaThreads, FaLinkedin, FaFacebook, FaTiktok } from "react-icons/fa6";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const socialLinks = [
  { icon: Globe, label: "Site", url: "https://axory.com.br", isLucide: true },
  { icon: FaInstagram, label: "Instagram", url: "https://www.instagram.com/axory.capital", isLucide: false },
  { icon: FaYoutube, label: "Youtube", url: "https://www.youtube.com/@AxoryCap", isLucide: false },
  { icon: FaThreads, label: "Threads", url: "https://www.threads.com/@axory.capital", isLucide: false },
];

const allSocialLinks = [
  { icon: Globe, label: "Site", url: "https://axory.com.br", isLucide: true },
  { icon: FaInstagram, label: "Instagram", url: "https://www.instagram.com/axory.capital", isLucide: false },
  { icon: FaYoutube, label: "Youtube", url: "https://www.youtube.com/@AxoryCap", isLucide: false },
  { icon: FaThreads, label: "Threads", url: "https://www.threads.com/@axory.capital", isLucide: false },
  { icon: FaLinkedin, label: "LinkedIn", url: "https://www.linkedin.com/company/axory", isLucide: false },
  { icon: FaFacebook, label: "Facebook", url: "", isLucide: false },
  { icon: FaTiktok, label: "TikTok", url: "", isLucide: false },
  { icon: Mail, label: "E-mail", url: "", isLucide: true },
];

const SocialSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSocialClick = (url: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <section className="bg-card px-5 py-5 border-t border-border" aria-labelledby="social-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="social-heading" className="text-foreground font-bold text-lg">Nossas Redes</h2>
          <button 
            onClick={() => setModalOpen(true)}
            className="text-primary text-sm font-medium hover:underline"
            aria-label="Ver todas as redes sociais"
          >
            Ver mais
          </button>
        </div>

        <nav className="flex justify-between gap-2" aria-label="Redes sociais principais">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <button
                key={index}
                onClick={() => handleSocialClick(social.url)}
                className="w-16 h-16 rounded-full bg-bpo-blue hover:bg-bpo-blue/90 transition-colors flex items-center justify-center"
                aria-label={`Acessar ${social.label}`}
              >
                <IconComponent className="w-7 h-7 text-white" aria-hidden="true" />
              </button>
            );
          })}
        </nav>
      </section>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-[calc(100%-2.5rem)] max-w-[300px] mx-auto rounded-3xl overflow-hidden">
          <DialogHeader>
            <DialogTitle>Nossas Redes</DialogTitle>
          </DialogHeader>

          <nav 
            className="max-h-[320px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full"
            aria-label="Todas as redes sociais"
          >
            <div className="space-y-2.5 mt-2">
              {allSocialLinks.map((social, index) => {
                const IconComponent = social.icon;
                const hasLink = !!social.url;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleSocialClick(social.url)}
                    disabled={!hasLink}
                    aria-label={hasLink ? `Acessar ${social.label}` : `${social.label} - Em breve`}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border border-border transition-colors ${
                      hasLink 
                        ? "bg-card hover:bg-muted cursor-pointer" 
                        : "bg-muted/50 cursor-not-allowed opacity-60"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-bpo-blue flex items-center justify-center" aria-hidden="true">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-foreground text-sm">{social.label}</span>
                    {!hasLink && (
                      <span className="ml-auto text-xs text-muted-foreground">Em breve</span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SocialSection;