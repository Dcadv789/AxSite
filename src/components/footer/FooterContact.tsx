import React from 'react';
import { Mail, MapPin, Instagram, Youtube, Linkedin, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function FooterContact() {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: MessageCircle, href: 'https://wa.me/5511994561052?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20e%20quero%20agendar%20o%20diagn%C3%B3stico%20financeiro%20GRATUITO%20para%20minha%20empresa.' },
    { icon: Instagram, href: 'https://www.instagram.com/axory.capital', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@AxoryCap', label: 'YouTube' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/axory', label: 'LinkedIn' },
  ];

  return (
    <div className="lg:col-span-4 lg:col-start-9">
      <div className="ml-auto max-w-md">
        <h3 className="text-xl font-medium mb-6">Contato</h3>
        <div className="space-y-3">
          <a href="https://wa.me/5511994561052?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20e%20quero%20agendar%20o%20diagn%C3%B3stico%20financeiro%20GRATUITO%20para%20minha%20empresa." className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors duration-200">
            <MessageCircle className="w-6 h-6" />
            <span className="text-lg">(11) 99456-1052</span>
          </a>
          <a href="mailto:contato@axory.com.br" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors duration-200">
            <Mail className="w-6 h-6" />
            <span className="text-lg">contato@axory.com.br</span>
          </a>
          <a 
            href="https://www.google.com/maps/place/R.+Teodoro+Sampaio,+744+-+Conj+108+-+Pinheiros,+S%C3%A3o+Paulo+-+SP,+05406-000/@-23.557356,-46.677693,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce578461b7a6df:0x23460fed7ad40883!8m2!3d-23.557356!4d-46.677693!16s%2Fg%2F11pv7w2p2c?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <MapPin className="w-6 h-6 flex-shrink-0" />
            <span className="text-lg">Rua Teodoro Sampaio, 744 Cj 108 - São Paulo - SP - Brasil</span>
          </a>

          {/* Redes Sociais */}
          <div className="flex gap-4 pt-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <social.icon className="w-7 h-7" />
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}