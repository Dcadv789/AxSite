import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ServicesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WHATSAPP_NUMBER = "5511994561052";

const services = [
  {
    title: "BPO Financeiro",
    description: "Terceirização completa do seu departamento financeiro. Cuidamos de contas a pagar, receber, conciliação bancária, fluxo de caixa e relatórios gerenciais para você focar no crescimento do seu negócio.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_400/v1767986265/BPO_jzt0ja.png",
  },
  {
    title: "Consultoria Empresarial",
    description: "Análise profunda do seu negócio com diagnóstico financeiro, planejamento estratégico e implementação de melhorias. Identificamos gargalos e oportunidades para maximizar seus resultados.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_400/v1767986265/Consultoria_e1nvm8.png",
  },
  {
    title: "Treinamentos",
    description: "Capacitação personalizada para sua equipe em finanças empresariais, gestão de custos, análise de indicadores e tomada de decisões. Transforme seu time em especialistas financeiros.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_400/v1767986266/Treinamentos_ufgelz.png",
  },
  {
    title: "Antecipação de Recebíveis",
    description: "Acelere seu fluxo de caixa antecipando recebíveis de cartões, duplicatas e boletos. Condições competitivas e liberação rápida para manter sua empresa sempre capitalizada.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_400/v1768257251/Antecipa%C3%A7%C3%A3o_de_Receb%C3%ADveis_yf2sq0.png",
  },
  {
    title: "Gestão de Inadimplência",
    description: "Estratégias eficientes para reduzir a inadimplência e recuperar valores em atraso. Análise de risco de crédito, régua de cobrança automatizada e negociação profissional.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_400/v1768257251/Gest%C3%A3o_de_Inadimpl%C3%AAncia_ldsqgn.png",
  },
  {
    title: "Análise de Investimentos",
    description: "Avaliação técnica de oportunidades de investimento para sua empresa. Análise de viabilidade, retorno sobre investimento (ROI) e gestão de portfólio corporativo.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_400/v1768257251/An%C3%A1lise_de_Investimentos_lbwees.png",
  },
  {
    title: "Gestão de Risco",
    description: "Identifique, avalie e mitigue riscos financeiros do seu negócio. Proteja sua empresa contra incertezas do mercado, variações cambiais e oscilações econômicas.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_400/v1768257251/Gest%C3%A3o_de_Riscos_jtxydp.png",
  },
];

const getWhatsAppUrl = (serviceTitle: string) => {
  const message = `Oi, vim do link da bio. Quero saber mais sobre ${serviceTitle}!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const ServicesModal = ({ open, onOpenChange }: ServicesModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="w-[calc(100%-2.5rem)] max-w-[400px] mx-auto rounded-3xl overflow-hidden p-0 border-0 max-h-[85vh]"
        aria-labelledby="services-modal-title"
      >
        <DialogHeader className="p-5 pb-3 border-b border-border">
          <DialogTitle id="services-modal-title" className="text-lg font-bold text-center">
            Serviços para Empresas
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(85vh-80px)]">
          <div className="p-4 space-y-4">
            {services.map((service, index) => (
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

export default ServicesModal;
