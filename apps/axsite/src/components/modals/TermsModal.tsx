import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Termos de Uso</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">1. Aceitação dos Termos</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Ao acessar e usar os serviços da Axory, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar ou usar nossos serviços.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">2. Descrição dos Serviços</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A Axory fornece serviços de consultoria financeira e empresarial, incluindo mas não se limitando a análise financeira, planejamento estratégico e gestão de recursos.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">3. Responsabilidades do Usuário</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Você concorda em:
                </p>
                <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-300">
                  <li>Fornecer informações precisas e atualizadas</li>
                  <li>Manter a confidencialidade de suas credenciais de acesso</li>
                  <li>Usar os serviços de acordo com as leis aplicáveis</li>
                  <li>Não realizar atividades fraudulentas ou prejudiciais</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">4. Limitação de Responsabilidade</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A Axory não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais ou consequentes resultantes do uso ou da incapacidade de usar nossos serviços.
                </p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}