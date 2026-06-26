const HeroCard = () => {
  return (
    <section className="bg-card rounded-t-3xl -mt-4 relative z-10 px-5 pt-6 pb-4" aria-labelledby="hero-heading">
      <h1 id="hero-heading" className="text-foreground text-xl font-extrabold text-center mb-5 tracking-tight">
        SUA GESTÃO FINANCEIRA
      </h1>

      <div className="bg-bpo-blue rounded-2xl p-5">
        <h2 className="text-primary-foreground text-[13px] font-bold tracking-wider uppercase mb-3">
          BPO e estratégia para líderes exigentes
        </h2>
        
        <div className="w-12 h-0.5 bg-primary-foreground/40 mb-3" aria-hidden="true"></div>
        
        <p className="text-primary-foreground/90 text-sm leading-relaxed">
          Empoderamos sua liderança com inteligência financeira para você focar no crescimento, enquanto cuidamos da estratégia. Dê o primeiro passo com o <strong>Diagnóstico Financeiro Gratuito</strong> abaixo.
        </p>
      </div>
    </section>
  );
};

export default HeroCard;