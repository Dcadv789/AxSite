import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SystemsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const systems = [
  {
    title: "AxDeal",
    description: "App de cobranças inteligente para automatizar sua gestão de recebíveis. Envio automático de lembretes, régua de cobrança personalizada, integração com WhatsApp e relatórios de inadimplência.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_90,w_500/v1768937113/Ax.Deal_ylozxa.png",
    url: "https://deal.axory.com.br",
  },
  {
    title: "AxDash",
    description: "Dashboard executivo com todos os seus indicadores financeiros em tempo real. Gráficos interativos, alertas automáticos, comparativos de períodos e KPIs essenciais para acompanhar a saúde financeira.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_90,w_500/v1768937113/Ax.Dash_dh3zri.png",
    url: "https://dash.axory.com.br",
  },
  {
    title: "AxHub",
    description: "Plataforma completa de gestão financeira empresarial. Controle de contas a pagar e receber, fluxo de caixa, conciliação bancária, DRE automático e relatórios gerenciais personalizados.",
    image: "https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_90,w_500/v1768937113/Ax.HUB_k1z3ob.png",
    url: "https://hub.axory.com.br",
  },
];

const SystemsModal = ({ open, onOpenChange }: SystemsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="w-[calc(100%-2.5rem)] max-w-[400px] mx-auto rounded-3xl overflow-hidden p-0 border-0 max-h-[85vh]"
        aria-labelledby="systems-modal-title"
      >
        <DialogHeader className="p-5 pb-3 border-b border-border">
          <DialogTitle id="systems-modal-title" className="text-lg font-bold text-center">
            Nossos Sistemas
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(85vh-80px)]">
          <div className="p-4 space-y-4">
            {systems.map((system, index) => (
              <a
                key={index}
                href={system.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm block hover:border-primary/50 transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-full h-32 overflow-hidden">
                  <img
                    src={system.image}
                    alt={system.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-base text-foreground mb-2">
                    {system.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {system.description}
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

export default SystemsModal;
