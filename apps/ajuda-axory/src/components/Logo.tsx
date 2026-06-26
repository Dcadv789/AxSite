import { cn } from '../lib/cn';

const LOGO_SRC =
  'https://res.cloudinary.com/ducd9j4tx/image/upload/v1751041685/Ativo_25_n6x26v.svg';

interface LogoProps {
  className?: string;
  /** `default` fundo claro; `onDark` fundo escuro ou colorido (logo branca) */
  variant?: 'default' | 'onDark';}

export default function Logo({ className = '', variant = 'default' }: LogoProps) {
  return (
    <img
      src={LOGO_SRC}
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
