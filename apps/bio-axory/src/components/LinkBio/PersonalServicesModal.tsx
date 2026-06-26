import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PersonalServicesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WHATSAPP_NUMBER = "5511994561052";

const personalServices = [
  {
    title: "Mentoria Estratégia Pessoal",
    description: "Acompanhamento exclusivo e personalizado para transformar sua vida financeira. Sessões individuais com análise completa da sua situação atual, definição de metas e estratégias práticas para alcançar seus objetivos.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_400/v1768269200/Mentoria_Estrategia_Pessoal_cep2ri.png",
  },
  {
    title: "Framework Controle Total",
    description: "Metodologia completa para você dominar suas finanças pessoais. Planilhas, ferramentas e um passo a passo prático para organizar receitas, despesas, investimentos e criar uma reserva sólida.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_400/v1768269200/Framework_Controle_Total_e4cmjd.png",
  },
  {
    title: "Consultoria em Investimentos",
    description: "Orientação especializada para seus investimentos. Análise do seu perfil de investidor, montagem de carteira diversificada e acompanhamento contínuo para maximizar seus rendimentos com segurança.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_400/v1768269199/Carteira_de_Investimentos_ueki0u.png",
  },
  {
    title: "Gestão de Dívidas",
    description: "Reorganize sua vida financeira e saia do vermelho. Mapeamento completo das dívidas, estratégias de negociação, plano de quitação e educação financeira para nunca mais se endividar.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_400/v1768269199/Gest%C3%A3o_de_Dividas_mwf49b.png",
  },
  {
    title: "Planejamento de Aposentadoria",
    description: "Garanta sua tranquilidade futura com um plano personalizado. Cálculo do valor necessário, escolha dos melhores investimentos e estratégias fiscais para você aproveitar a aposentadoria sem preocupações.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_400/v1768257456/Planejamento_de_Aposentadoria_qzbv4c.png",
  },
  {
    title: "Planejamento Sucessório",
    description: "Proteja o futuro da sua família com estruturação patrimonial inteligente. Testamento, holdings familiares, seguros e estratégias para transferência de patrimônio com menor carga tributária.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_400/v1768257457/Planejamento_Sucess%C3%B3rio_vfvadr.png",
  },
];

const getWhatsAppUrl = (serviceTitle: string) => {
  const message = `Oi, vim do link da bio. Quero saber mais sobre ${serviceTitle}!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const PersonalServicesModal = ({ open, onOpenChange }: PersonalServicesModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="w-[calc(100%-2.5rem)] max-w-[400px] mx-auto rounded-3xl overflow-hidden p-0 border-0 max-h-[85vh]"
        aria-labelledby="personal-services-modal-title"
      >
        <DialogHeader className="p-5 pb-3 border-b border-border">
          <DialogTitle id="personal-services-modal-title" className="text-lg font-bold text-center">
            Serviços para Pessoas
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(85vh-80px)]">
          <div className="p-4 space-y-4">
            {personalServices.map((service, index) => (
              <a
                key={index}
                href={getWhatsAppUrl(service.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm block hover:border-primary/50 transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-full h-32 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-base text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalServicesModal;
