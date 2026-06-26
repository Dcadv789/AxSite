import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Copy, Check } from "lucide-react";
import { FaPix } from "react-icons/fa6";

interface PixModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DEFAULT_MESSAGE = "Pgto via link da Bio";
const MAX_MESSAGE_LENGTH = 25; // Limite do PIX para descrição

// Remove acentos e caracteres especiais (mantém espaço)
const normalizePixText = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
};

// Função para gerar o payload PIX EMV
const generatePixPayload = (value: number, cnpj: string, message: string): string => {
  const formatField = (id: string, value: string): string => {
    const len = value.length.toString().padStart(2, "0");
    return `${id}${len}${value}`;
  };

  const finalMessage = message.trim() || DEFAULT_MESSAGE;
  const description = normalizePixText(finalMessage).slice(0, MAX_MESSAGE_LENGTH);

  // Merchant Account Information (ID 26)
  const gui = formatField("00", "br.gov.bcb.pix");
  const chave = formatField("01", cnpj);
  const descField = description ? formatField("02", description) : "";
  const merchantAccountInfo = formatField("26", gui + chave + descField);

  // Additional Data Field Template (ID 62) - TXID padrão
  const additionalData = formatField("62", formatField("05", "***"));

  // Valor formatado
  const valorFormatado = value.toFixed(2);

  // Payload
  let payload = "";
  payload += formatField("00", "01"); // Payload Format Indicator
  payload += merchantAccountInfo; // Merchant Account Information
  payload += formatField("52", "0000"); // Merchant Category Code
  payload += formatField("53", "986"); // Transaction Currency (BRL)
  payload += formatField("54", valorFormatado); // Transaction Amount
  payload += formatField("58", "BR"); // Country Code
  payload += formatField("59", "AXORY CAPITAL"); // Merchant Name
  payload += formatField("60", "SAO PAULO"); // Merchant City
  payload += additionalData; // Additional Data Field

  // CRC16
  payload += "6304";
  const crc = crc16(payload);
  payload = payload.slice(0, -4) + formatField("63", crc);

  return payload;
};

// Função CRC16 CCITT-FALSE
const crc16 = (str: string): string => {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
};

const CNPJ = "49132263000143";

const PixModal = ({ open, onOpenChange }: PixModalProps) => {
  const [step, setStep] = useState(1);
  const [rawValue, setRawValue] = useState(0); // valor em centavos
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const amountInputRef = useRef<HTMLInputElement>(null);

  const placeAmountCaretAtEnd = () => {
    const el = amountInputRef.current;
    if (!el) return;
    const len = el.value.length;
    try {
      el.setSelectionRange(len, len);
    } catch {
      // ignore (some mobile browsers)
    }
  };

  const numericValue = rawValue / 100;
  const pixPayload = numericValue > 0 ? generatePixPayload(numericValue, CNPJ, message) : "";

  const handleNext = () => {
    if (step === 1 && numericValue > 0) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleCopy = async () => {
    if (pixPayload) {
      await navigator.clipboard.writeText(pixPayload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after close
    setTimeout(() => {
      setStep(1);
      setRawValue(0);
      setMessage("");
      setCopied(false);
    }, 300);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setRawValue(parseInt(onlyNumbers) || 0);
  };

  const formatCurrency = (cents: number): string => {
    return (cents / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        onOpenAutoFocus={(e) => {
          // Avoid Radix auto-select behavior on the amount input
          e.preventDefault();
          requestAnimationFrame(() => {
            const el = amountInputRef.current;
            if (!el) return;
            el.focus();
            const len = el.value.length;
            try {
              el.setSelectionRange(len, len);
            } catch {
              // ignore
            }
          });
        }}
        className="w-[calc(100%-2.5rem)] max-w-[320px] mx-auto rounded-3xl overflow-hidden"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step === 2 && (
              <button
                onClick={handleBack}
                className="p-1 -ml-1 rounded-md hover:bg-muted transition-colors"
                aria-label="Voltar"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <FaPix className="w-5 h-5 text-bpo-blue" aria-hidden="true" />
            Pagamento PIX
          </DialogTitle>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-4" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={2} aria-label={`Etapa ${step} de 2`}>
          <div className={`w-8 h-1 rounded-full transition-colors ${step >= 1 ? "bg-bpo-blue" : "bg-border"}`} />
          <div className={`w-8 h-1 rounded-full transition-colors ${step >= 2 ? "bg-bpo-blue" : "bg-border"}`} />
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Digite o valor que deseja pagar
              </p>
              <div className="relative">
                <label htmlFor="pix-amount" className="sr-only">Valor do pagamento</label>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-muted-foreground" aria-hidden="true">
                  R$
                </span>
                <Input
                  id="pix-amount"
                  ref={amountInputRef}
                  type="text"
                  inputMode="numeric"
                  placeholder="0,00"
                  value={rawValue === 0 ? "" : formatCurrency(rawValue)}
                  onChange={handleValueChange}
                  onFocus={() => {
                    requestAnimationFrame(() => placeAmountCaretAtEnd());
                  }}
                  onSelect={() => {
                    requestAnimationFrame(() => placeAmountCaretAtEnd());
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && numericValue > 0) {
                      e.preventDefault();
                      handleNext();
                    }
                  }}
                  className="pl-14 pr-4 text-3xl md:text-3xl font-bold text-right h-16"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pix-message" className="text-sm text-muted-foreground mb-2 block">
                Mensagem (opcional)
              </label>
              <div className="relative">
                <Input
                  id="pix-message"
                  type="text"
                  placeholder={DEFAULT_MESSAGE}
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                  maxLength={MAX_MESSAGE_LENGTH}
                  aria-describedby="pix-message-count"
                  className="text-center pr-14"
                />
                <span
                  id="pix-message-count"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none"
                >
                  {message.length}/{MAX_MESSAGE_LENGTH}
                </span>
              </div>
            </div>

            <Button
              onClick={handleNext}
              disabled={numericValue <= 0}
              className="w-full bg-bpo-blue hover:opacity-90"
            >
              Continuar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Valor a pagar
              </p>
              <p className="text-2xl font-bold text-foreground mb-4">
                R$ {formatCurrency(rawValue)}
              </p>
              
              <div className="bg-white p-4 rounded-xl inline-block">
                <QRCodeSVG 
                  value={pixPayload} 
                  size={200}
                  level="M"
                  includeMargin={false}
                />
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Escaneie o QR Code com o app do seu banco
              </p>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Copie o código e cole no campo “PIX Copia e Cola” do app do seu banco.
            </p>

            <Button
              onClick={handleCopy}
              className="w-full bg-bpo-blue hover:opacity-90 text-primary-foreground"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar código PIX
                </>
              )}
            </Button>

          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PixModal;
