import { 
  TrendingUp, 
  Star, 
  Zap, 
  Shield, 
  Wifi,
  Clock
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function PaymentBenefits() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: TrendingUp,
      title: t('paymentSolutions.benefits.rates.title'),
      description: t('paymentSolutions.benefits.rates.description')
    },
    {
      icon: Star,
      title: t('paymentSolutions.benefits.design.title'),
      description: t('paymentSolutions.benefits.design.description')
    },
    {
      icon: Zap,
      title: t('paymentSolutions.benefits.processing.title'),
      description: t('paymentSolutions.benefits.processing.description')
    },
    {
      icon: Shield,
      title: t('paymentSolutions.benefits.security.title'),
      description: t('paymentSolutions.benefits.security.description')
    },
    {
      icon: Wifi,
      title: t('paymentSolutions.benefits.connectivity.title'),
      description: t('paymentSolutions.benefits.connectivity.description')
    },
    {
      icon: Clock,
      title: t('paymentSolutions.benefits.support.title'),
      description: t('paymentSolutions.benefits.support.description')
    }
  ];

  return { benefits };
}