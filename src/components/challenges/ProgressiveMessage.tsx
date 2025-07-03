import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ProgressiveMessageProps {
  counter: number;
  hasFinished: boolean;
  isMobile?: boolean;
}

export function ProgressiveMessage({ counter, hasFinished, isMobile = false }: ProgressiveMessageProps) {
  const { t } = useTranslation();

  // Função para obter a mensagem baseada no valor do contador com timing EXATO de 7,5s cada
  const getProgressiveMessage = () => {
    if (hasFinished) {
      return {
        title: t('challenges.progressiveMessages.critical.title'),
        message: t('challenges.progressiveMessages.critical.message'),
        bgColor: "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30",
        borderColor: "border-red-200 dark:border-red-700",
        textColor: "text-red-600 dark:text-red-300",
        titleColor: "text-red-700 dark:text-red-300",
        icon: AlertTriangle,
        iconColor: "text-red-600 dark:text-red-400"
      };
    } else if (counter > 2500) { 
      // ESTÁGIO 1: R$ 10.000 até R$ 2.500 (EXATOS 7,5 segundos)
      return {
        title: t('challenges.progressiveMessages.normal.title'),
        message: t('challenges.progressiveMessages.normal.message'),
        bgColor: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30",
        borderColor: "border-green-200 dark:border-green-700",
        textColor: "text-green-600 dark:text-green-300",
        titleColor: "text-green-700 dark:text-green-300",
        icon: ArrowUp,
        iconColor: "text-green-600 dark:text-green-400"
      };
    } else if (counter > -250000) { 
      // ESTÁGIO 2: R$ 2.500 até -R$ 250.000 (EXATOS 7,5 segundos)
      return {
        title: t('challenges.progressiveMessages.notice.title'),
        message: t('challenges.progressiveMessages.notice.message'),
        bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/30",
        borderColor: "border-yellow-200 dark:border-yellow-700",
        textColor: "text-yellow-600 dark:text-yellow-300",
        titleColor: "text-yellow-700 dark:text-yellow-300",
        icon: ArrowDown,
        iconColor: "text-yellow-600 dark:text-yellow-400"
      };
    } else if (counter > -625000) { 
      // ESTÁGIO 3: -R$ 250.000 até -R$ 625.000 (EXATOS 7,5 segundos)
      return {
        title: t('challenges.progressiveMessages.desperate.title'),
        message: t('challenges.progressiveMessages.desperate.message'),
        bgColor: "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30",
        borderColor: "border-orange-200 dark:border-orange-700",
        textColor: "text-orange-600 dark:text-orange-300",
        titleColor: "text-orange-700 dark:text-orange-300",
        icon: ArrowDown,
        iconColor: "text-orange-600 dark:text-orange-400"
      };
    } else { 
      // ESTÁGIO 4: -R$ 625.000 até -R$ 1.000.000 (EXATOS 7,5 segundos)
      return {
        title: t('challenges.progressiveMessages.collapse.title'),
        message: t('challenges.progressiveMessages.collapse.message'),
        bgColor: "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30",
        borderColor: "border-red-200 dark:border-red-700",
        textColor: "text-red-600 dark:text-red-300",
        titleColor: "text-red-700 dark:text-red-300",
        icon: AlertTriangle,
        iconColor: "text-red-600 dark:text-red-400"
      };
    }
  };

  const progressiveMessage = getProgressiveMessage();
  const MessageIcon = progressiveMessage.icon;

  // Gerar chave única para cada estágio com ranges EXATOS
  const getStageKey = () => {
    if (hasFinished) return 'stage5-final';
    if (counter > 2500) return 'stage1-normal';      // 7,5s: +10k até +2,5k
    if (counter > -250000) return 'stage2-percebe';  // 7,5s: +2,5k até -250k
    if (counter > -625000) return 'stage3-tarde';    // 7,5s: -250k até -625k
    return 'stage4-colapso';                          // 7,5s: -625k até -1M
  };

  const getStageText = () => {
    if (hasFinished) return t('challenges.progressiveMessages.stages.critical');
    if (counter > 2500) return t('challenges.progressiveMessages.stages.stage1');
    if (counter > -250000) return t('challenges.progressiveMessages.stages.stage2');
    if (counter > -625000) return t('challenges.progressiveMessages.stages.stage3');
    return t('challenges.progressiveMessages.stages.stage4');
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${isMobile ? 'mobile-' : ''}${getStageKey()}`}
        initial={{ opacity: 0, y: 20, scale: isMobile ? 1 : 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: isMobile ? 1 : 0.9 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`${isMobile ? 'mt-6 p-4' : 'mt-8 p-6'} ${progressiveMessage.bgColor} border-2 ${progressiveMessage.borderColor} ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-xl`}
      >
        <div className={`flex items-center justify-center gap-${isMobile ? '2' : '3'} mb-${isMobile ? '3' : '4'}`}>
          <motion.div
            animate={{ 
              rotate: hasFinished || counter <= -625000 ? [0, 10, -10, 0] : [0, 5, -5, 0],
              scale: hasFinished ? [1, 1.1, 1] : [1, 1.05, 1]
            }}
            transition={{ 
              duration: hasFinished ? 2 : 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <MessageIcon className={`w-${isMobile ? '6' : '8'} h-${isMobile ? '6' : '8'} ${progressiveMessage.iconColor}`} />
          </motion.div>
          <h4 className={`text-${isMobile ? 'lg' : 'xl'} font-bold ${progressiveMessage.titleColor} text-center`}>
            {progressiveMessage.title}
          </h4>
        </div>
        <p className={`${progressiveMessage.textColor} text-center ${isMobile ? 'text-sm' : ''} leading-relaxed`}>
          {progressiveMessage.message}
        </p>

        {/* Indicador visual de progresso do estágio atual */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <motion.div
              className={`h-1 rounded-full transition-all duration-300 ${
                counter > 2500 ? 'bg-green-500' :
                counter > -250000 ? 'bg-yellow-500' :
                counter > -625000 ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ 
                width: `${Math.max(0, Math.min(100, (counter + 1000000) / 10100))}%` 
              }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
            {getStageText()}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}