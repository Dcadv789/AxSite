import { cn } from '../lib/cn';

const LOGO_SRC =
  'https://res.cloudinary.com/ducd9j4tx/image/upload/v1751041685/Ativo_25_n6x26v.svg';
// Logo branca (servida pelo proxy de imagens) para fundos escuros/coloridos.
const LOGO_SRC_ON_DARK =
  'https://img.axory.com.br/insecure/rs:fit:1440:1080/q:95/plain/https://storage.axory.com.br/imagens-saas-sites/Logo_axory_branco.svg@webp';

interface LogoProps {
  className?: string;
  /** `default` fundo claro; `onDark` fundo escuro ou colorido (logo branca) */
  variant?: 'default' | 'onDark';}

export default function Logo({ className = '', variant = 'default' }: LogoProps) {
  return (
    <img
      src={variant === 'onDark' ? LOGO_SRC_ON_DARK : LOGO_SRC}
      alt="Axory"
      width={120}
      height={36}
      loading="eager"
      className={cn(
        'h-auto w-auto object-contain',
        variant === 'onDark' && 'brightness-0 invert',
        className
      )}
    />
  );
}
