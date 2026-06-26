import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const addDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const weekdayFormatter = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });
const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

// Horários fixos disponíveis
const allTimeSlots = [
  "9:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];
// Primeiros 6 horários para exibir no card principal
const timeSlots = allTimeSlots.slice(0, 6);

const SchedulingSection = () => {
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  // Generate next 5 weekdays - memoized
  const weekdays = useMemo(() => {
    const days = [];
    let currentDate = new Date();
    
    while (days.length < 5) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        days.push(new Date(currentDate));
      }
      currentDate = addDays(currentDate, 1);
    }
    return days;
  }, []);

  // Select central date on mount
  useEffect(() => {
    setSelectedDay(2);
  }, []);

  const getDayAbbr = (date: Date) => {
    return weekdayFormatter
      .format(date)
      .replace(".", "")
      .toUpperCase()
      .slice(0, 3);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (selectedDay === null || !selectedTime) return;

    setIsLoading(true);

    try {
      const selectedDate = weekdays[selectedDay];
      const [hours, minutes] = selectedTime.split(":").map(Number);
      
      // Create start datetime
      const startDateTime = new Date(selectedDate);
      startDateTime.setHours(hours, minutes, 0, 0);
      
      // Create end datetime (1 hour later)
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(endDateTime.getHours() + 1);

      const eventData = {
        nome: formData.name,
        email: formData.email,
        dataInicio: startDateTime.toISOString(),
        dataFim: endDateTime.toISOString(),
      };

      const response = await fetch(
        "https://swrzinjeiymzvyyslhnj.supabase.co/functions/v1/create-event",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3cnppbmplaXltenZ5eXNsaG5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMzA4MTcsImV4cCI6MjA2NjgwNjgxN30.W17nR0jtyRDlf7_118Whazh_6pE-rLDOxetYXBeYBmk",
          },
          body: JSON.stringify(eventData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao criar agendamento");
      }

      toast({
        title: "Agendamento confirmado!",
        description: `Sua reunião foi agendada para ${dateFormatter.format(selectedDate)} às ${selectedTime}. Verifique seu e-mail.`,
      });

      setIsModalOpen(false);
      setFormData({ name: "", email: "", company: "" });
      setSelectedTime(null);
    } catch (error: any) {
      console.error("Erro ao agendar:", error);
      toast({
        title: "Erro ao agendar",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="bg-card px-5 py-5 border-t border-border" aria-labelledby="scheduling-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="scheduling-heading" className="text-foreground font-bold text-lg">Agende sua análise GRATUITA</h2>
          <button 
            onClick={handleOpenModal}
            className="text-primary text-sm font-medium hover:underline"
            aria-label="Ver mais opções de agendamento"
          >
            Ver mais
          </button>
        </div>

        {/* Calendar Card */}
        <div className="bg-[#2459e5] rounded-3xl p-5 overflow-hidden" role="group" aria-label="Calendário de agendamento">
          <div className="flex gap-3 min-w-0">
            {/* Date Selection */}
            <fieldset className="flex-1 min-w-0 border-0">
              <legend className="text-white text-center text-sm mb-3 w-full">
                Data
              </legend>
              <div className="flex gap-1.5 justify-between" role="radiogroup" aria-label="Selecione uma data">
                {weekdays.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDay(index)}
                    role="radio"
                    aria-checked={selectedDay === index}
                    aria-label={`${getDayAbbr(date)} dia ${date.getDate()}`}
                    className={`flex flex-col items-center justify-end flex-1 min-w-0 max-w-11 h-28 py-3 rounded-full transition-all ${
                      selectedDay === index
                        ? "bg-white text-[#2459e5] shadow-lg"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    <span className="text-xs font-medium mb-auto pt-1">{getDayAbbr(date)}</span>
                    <span className="text-xl font-bold">{date.getDate()}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Separator */}
            <div className="flex flex-col items-center flex-shrink-0" aria-hidden="true">
              <div className="h-6"></div>
              <div className="flex-1 w-px bg-white/30 my-1"></div>
            </div>

            {/* Time Selection */}
            <fieldset className="w-20 sm:w-24 flex-shrink-0 border-0">
              <legend className="text-white text-center text-sm mb-3 w-full">
                Horário
              </legend>
              <div className="grid grid-cols-2 gap-1.5 h-28" role="radiogroup" aria-label="Selecione um horário">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    role="radio"
                    aria-checked={selectedTime === time}
                    aria-label={`Horário ${time}`}
                    className={`flex items-center justify-center rounded-xl text-[11px] sm:text-xs font-medium transition-all ${
                      selectedTime === time
                        ? "bg-white text-[#2459e5] shadow-lg ring-2 ring-white/50"
                        : "bg-white/90 text-foreground hover:bg-white"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[calc(100%-2.5rem)] max-w-sm mx-auto rounded-3xl overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold">
              Agendamento da Análise Gratuita
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Meeting info */}
            <div className="text-center text-sm mb-2">
              <p className="text-muted-foreground">Reunião com</p>
              <p className="font-semibold text-foreground">Daniel Charles | CEO Axory Capital Group</p>
            </div>

            {/* Date and Time Selection */}
            <div className="bg-primary/10 rounded-2xl p-4">
              <div className="flex gap-3">
                {/* Date Selection - Vertical */}
                <fieldset className="w-24 flex-shrink-0 border-0">
                  <legend className="text-foreground text-center text-sm font-medium mb-2 w-full">
                    Data
                  </legend>
                  <div className="flex flex-col gap-1" role="radiogroup" aria-label="Selecione uma data">
                    {weekdays.map((date, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedDay(index)}
                        role="radio"
                        aria-checked={selectedDay === index}
                        aria-label={`${getDayAbbr(date)} dia ${date.getDate()}`}
                        className={`flex items-center justify-between px-2 py-1.5 rounded-lg transition-all ${
                          selectedDay === index
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        <span className="text-[10px] font-medium">{getDayAbbr(date)}</span>
                        <span className="text-sm font-bold">{date.getDate()}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Separator */}
                <div className="w-px bg-border" aria-hidden="true"></div>

                {/* Time Selection - 4 columns */}
                <fieldset className="flex-1 border-0">
                  <legend className="text-foreground text-center text-sm font-medium mb-3 w-full">
                    Horário
                  </legend>
                  <div className="grid grid-cols-4 gap-1.5 max-h-40 overflow-y-auto" role="radiogroup" aria-label="Selecione um horário">
                    {allTimeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        role="radio"
                        aria-checked={selectedTime === time}
                        aria-label={`Horário ${time}`}
                        className={`flex items-center justify-center rounded-lg py-1.5 text-xs font-medium transition-all ${
                          selectedTime === time
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            {/* Form fields */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="name" className="sr-only">Seu nome</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  aria-required="true"
                />
              </div>
              <div>
                <Label htmlFor="email" className="sr-only">Seu e-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Seu e-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  aria-required="true"
                />
              </div>
              <div>
                <Label htmlFor="company" className="sr-only">Nome da empresa</Label>
                <Input
                  id="company"
                  placeholder="Nome da empresa"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
            </div>

            {/* Confirm button */}
            <Button 
              onClick={handleConfirm}
              className="w-full"
              disabled={selectedDay === null || !selectedTime || !formData.name.trim() || !formData.email.trim() || isLoading}
            >
              {isLoading ? "Agendando..." : "Confirmar Agendamento"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SchedulingSection;
