const educationItems = [
  {
    title: "Cursos Online",
    description: "Aprenda finanças do zero.",
    cta: "Inscreva-se",
  },
  {
    title: "Workshops",
    description: "Eventos presenciais e online.",
    cta: "Ver agenda",
  },
];

const EducationSection = () => {
  return (
    <div className="bg-card px-5 py-5 border-t border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground font-bold text-lg">Educação</h3>
        <button className="text-primary text-sm font-medium hover:underline">
          Ver mais
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
        {educationItems.map((item, index) => (
          <div
            key={index}
            className="min-w-[200px] flex-shrink-0 bg-secondary rounded-2xl overflow-hidden"
          >
            <div className="h-24 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-xs">Imagem</span>
            </div>
            
            <div className="p-4">
              <h4 className="font-bold text-foreground text-sm mb-1">
                {item.title}
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed mb-2">
                {item.description}
              </p>
              <button className="text-muted-foreground/60 text-xs font-medium hover:text-primary transition-colors">
                {item.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection;
