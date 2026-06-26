import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUp, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CounterDisplayProps {
  counter: number;
  hasFinished: boolean;
  isMobile?: boolean;
}

export function CounterDisplay({ counter, hasFinished, isMobile = false }: CounterDisplayProps) {
  const { t } = useTranslation();

  // Função para calcular a cor baseada no valor do contador (transição gradual)
  const getCounterColor = () => {
    if (counter > 5000) {
      return {
        text: 'text-green-600 dark:text-green-400',
        bg: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30',
        border: 'border-green-200 dark:border-green-700',
        glow: 'shadow-green-500/20',
        icon: ArrowUp,
        iconColor: 'text-green-600 dark:text-green-400'
      };
    } else if (counter > 0) {
      const intensity = counter / 5000;
      if (intensity > 0.5) {
        return {
          text: 'text-yellow-600 dark:text-yellow-400',
          bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/30',
          border: 'border-yellow-200 dark:border-yellow-700',
          glow: 'shadow-yellow-500/20',
          icon: ArrowDown,
          iconColor: 'text-yellow-600 dark:text-yellow-400'
        };
      } else {
        return {
          text: 'text-orange-600 dark:text-orange-400',
          bg: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30',
          border: 'border-orange-200 dark:border-orange-700',
          glow: 'shadow-orange-500/20',
          icon: ArrowDown,
          iconColor: 'text-orange-600 dark:text-orange-400'
        };
      }
    } else {
      const intensity = Math.min(1, Math.abs(counter) / 500000);
      return {
        text: 'text-red-600 dark:text-red-400',
        bg: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30',
        border: 'border-red-200 dark:border-red-700',
        glow: `shadow-red-500/${Math.floor(30 + intensity * 40)}`,
        icon: ArrowDown,
        iconColor: 'text-red-600 dark:text-red-400'
      };
    }
  };

  const counterStyle = getCounterColor();
  const CounterIcon = counterStyle.icon;

  // Formatação do número com moeda baseada no idioma
  const formatCurrency = (value: number) => {
    const absValue = Math.abs(value);
    const formattedNumber = absValue.toLocaleString('pt-BR');
    const sign = value < 0 ? '-' : '';
    const currency = t('challenges.currency');
    return `${sign}${currency} ${formattedNumber}`;
  };

  const getStatusText = () => {
    if (counter > 5000) return t('challenges.status.positive');
    if (counter > 0) return isMobile ? t('challenges.status.falling_short') : t('challenges.status.falling');
    if (counter > -500000) return isMobile ? t('challenges.status.losses_short') : t('challenges.status.losses');
    return isMobile ? t('challenges.status.critical_short') : t('challenges.status.critical');
  };

  const getSubText = () => {
    if (isMobile) return null;
    if (counter > 0) return t('challenges.subtext.worrying');
    if (counter > -500000) return t('challenges.subtext.accelerating');
    return t('challenges.subtext.collapse');
  };

  if (isMobile) {
    return (
      <div className={`relative ${counterStyle.bg} ${counterStyle.border} border-2 rounded-2xl p-6 shadow-xl`}>
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ 
              y: counter <= 0 ? [0, 6, 0] : [0, -6, 0]
            }}
            transition={{ 
              duration: counter <= -500000 ? 0.8 : 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`w-12 h-12 rounded-xl ${counterStyle.bg} ${counterStyle.border} border flex items-center justify-center shadow-lg`}
          >
            <CounterIcon className={`w-6 h-6 ${counterStyle.iconColor}`} strokeWidth={2.5} />
          </motion.div>

          <motion.div
            key={Math.floor(counter / 2000)}
            initial={{ scale: 1.1, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.1 }}
            className={`text-2xl font-black ${counterStyle.text} tracking-tight text-center`}
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {formatCurrency(counter)}
          </motion.div>

          <p className={`text-sm font-semibold ${counterStyle.text} text-center`}>
            {getStatusText()}
          </p>

          {/* Barra de progresso mobile */}
          <div className="w-full">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <motion.div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  counter > 5000 ? 'bg-green-500' :
                  counter > 0 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ 
                  width: `${Math.max(0, Math.min(100, (counter + 1000000) / 10100))}%` 
                }}
              />
            </div>
          </div>
        </div>

        {counter <= 0 && (
          <motion.div
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ 
              duration: counter <= -500000 ? 0.8 : 1.2,
              repeat: Infinity 
            }}
            className="absolute inset-0 rounded-2xl bg-red-500/10 pointer-events-none"
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Glow effect de fundo */}
      <div className={`absolute inset-0 rounded-3xl ${counterStyle.glow} blur-xl opacity-60`}></div>
      
      {/* Card principal */}
      <div className={`relative ${counterStyle.bg} ${counterStyle.border} border-2 rounded-3xl p-10 backdrop-blur-sm shadow-2xl`}>
        
        {/* Header com ícone */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ 
              y: counter <= 0 ? [0, 8, 0] : [0, -8, 0],
              rotate: counter <= 0 ? [0, 3, -3, 0] : [0, -3, 3, 0]
            }}
            transition={{ 
              duration: counter <= -500000 ? 0.8 : 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`w-16 h-16 rounded-2xl ${counterStyle.bg} ${counterStyle.border} border flex items-center justify-center shadow-lg`}
          >
            <CounterIcon className={`w-8 h-8 ${counterStyle.iconColor}`} strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Número principal com moeda e animação ultra rápida */}
        <motion.div
          key={Math.floor(counter / 2000)}
          initial={{ scale: 1.1, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          className={`text-6xl font-black ${counterStyle.text} tracking-tight mb-4 text-center`}
          style={{ 
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textShadow: counter <= 0 ? '0 0 30px rgba(239, 68, 68, 0.3)' : '0 0 30px rgba(34, 197, 94, 0.3)'
          }}
        >
          {formatCurrency(counter)}
        </motion.div>

        {/* Status text */}
        <div className="space-y-2 text-center">
          <p className={`text-lg font-semibold ${counterStyle.text}`}>
            {getStatusText()}
          </p>
          {getSubText() && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {getSubText()}
            </p>
          )}
        </div>

        {/* Indicador de progresso */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full transition-all duration-300 ${
                counter > 5000 ? 'bg-green-500' :
                counter > 0 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ 
                width: `${Math.max(0, Math.min(100, (counter + 1000000) / 10100))}%` 
              }}
            />
          </div>
        </div>
      </div>

      {/* Efeitos visuais para números negativos */}
      {counter <= 0 && (
        <>
          <motion.div
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ 
              duration: counter <= -500000 ? 0.8 : 1.2,
              repeat: Infinity 
            }}
            className="absolute inset-0 rounded-3xl bg-red-500/10 pointer-events-none"
          />
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
          <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-red-400 rounded-full animate-ping delay-300"></div>
          
          {/* Efeitos extras para situação crítica */}
          {counter <= -500000 && (
            <>
              <div className="absolute -top-2 -left-2 w-3 h-3 bg-red-600 rounded-full animate-ping delay-150"></div>
              <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-red-500 rounded-full animate-ping delay-450"></div>
            </>
          )}
        </>
      )}
    </div>
  );
}