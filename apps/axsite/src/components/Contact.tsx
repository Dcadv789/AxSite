import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GTMEvents } from '../utils/gtm';

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  message: string;
}

export function Contact() {
  const { t } = useTranslation();
  const [num1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2] = useState(Math.floor(Math.random() * 10) + 1);
  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    whatsapp: '',
    message: ''
  });

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    let formatted = numbers;
    if (numbers.length > 0) {
      formatted = `(${numbers.slice(0, 2)}`;
      if (numbers.length > 2) {
        formatted += `) ${numbers.slice(2, 7)}`;
        if (numbers.length > 7) {
          formatted += `-${numbers.slice(7, 11)}`;
        }
      }
    }
    return formatted;
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    if (formatted.length <= 15) {
      setFormData(prev => ({ ...prev, whatsapp: formatted }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseInt(userAnswer) !== correctAnswer) {
      alert('Por favor, verifique sua resposta para a soma.');
      return;
    }

    setIsLoading(true);
    setSubmitStatus('idle');

    // Track form submission attempt
    GTMEvents.gtmEvent('form_start', {
      form_name: 'contact_form',
      form_location: 'contact_section'
    });

    try {
      const response = await fetch("/api/loops/api/v1/contacts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 5d24ad463dbc4901f4bfe1673f71f755"
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.name.split(' ')[0],
          lastName: formData.name.split(' ').slice(1).join(' '),
          userGroup: "website-contact",
          metadata: {
            whatsapp: formData.whatsapp,
            message: formData.message
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          whatsapp: '',
          message: ''
        });
        setUserAnswer('');
        
        // Track successful form submission
        GTMEvents.formSubmit('contact_form', true);
        GTMEvents.gtmEvent('lead_generated', {
          lead_source: 'contact_form',
          lead_type: 'contact_request'
        });
      } else {
        throw new Error('Falha ao enviar formulário');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Erro ao enviar formulário:', error);
      
      // Track form submission error
      GTMEvents.formSubmit('contact_form', false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppContactClick = (source: string) => {
    GTMEvents.whatsappClick(source, 'diagnostic');
    GTMEvents.ctaClick('WhatsApp Contact', source);
  };

  const handleEmailClick = () => {
    GTMEvents.gtmEvent('email_click', {
      email: 'contato@axory.com.br',
      source: 'contact_section'
    });
  };

  const handleMapClick = () => {
    GTMEvents.gtmEvent('map_click', {
      location: 'São Paulo Office',
      source: 'contact_section'
    });
  };

  const correctAnswer = num1 + num2;

  return (
    <section id="contato" className="pt-12 md:pt-16 pb-12 md:pb-16 bg-white dark:bg-gray-900 scroll-mt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layout Mobile */}
        <div className="lg:hidden space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-[20px] sm:text-[15px] font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wide">
              {t('contact.title')}
            </h2>
            <p className="text-[24px] sm:text-[30px] text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          {/* Formulário Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-xl p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label htmlFor="name-mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name-mobile"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder={t('contact.form.placeholders.name')}
                  required
                  aria-describedby="name-help"
                />
              </div>

              <div className="space-y-4">
                <label htmlFor="email-mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email-mobile"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder={t('contact.form.placeholders.email')}
                  required
                  aria-describedby="email-help"
                />
              </div>

              <div className="space-y-4">
                <label htmlFor="whatsapp-mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  id="whatsapp-mobile"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleWhatsAppChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="(00) 00000-0000"
                  required
                  aria-describedby="whatsapp-help"
                />
              </div>

              <div className="space-y-4">
                <label htmlFor="message-mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message-mobile"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder={t('contact.form.placeholders.message')}
                  required
                  aria-describedby="message-help"
                />
              </div>

              <div className="space-y-4">
                <label htmlFor="verification-mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Verificação: Quanto é {num1} + {num2}?
                </label>
                <input
                  type="number"
                  id="verification-mobile"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Digite a resposta"
                  required
                  aria-describedby="verification-help"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg" role="alert">
                  Mensagem enviada com sucesso! Em breve entraremos em contato.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg" role="alert">
                  Erro ao enviar mensagem. Por favor, tente novamente.
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 dark:bg-blue-500 text-white py-4 px-8 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-describedby="submit-help"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
                {isLoading ? 'Enviando...' : t('contact.form.submit')}
              </motion.button>
            </form>
          </motion.div>

          {/* Informações de Contato Mobile */}
          <div className="space-y-6">
            <a 
              href="https://wa.me/5511994561052?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20e%20quero%20agendar%20o%20diagn%C3%B3stico%20financeiro%20GRATUITO%20para%20minha%20empresa." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleWhatsAppContactClick('contact_mobile')}
              className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
              aria-label="Entrar em contato via WhatsApp"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">WhatsApp</h3>
                <p>(11) 99456-1052</p>
              </div>
            </a>

            <a 
              href="mailto:contato@axory.com.br" 
              onClick={handleEmailClick}
              className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
              aria-label="Enviar email para contato@axory.com.br"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('contact.form.email')}</h3>
                <p>contato@axory.com.br</p>
              </div>
            </a>

            <a 
              href="https://www.google.com/maps/place/R.+Teodoro+Sampaio,+744+-+Conj+108+-+Pinheiros,+S%C3%A3o+Paulo+-+SP,+05406-000/@-23.557356,-46.677693,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce578461b7a6df:0x23460fed7ad40883!8m2!3d-23.557356!4d-46.677693!16s%2Fg%2F11pv7w2p2c?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={handleMapClick}
              className="flex items-start gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
              aria-label="Ver localização no Google Maps"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('contact.form.address')}</h3>
                <p>Rua Teodoro Sampaio, 744 Cj 108 - São Paulo - SP - Brasil</p>
              </div>
            </a>
          </div>
        </div>

        {/* Layout Desktop */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Coluna da esquerda - Imagem e Informações de Contato */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-left"
            >
              <h2 className="text-[20px] sm:text-[15px] font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wide">
                {t('contact.title')}
              </h2>
              <p className="text-[24px] sm:text-[30px] text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                {t('contact.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Imagem para modo light - otimizada */}
              <picture>
                <source 
                  srcSet="https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_auto,w_600/v1751423571/People_talking_in_office_a63kud.webp" 
                  type="image/webp"
                />
                <img
                  src="https://res.cloudinary.com/ducd9j4tx/image/upload/q_auto,w_600/v1751423571/People_talking_in_office_a63kud.png"
                  alt={t('contact.officeImage')}
                  className="w-full h-auto block dark:hidden"
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              
              {/* Imagem para modo dark - otimizada */}
              <picture>
                <source 
                  srcSet="https://res.cloudinary.com/ducd9j4tx/image/upload/f_webp,q_auto,w_600/v1751423571/Customer_Service_Executive_lrrrzp.webp" 
                  type="image/webp"
                />
                <img
                  src="https://res.cloudinary.com/ducd9j4tx/image/upload/q_auto,w_600/v1751423571/Customer_Service_Executive_lrrrzp.png"
                  alt={t('contact.officeImage')}
                  className="w-full h-auto hidden dark:block"
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <a 
                  href="https://wa.me/5511994561052?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20e%20quero%20agendar%20o%20diagn%C3%B3stico%20financeiro%20GRATUITO%20para%20minha%20empresa." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => handleWhatsAppContactClick('contact_desktop')}
                  className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
                  aria-label="Entrar em contato via WhatsApp"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">WhatsApp</h3>
                    <p className="text-gray-600 dark:text-gray-300">(11) 99456-1052</p>
                  </div>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <a 
                  href="mailto:contato@axory.com.br" 
                  onClick={handleEmailClick}
                  className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
                  aria-label="Enviar email para contato@axory.com.br"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('contact.form.email')}</h3>
                    <p className="text-gray-600 dark:text-gray-300">contato@axory.com.br</p>
                  </div>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <a 
                  href="https://www.google.com/maps/place/R.+Teodoro+Sampaio,+744+-+Conj+108+-+Pinheiros,+S%C3%A3o+Paulo+-+SP,+05406-000/@-23.557356,-46.677693,17z/data=!3m1!4b1!4m6!3m5!1s0x23460fed7ad40883!8m2!3d-23.557356!4d-46.677693!16s%2Fg%2F11pv7w2p2c?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={handleMapClick}
                  className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
                  aria-label="Ver localização no Google Maps"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('contact.form.address')}</h3>
                    <p className="text-gray-600 dark:text-gray-300">Rua Teodoro Sampaio, 744 Cj 108 - São Paulo - SP - Brasil</p>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Coluna da direita - Formulário */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-xl p-8 lg:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder={t('contact.form.placeholders.name')}
                  required
                  aria-describedby="name-help"
                />
              </div>

              <div className="space-y-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder={t('contact.form.placeholders.email')}
                  required
                  aria-describedby="email-help"
                />
              </div>

              <div className="space-y-4">
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleWhatsAppChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="(00) 00000-0000"
                  required
                  aria-describedby="whatsapp-help"
                />
              </div>

              <div className="space-y-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder={t('contact.form.placeholders.message')}
                  required
                  aria-describedby="message-help"
                />
              </div>

              <div className="space-y-4">
                <label htmlFor="verification" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Verificação: Quanto é {num1} + {num2}?
                </label>
                <input
                  type="number"
                  id="verification"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Digite a resposta"
                  required
                  aria-describedby="verification-help"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg" role="alert">
                  Mensagem enviada com sucesso! Em breve entraremos em contato.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg" role="alert">
                  Erro ao enviar mensagem. Por favor, tente novamente.
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-900 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-blue-500 text-white py-4 px-8 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-describedby="submit-help"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
                {isLoading ? 'Enviando...' : t('contact.form.submit')}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}