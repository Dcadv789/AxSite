export const sidebarGroupsByProduct: Record<
  string,
  readonly { label: string; collectionIds: readonly string[] }[]
> = {
  axdeal: [
    {
      label: 'Começando',
      collectionIds: ['primeiros-passos', 'inicio-dashboard'],
    },
    {
      label: 'Módulos',
      collectionIds: [
        'negocios',
        'financeiro',
        'resultados-dre',
        'cadastros',
        'configuracoes',
      ],
    },
    {
      label: 'Avançado',
      collectionIds: [
        'automacoes-integracoes',
        'nichos',
        'crm-marketing',
        'seguranca-lgpd',
      ],
    },
    {
      label: 'Diretrizes e Políticas',
      collectionIds: ['axdeal-diretrizes'],
    },
  ],
  axchat: [
    {
      label: 'Começando',
      collectionIds: ['axchat-primeiros-passos', 'axchat-caixa-entrada'],
    },
    {
      label: 'Atendimento',
      collectionIds: [
        'axchat-contatos-canais',
        'axchat-roteamento-automacoes',
        'axchat-funil',
      ],
    },
    {
      label: 'Inteligência Artificial',
      collectionIds: [
        'axchat-agentes-ia',
        'axchat-marketing',
        'axchat-assistente',
      ],
    },
    {
      label: 'Administração',
      collectionIds: [
        'axchat-config-dashboard',
        'axchat-admin-integracoes',
        'axchat-diretrizes',
      ],
    },
  ],
};

/** @deprecated Use sidebarGroupsByProduct[productId] */
export const sidebarGroups = sidebarGroupsByProduct.axdeal;
