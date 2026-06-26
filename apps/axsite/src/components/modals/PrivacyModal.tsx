import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Política de Privacidade</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">1. Introdução</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A Axory está comprometida em proteger sua privacidade. Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">2. Coleta de Informações</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Coletamos informações que você nos fornece diretamente, incluindo nome, endereço de e-mail, número de telefone e outras informações necessárias para prestar nossos serviços.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">3. Uso das Informações</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Utilizamos suas informações para:
                </p>
                <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-300">
                  <li>Fornecer e melhorar nossos serviços</li>
                  <li>Comunicar-nos com você sobre nossos serviços</li>
                  <li>Enviar atualizações e informações relevantes</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">4. Proteção de Dados</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
                </p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}