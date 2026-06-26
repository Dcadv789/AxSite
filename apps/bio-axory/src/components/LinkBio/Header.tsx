// Logo branca da Axory (proxy de imagens) — mesma usada no site e na ajuda.
const AXORY_LOGO = "https://img.axory.com.br/insecure/rs:fit:1440:1080/q:95/plain/https://storage.axory.com.br/imagens-saas-sites/Logo_axory_branco.svg@webp";

const Header = () => {
  return (
    <header className="gradient-header pt-8 pb-12 px-6 flex items-center justify-center">
      <img
        src={AXORY_LOGO}
        alt="Axory Capital Group - Página inicial"
        className="h-[4.5rem] w-auto"
        width="180"
        height="72"
      />
    </header>
  );
};

export default Header;