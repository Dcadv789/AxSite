import type { Article } from '../../types';

export const stubArticles: Article[] = [
  // Automações & Integrações
  {
    id: 'visao-geral-automacoes',
    slug: 'visao-geral-automacoes',
    collectionId: 'automacoes-integracoes',
    title: 'Visão geral de automações e integrações',
    description: 'O que é possível automatizar no AxDeal e quais integrações estão disponíveis.',
    keywords: ['automação', 'integração', 'webhook', 'api', 'relatório automático'],
    updatedAt: '2026-06-25',
    related: ['webhooks', 'api-publica', 'relatorios-agendados'],
    body: `
# Visão geral de automações e integrações

O AxDeal oferece diversas formas de automatizar tarefas repetitivas e integrar com outros sistemas da sua empresa.

## O que você pode automatizar

| Automação | Como funciona |
|-----------|--------------|
| **Régua de cobrança** | Notificações automáticas por WhatsApp/e-mail antes e após vencimento |
| **Despesas recorrentes** | Geração automática de lançamentos mensais de despesas fixas |
| **Faturamento de contratos** | Parcelas geradas automaticamente conforme periodicidade |
| **Relatórios por e-mail** | Envio periódico de DRE, fluxo de caixa e outros relatórios |
| **Webhooks** | Notifica sistemas externos quando algo acontece no AxDeal |

## Próximos artigos desta seção

- Configurar Webhooks externos
- Usar a API Pública (tokens de acesso)
- Relatórios agendados por e-mail

> **Em construção:** artigos detalhados sobre cada integração estarão disponíveis em breve. Entre em contato com o suporte Axory para dúvidas específicas.
`,
  },
  {
    id: 'webhooks',
    slug: 'webhooks',
    collectionId: 'automacoes-integracoes',
    title: 'Configurar Webhooks externos',
    description: 'Como criar endpoints de webhook para receber notificações do AxDeal em outros sistemas.',
    keywords: ['webhook', 'endpoint', 'integração', 'evento', 'notificação', 'hmac'],
    updatedAt: '2026-06-25',
    related: ['api-publica', 'visao-geral-automacoes'],
    body: `
# Configurar Webhooks externos

Webhooks permitem que o AxDeal **notifique automaticamente** outros sistemas (ERP externo, CRM, automação de marketing) quando algo acontece.

## Como criar um endpoint

1. Acesse **Configurações → Integrações & API → Webhooks**.
2. Clique em **"+ Novo Endpoint"**.
3. Preencha:
   - **URL**: endereço HTTPS do seu servidor que vai receber os eventos
   - **Secret**: chave secreta para validar a assinatura HMAC das requisições
   - **Eventos**: selecione quais eventos você quer receber

## Eventos disponíveis (exemplos)

| Evento | Quando dispara |
|--------|---------------|
| \`parcela.paga\` | Quando uma parcela é dada como paga |
| \`proposta.aprovada\` | Quando uma proposta muda para APROVADA |
| \`pedido.cancelado\` | Quando um pedido é cancelado |
| \`contrato.criado\` | Quando um novo contrato é salvo |

## Histórico e reenvio

Em caso de falha (resposta ≠ 2xx), o AxDeal registra o erro no histórico de disparos. Você pode **reenviar manualmente** qualquer evento que falhou.

> **Em construção:** documentação completa do payload de cada evento disponível em breve.
`,
  },
  {
    id: 'api-publica',
    slug: 'api-publica',
    collectionId: 'automacoes-integracoes',
    title: 'API Pública — tokens e escopos',
    description: 'Como gerar tokens de acesso à API do AxDeal e quais dados você pode consultar ou enviar.',
    keywords: ['api', 'token', 'escopo', 'integração', 'developer', 'live', 'test'],
    updatedAt: '2026-06-25',
    related: ['webhooks', 'visao-geral-automacoes'],
    body: `
# API Pública — tokens e escopos

A API pública do AxDeal permite que sistemas externos leiam e gravem dados sem precisar fazer login na interface.

## Gerar um token

1. Acesse **Configurações → Integrações & API → API Tokens**.
2. Clique em **"+ Gerar Token"**.
3. Selecione os **escopos** (permissões do token):

| Escopo | Acesso |
|--------|--------|
| \`financeiro:read\` | Leitura de parcelas, categorias, contas |
| \`financeiro:write\` | Criar/editar lançamentos |
| \`contatos:read\` | Leitura de clientes |
| \`contatos:write\` | Criar/editar clientes |
| \`agenda:read\` / \`write\` | Agendamentos |
| \`relatorios:read\` | Relatórios e KPIs |

4. Escolha o **ambiente**: \`live\` (produção) ou \`test\` (sandbox).
5. Defina uma expiração (opcional) e o rate limit.
6. **Copie o token na hora** — ele é exibido apenas uma vez!

## Ambientes

| Prefixo | Ambiente |
|---------|---------|
| \`axd_live_...\` | Produção — afeta dados reais |
| \`axd_test_...\` | Sandbox — para testes sem impacto |

> **Em construção:** documentação completa dos endpoints REST disponível em breve.
`,
  },
  {
    id: 'relatorios-agendados',
    slug: 'relatorios-agendados',
    collectionId: 'automacoes-integracoes',
    title: 'Relatórios agendados por e-mail',
    description: 'Como configurar o envio automático de relatórios financeiros por e-mail.',
    keywords: ['relatório', 'agendado', 'email', 'automático', 'dre', 'fluxo de caixa', 'pdf', 'xlsx'],
    updatedAt: '2026-06-25',
    related: ['visao-geral-automacoes', 'entendendo-dre'],
    body: `
# Relatórios agendados por e-mail

Configure o AxDeal para enviar relatórios automaticamente para você e sua equipe.

## Como criar um relatório agendado

1. Acesse **Resultados → Relatórios Agendados**.
2. Clique em **"+ Novo Relatório"**.
3. Configure:

| Campo | Opções |
|-------|--------|
| **Tipo** | DRE Gerencial, Fluxo de Caixa, Contas a Receber, Contas a Pagar, Extrato Bancário, Inadimplência, KPI Financeiro |
| **Frequência** | Diário, Semanal, Quinzenal, Mensal |
| **Horário** | Ex.: 08:00 |
| **Dia** | Para semanal: dia da semana; para mensal: dia do mês (1-28) |
| **Destinatários** | Lista de e-mails separados por vírgula |
| **Formato** | PDF, Excel (.xlsx) ou CSV |

4. Ative o toggle e salve.

## Histórico de envios

Na mesma tela, você vê quando foi o último envio, quantos foram realizados e se houve erro. Clique em qualquer envio para ver o arquivo gerado.
`,
  },

  // Nichos
  {
    id: 'visao-geral-nichos',
    slug: 'visao-geral-nichos',
    collectionId: 'nichos',
    title: 'O que são os módulos de nicho?',
    description: 'Conheça os módulos especializados do AxDeal para diferentes segmentos de negócio.',
    keywords: ['nicho', 'módulo', 'delivery', 'agendamento', 'saúde', 'veterinária', 'imobiliária', 'jurídico'],
    updatedAt: '2026-06-25',
    related: ['visao-geral-automacoes'],
    body: `
# O que são os módulos de nicho?

Além do ERP genérico, o AxDeal oferece **módulos especializados** para segmentos específicos de negócio. Cada nicho adiciona funcionalidades exclusivas para aquele tipo de empresa.

## Nichos disponíveis

| Nicho | Para quem | O que adiciona |
|-------|-----------|---------------|
| 🛵 **Delivery** | Restaurantes, dark kitchens | Cardápio digital, pedidos online, operação mobile |
| 📅 **Agendamento** | Serviços com hora marcada | Agenda com tipos de atendimento, recursos e slots |
| 🏥 **Saúde** | Clínicas, consultórios | Prontuário eletrônico, evoluções SOAP, recibos |
| 🐾 **Veterinária** | Clínicas veterinárias | Ficha do animal, prontuário vet, evoluções |
| 🏠 **Imobiliária** | Imobiliárias, construtoras | Imóveis, contratos de locação/venda, visitas |
| ⚖️ **Jurídico** | Escritórios de advocacia | Processos, prazos, andamentos, honorários |
| 🏗️ **Arquitetura** | Arquitetos, engenheiros | Projetos, etapas de obra, medições faturáveis |

## Como ativar um nicho

\`\`\`mermaid
flowchart LR
  A["Contrate o módulo<br/>com a Axory"] --> B["Admin Axory ativa<br/>o nicho na sua conta"]
  B --> C["Menu do nicho aparece<br/>no sistema"]
  C --> D["Configure os parâmetros<br/>do nicho em Configurações"]
\`\`\`

> Os nichos são contratados individualmente. Entre em contato com o time Axory para habilitar um módulo de nicho na sua conta.

> **Em construção:** artigos detalhados para cada nicho estarão disponíveis em breve.
`,
  },

  // CRM
  {
    id: 'visao-geral-crm',
    slug: 'visao-geral-crm',
    collectionId: 'crm-marketing',
    title: 'Visão geral do CRM e Marketing',
    description: 'O que o módulo de CRM do AxDeal oferece para gestão de leads e pipeline de vendas.',
    keywords: ['crm', 'lead', 'pipeline', 'marketing', 'quiz', 'playbook', 'funil'],
    updatedAt: '2026-06-25',
    related: ['visao-geral-automacoes', 'cargos-e-permissoes'],
    body: `
# Visão geral do CRM e Marketing

O CRM do AxDeal é um módulo separado focado em **captação e qualificação de leads** e **gestão do pipeline de vendas**.

## O que está incluído no CRM

| Funcionalidade | O que faz |
|---------------|----------|
| **Leads** | Cadastro e acompanhamento de potenciais clientes |
| **Pipeline de Vendas** | Kanban com etapas do processo de venda |
| **Quiz Interativo** | Formulário inteligente para qualificar leads automaticamente |
| **Playbooks** | Roteiros de abordagem e follow-up para a equipe |
| **Campos Customizados** | Campos específicos por categoria de lead |

## Acesso ao CRM

O CRM é habilitado por uma flag de acesso (\`acesso_crm\`). Se você não vê o menu de CRM, entre em contato com a Axory para habilitar.

## Fluxo básico do lead

\`\`\`mermaid
flowchart LR
  A["Lead entra<br/>(formulário, indicação, quiz)"] --> B["Qualificação<br/>(campo customizados, pontuação)"]
  B --> C["Pipeline<br/>(etapas do processo comercial)"]
  C --> D["Proposta criada no ERP"]
  D --> E["Convertido em Cliente"]
\`\`\`

> **Em construção:** artigos detalhados sobre cada funcionalidade do CRM estarão disponíveis em breve.
`,
  },

  // LGPD
  {
    id: 'visao-geral-lgpd',
    slug: 'visao-geral-lgpd',
    collectionId: 'seguranca-lgpd',
    title: 'LGPD, auditoria e segurança no AxDeal',
    description: 'Como o AxDeal suporta a conformidade com a LGPD e mantém um registro completo de auditoria.',
    keywords: ['lgpd', 'privacidade', 'auditoria', 'consentimento', 'dados pessoais', 'segurança', 'backup'],
    updatedAt: '2026-06-25',
    related: ['cargos-e-permissoes', 'convidar-usuarios'],
    body: `
# LGPD, auditoria e segurança no AxDeal

O AxDeal foi desenvolvido com recursos para ajudar sua empresa a estar em conformidade com a **Lei Geral de Proteção de Dados (LGPD)**.

## Módulo de Auditoria

Acesse **Resultados → Auditoria** para ver um registro completo de tudo que aconteceu no sistema:
- Quem fez o quê e quando
- Valor anterior e valor novo em cada alteração
- Filtros por módulo, usuário, tipo de ação e período

## Módulo LGPD (Configurações → Privacidade & LGPD)

### Aba 1 — Políticas de Retenção
Configure por quanto tempo cada tipo de dado é mantido e o que fazer após o prazo (excluir, anonimizar, arquivar).

### Aba 2 — Consentimentos
Registre e gerencie os consentimentos de titulares de dados (clientes, colaboradores, leads): quando foi concedido, a finalidade e quando foi revogado.

### Aba 3 — Solicitações de Titulares
Gerencie pedidos de:
- **Exportação** de dados pessoais
- **Exclusão** de dados (direito ao esquecimento)
- **Correção** de informações
- **Revogação** de consentimento

O sistema controla o prazo de resposta (15 dias úteis conforme a lei).

## Backup de dados

O AxDeal realiza backup automático dos dados. Para mais informações sobre a política de backup, entre em contato com o suporte Axory.

> **Em construção:** artigos detalhados sobre cada funcionalidade de LGPD estarão disponíveis em breve.
`,
  },
];
