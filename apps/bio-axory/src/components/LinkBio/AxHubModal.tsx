import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, PiggyBank, Calculator, TrendingUp, Target } from "lucide-react";
import { toast } from "sonner";

interface AxHubModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AXHUB_CREATE_USER_FUNCTION_URL =
  "https://swrzinjeiymzvyyslhnj.supabase.co/functions/v1/criar-usuario-lp";

const EXTERNAL_SUPABASE_URL = "https://swrzinjeiymzvyyslhnj.supabase.co";

// Chave pública (anon). Ok para uso no frontend.
const EXTERNAL_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3cnppbmplaXltenZ5eXNsaG5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMzA4MTcsImV4cCI6MjA2NjgwNjgxN30.W17nR0jtyRDlf7_118Whazh_6pE-rLDOxetYXBeYBmk";

const AxHubModal = ({ open, onOpenChange }: AxHubModalProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappDigits = whatsapp.replace(/\D/g, "");
  const isFormValid = name.trim() && email.trim() && whatsappDigits.length === 11;

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setWhatsapp(formatted);
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      const celularLimpo = whatsapp.replace(/\D/g, "");

      // Enviamos em múltiplos formatos para compatibilidade com a edge function
      const payload = {
        nome: name.trim(),
        email: email.trim().toLowerCase(),
        celular: celularLimpo,
        supabaseUrl: EXTERNAL_SUPABASE_URL,
        supabase_url: EXTERNAL_SUPABASE_URL,
      };

      // Algumas implementações leem via querystring; outras via body
      const url = new URL(AXHUB_CREATE_USER_FUNCTION_URL);
      url.searchParams.set("supabaseUrl", EXTERNAL_SUPABASE_URL);

      const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          apikey: EXTERNAL_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${EXTERNAL_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = { error: text || "Resposta inválida" };
      }

      if (!response.ok) {
        toast.error(data?.error || `Erro ao criar conta (${response.status}).`);
        return;
      }

      if (data?.success) {
        setStep(2);
        toast.success("Conta criada! Verifique seu e-mail.");
        return;
      }

      toast.error(data?.error || "Erro ao criar conta. Tente novamente.");
    } catch {
      toast.error("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setName("");
      setEmail("");
      setWhatsapp("");
    }, 300);
  };

  const features = [
    { icon: PiggyBank, text: "Reserva de Emergência" },
    { icon: Calculator, text: "CLT ou PJ" },
    { icon: TrendingUp, text: "Simulador de Financiamento" },
    { icon: Target, text: "Simulador de Investimentos" },
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="w-[calc(100%-2.5rem)] max-w-[360px] max-h-[90vh] mx-auto rounded-3xl overflow-y-auto p-0 border-0"
        aria-labelledby="axhub-modal-title"
        aria-describedby="axhub-modal-desc"
      >
        {step === 1 && (
          <>
            {/* Banner Container */}
            <img 
              src="https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_80,w_360/v1768337739/Banner_Link_bvrjl4.png"
              alt="AxHub - Plataforma de gestão financeira"
              className="w-full aspect-[16/9] object-cover -mt-px"
              loading="eager"
              decoding="async"
              width="360"
              height="202"
            />

            <div className="p-6 space-y-5">
              <DialogHeader className="space-y-2">
                <DialogTitle id="axhub-modal-title" className="text-xl font-bold text-center">
                  🚀 Acesso Exclusivo ao AxHub
                </DialogTitle>
                <DialogDescription
                  id="axhub-modal-desc"
                  className="text-sm text-muted-foreground text-center leading-relaxed"
                >
                  Comece <span className="font-semibold text-primary">gratuitamente</span> e experimente
                  as principais funcionalidades que vão transformar sua gestão financeira!
                </DialogDescription>
              </DialogHeader>

              {/* Features Preview */}
              <div className="space-y-2">
                <p className="text-xs text-center text-muted-foreground">
                  ✨ Explore nosso ecossistema de ferramentas:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {features.slice(0, 4).map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 bg-primary/5 rounded-lg p-2 text-xs"
                    >
                      <feature.icon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-foreground font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-center text-primary/80 font-medium">
                  + muito mais dentro da plataforma
                </p>
              </div>

              {/* Form */}
              <div className="space-y-3">
                <div>
                  <label htmlFor="axhub-name" className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Seu nome
                  </label>
                  <Input
                    id="axhub-name"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11"
                  />
                </div>

                <div>
                  <label htmlFor="axhub-email" className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Seu melhor e-mail
                  </label>
                  <Input
                    id="axhub-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                  />
                </div>

                <div>
                  <label htmlFor="axhub-whatsapp" className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    WhatsApp
                  </label>
                  <Input
                    id="axhub-whatsapp"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={whatsapp}
                    onChange={handleWhatsAppChange}
                    maxLength={15}
                    className="h-11"
                  />
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className="w-full h-12 bg-bpo-blue hover:bg-bpo-blue/90 text-white font-semibold text-sm"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processando...
                  </span>
                ) : (
                  "Quero meu acesso gratuito!"
                )}
              </Button>

              <p className="text-[10px] text-muted-foreground text-center">
                Seus dados estão seguros. Não enviamos spam.
              </p>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* Mantém acessibilidade do Dialog quando o header visual não está presente */}
            <DialogHeader className="sr-only">
              <DialogTitle id="axhub-modal-title">Acesso Exclusivo ao AxHub</DialogTitle>
              <DialogDescription id="axhub-modal-desc">Confirmação de cadastro</DialogDescription>
            </DialogHeader>

            <div className="p-8 space-y-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">
                  🎉 Parabéns, {name.split(" ")[0]}!
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Seu cadastro foi realizado com sucesso! Em <span className="font-semibold text-primary">instantes</span> você
                  receberá no e-mail <span className="font-semibold text-foreground">{email}</span> todas as instruções
                  para acessar o AxHub.
                </p>
              </div>

              <div className="bg-primary/5 rounded-xl p-4 space-y-2">
                <p className="text-sm font-medium text-foreground">📧 Fique de olho na sua caixa de entrada!</p>
                <p className="text-xs text-muted-foreground">
                  Caso não encontre, verifique também a pasta de spam ou promoções.
                </p>
              </div>

              <Button
                onClick={handleClose}
                className="w-full h-12 bg-bpo-blue hover:bg-bpo-blue/90 text-white font-semibold"
              >
                Entendido!
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AxHubModal;
