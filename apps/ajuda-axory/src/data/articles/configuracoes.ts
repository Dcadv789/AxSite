import type { Article } from '../../types';

export const configuracoesArticles: Article[] = [
  {
    id: 'tour-configuracoes',
    slug: 'tour-configuracoes',
    collectionId: 'configuracoes',
    title: 'Tour pelo hub de configurações (6 áreas)',
    description: 'Visão geral de todas as 6 áreas de configurações do AxDeal e o que você encontra em cada uma.',
    keywords: ['configurações', 'hub', 'áreas', 'tour', 'visão geral', 'menu configurações'],
    updatedAt: '2026-06-25',
    related: ['dados-empresa-fiscal', 'contas-bancarias', 'regua-cobranca'],
    body: `
# Tour pelo hub de configurações

O hub de configurações do AxDeal é acessado pelo menu lateral em **Configurações**. Ele é dividido em **6 áreas** organizadas por tema:

\`\`\`mermaid
flowchart TD
  CFG["Hub de Configurações"] --> A1["1. Empresa & Sistema<br/>Dados da empresa, fiscal, automações, modelos de texto"]
  CFG --> A2["2. Estrutura Financeira<br/>Contas bancárias, categorias DRE, régua de cobrança"]
  CFG --> A3["3. Comercial<br/>Parâmetros de venda, metas, comissões, propostas"]
  CFG --> A4["4. Impressões & PDF<br/>Layout de documentos e boletos"]
  CFG --> A5["5. Integrações & API<br/>Webhooks, tokens de API, Asaas/Split"]
  CFG --> A6["6. Privacidade & LGPD<br/>Consentimentos, retenção e solicitações de titulares"]
\`\`\`

## Área 1 — Empresa & Sistema

| Aba | O que fazer |
|-----|------------|
| **Parâmetros Gerais** | Logo da empresa, CNPJ, e-mail e telefone de suporte |
| **Automações** | Gatilhos e parâmetros de automações do sistema |
| **Padrões do Sistema** | Série NF padrão, casas decimais, desconto máximo permitido |
| **Estrutura Organizacional** | Criar departamentos e projetos (centros de custo) |
| **Fiscal** | IE, IM, CNAE, regime tributário (Simples, Lucro Presumido, Lucro Real) |
| **Modelos de Textos** | Templates de e-mail, WhatsApp e régua de cobrança |
| **Campos Customizados** | Criar campos extras para propostas, pedidos, OS e contratos |
| **Fechamento do Mês** | Configurar itens do checklist de fechamento |

## Área 2 — Estrutura Financeira

Onde você configura as bases do financeiro: contas bancárias, categorias do DRE, taxas de cartão e a régua de cobrança. Veja artigos específicos para cada um.

## Área 3 — Comercial

Parâmetros de venda (desconto máximo, aprovação obrigatória), configuração de propostas (validade padrão, termos e condições), metas e comissões.

## Área 4 — Impressões & PDF

Personalize o visual dos documentos gerados pelo sistema: cores, logo, fonte. Você pode configurar separadamente: OS, Pedido de Venda, Proposta, Contrato, PDV e Boleto.

## Área 5 — Integrações & API

Aqui ficam os tokens de API pública, configurações de Webhooks e a integração com o Asaas (split de pagamentos e checkout).

## Área 6 — Privacidade & LGPD

Gerencie os consentimentos de titulares de dados, políticas de retenção e responda a solicitações de exportação, exclusão ou correção de dados pessoais.
`,
  },
  {
    id: 'dados-empresa-fiscal',
    slug: 'dados-empresa-fiscal',
    collectionId: 'configuracoes',
    title: 'Dados da empresa e configurações fiscais',
    description: 'Como configurar os dados da empresa, regime tributário e informações para emissão de NF.',
    keywords: ['empresa', 'cnpj', 'fiscal', 'ie', 'im', 'regime tributário', 'simples nacional', 'cnae'],
    updatedAt: '2026-06-25',
    related: ['tour-configuracoes', 'emitir-nota-fiscal'],
    body: `
# Dados da empresa e configurações fiscais

## Dados gerais da empresa

Acesse **Configurações → Empresa & Sistema → Parâmetros Gerais**:

| Campo | Para que serve |
|-------|---------------|
| **Logo** | Aparece nos PDFs de documentos, boletos e proposta |
| **Razão Social / Nome** | Nome que aparece nos cabeçalhos |
| **CNPJ / CPF** | Documento da empresa |
| **E-mail de suporte** | Exibido nos documentos enviados ao cliente |
| **Telefone / WhatsApp** | Contato nos documentos |
| **Site** | URL da empresa (opcional) |

## Configurações fiscais (para emitir NF)

Acesse **Configurações → Empresa & Sistema → Fiscal**:

| Campo | O que preencher |
|-------|----------------|
| **IE** | Inscrição Estadual |
| **IM** | Inscrição Municipal |
| **CNAE** | Código da atividade econômica principal |
| **Regime Tributário** | Simples Nacional, Lucro Presumido ou Lucro Real |

> **Atenção:** essas informações são obrigatórias para emissão de notas fiscais. Qualquer dado incorreto pode gerar rejeição pelo SEFAZ.

## Estrutura Organizacional

Para criar departamentos (centros de custo) e projetos — úteis para filtrar o DRE por área da empresa:

Acesse **Configurações → Empresa & Sistema → Estrutura Organizacional**.

Depois de criar, você poderá vincular lançamentos financeiros ao departamento ou projeto correspondente.
`,
  },
  {
    id: 'contas-bancarias',
    slug: 'contas-bancarias',
    collectionId: 'configuracoes',
    title: 'Configurar contas bancárias e integração',
    description: 'Como cadastrar contas bancárias e habilitar integração com bancos digitais para boletos e PIX.',
    keywords: ['conta bancária', 'banco', 'integração', 'api bancária', 'pix', 'boleto', 'inter', 'asaas'],
    updatedAt: '2026-06-25',
    related: ['tour-configuracoes', 'conta-digital-pix', 'boletos-cnab'],
    body: `
# Configurar contas bancárias e integração

## Cadastrar uma conta bancária

1. Acesse **Configurações → Estrutura Financeira → Contas Bancárias**.
2. Clique em **"+ Nova Conta"**.
3. Preencha:

| Campo | Detalhe |
|-------|---------|
| **Banco** | Nome do banco |
| **Agência** | Número da agência |
| **Conta** | Número da conta com dígito |
| **Tipo** | Corrente ou Poupança |
| **Chave PIX** | Chave para recebimento PIX (CPF, CNPJ, e-mail, celular ou aleatória) |
| **Saldo inicial** | Saldo atual para o sistema começar com o valor correto |

## Habilitar integração bancária (Conta Digital)

Para contas digitais compatíveis (Inter, Asaas), você pode integrar o AxDeal para receber cobranças e monitorar o saldo em tempo real:

\`\`\`mermaid
flowchart LR
  A["Editar conta bancária"] --> B["Aba Integração"]
  B --> C["Inserir Client ID e Client Secret<br/>do banco"]
  C --> D["Ativar integração"]
  D --> E["Sistema sincroniza automaticamente"]
\`\`\`

> As credenciais de API são obtidas no painel do desenvolvedor do seu banco. Consulte o suporte do banco para mais detalhes.

## Taxas de cartão

Para conciliar corretamente as vendas no cartão, cadastre as taxas das suas adquirentes:

Acesse **Configurações → Estrutura Financeira → Taxas de Cartão**.

Configure por bandeira (Visa, Master, Elo, Amex) e tipo (débito, crédito à vista, crédito 2x a 12x).
`,
  },
  {
    id: 'regua-cobranca',
    slug: 'regua-cobranca',
    collectionId: 'configuracoes',
    title: 'Régua de cobrança automática',
    description: 'Como configurar notificações automáticas de cobrança antes e depois do vencimento.',
    keywords: ['régua de cobrança', 'cobrança automática', 'notificação', 'whatsapp', 'email', 'inadimplência'],
    updatedAt: '2026-06-25',
    related: ['tour-configuracoes', 'contas-a-receber'],
    body: `
# Régua de cobrança automática

A **régua de cobrança** envia mensagens automáticas para os clientes antes e depois do vencimento das parcelas — por WhatsApp e/ou e-mail.

## Como funciona

\`\`\`mermaid
timeline
  title Exemplo de Régua de Cobrança
  section Antes do vencimento
    D-3 : Lembrete amigável via WhatsApp
  section No vencimento
    D0 : Aviso de vencimento por e-mail
  section Após o vencimento
    D+3 : Lembrete de atraso
    D+7 : Cobrança com valor de juros
    D+15 : Notificação de inadimplência
\`\`\`

## Configurar a régua

1. Acesse **Configurações → Estrutura Financeira → Régua de Cobrança**.
2. Clique em **"+ Nova Régua"** ou edite uma existente.
3. Para cada notificação, configure:

| Campo | Opções |
|-------|--------|
| **Momento** | D-X (antes do vencimento) ou D+X (após o vencimento) |
| **Canal** | WhatsApp, E-mail ou ambos |
| **Modelo de mensagem** | Template pré-configurado em Modelos de Textos |

4. Ative a régua.

## Templates de mensagem

Os templates ficam em **Configurações → Empresa & Sistema → Modelos de Textos**.

Você pode usar variáveis dinâmicas no texto, como:
- \`{{nome_cliente}}\` — nome do cliente
- \`{{valor}}\` — valor da parcela
- \`{{vencimento}}\` — data de vencimento
- \`{{link_pagamento}}\` — link do portal do cliente para pagar online

## Exemplo de template para WhatsApp

> Olá, *{{nome_cliente}}*! 👋
> Sua cobrança de *R$ {{valor}}* vence em {{vencimento}}.
> Pague agora com PIX: {{link_pagamento}}
`,
  },
];
