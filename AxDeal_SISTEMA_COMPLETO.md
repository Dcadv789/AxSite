# AxHub — Documentação Completa do Sistema
> Versão: Jun/2026 · Stack: Next.js 14 App Router · Supabase/PostgreSQL 17 · Tailwind CSS
> Este documento cobre 100% dos módulos, funcionalidades, tabelas e RPCs do sistema.

---

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Arquitetura e Identidade Visual](#2-arquitetura-e-identidade-visual)
3. [Módulos Genéricos](#3-módulos-genéricos)
   - 3.1 Início e Dashboard personalizável
   - 3.2 Negócios — Propostas, Pedidos, OS
   - 3.3 Negócios — Contratos
   - 3.4 Negócios — PDV
   - 3.5 Negócios — Notas Fiscais (AxConnect)
   - 3.6 Financeiro — Contas a Receber
   - 3.7 Financeiro — Contas a Pagar + Despesas Recorrentes
   - 3.8 Financeiro — Boletos Bancários
   - 3.9 Financeiro — Extrato e Importação OFX
   - 3.10 Financeiro — Conciliação Bancária
   - 3.11 Financeiro — Conciliação PDV
   - 3.12 Financeiro — Conta Digital
   - 3.13 Financeiro — Despesas operacionais
   - 3.14 Resultados e DRE Gerencial
   - 3.15 Cadastros
   - 3.16 Configurações ERP — Hub completo
   - 3.17 Recorrência de Cobrança
   - 3.18 Fluxo de Caixa Projetado
   - 3.19 Webhooks
   - 3.20 Relatórios Agendados por Email
   - 3.21 API Pública (Tokens)
   - 3.22 Pagamentos & Checkout (Split Asaas)
   - 3.23 CRM — Marketing
   - 3.24 MultiGestão (BPO/Parceiros)
   - 3.25 Sistema — Auditoria, LGPD e Backup
   - 3.26 Ficha Genérica (motor de campos customizados)
   - 3.27 Notificações In-App
4. [Módulos de Nicho](#4-módulos-de-nicho)
   - 4.1 Delivery
   - 4.2 Agendamento
   - 4.3 Saúde
   - 4.4 Veterinária
   - 4.5 Imobiliária
   - 4.6 Jurídico
   - 4.7 Arquitetura & Engenharia
5. [Controle de Acesso e Permissões](#5-controle-de-acesso-e-permissões)
6. [Engine de Nichos — Como funciona](#6-engine-de-nichos--como-funciona)
7. [Funções PostgreSQL (RPCs) — Catálogo completo](#7-funções-postgresql-rpcs--catálogo-completo)
8. [Banco de Dados — Tabelas por módulo](#8-banco-de-dados--tabelas-por-módulo)
9. [Admin SaaS](#9-admin-saas)

---

## 1. Visão Geral

O **AxHub** é uma plataforma SaaS multi-tenant de gestão empresarial desenvolvida pela Axory. Atende pequenas e médias empresas brasileiras com módulos de **ERP financeiro-operacional**, **CRM/marketing** e **verticais de nicho** por segmento de negócio.

### O que o sistema faz — resumo executivo

| Categoria | O que entrega |
|---|---|
| **Gestão comercial** | Propostas, pedidos de venda, ordens de serviço, contratos, PDV operacional |
| **Gestão financeira** | Contas a receber/pagar, boletos CNAB, extrato OFX, conciliação bancária, conta digital |
| **Análise de resultados** | DRE gerencial, fluxo de caixa, comissões, orçamentos, fechamento do mês |
| **Automações** | Régua de cobrança, despesas recorrentes, recorrência de contratos, notificações automáticas |
| **Marketing** | Leads, quiz interativo, pipeline de vendas, playbooks |
| **Integração** | Webhooks configuráveis, API pública com tokens, importação OFX/XLSM/CNAB |
| **Nichos** | Módulos exclusivos para saúde, veterinária, imobiliária, jurídico, arquitetura, delivery, agendamento |
| **Gestão de dados** | LGPD (consentimentos, solicitações, retenção), auditoria completa, backup |
| **Multi-empresa** | Modo MultiGestão para escritórios BPO gerenciarem carteira de clientes |

### Módulos por tipo de acesso

```
GENÉRICOS (todos os clientes com ERP contratado)
────────────────────────────────────────────────
✅ Início — Dashboard personalizável
✅ Negócios — Propostas / Pedidos / OS / Contratos / PDV / NF
✅ Financeiro — Receber / Pagar / Boletos / Extrato / Conciliação / Conta Digital
✅ Resultados — DRE / Fluxo / Comissões / Comercial / Fechamento / etc.
✅ Cadastros — Clientes / Produtos / Serviços / Vendedores / Usuários
✅ Configurações — Hub completo com 6 áreas e dezenas de sub-abas
✅ Recorrência de Cobrança
✅ Fluxo de Caixa Projetado
✅ Webhooks Externos
✅ Relatórios Agendados por Email
✅ API Pública com Tokens
✅ Pagamentos & Checkout (Split Asaas)
✅ CRM — Leads / Quiz / Pipeline / Playbooks  (flag acesso_crm)
✅ MultiGestão BPO  (acesso especial)
✅ Sistema — LGPD / Auditoria / Backup
✅ Ficha Genérica (campos customizados)
✅ Notificações In-App (sino no TopBar)

NICHOS (contratados individualmente por empresa)
─────────────────────────────────────────────────
🛵 Delivery — Cardápio digital + pedidos + operação mobile
📅 Agendamento — Agenda com tipos, recursos, slots e lembretes
🏥 Saúde — Prontuário eletrônico, evoluções SOAP, recibos
🐾 Veterinária — Ficha animal, prontuário vet, evoluções, recibos
🏠 Imobiliária — Imóveis, contratos de locação/venda, visitas
⚖️  Jurídico — Processos, prazos, andamentos, honorários
🏗️  Arquitetura — Projetos, etapas de obra, medições faturáveis
```

---

## 2. Arquitetura e Identidade Visual

### Stack tecnológica

| Camada | Tecnologia |
|---|---|
| **Frontend** | Next.js 14 App Router — Server Components (padrão) + Client Components para interatividade |
| **Estilização** | Tailwind CSS · Minimalista Enterprise (inspirado em Linear/Apple) |
| **Autenticação** | Firebase Auth (login/sessão) + Supabase (Row Level Security) |
| **Banco de dados** | PostgreSQL 17 via Supabase · Schema `public` + schema `delivery` |
| **Formulários** | `useState` com validação manual (sem react-hook-form no codebase) |
| **Ícones** | Lucide React |
| **Notificações** | Sonner (toasts) |
| **Componentes** | `@axdeal/ui` (Card, etc.) |
| **PDF** | Geração via `lib/pdf/` |
| **Armazenamento** | Supabase Storage (comprovantes, logos, PDFs) |

### Identidade visual

- **Cor primária:** `#0047FF` — usada em botões principais, estados ativos, foco de inputs
- **Fundo:** branco ou cinza ultra-claro · Bordas: `slate-200` / `#E5E7EB`
- **Cards:** `rounded-xl shadow-sm`
- **Foco de input:** `focus:ring-2 focus:ring-blue-200 focus:border-blue-500` — **nunca laranja/amber**
- **Tipografia:** Inter ou Geist
- **Modo escuro:** suportado via `ThemeContext`
- **Abas:** linha base cinza `border-gray-200` full-width; aba ativa linha azul `bg-blue-600 -mb-px`
- **Drawers:** via `createPortal` no `document.body`, overlay `bg-black/45`, animação Framer Motion

### Estrutura de grupos de rota (Next.js)

```
app/
├── (auth)/              → Login, recuperação de senha
├── (platform)/          → Área logada (não aparece na URL)
│   ├── erp/             → Todos os módulos ERP
│   ├── crm/             → Módulos CRM
│   ├── sys/             → Configurações de empresa
│   ├── configuracoes/   → Configurações gerais
│   └── leads/[id]/      → Detalhe de lead
├── (admin)/             → Super Admin Axory
│   └── admin/saas/      → Painel de gestão do SaaS
└── (public)/            → Páginas sem login (cardápio delivery, portal cliente)
```

### Contextos globais e o que fornecem

| Contexto | Hook | Campos principais |
|---|---|---|
| `AuthContext` | `useAuth()` | `idEmpresa`, `idUsuario`, `email`, `nomeCompleto` |
| `CompanyContext` | `useCompany()` | `companyId`, `companyName`, `role`, `cargo`, `permissions[]`, `nichosAtivos{}`, `isNichoAtivo(slug)`, `deliveryEnabled`, `moduleAccess{erp,crm}`, `podeVerMultiGestao`, `isSuperAdmin`, `isAdminGlobal` |
| `ThemeContext` | `useTheme()` | `theme`, `toggleTheme` |

### Padrões de código

- **Server Components:** padrão absoluto para busca de dados
- **Client Components (`'use client'`):** apenas formulários, modais e interatividade
- **Variáveis e funções:** camelCase em português
- **Componentes UI genéricos:** `/components/ui/`
- **Componentes compartilhados:** `/components/shared/`
- **Todas as funções PostgreSQL:** `SECURITY DEFINER` + retornam `JSONB`

---

## 3. Módulos Genéricos

> Disponíveis para qualquer empresa com ERP/CRM contratado. Visibilidade controlada por **permissão de cargo**.

---

### 3.1 Início e Dashboard personalizável

**Rota:** `/erp/inicio` — **Permissão:** `erp.viewInicio`

O início é o centro de comando do ERP. Cada usuário pode personalizar o que aparece e em que ordem.

#### Seções do dashboard

**Cards financeiros (RPC `fn_resumo_inicio_parcelas`):**
- Receitas do mês (total de parcelas a receber com vencimento no mês)
- Despesas do mês (total de parcelas a pagar com vencimento no mês)
- Saldo previsto (receitas − despesas)
- Valor em atraso (parcelas vencidas não pagas)
- Exibição de valores pode ser ocultada (ícone de olho)

**Resumo operacional (RPC `fn_erp_inicio_operacional_resumo`):**
- Propostas abertas (aguardando aprovação)
- Pedidos de venda em andamento
- Ordens de serviço abertas
- Contagem de clientes ativos

**Metas de vendas (RPC `fn_erp_inicio_metas_resumo`):**
- Meta mensal configurada por vendedor
- Realizado no mês atual
- Barra de progresso visual
- Comparativo com mês anterior

**Novidades e releases (`erp_novidades_inicio`, `erp_novidades_inicio_empresas`):**
- Comunicados de novas funcionalidades pelo admin Axory
- Controle de quais empresas já viram cada novidade

**Mural de avisos internos (`erp_mural_avisos_internos`):**
- Avisos publicados pela empresa para sua equipe
- Controle de publicador via `fn_erp_mural_usuario_pode_publicar`

**Atalhos rápidos:**
- Atalhos padrão: Nova Proposta, Nova Venda, Novo Cliente
- Atalhos customizados: o usuário pode criar atalhos com título, descrição e link para qualquer rota

#### Personalização do layout

- Usuário SUPER_ADMIN ou cargo SUPORTE pode entrar em **Modo Edição**
- Reordenar blocos por drag-and-drop
- Escolher quais blocos ficam visíveis
- Personalizar atalhos (adicionar, remover, reordenar, renomear)
- Preferências salvas por usuário+empresa em `sis_preferencias_usuario_empresa` via RPC `fn_erp_inicio_salvar_preferencias`
- Carregadas ao iniciar via `fn_erp_inicio_preferencias_bootstrap`
- Modal de edição: `ErpInicioEditModal`

---

### 3.2 Negócios — Propostas, Pedidos de Venda, Ordens de Serviço

**Rota:** `/erp/negocios/propostas` (hub unificado com 3 abas)  
**Permissões:** `erp.viewNegocios`, `erp.viewPropostas`, `erp.viewPedidosVenda`, `erp.viewOrdensServico`

O módulo de negócios usa um **hub unificado** com abas internas para os três tipos de documento comercial.

#### Abas do hub

| Aba | Tipo | Status possíveis |
|---|---|---|
| **Propostas** | Proposta comercial | RASCUNHO, AGUARDANDO_ENVIO, ENVIADA, VISUALIZADA, EM_NEGOCIACAO, APROVADA, RECUSADA, EXPIRADA, CANCELADA |
| **Pedidos de Venda** | Pedido de compra/venda | RASCUNHO, EM_ABERTO, EM_ANDAMENTO, ATENDIDO, CANCELADO |
| **Ordens de Serviço** | OS para prestação de serviço | EM_ABERTO, EM_ANDAMENTO, AGUARDANDO_PECA, AGUARDANDO_RETIRADA, CONCLUIDO, CANCELADO |

#### Visualizações disponíveis

- **Lista (tabela):** com ordenação, colunas configuráveis, paginação
- **Kanban:** cards organizados por status com drag-and-drop

#### Filtros disponíveis (persistidos em localStorage)

- Busca textual (número, cliente, título)
- Status (multi-select com opções por tipo de documento)
- Período de emissão (DateRangePicker)
- Conta financeira lançada (todos / sim / não) — pedidos e OS
- Estoque lançado (todos / sim / não) — pedidos e OS
- Composição da OS (todos / somente serviços / mistas)
- Colunas visíveis configuráveis
- Paginação + ordenação por coluna (código, cliente, status, valor, data)
- **Escopo por vendedor** — `useSellerDocumentScope`: vendedor só vê seus próprios documentos (ignorado para SUPER_ADMIN)

#### Ações disponíveis por documento

- Editar, copiar, excluir
- Enviar por WhatsApp com PDF anexado
- Emitir nota fiscal (abre `/erp/fiscal/notas/nova`)
- Aprovar proposta manualmente
- Alterar status (modal)
- Lançar / estornar contas financeiras (gera parcelas a receber/pagar)
- Lançar / estornar estoque (ajusta saldo de produtos)
- Seleção em lote para ações em massa

#### Campos do documento (formulário de criação/edição)

**Cabeçalho:** número/código, título, descrição, referência interna, cliente (busca), departamento, projeto, vendedor responsável

**Datas:** emissão, validade (propostas), data início/fim de vigência, data entrega

**Itens:** tipo (serviço/produto), código, descrição, quantidade, valor unitário, desconto (R$ ou %), valor total, catálogo de produtos/serviços, custo de aquisição (para CMV)

**Condições comerciais:** parcelas de pagamento (número, valor, vencimento, forma, conta bancária, observações), cobrança recorrente

**Impostos (NF):** ISS, ICMS (CST/CSOSN), PIS/COFINS (CST), IRPJ/CSLL retido na fonte, NCM, CFOP

**Campos customizados:** `campos_adicionais` — campos extras configurados pelo cliente via motor de campos customizados

**Abas do formulário (variam por tipo):** basicas, detalhes, itens/serviços/produtos, impostos, condições comerciais, componentes, informações

#### Resumo de parcelas por documento

- Em cada linha da listagem: chips coloridos mostrando parcelas atrasadas / pagas / em aberto
- Clique abre drawer de detalhes financeiros do documento

---

### 3.3 Negócios — Contratos

**Rota:** `/erp/negocios/contratos`  
**Permissão:** `erp.viewContratos`

#### Funcionalidades da listagem

**Filtros:** busca textual, status, ativo (SIM/NÃO), período, conta financeira lançada (sim/não), escopo vendedor

**Status de contrato:** EM_ABERTO, EM_NEGOCIACAO, AGUARDANDO_ASSINATURA, GANHO, PERDIDO, CANCELADO

**Colunas:** código, data início, cliente, status, conta lançada, valor recorrente

**Ações:** WhatsApp com PDF, kanban, abrir detalhe

#### Tela de detalhe do contrato — 3 abas

**1. Detalhes (`ContratoDetalhesTab`):**
- Todos os dados do contrato (cliente, vigência, valor, serviços)
- Histórico de alterações de status

**2. Financeiro (`ContratoFinanceiroTab`):**
- Parcelas geradas pelo contrato
- Status de pagamento de cada parcela
- Total pago / total pendente

**3. Faturamento (`ContratoFaturamentoTab`):**
- Configuração de recorrência do faturamento
- Periodicidade, índice de reajuste, próximo vencimento
- Controle de geração automática de parcelas
- Histórico de faturamentos gerados

**RPCs de contrato:**
- `fn_carregar_contrato_edicao` — carrega dados completos para edição
- `fn_salvar_contrato_edicao` — salva com parcelas
- `fn_contratos_processar_recorrencia` — gera próximas parcelas
- `fn_contrato_proximo_vencimento` — calcula próxima data

---

### 3.4 Negócios — PDV (Ponto de Venda)

**Rota:** `/erp/negocios/pdv` e `/erp/negocios/pdv` (operacional)  
**Permissão:** `erp.viewPdv`

#### Listagem de vendas PDV

**Filtros:** busca, período de data, status (CONCLUIDA / CANCELADA), forma de pagamento (PIX, Dinheiro, Cartão), vinculadas/não vinculadas a documentos ERP

**Colunas configuráveis** (salvas em localStorage): ordem, número, data, total

**Ações por venda:** abrir detalhes em drawer, reemitir recibo

#### PDV Operacional (workspace de venda)

O PDV operacional tem dois painéis lado a lado:

**Painel do catálogo (`PdvCatalogPanel`):**
- Busca de produtos e serviços em tempo real
- Filtro por categoria
- Grid de itens com foto, nome e preço
- Adicionar ao carrinho com clique

**Painel do carrinho (`PdvCartPanel`):**
- Lista de itens com quantidade e valores
- Edição de quantidade por item
- Desconto por item (`ItemDiscountModal`)
- Subtotal, desconto global e total
- Vinculação a cliente (opcional)

**Modal de pagamento (`PaymentModal`):**
- Múltiplas formas de pagamento na mesma venda
- PIX (gera QR code), Dinheiro (troco automático), Cartão (débito/crédito/parcelado)
- Integração conta digital para recebimento Pix em tempo real

**Funcionalidades adicionais:**
- Visualizar últimas vendas do dia (`LastSalesModal`)
- Cancelar venda histórica (`HistoricalSaleCancelModal`)
- Vincular venda PDV a documento ERP (`LinkDocumentModal`)
- Preview do recibo antes de finalizar (`ReceiptPreviewModal`)
- Reemissão de recibo de qualquer venda passada

---

### 3.5 Negócios — Notas Fiscais (AxConnect)

**Rota:** `/erp/negocios/notas_fiscais` (listagem) e `/erp/fiscal/notas/nova` (emissão)

#### Listagem

- Notas emitidas por empresa
- Status: rascunho, processando, autorizada, cancelada, erro
- Download XML e PDF
- Cancelamento de NF autorizada

#### Formulário de emissão — 5 abas

**Origens:** pedido de venda, ordem de serviço, contrato, PDV (importa dados automaticamente)

| Aba | Conteúdo |
|---|---|
| **dados** | Tomador de serviço (CNPJ/CPF, endereço), data competência, natureza da operação |
| **pagamento** | Condições comerciais e parcelas (reutiliza componente de condições) |
| **itens** | Itens da NF com NCM, CFOP, tributação (ICMS CST/CSOSN, PIS, COFINS), código serviço federal e municipal |
| **conferencia** | Revisão completa antes da emissão, alertas de inconsistências |
| **axconnect** | Status de envio ao emissor AxConnect, resposta do SEFAZ, protocolo de autorização |

**Dados fiscais da empresa** (configurados em Configurações > Empresa > Fiscal): IE, IM, regime tributário

---

### 3.6 Financeiro — Contas a Receber

**Rota:** `/erp/financeiro/receber`  
**Permissão:** `erp.viewReceber`

O módulo de contas a receber e a pagar compartilha o mesmo motor de dados (`FinanceiroContent`) com comportamento adaptado por aba.

#### Cards de resumo (topo da página)

- **Vencido:** total de parcelas vencidas não pagas (quantidade + valor)
- **Vence hoje:** parcelas com vencimento na data atual
- **Futuros:** parcelas com vencimento nos próximos 30 dias
- **Total geral:** saldo devedor consolidado
- Opção de ocultar valores (ícone de olho para privacidade)

#### Filtros avançados (painel expansível)

| Filtro | Detalhes |
|---|---|
| Busca textual | Pesquisa em nome do cliente, número, descrição |
| Status | Multi-select (EM_ABERTO, PAGO, VENCIDO, PARCIAL, CANCELADO) |
| Período de vencimento | DateRangePicker |
| Período de emissão | DateRangePicker |
| Período de competência | DateRangePicker (DRE) |
| Período de pagamento | DateRangePicker (extrato) |
| Categoria financeira | Multi-select |
| Origem do documento | Multi-select (pedido_venda, os, contrato, pdv, despesa) |
| Conta bancária | Multi-select |
| Forma de pagamento | Multi-select |
| Departamento | Multi-select |
| Projeto | Multi-select |
| **Vendedor** | Multi-select (exclusivo de receber, oculto em pagar) |
| Colunas visíveis | Seleção de quais colunas exibir na tabela |

#### Colunas configuráveis da tabela

`select`, `vencimento`, `parcela`, `lancamento`, `origem`, `conta`, `categoria`, `departamento`, `projeto`, `vendedor`, `forma`, `valor`, `status`, `ações`

#### Ações por parcela

- **Detalhes:** drawer completo com histórico de baixas, comprovantes, campos editáveis
- **Baixa manual:** drawer com data, valor, conta, forma, juros/multa/desconto, comprovante (upload Storage)
- **Emitir boleto:** abre `EmitirBoletoDrawer`
- **Pagar via API Inter:** executa pagamento digital (`PagarInterDrawer`) — requer permissão `erp.executeApiPayments`
- **Copiar:** duplica a parcela
- **Excluir:** com confirmação

#### Ações em massa

- Selecionar todos (página ou todos os filtrados)
- **Liquidar em massa:** marcar múltiplas parcelas como pagas de uma vez
- **Desliquidar em massa:** reverter baixas
- **Baixa em massa:** drawer para configurar baixa com parâmetros comuns

#### Importação em massa

- **Planilha XLSM** (`financeiro-importacao-schema.json`): importar parcelas em lote
- Colunas validadas: `tipo_titulo` (PAGAR/RECEBER), `situacao_financeira`, `descricao_parcela`, `lancamento`, `contato_codigo`, `categoria_codigo`, `departamento_codigo`, `projeto_codigo`, `conta_bancaria_nome`, `forma_pagamento_nome`, datas (emissão, vencimento, pagamento), valores, `data_pagamento`, `valor_quitado_total`
- Abas da planilha: FINANCEIRO_IMPORTAR, INSTRUCOES, DOMINIOS

#### Importação de retorno CNAB (exclusivo de receber)

- Upload de arquivo `.RET` ou `.txt` retorno bancário
- Seleção da conta bancária (CNAB240 ou CNAB400)
- Processamento automático de baixas do retorno
- Relatório de ocorrências (pagas, rejeitadas, erros)

#### Campos internos de parcela

`id_parcela`, `numero_parcela`, `total_parcelas`, `descricao_parcela`, valor original, acréscimos, quitado, saldo devedor, datas (emissão, vencimento, quitação), `status`, `lancamento`, `origem_tipo`, vínculos (`id_pedido_venda`, `id_os`, `id_contrato`, `id_venda_pdv`, `id_despesa`, `id_proposta`), `id_categoria`, `id_departamento`, `id_projeto`, `id_contato`, `id_conta_bancaria`, `id_forma_pagamento`, `link_pagamento`, `boleto_url`, `linha_digitavel`, `observacoes_pagamento`

---

### 3.7 Financeiro — Contas a Pagar + Despesas Recorrentes

**Rota principal:** `/erp/financeiro/pagar`  
**Rota despesas recorrentes:** `/erp/financeiro/pagar/despesas-fixas`  
**Permissão:** `erp.viewPagar`

#### Contas a Pagar

Usa o mesmo motor de `FinanceiroContent`, com aba `contas_pagar`:
- Todos os filtros (exceto Vendedor)
- Ações: baixa, copiar, excluir
- Botão principal: **Novo pagamento**
- Acesso rápido a despesas recorrentes via "Mais ações"
- Importação XLSM disponível

#### Despesas Recorrentes (`/erp/financeiro/pagar/despesas-fixas`)

Controle de despesas fixas com geração automática de parcelas.

**Tabela de listagem:**

| Campo exibido | Descrição |
|---|---|
| Descrição | Nome da despesa |
| Fornecedor | Contato vinculado |
| Periodicidade | semanal, quinzenal, mensal, bimestral, trimestral, semestral, anual |
| Intervalo | A cada N períodos |
| Antecedência | Dias antes do vencimento para gerar a parcela |
| Valor base | Valor da despesa |
| 1º Vencimento | Primeiro vencimento configurado |
| Próxima Geração | Quando a próxima parcela será gerada |
| Vigência | indeterminado / data fim / quantidade máxima de parcelas |
| Status | Ativa / Cancelada |

**Filtros:** busca, status (EM_ABERTO/CANCELADO), categoria, conta bancária, projeto, período de vencimento

**Ações:** nova despesa recorrente, editar, copiar, detalhes

#### Formulário de despesa recorrente — 3 abas

**Aba 1 — Detalhes:**
- Fornecedor (busca rápida com `QuickClienteDrawer`)
- Valor da despesa
- Nome / descrição da despesa
- Categoria financeira (obrigatória)
- Número do documento
- Forma de pagamento
- Projeto e departamento
- Observações
- Data de emissão

**Aba 2 — Recorrência:**
- Periodicidade: semanal, quinzenal, mensal, bimestral, trimestral, semestral, anual
- Intervalo (ex.: a cada 2 meses)
- Data de início da ocorrência
- Primeiro vencimento
- Dia do vencimento (1-28)
- Modo de vigência: indeterminado / data fim específica / quantidade máxima de parcelas
- Data fim (se modo data_fim)
- Quantidade máxima de parcelas (se modo quantidade)
- Antecedência em dias para geração antes do vencimento

**Aba 3 — Geração:**
- Opção de gerar automaticamente via CRON ou manualmente
- Gerar agora: quantidade de parcelas para gerar imediatamente
- Preview das parcelas previstas (lançadas vs. previstas)
- Ações: lançar próxima parcela, excluir última lançada, limpar e relançar tudo

**CRON automático:** `fn_erp_cron_processar_despesas_recorrentes` executa diariamente e gera parcelas de acordo com a antecedência configurada.

---

### 3.8 Financeiro — Boletos Bancários

**Rota:** `/erp/financeiro/boletos`  
**Permissão:** `erp.viewBoletos`

#### Funcionalidades da listagem

**Filtros avançados:**
| Filtro | Valores possíveis |
|---|---|
| Busca textual | Pagador, nosso número, gateway ID |
| Status do boleto | EMITIDO, REGISTRADO, PENDENTE, PAGO, VENCIDO, CANCELADO, SUBSTITUIDO, FALHA |
| Situação gateway | A_RECEBER, RECEBIDO, PAGO, LIQUIDADO, EXPIRADO, CANCELADO |
| Período | Emissão ou vencimento |
| Conta integrada | Multi-select |
| PIX habilitado | Sim / Não |

**Colunas configuráveis (22+):**
- vencimento, emitido, pagador, documento, email, cedente, banco/gateway
- nosso número, gateway IDs (externos)
- valores (nominal, desconto, juros, multa, final)
- PIX (txid, copia-e-cola), linha digitável, código de barras
- ações contextuais

**Ações por boleto:**
- Copiar linha digitável (um clique)
- Abrir PDF do boleto (modo banco ou modo AxHub)
- Regenerar PDF (quando boleto já registrado no banco)
- Menu contextual com mais opções
- Refresh manual do status no gateway

#### Tela de detalhe individual (`/erp/financeiro/boletos/[id]`)

Detalhe completo com todos os dados do boleto, histórico de status, linha digitável, QR Code PIX (se habilitado), links e integrações gateway.

#### Remessas CNAB

**Remessas:**
- Tabela `erp_boletos_remessas` agrupa boletos por remessa
- Tabela `erp_boletos_remessa_itens` lista boletos da remessa
- Download do arquivo de remessa para envio ao banco

**Retornos:**
- Tabela `erp_boletos_retornos` registra arquivos de retorno processados
- Tabela `erp_boletos_retorno_itens` registra cada ocorrência do retorno

#### Utilitários de boleto (`lib/financeiro/`)

- `boleto-codigo-barras.ts` — geração de linha digitável e código de barras
- `boleto-pdf-acoes.ts` — download e regeneração de PDF
- Preview de boleto (`BoletoBancarioPreview`) para configuração de layout PDF

---

### 3.9 Financeiro — Extrato e Importação OFX

**Rota:** `/erp/financeiro/extrato`  
**Permissão:** `erp.viewExtrato`

#### Extrato bancário manual

- Lançamentos manuais de extrato por conta bancária
- Tipos: crédito (entrada) e débito (saída)
- Vínculo manual com parcelas do sistema
- Exclusão com auditoria (RPC `fn_erp_excluir_lancamento_extrato`)

#### Importação de extrato OFX

- Upload de arquivo OFX exportado do internet banking
- Parser `parse-ofx-extrato-bancario.ts` lê as transações
- Cada transação importada fica com status: PENDENTE, SUGERIDO, CONCILIADO, IGNORADO
- Vinculação manual ou automática com parcelas abertas
- Restauração de importação antes de deletar (RPC `fn_erp_extrato_restaurar_importado_antes_delete`)

---

### 3.10 Financeiro — Conciliação Bancária

**Rota:** `/erp/financeiro/conciliacao-bancaria`  
**Permissão:** `erp.viewConciliacaoBancaria`

A conciliação bancária é o processo de confirmar que os lançamentos do sistema correspondem exatamente ao extrato bancário real.

#### Fluxo de trabalho

1. **Upload do extrato** (`ConciliacaoUploadPanel`, `ConciliacaoUploadModal`)
   - OFX do internet banking ou lançamento manual
   - Seleção da conta bancária

2. **Filtros de visualização**
   - Tipo: ENTRADA / SAÍDA / TODOS
   - Ordenação: por valor ou por data
   - Status de baixa: SEM_BAIXA / COM_BAIXA / TODAS

3. **Vinculação de parcelas**
   - Sistema sugere automaticamente parcelas compatíveis por valor e data
   - Revisão manual: aceitar sugestão ou buscar outra parcela
   - Status: SUGERIDO → CONCILIADO

4. **Tratamento de diferenças**
   - Quando o valor não bate exatamente, configurar a diferença:
   - Tipo: JUROS, MULTA, TAXA, DESCONTO, PARCIAL
   - Base de cálculo: LIQUIDO, SALDO_DEVEDOR, VALOR_ORIGINAL

5. **Criar venda PDV avulsa** (`ConciliacaoNovaVendaModal`)
   - Para transações que não têm lançamento correspondente no sistema
   - RPC `fn_conciliacao_criar_venda_pdv_avulsa`

#### Regras automáticas de conciliação

- Configuradas em `/erp/configuracoes/categorias/regras-dre`
- Tabela `erp_regras_conciliacao_bancaria`
- Critérios: palavra-chave na descrição, valor, banco de origem
- Ação automática: categorizar e/ou conciliar

---

### 3.11 Financeiro — Conciliação PDV

**Rota:** `/erp/financeiro/conciliacao-pdv`  
**Permissão:** `erp.viewConciliacaoPdv`

- Comparação entre vendas PDV do sistema e lançamentos das adquirentes de cartão
- Identificação de diferenças (taxas, chargebacks, estornos)
- Configuração de adquirentes em `/erp/configuracoes/estrutura-financeira/taxas-cartao`
- Tabela `erp_gateway_webhook_eventos` registra eventos das adquirentes

---

### 3.12 Financeiro — Conta Digital

**Rota:** `/erp/financeiro/conta-digital`  
**Permissão:** `erp.viewContaDigital`

Integração com contas bancárias digitais (Inter, Asaas) para operação bancária direto no sistema.

#### Abas da conta digital

**Resumo:**
- Saldo disponível em tempo real
- Saldo bloqueado (judicial, administrativo, cheque)
- Limite de crédito disponível
- Chave PIX configurada
- Status da integração (ativa / pendente / erro)
- Variação do saldo no dia
- Data/hora da última sincronização

**Extrato:**
- Movimentos creditados e debitados
- Status de cada movimento: compensado, agendado, em análise
- Sincronização com extrato da conta digital

**Boletos:**
- Boletos emitidos pela conta digital
- Dados: nosso número, linha digitável, PIX copia-e-cola, link PDF
- Geração de novo boleto

**Pagamentos:**
- Pagamentos realizados via API bancária
- Status de processamento
- Comprovante de cada pagamento

#### Geração de PIX

- Criação de cobrança PIX (txid único)
- QR Code dinâmico para o valor
- Copia-e-cola para envio ao pagador
- Webhook de confirmação de pagamento

#### Integração bancária

- Flags em `erp_contas_bancarias`: `integracao_bancaria_ativa`, `integracao_gateway_*`
- Tratamento de erros humanizado: `gateway-erro-amigavel.ts`
- Acompanhamento de pagamentos: `erp_pagamentos_inter_acompanhamento`

---

### 3.13 Financeiro — Despesas Operacionais

**Rota:** `/erp/financeiro/despesas`  
**Permissão:** `erp.viewDespesas`

- Lançamento de despesas avulsas (fora do fluxo de contas a pagar)
- Categorização por centro de custo, departamento e projeto
- Aprovação de despesas (fluxo de aprovação configurável)
- Tabela `erp_despesas` com campos: fornecedor, valor, data, categoria, conta, comprovante

---

### 3.14 Resultados e DRE Gerencial

**Rota base:** `/erp/resultados`  
**Permissão:** `erp.viewResultados`

O módulo de resultados tem **16 sub-módulos** acessíveis por menu lateral colapsável.

#### Sub-módulos detalhados

**1. Análise de Despesas** (`/erp/resultados/analise-despesas`)
- Breakdown de despesas por categoria, período, fornecedor
- Comparativo mês a mês (aumentos e reduções percentuais)
- Filtro de período e categorias
- Gráfico de evolução mensal

**2. Financeiro** (`/erp/resultados/financeiro`)
- Visão geral: entradas, saídas, saldo
- Fluxo de caixa realizado (gráfico de barras)
- Saldos por conta bancária
- Gráfico de variação de caixa

**3. Ciclo de Transações** (`/erp/resultados/ciclo-transacoes`)
- PMR (Prazo Médio de Recebimento): tempo médio entre vencimento e recebimento
- PMP (Prazo Médio de Pagamento): tempo médio entre vencimento e pagamento
- Análise de atraso por faixa de dias
- Ciclo financeiro (PMR − PMP)

**4. Performance** (`/erp/resultados/performance`)
- Saúde financeira geral da empresa
- Receitas por período e por origem
- Carteira de clientes ativos
- Eficiência de recebimento (% pago no prazo)

**5. Orçamentos** (`/erp/resultados/orcamentos`)
- Comparativo realizado vs. orçado por categoria
- Variação percentual e em valor
- Criação de orçamentos em `/erp/configuracoes/estrutura-financeira/orcamentos`
- Tabelas `erp_orcamentos`, `erp_orcamento_linhas`

**6. Comercial** (`/erp/resultados/comercial`)
- Funil de vendas: propostas geradas → aprovadas → faturadas
- Taxa de conversão por período e por vendedor
- Faturamento por produto/serviço
- Ticket médio de venda
- Volume de novas oportunidades

**7. Comissões** (`/erp/resultados/comissoes`)
- Extrato de comissões por competência e por vendedor
- Cálculo automático em `erp_parcelas` ao receber
- RPC `fn_processar_comissao_recebimento` — processa no ato do recebimento
- Faixas configuráveis: percentual fixo ou por faixa de valor
- RPC `fn_calcular_percentual_comissao` — aplica regra de faixa
- Aprovação de comissões antes do pagamento

**8. Operacional** (`/erp/resultados/operacional`)
- Produtividade por pedidos, OS e contratos
- Tempo médio de execução de OS
- SLA de atendimento

**9. Campos Customizados** (`/erp/resultados/campos-customizados`)
- Relatórios analíticos baseados em campos customizados criados pela empresa
- Agrupamentos e filtros por valor de campo

**10. Projetos** (`/erp/resultados/projetos`)
- Rentabilidade por projeto
- Receitas e despesas vinculadas ao projeto
- Carteira de projetos em andamento vs. concluídos

**11. Departamentos** (`/erp/resultados/departamentos`)
- Resultados financeiros por centro de custo/departamento
- Custos alocados diretamente e rateados

**12. DRE Gerencial** (`/erp/resultados/dre-gerencial`)
- **Usa sempre `data_competencia`** (nunca `data_vencimento` ou `data_pagamento`)
- Estrutura: Grupo DRE → Categoria → Lançamentos
- Períodos comparativos (mês a mês, ano a ano)
- Drill-down por categoria para ver os lançamentos

**13. Custos de Vendas (CMV)** (`/erp/resultados/custos-vendas`)
- Custo de mercadorias vendidas
- Custo unitário registrado **no momento da saída** (nunca recalculado retroativamente)
- Auditoria de margens por produto

**14. Vencimentos** (`/erp/resultados/vencimentos`)
- Agenda de vencimentos futuros (contratos, certidões, certificados)
- Tabela `erp_multi_vencimentos_importantes`

**15. Fechamento do Mês** (`/erp/resultados/fechamento-mes`)
- Processo guiado de fechamento contábil mensal
- Checklist de itens de revisão (automatizados + manuais)
- Acordeão de categorias de checklist
- Confirmações manuais obrigatórias
- Drawer de registros de revisão
- Histórico de fechamentos por mês
- Tabelas: `erp_fechamento_mes_assinaturas`, `erp_fechamento_mes_revisoes`, `erp_fechamento_mes_itens_manuais_config`, `erp_fechamento_mes_confirmacoes_manuais`

**16. Auditoria** (`/erp/resultados/auditoria`)
- Consulta de todos os eventos registrados no sistema
- Filtros: módulo, usuário, período, tipo de ação
- RPC `fn_auditoria_consultar` com paginação
- Rastreabilidade completa: quem, quando, o que mudou (antes/depois)

#### Regras críticas de datas (NUNCA misturar)

| Módulo | Campo correto |
|---|---|
| DRE Gerencial | `data_competencia` |
| Fluxo de Caixa | `data_vencimento` |
| Extrato Bancário | `data_pagamento` |

---

### 3.15 Cadastros

**Rota base:** `/erp/cadastros`  
**Permissão:** `erp.viewCadastros`

#### Contatos e Clientes

**Rota:** `/erp/cadastros/contatos` e `/erp/cadastros/clientes`  
**Permissão:** `erp.viewContatos`

- CRUD completo de pessoas físicas e jurídicas
- Campos: nome/razão social, fantasia, CPF/CNPJ, email, telefone, endereço completo, website, observações
- Grupos de contatos (`erp_grupos_contatos`, `erp_contatos_grupos`)
- Histórico completo: propostas, pedidos, OS, contratos, parcelas vinculadas ao contato
- **Ficha dinâmica:** campos customizados via motor de fichas (`sis_fichas`, `sis_ficha_valores`)
- **Campos customizados do CRM:** `crm_custom_field_definitions` por categoria de lead/contato
- Portal do cliente: acesso via `erp_documento_token_publico` para visualizar e pagar cobranças
- Escopo por vendedor: vendedor vê apenas seus próprios clientes

#### Produtos

**Rota:** `/erp/cadastros/produtos`  
**Permissão:** `erp.viewProdutos`

- Código, nome, descrição, unidade, preço de venda, preço de custo
- Controle de estoque com saldo atual por produto
- Custo de aquisição histórico (CMV registrado na saída)
- Categorização por grupo
- RPC `fn_atualiza_estoque` — ajusta saldo ao vender ou comprar

#### Estoque Geral

**Rota:** `/erp/cadastros/produtos/estoque-geral`

- Inventário completo com posição atual de cada produto
- Movimentações de entrada e saída
- Alerta de estoque mínimo

#### Serviços

**Rota:** `/erp/cadastros/servicos`  
**Permissão:** `erp.viewServicos`

- Catálogo de serviços com preço, unidade e descrição
- Código de serviço (federal e municipal para NF)
- NCM e CFOP padrão para emissão fiscal

#### Vendedores

**Rota:** `/erp/cadastros/vendedores`  
**Permissão:** `erp.viewVendedores`

- Cadastro de vendedores com vínculo a membro da equipe
- Meta mensal individual
- Faixas de comissão (percentual por faixa de valor de venda)
- Escopo de visibilidade (vendedor só vê seus próprios clientes/pedidos quando configurado)

#### Usuários do Sistema

**Rota:** `/erp/cadastros/usuarios-sistema`  
**Permissão:** `erp.viewUsuariosSistema` / `erp.manageUsuariosSistema`

- Convite de novos membros por email
- Atribuição de cargo com permissões
- Ativação/desativação de membros
- Histórico de acessos via `sis_sessoes_ativas`

#### Portal do Cliente

**Rota pública:** acessada via link único tokenizado (`erp_documento_token_publico`)

- Cliente visualiza suas cobranças em aberto
- Realiza pagamento via PIX (RPC `fn_portal_cliente_salvar_pix_cobranca`)
- Sem necessidade de login
- Abertura do portal interno: `/erp/portal/abrir-cliente`
- Dashboard de portais ativos: `/erp/portal_clientes`

---

### 3.16 Configurações ERP — Hub completo

**Rota base:** `/erp/configuracoes`  
**Permissão:** `erp.viewConfiguracoes`

O hub de configurações é acessado via **sub-sidebar colapsável** com 6 áreas principais.

Estado de colapso da sub-sidebar salvo em localStorage: `erp.configuracoes.subsidebar.collapsed`

#### Área 1 — Empresa & Sistema

**Abas disponíveis:**

| Aba | Conteúdo |
|---|---|
| **Parâmetros Gerais** | Dados cadastrais da empresa, logo, CNPJ/CPF, e-mail e telefone de suporte, site |
| **Automações** | Configurações de automações do sistema (parâmetros de gatilhos) |
| **Padrões do Sistema** | Comportamento padrão de documentos (série NF, decimais, desconto máximo) |
| **Estrutura Organizacional** | Departamentos e projetos (centros de custo) |
| **Fiscal** | IE, IM, CNAE, regime tributário (Simples Nacional, Lucro Presumido, Lucro Real) |
| **Modelos de Textos** | Templates de e-mail, WhatsApp, mensagens da régua de cobrança |
| **Campos Customizados** | CRUD de campos extras para documentos (propostas, pedidos, OS, contratos) |
| **Fichas & Templates** | Admin do motor de fichas dinâmicas (`sis_ficha_templates`, campos, tipos) |
| **Fechamento do Mês** | Configuração de itens manuais do checklist de fechamento |

#### Área 2 — Estrutura Financeira

| Sub-módulo | Funcionalidade |
|---|---|
| **Contas Bancárias** | Cadastro de contas (banco, agência, conta, PIX, integração gateway) |
| **Taxas de Cartão** | Adquirentes com taxas por bandeira (Visa, Master, Elo, Amex) e prazo (débito, crédito 1x..12x) |
| **Condições de Pagamento** | Templates reutilizáveis: parcelamentos padrão (à vista, 30/60, 10/30/60, etc.) |
| **Categorias DRE** | Estrutura de grupos e categorias para o DRE; hierarquia configurável |
| **Orçamentos** | Editor de orçamento mensal/anual por categoria |
| **Régua de Cobrança** | Sequência de notificações: D-3, D0, D+5, etc.; canais (WhatsApp/email); templates de mensagem |
| **Regras de Conciliação** | Regras automáticas para conciliar extrato com parcelas por palavra-chave |

#### Área 3 — Comercial

| Sub-módulo | Funcionalidade |
|---|---|
| **Vendas** | Parâmetros de venda: desconto máximo, obrigatoriedade de aprovação, série NF padrão |
| **Configurações de Proposta** | Template padrão, prazo de validade, termos e condições, modelo de rodapé |
| **Meta de Vendas** | Metas mensais por vendedor com acompanhamento |
| **Comissões** | Faixas de comissão, gatilho (emissão vs. recebimento), exclusões |

#### Área 4 — Impressões & PDF

Configuração visual de documentos emitidos pelo sistema.

**Tipos de documento configuráveis:**
- Ordem de Serviço
- Pedido de Venda
- Venda PDV
- Contrato
- Proposta
- Boleto Bancário

**Configurações do boleto (com preview em tempo real `BoletoBancarioPreview`):**
- Cores: cabeçalho, área do pagador, linha de fundo
- Fonte do texto
- PIX integrado no boleto (habilitar/desabilitar QR Code)
- Logo: dimensões, transparência, cor de fundo, borda

#### Área 5 — Integrações & API

- Link para CRM (`/crm/configuracoes`)
- Tokens de API pública (`/erp/configuracoes/api`)
- Configurações de split/checkout Asaas (`/erp/configuracoes/pagamentos`)
- Webhooks externos (`/erp/configuracoes/webhooks`)

#### Área 6 — Privacidade & LGPD

**Aba 1 — Políticas de Retenção:**
- Tipo de dado (ex.: dados cadastrais, financeiros, histórico de acesso)
- Prazo mínimo e máximo de retenção (em meses)
- Ação após o prazo: excluir, anonimizar, revisar, arquivar
- Descrição da justificativa
- Base legal (LGPD art.)

**Aba 2 — Consentimentos:**
- Registro de consentimentos por titular
- Tipo do titular (cliente, colaborador, lead)
- Finalidade do tratamento de dados
- Base legal
- Concedido em / Revogado em
- Origem do consentimento (formulário, termo, plataforma)

**Aba 3 — Solicitações:**
- Tipos: exportar dados, excluir dados, corrigir dados, revogar consentimento
- Status: pendente, em andamento, concluído, recusado
- Prazo para resposta (lei: 15 dias úteis)
- Motivo de recusa (quando aplicável)
- Histórico completo de tratativas

#### Indicadores personalizados (rota separada)

**Rota:** `/erp/configuracoes/indicadores`

- Criação de KPIs personalizados para exibição no dashboard
- Fórmulas baseadas em tabelas financeiras
- Metas associadas a cada indicador
- Visualização em gauge, número ou barra de progresso

---

### 3.17 Recorrência de Cobrança

**Rota:** `/erp/recorrencia`  
**Permissão:** `erp.viewRecorrencia`

#### Funcionalidades

- Painel de contratos com recorrência ativa
- Status de cada contrato: ativo, suspenso, encerrado
- **Próximas cobranças programadas:** calendário das parcelas a serem geradas
- Valor recorrente e periodicidade por contrato
- **Acionamento manual:** gerar próxima parcela antes do vencimento automático
- **Reprocessar:** refazer cálculo de próxima data e valor (com reajuste de índice se configurado)
- Histórico de parcelas geradas por cada contrato

**Tabelas:** `erp_contratos`, `erp_parcelas`

**RPCs:**
- `fn_contratos_processar_recorrencia` — gera próximas parcelas de contratos ativos
- `fn_contrato_proximo_vencimento` — calcula próxima data considerando periodicidade
- `fn_erp_cron_processar_faturamento_contratos` — CRON diário automático

---

### 3.18 Fluxo de Caixa Projetado

**Rota:** `/erp/financeiro/fluxo-projetado`  
**Permissão:** `erp.viewFluxoProjetado`

#### Funcionalidades

- Projeção de entradas e saídas por `data_vencimento` (futuro)
- Consolidado mês a mês com saldo inicial e final
- **Gráfico de barras** com entradas (verde), saídas (vermelho) e saldo líquido (linha)
- **Breakdown por categoria:** detalhamento de cada período por categoria financeira
- Filtro de período: 3, 6, 12 meses à frente
- Exportação visual do gráfico

**RPCs:**
- `fn_fluxo_caixa_projetado` — projeção consolidada mensal
- `fn_fluxo_caixa_por_categoria` — detalhamento por categoria

---

### 3.19 Webhooks

**Rota:** `/erp/configuracoes/webhooks`  
**Permissão:** `erp.viewWebhooks`

#### Funcionalidades

- **Cadastro de endpoints:** URL de destino, secret para assinatura HMAC, descrição
- **Seleção de eventos:** cada endpoint escolhe quais eventos recebe (ex.: `parcela.paga`, `proposta.aprovada`, `pedido.cancelado`)
- **Histórico de disparos:** status HTTP da resposta, corpo da resposta, tempo de resposta em ms, timestamp
- **Reenvio manual:** disparar novamente eventos com falha (status ≠ 2xx)
- **Ativação/desativação** de endpoints sem excluir o histórico
- **Fila de reenvio:** `fn_webhooks_pendentes_listar` gerencia eventos pendentes de reenvio

**Tabelas:** `erp_webhooks_endpoints`, `erp_webhooks_log`

**RPCs:** `fn_webhooks_listar`, `fn_webhooks_endpoint_salvar`, `fn_webhook_registrar_evento`, `fn_webhook_atualizar_status`, `fn_webhooks_pendentes_listar`

---

### 3.20 Relatórios Agendados por Email

**Rota:** `/erp/relatorios/agendados`

#### Funcionalidades

- Criar relatórios para envio automático periódico por e-mail
- **7 tipos de relatório:** DRE Gerencial, Fluxo de Caixa, Contas a Receber, Contas a Pagar, Extrato Bancário, Inadimplência, KPI Financeiro
- **4 frequências:** Diário, Semanal, Quinzenal, Mensal
- Horário de envio configurável (ex.: 08:00 da manhã)
- Para frequência semanal: escolha o dia da semana (Seg-Dom)
- Para frequência mensal: escolha o dia do mês (1-28)
- **Múltiplos destinatários:** lista de e-mails separada por vírgula ou linha
- **3 formatos:** PDF, Excel (.xlsx), CSV
- Ativar/desativar com toggle
- Visualização de quando foi o último envio e quantos foram feitos
- Histórico completo de envios em `sis_relatorios_envios` (status, arquivo gerado, erros)

**Tabelas:** `sis_relatorios_agendados`, `sis_relatorios_envios`

**RPCs:** `fn_relatorios_agendados_listar`, `fn_relatorio_agendado_salvar`, `fn_relatorio_agendado_toggle`

---

### 3.21 API Pública (Tokens)

**Rota:** `/erp/configuracoes/api`

#### Funcionalidades

- **Gerar tokens** de acesso com escopos granulares:

| Escopo | Acesso |
|---|---|
| `financeiro:read` | Leitura de parcelas, categorias, contas |
| `financeiro:write` | Criar/editar lançamentos financeiros |
| `contatos:read` | Leitura de clientes e contatos |
| `contatos:write` | Criar/editar clientes |
| `agenda:read` | Leitura de agendamentos |
| `agenda:write` | Criar/editar agendamentos |
| `webhooks:write` | Configurar webhooks externos |
| `relatorios:read` | Consultar relatórios e indicadores |

- **Ambientes:** `live` (produção) e `test` (sandbox), com prefixos `axd_live_` e `axd_test_`
- **Segurança:** Token RAW exibido **apenas uma vez** no momento da criação — armazenado apenas o hash SHA-256
- **Rate limiting** configurável por token (padrão: 60 req/min)
- **Expiração** opcional (data)
- **Revogar** tokens individualmente (não pode desfazer)
- **Estatísticas por token:** total de requests, erros, tempo médio de resposta, gráfico por dia
- Log completo em `erp_api_logs`: endpoint, método, status HTTP, IP, user-agent, tempo, erros

**Autenticação:** `Authorization: Bearer axd_live_<token>`  
**URL base:** `https://api.axdeal.com.br/v1`

**Tabelas:** `erp_api_tokens`, `erp_api_logs`

**RPCs:** `fn_api_tokens_listar`, `fn_api_token_criar`, `fn_api_token_revogar`, `fn_api_token_stats`

---

### 3.22 Pagamentos & Checkout (Split Asaas)

**Rota:** `/erp/configuracoes/pagamentos`

#### Contas de Recebimento

- Cadastro de subcontas Asaas por empresa
- Tipos: `principal`, `split` (divisão automática), `marketplace`
- Ambientes: `sandbox` e `production`
- Credenciais (API Key) armazenadas com segurança — **nunca expostas no frontend**
- Indicador visual: credenciais configuradas ✅ / aguardando ⚠️

#### Regras de Split

- Definir como dividir cada recebimento entre contas
- Tipos: percentual (ex.: 10% para parceiro) ou valor fixo por transação
- Aplicar em: todos os pagamentos, por produto, por categoria ou por cliente específico

#### Links de Pagamento / Checkout

- Tipos de link: Cobrança, Assinatura, Produto, Doação
- Métodos aceitos: **Cartão de crédito** (parcelável, até N vezes, juros configurável), **Pix**, **Boleto**
- URL pública de checkout gerada via Asaas
- Rastreamento: total de acessos ao link, total de pagamentos efetuados, valor total arrecadado
- Status: rascunho, ativo, expirado, cancelado
- Expiração opcional por data
- Copiar link com um clique

> **Nota técnica:** A integração real com Asaas para geração dos links e processamento dos splits deve ser implementada via Edge Functions ou servidor backend — API Keys jamais devem ser enviadas ao frontend.

**Tabelas:** `erp_contas_recebimento`, `erp_split_regras`, `erp_checkout_links`

**RPCs:** `fn_contas_recebimento_listar`, `fn_checkout_links_listar`

---

### 3.23 CRM — Marketing

**Rota base:** `/crm`  
**Requisito de acesso:** Flag `acesso_crm = true` na empresa  
**Permissões:** `crm.*`

#### Dashboard CRM (`/crm/dashboard`)

- Total de leads por status
- Taxa de conversão (lead → cliente)
- Funil visual por etapa do pipeline
- Origem de leads (formulário, quiz, importação manual)
- Leads criados no período vs. período anterior

#### Leads (`/crm/leads`)

- CRUD completo de leads
- Campos: nome, email, telefone, empresa, origem, etapa do funil, responsável
- **Timeline de interações** (`LeadTimeline`): histórico de contatos, e-mails, reuniões
- Estágio no pipeline (kanban por etapa)
- Campos customizados de CRM (`crm_custom_field_definitions`)
- Rota de detalhe: `/leads/[id]`
- Dados de detalhe: `leadDetailsData.ts`

#### Quiz Interativo (`/crm/quiz`)

Uma das funcionalidades mais diferenciadas do sistema — cria quizzes interativos públicos para captação e qualificação de leads.

**Funcionalidades do quiz:**

| Módulo | Funcionalidade |
|---|---|
| **Editor** (`QuizEditorContent`) | Criação de perguntas com opções, pontuação, lógica condicional |
| **Design** (`QuizDesignContent`) | Personalização visual: cores, logo, tipografia, fundo |
| **Mapa** (`QuizMapaContent`) | Fluxo visual de condicionais entre perguntas |
| **Publicação** (`QuizPublicarContent`) | Gerar link público, configurar domínio, embed |
| **Preview** (`QuizPreview`) | Pré-visualização em desktop e mobile |
| **Score/Resultados** (`QuizScoreGauge`) | Gauge de pontuação, perfis de resultado |

**Tipos de pergunta:** múltipla escolha, verdadeiro/falso, escala, texto livre, NPS

**Resultados:** segmentação de leads por score, integração automática ao pipeline

**Tabelas:** `crm_quiz`, `crm_questoes`, `crm_opcoes`, `crm_leads_quiz`, `crm_quiz_resultados`

#### Funil de Vendas (`/crm/funnel`)

- Kanban de leads por etapa do pipeline
- Drag-and-drop para mover leads entre etapas
- Resumo de valor por etapa
- Pipelines configuráveis: `crm_pipelines`, `crm_pipeline_etapas`, `crm_pipeline_leads`

#### Configurações CRM (`/crm/configuracoes`)

- **Playbooks de venda** (`SalesPlaybook`, `CrmPlaybookEditorContent`): fluxo de atendimento passo a passo com scripts, perguntas e orientações por etapa
- **Configurações estratégicas** (`CrmConfiguracoesEstrategicasContent`): definição de ICP, proposta de valor, objeções e respostas
- Tabelas: `crm_playbooks`, `crm_configuracoes_estrategicas`

---

### 3.24 MultiGestão (BPO/Parceiros)

**Rota base:** `/erp/multi-gestao`

**Acesso restrito:** apenas para usuários com `podeVerMultiGestao = true`:
- `SUPER_ADMIN` Axory
- Suporte interno vinculado à empresa
- Parceiro BPO com contrato ativo (`saas_parcerias_bpo`)
- Usuário com delegação ativa (`saas_parcerias_bpo_delegacoes`)

Função de verificação: `usuarioPodeVerMultiGestao()` via `lib/access/multi-gestao-access.ts`

#### Sub-módulos

**1. Visão Geral** (`/erp/multi-gestao/visao-geral`)  
RPC `fn_erp_multi_visao_geral`:
- Resumo consolidado de todas as empresas gerenciadas
- Total de receitas, despesas e inadimplência da carteira
- Empresas com alertas críticos (vencidas em atraso, contratos expirando)

**2. Contas a Receber** (`/erp/multi-gestao/contas-a-receber`)
- Inadimplência consolidada por empresa
- Filtro por faixa de atraso (1-7d, 8-30d, 31-60d, +60d)

**3. Financeiro Global** (`/erp/multi-gestao/financeiro-global`)
- DRE e fluxo de caixa agregado de múltiplas empresas

**4. Tarefas BPO** (`/erp/multi-gestao/tarefas`)
- Gestão de tarefas do escritório para cada empresa cliente
- Tipos de tarefa configuráveis (`erp_multi_categorias_tarefas`)
- Checklist por tarefa, comentários, responsável
- Tabelas: `erp_multi_tarefas`, `erp_multi_tarefas_checklist`, `erp_multi_tarefas_comentarios`

**5. Carteira de Clientes** (`/erp/multi-gestao/carteira-clientes`)  
RPC `fn_erp_multi_carteira_clientes`:
- SLA e saúde de cada empresa gerenciada
- Score de saúde (verde/amarelo/vermelho)
- Responsável BPO por empresa

**6. Central de Documentos** (`/erp/multi-gestao/central-documentos`)  
RPC `fn_erp_multi_central_documentos`:
- Repositório centralizado de documentos de cada empresa
- Tipos configuráveis: `erp_multi_tipos_documentos`
- Upload, versionamento e acesso controlado

**7. Configurações MultiGestão** (`/erp/multi-gestao/configuracoes`)
- Configurações da parceria BPO
- Vencimentos importantes da carteira
- Tabela `erp_multi_configuracoes`, `erp_multi_responsaveis_cliente`

---

### 3.25 Sistema — Auditoria, LGPD e Backup

#### Auditoria

**Rota:** `/erp/resultados/auditoria`

- **Trigger genérico** `fn_trigger_auditoria_generica`: instalado em todas as tabelas críticas do sistema
- Registra automaticamente: INSERT, UPDATE, DELETE com dados antes/depois
- Campos: `tabela`, `operacao`, `id_usuario`, `id_empresa`, `dados_anteriores` (JSONB), `dados_novos` (JSONB), `data_hora`
- **Consulta filtrada** via RPC `fn_auditoria_consultar`: por módulo, usuário, período, tipo de operação
- Paginação na listagem (evita sobrecarga com milhares de registros)
- **Registro manual** via `fn_registrar_log` para eventos que não são CRUDs diretos
- Log de mudança de status com retroativo: `fn_log_status_com_retroativo`

**Tabela:** `sis_logs_sistema`

#### LGPD

**Rota:** Seção dentro de Configurações > Privacidade  
**Permissão:** `erp.viewLgpd`

Ver detalhe completo em [3.16 — Área 6 (Privacidade & LGPD)](#área-6--privacidade--lgpd).

**Tabelas:** `sis_lgpd_consentimentos`, `sis_lgpd_solicitacoes`, `sis_lgpd_politicas_retencao`

#### Backup

- Tabela `sis_backup_log` registra cada execução (tipo, status, tamanho, duração)
- RPC `fn_registrar_backup` — chamado automaticamente ao completar backup
- RPC `fn_backup_saude_verificar` — verifica se último backup está dentro do prazo esperado
- CRON via `pg_cron` (requer `shared_preload_libraries` configurado no servidor PostgreSQL)
- Tabela `sis_cron_execucoes` — histórico de execuções de todos os CRONs

---

### 3.26 Ficha Genérica (motor de campos customizados)

**Acesso:** Configurações > Empresa & Sistema > Fichas & Templates

O motor de fichas permite criar **formulários dinâmicos** vinculados a qualquer entidade do sistema sem precisar de desenvolvimento adicional.

#### Funcionalidades

**Templates (`sis_ficha_templates`):**
- Criação de templates com nome e descrição
- Vínculo a um tipo de entidade (contato, paciente, animal, etc.)
- Ativação/desativação de templates sem perda de dados

**Campos (`sis_ficha_campos`):**
- Criação de campos por template
- **Tipos de campo suportados:**
  - `texto` — linha única
  - `textarea` — texto longo/multi-linha
  - `numero` — valor numérico com validação
  - `data` — seletor de data
  - `booleano` — sim/não (toggle)
  - `selecao_unica` — dropdown de opções
  - `selecao_multipla` — checkboxes com múltiplas opções
  - `arquivo` — upload de documento/imagem
- Ordem de exibição configurável (drag-and-drop)
- Campo obrigatório ou opcional
- Placeholder e dica de preenchimento

**Fichas (`sis_fichas`):**
- Cada instância preenchida de um template
- Vinculada ao registro da entidade (id_entidade + tipo_entidade)
- Versionamento implícito (histórico de `sis_ficha_valores`)

**Valores (`sis_ficha_valores`):**
- Cada campo preenchido com valor e data de preenchimento
- Histórico: ao alterar, o valor anterior é preservado

**RPCs:** `fn_ficha_templates_listar`, `fn_ficha_template_salvar`, `fn_ficha_campos_listar`, `fn_ficha_campo_salvar`, `fn_ficha_listar`, `fn_ficha_abrir`, `fn_ficha_buscar`, `fn_ficha_salvar_valores`

---

### 3.27 Notificações In-App

**Exibição:** Sino (🔔) no TopBar — presente em **todas as páginas** da plataforma logada

#### Funcionalidades

- **Badge vermelho** com contador de não lidas (mostra 9+ se acima de 9)
- **Dropdown** com lista das últimas 25 notificações ao clicar no sino
- **Atualização automática** a cada 60 segundos (polling)

**Tipos de notificação com cor e ícone distintos:**

| Tipo | Ícone | Cor | Quando usar |
|---|---|---|---|
| `info` | Info | Azul | Informações gerais do sistema |
| `sucesso` | CheckCircle | Verde | Ação concluída com êxito |
| `aviso` | AlertTriangle | Amarelo | Atenção necessária |
| `erro` | AlertCircle | Vermelho | Falha ou problema crítico |
| `tarefa` | CheckCheck | Roxo | Tarefas atribuídas ao usuário |
| `vencimento` | Clock | Laranja | Parcelas próximas do vencimento |
| `prazo` | Calendar | Rosa | Prazos processuais (módulo Jurídico) |

**Ações disponíveis:**
- Marcar como lida (individual)
- Marcar todas como lidas (botão no cabeçalho do dropdown)
- Clicar em "Ver detalhes" navega para o contexto relacionado
- Notificações lidas ficam com visual atenuado

**Rastreabilidade:** cada notificação tem:
- `origem_modulo` (ex.: `juridico.prazos`, `erp.financeiro`)
- `id_referencia` (UUID do objeto relacionado — processo, parcela, etc.)
- `expira_em` (data após a qual a notificação não aparece mais)

**Geração interna:** a função `fn_notificacao_criar` é chamada por outros módulos do sistema para gerar notificações quando eventos importantes acontecem.

**Tabela:** `sis_notificacoes_inapp`

**RPCs:** `fn_notificacoes_listar`, `fn_notificacao_marcar_lida`, `fn_notificacoes_marcar_todas_lidas`, `fn_notificacao_criar` (interna)

---

## 4. Módulos de Nicho

> Visíveis e acessíveis apenas quando o nicho estiver **ativo** para a empresa.
>
> **Duas camadas de proteção:**
> 1. **Sidebar:** itens ocultos via `isNichoAtivo(slug)` — sidebar não renderiza o item se nicho inativo
> 2. **`NichoGuard`:** componente no `layout.tsx` de cada rota — bloqueia o conteúdo e exibe tela "Módulo não habilitado"
>
> **Como ativar:** painel Admin `/admin/saas/empresas/[id]` → aba **Nichos** → toggle por empresa.

---

### 4.1 Delivery

**Slug:** `delivery`  
**Rota base:** `/erp/delivery`  
**Permissão sidebar:** `erp.viewNegocios` + `isNichoAtivo('delivery')`

**Atende:** Restaurantes, lanchonetes, pizzarias, dark kitchens, qualquer negócio de food delivery

#### Funcionalidades

**Cardápios (`/erp/delivery/cardapios`):**
- Criação e gestão de múltiplos cardápios por empresa
- Organização por categorias (Entradas, Pratos, Sobremesas, Bebidas, etc.)
- Itens com: foto, nome, descrição, preço, disponibilidade, adicionais/complementos
- Cardápio público gerado automaticamente com URL única por empresa
- Schema: `delivery.cardapios`, `delivery.cardapio_itens`

**Pedidos em tempo real (`/erp/delivery/pedidos`):**
- Painel operacional de pedidos recebidos pelo app/cardápio público
- Status progressivo: NOVO → CONFIRMADO → EM_PREPARO → SAIU_PARA_ENTREGA → ENTREGUE → CANCELADO
- Notificação sonora de novo pedido
- Tempo estimado de entrega configurável
- Log de eventos por pedido (`delivery.eventos_pedido`)
- Schema: `delivery.pedidos_publicos`

**Clientes Delivery (`/erp/delivery/clientes`):**
- CRM simplificado dos clientes que pediram via delivery
- Histórico de pedidos por cliente
- Endereços cadastrados

**Status da operação (`/erp/delivery/status`):**
- Abrir/fechar loja com um clique
- Status visível em tempo real no cardápio público
- Horários de funcionamento configuráveis
- Mensagem personalizada para loja fechada
- Schema: `delivery.status_empresa`, `delivery.status_empresa_transicoes`

**Configurações Delivery (`/erp/delivery/configuracoes`):**
- Status ERP padrão para cada situação de pagamento:
  - Sem pagamento: define qual status de parcela criar
  - Pix pendente (aguardando confirmação): define status
  - Pix confirmado (pagamento aprovado): define status
- Usar menu delivery (habilitar/desabilitar módulo visualmente)
- Schema: `delivery.configuracoes_empresa`

**Integração com financeiro ERP:**
- Pedidos concluídos geram lançamentos automáticos no financeiro
- Valor do pedido cria parcela a receber com a forma de pagamento usada

**Página pública do cardápio:**
- Sem necessidade de login pelo cliente final
- URL amigável por empresa
- Responsivo para mobile
- Adição de itens ao carrinho e finalização do pedido

---

### 4.2 Agendamento

**Slug:** `agendamento`  
**Rota:** `/erp/agenda`  
**Permissão:** `erp.viewAgenda`

> **Nota:** Este módulo existe no catálogo de nichos (`saas_nichos_catalogo`) mas o sidebar filtra por permissão `erp.viewAgenda`, **não** por `isNichoAtivo('agendamento')`. O `NichoGuard` ainda não foi aplicado nesta rota — diferente dos outros nichos.

**Atende:** Clínicas, salões, consultórios, academias, qualquer negócio com horários marcados

#### Funcionalidades

**Visualização da agenda:**
- Calendário por dia, semana ou mês
- Filtro por profissional/recurso responsável
- Cores diferenciadas por tipo de agendamento
- Navegação por período (anterior/próximo)

**Tipos de agendamento (`erp_agenda_tipos`):**
- Nome e descrição do tipo de serviço
- Duração padrão em minutos
- Cor de identificação no calendário
- Capacidade máxima de participantes
- Tempo de preparação pré e pós atendimento (buffer)

**Recursos (`erp_agenda_recursos`):**
- Salas, consultórios, equipamentos, profissionais
- Vinculação de tipos de agendamento ao recurso
- Bloqueios específicos por recurso

**Criar agendamento (`fn_agendamento_criar`):**
- Busca de cliente (vinculado a `erp_contatos`)
- Seleção de tipo e recurso
- Data e horário (validação de conflito automática)
- Duração (herda do tipo ou personalizada)
- Observações internas
- **Validação de conflito:** RPC verifica se o slot já está ocupado antes de confirmar

**Slots disponíveis (`fn_agenda_slots_disponiveis`):**
- Calcula horários livres para uma data e recurso
- Considera: agendamentos existentes + bloqueios + buffers de preparação
- Retorna lista de slots disponíveis com hora início/fim

**Bloqueios (`erp_agenda_bloqueios`):**
- Período de indisponibilidade por recurso ou para todos
- Título e motivo (férias, feriado, manutenção)
- Data/hora início e fim

**Status dos agendamentos:**
- AGENDADO, CONFIRMADO, EM_ATENDIMENTO, CONCLUIDO, CANCELADO, NAO_COMPARECEU

**Fila de notificações (`erp_agenda_notificacoes_fila`):**
- Lembretes automáticos configuráveis: D-1, D0 antes do horário
- Canal: WhatsApp e/ou email
- Mensagem personalizável por tipo de agendamento

---

### 4.3 Saúde

**Slug:** `saude`  
**Rota:** `/erp/saude`  
**Permissão:** `erp.viewSaude`  
**Guard:** `NichoGuard slug="saude"` no `layout.tsx`

**Atende:** Médicos, dentistas, fisioterapeutas, psicólogos, fonoaudiólogos, terapeutas ocupacionais, clínicas de estética e beleza

#### Funcionalidades

**Gestão de Pacientes:**
- Cadastro completo: dados pessoais (nome, CPF, data de nascimento, sexo), contato (telefone, email, endereço), plano de saúde, alergias conhecidas, antecedentes familiares
- **Número de prontuário** automático e sequencial (`fn_saude_gerar_numero_prontuario`)
- Busca rápida por nome completo, CPF ou número de prontuário
- Status: ativo / inativo
- Vínculo com contato do ERP (`erp_contatos`)
- Tabela: `sis_pacientes`

**Prontuário Eletrônico (`saude_prontuarios`):**
- Um prontuário por paciente (identificado por número único)
- Histórico completo de todos os atendimentos
- Profissional que abriu o prontuário

**Evoluções SOAP (`saude_prontuario_evolucoes`):**
- Registro por atendimento individual
- Campos SOAP completos:
  - **S** (Subjetivo): queixa principal, histórico atual relatado pelo paciente
  - **O** (Objetivo): achados do exame físico, sinais vitais, resultados de exames
  - **A** (Avaliação): diagnóstico, CID-10, hipóteses diagnósticas
  - **P** (Plano): conduta, prescrições, encaminhamentos, data de retorno
- Data e hora do atendimento
- Profissional responsável pela evolução
- Histórico cronológico com todas as evoluções anteriores

**Profissionais de Saúde (`saude_profissionais`):**
- Cadastro com especialidade
- Número de registro: CRM (médico), CRO (dentista), CRP (psicólogo), CREFITO (fisio), CREFONO (fonoaudiólogo)
- Vínculo como membro da equipe da empresa

**Recibos (`saude_recibos`):**
- Número sequencial automático (`fn_saude_gerar_numero_recibo`)
- Dados: paciente, profissional, data do atendimento, serviços prestados, valor
- Integração com financeiro: gera parcela a receber automaticamente
- RPC `fn_saude_recibo_gerar` — cria recibo e parcela em uma transação

---

### 4.4 Veterinária

**Slug:** `veterinaria`  
**Rota:** `/erp/veterinaria`  
**Permissão:** `erp.viewVeterinaria`  
**Guard:** `NichoGuard slug="veterinaria"` no `layout.tsx`

**Atende:** Clínicas veterinárias, pet shops com atendimento clínico, veterinários autônomos, serviços de banho/tosa com histórico

#### Funcionalidades

**Gestão de Animais (`sis_animais`):**
- Cadastro completo: nome, espécie (cão, gato, ave, réptil, roedor, equino, bovino, outros), raça, sexo, data de nascimento, peso atual, cor/pelagem, características marcantes
- **Número de ficha** automático e sequencial (`fn_vet_gerar_numero_ficha`)
- **Tutor:** vínculo obrigatório com cliente/contato do ERP (`id_contato`)
- Busca por: nome do animal, nome do tutor, número de ficha
- Status ativo/inativo do paciente animal
- Histórico de peso ao longo do tempo

**Prontuário Veterinário (`vet_prontuarios`):**
- Um prontuário por animal
- Campos de anamnese inicial: histórico vacinal, antiparasitários, cirurgias anteriores, alergias, alimentação
- Profissional responsável pelo prontuário
- Status: aberto, em acompanhamento, encerrado

**Evoluções Clínicas (`vet_prontuario_evolucoes`):**
- Registro de cada consulta/atendimento
- Campos: data, veterinário responsável, tipo de atendimento (consulta, retorno, exame, emergência, cirurgia, banho/tosa)
- Anamnese da consulta (queixa do tutor)
- Exame físico completo (temperatura, FC, FR, mucosas, hidratação, linfonodos, ausculta)
- Diagnóstico e diagnóstico diferencial
- Tratamento prescrito (medicação, dosagem, duração)
- Data de retorno recomendada
- Observações internas do veterinário

**Recibos Veterinários (`vet_recibos`):**
- Número sequencial por empresa
- Dados: tutor, animal, data, serviços prestados (consulta, vacinas, exames, procedimentos), valores
- Integração com financeiro: gera parcela a receber
- RPC `fn_vet_recibo_gerar`

---

### 4.5 Imobiliária

**Slug:** `imobiliaria`  
**Rota:** `/erp/imobiliaria`  
**Permissão:** `erp.viewImobiliaria`  
**Guard:** `NichoGuard slug="imobiliaria"` no `layout.tsx`

**Atende:** Imobiliárias, corretores autônomos, administradoras de locação e condomínios, incorporadoras

#### Funcionalidades

**Gestão de Imóveis (`imobi_imoveis`):**
- Cadastro completo: endereço (rua, número, complemento, bairro, cidade, UF, CEP)
- Tipo: apartamento, casa, casa em condomínio, sala comercial, galpão, terreno, lote, fazenda, chácara
- Características: área total, área privativa, quartos, banheiros, suítes, vagas de garagem
- Andar e número do apartamento (se vertical)
- Condomínio (nome e valor mensal)
- IPTU anual
- Proprietário vinculado (cliente/contato do ERP)
- Código interno do imóvel
- **Status:**
  - `disponivel` — imóvel disponível para locação ou venda
  - `locado` — imóvel com locação ativa
  - `vendido` — imóvel vendido
  - `em_reforma` — temporariamente indisponível
  - `off_market` — retirado do mercado
- Valor de locação e/ou valor de venda

**Contratos (`imobi_contratos`):**
- Tipos: **locação** e **venda**
- Partes: imóvel, locatário/comprador, fiador (opcional)
- Período: data início e data fim
- Valor do contrato
- Índice de reajuste: IGP-M, IPCA, INPC, IGPDI, IPC (com data-base do reajuste)
- Periodicidade de pagamento (mensal, trimestral, anual)
- Data do primeiro pagamento
- Situação: ativo, encerrado, renovado, rescindido
- Cláusulas contratuais (texto livre)
- Integração com financeiro: gera parcelas recorrentes automaticamente

**Visitas (`imobi_visitas`):**
- Agendamento de visita ao imóvel
- Cliente interessado (vinculado ao ERP ou cadastro rápido)
- Corretor responsável
- Data e horário da visita
- Status: agendada, realizada, cancelada, proposta enviada
- Feedback da visita (observações livres)
- Próximo passo (fazer proposta, reagendar, desqualificado)

---

### 4.6 Jurídico

**Slug:** `juridico`  
**Rota:** `/erp/juridico`  
**Permissão:** `erp.viewJuridico`  
**Guard:** `NichoGuard slug="juridico"` no `layout.tsx`

**Atende:** Escritórios de advocacia (qualquer área), departamentos jurídicos de empresas, advogados autônomos

#### Funcionalidades

**Gestão de Processos (`juridico_processos`):**
- **Número CNJ** (formato: NNNNNNN-DD.AAAA.J.TT.OOOO)
- Tribunal, vara, comarca, UF
- **Tipos de processo:** cível, trabalhista, tributário, criminal, administrativo, previdenciário, família, empresarial, outro
- **Fase processual:** conhecimento, recursal, execução, baixado/encerrado
- Partes: cliente/autor (vinculado ao ERP), réu, terceiros intervenientes
- Advogado responsável (membro da equipe)
- Valor da causa
- Valor de condenação/acordo
- Data de distribuição e data de baixa
- Observações e estratégia processual (campo privado)

**Controle de Prazos (`juridico_prazos`):**
- Data limite fatal (perda do prazo = prejuízo processual irreversível)
- Tipo: prazo de contestação, recurso, manifestação, audiência, diligência, outro
- Descrição do que deve ser feito
- **Prioridade:** normal, alta, crítica
- Status: pendente, cumprido, perdido, suspenso
- **Alertas de prazos urgentes:** RPC `fn_jur_prazos_urgentes` retorna prazos dos próximos 7 dias — exibidos em destaque na tela principal
- Integração com sistema de notificações in-app (tipo `prazo`)

**Andamentos Processuais (`juridico_andamentos`):**
- Registro de cada movimentação do processo
- **Tipos:** publicação, petição protocolada, audiência, decisão, despacho, sentença, acórdão, cumprimento de sentença, recurso interposto, outro
- Data e hora da movimentação
- Descrição detalhada do andamento
- Usuário que registrou
- RPC `fn_jur_andamento_registrar`

**Honorários (`juridico_honorarios`):**
- Controle financeiro por processo
- **Tipos:** contratual (fixo mensal/por fase), de êxito (% sobre valor), consultivo, complementar
- Valor e percentual (para êxito)
- **Status:** pendente, parcialmente pago, totalmente pago, cancelado
- Integração com financeiro: gera parcelas a receber automaticamente
- Vínculo com processo e cliente

---

### 4.7 Arquitetura & Engenharia

**Slug:** `arquitetura`  
**Rota:** `/erp/arquitetura`  
**Permissão:** `erp.viewArquitetura`  
**Guard:** `NichoGuard slug="arquitetura"` no `layout.tsx`

**Atende:** Escritórios de arquitetura e design de interiores, construtoras, empresas de engenharia civil, prestadores de serviços de obra

#### Funcionalidades

**Gestão de Projetos (`arq_projetos`):**
- Nome e código interno do projeto
- **Tipos:** residencial unifamiliar, residencial multifamiliar, comercial, industrial, reforma/retrofit, infraestrutura, interior design, paisagismo, outro
- **Status:** proposta, aprovado, em execução, pausado, concluído, cancelado
- Cliente responsável (vinculado ao ERP)
- Endereço da obra
- Responsável técnico pelo projeto (ART/RRT — Anotação/Registro de Responsabilidade Técnica)
- **Valores:** orçado e contratado (para controle de desvio)
- Datas: início previsto, início real, prazo final previsto, prazo final real
- Percentual de progresso físico geral
- Observações e memorial descritivo

**Etapas de Obra (`arq_etapas`):**
- Divisão do projeto em macro-etapas (ex.: Fundação, Estrutura, Alvenaria, Cobertura, Instalações, Acabamento, Entrega)
- Ordem de execução
- **Status da etapa:** não iniciada, em andamento, concluída, atrasada, bloqueada
- Percentual de progresso físico da etapa
- Datas planejadas (início e fim) e datas realizadas
- Responsável técnico pela etapa
- Dependências com outras etapas
- RPC `fn_arq_etapa_atualizar_status` — atualiza com registro de data

**Medições (`arq_medicoes`):**
- Medições periódicas de obra para **faturamento progressivo**
- Data da medição
- Período de referência (ex.: "junho/2026")
- Percentual medido no período (ex.: 15% de execução)
- Valor correspondente à medição (calculado sobre valor contratado)
- Acumulado de medições anteriores
- Vinculação opcional a etapa específica ou medição global do projeto
- **Integração financeira:** cada medição aprovada gera automaticamente uma fatura (parcela a receber) no ERP
- Total faturado vs. total contratado (controle de saldo a faturar)
- RPC `fn_arq_medicao_registrar`

---

## 5. Controle de Acesso e Permissões

### Hierarquia de acesso

```
Nível 1 — SUPER_ADMIN (Axory)
    Acesso total a tudo, todas as empresas
    └── Nível 2 — Admin Global (gestores Axory)
            Acesso a módulos SaaS conforme permissões internas
            └── Nível 3 — ADMIN (dono/gerente da empresa cliente)
                    Acesso total ao ERP/CRM da própria empresa
                    └── Nível 4 — MEMBER (colaborador)
                            Acesso restrito ao cargo configurado
```

### Catálogo completo de permissões

**Grupo SaaS (Equipe Axory):**

| Permissão | Descrição |
|---|---|
| `saas.viewDashboard` | Ver painel super admin |
| `saas.viewCompanies` | Listar todas as empresas |
| `saas.createCompanies` | Criar nova empresa |
| `saas.editCompanies` | Editar dados da empresa |
| `saas.manageCompanyFlags` | Alterar flags, nichos e plano da empresa |
| `saas.manageInternalUsers` | Gerenciar equipe interna Axory |
| `saas.viewRoles` | Ver modelos de cargo |
| `saas.manageRoles` | Criar/editar modelos de cargo |
| `saas.viewPlans` | Ver planos SaaS |
| `saas.managePlans` | Criar/editar planos |
| `saas.viewPlanAccounts` | Ver plano de contas modelo |
| `saas.importPlanAccounts` | Importar plano de contas para empresa |
| `saas.viewSupport` | Ver chamados de suporte |
| `saas.viewLogs` | Ver todos os logs do sistema |
| `saas.viewCompanyLogs` | Ver logs de empresa específica |
| `saas.viewKeepAlive` | Ver status keep-alive |
| `saas.viewSettings` | Ver configurações admin |

**Grupo ERP:**

| Permissão | Descrição |
|---|---|
| `erp.viewInicio` | Ver página inicial ERP |
| `erp.viewNegocios` | Ver hub de negócios |
| `erp.viewPropostas` | Ver e gerenciar propostas |
| `erp.viewPedidosVenda` | Ver e gerenciar pedidos de venda |
| `erp.viewOrdensServico` | Ver e gerenciar ordens de serviço |
| `erp.viewContratos` | Ver e gerenciar contratos |
| `erp.viewPdv` | Operar PDV |
| `erp.viewFinanceiro` | Ver hub financeiro |
| `erp.viewReceber` | Ver contas a receber |
| `erp.viewPagar` | Ver contas a pagar |
| `erp.executeApiPayments` | Executar pagamentos via API bancária (Inter/Asaas) |
| `erp.viewContaDigital` | Ver conta digital integrada |
| `erp.viewBoletos` | Ver e gerenciar boletos |
| `erp.viewExtrato` | Ver extrato bancário |
| `erp.viewConciliacaoBancaria` | Ver e fazer conciliação bancária |
| `erp.viewConciliacaoPdv` | Ver e fazer conciliação PDV |
| `erp.viewDespesas` | Ver despesas operacionais |
| `erp.viewReceitasDespesas` | Ver receitas e despesas consolidadas |
| `erp.viewResultados` | Ver todos os relatórios de resultados |
| `erp.viewCadastros` | Ver hub de cadastros |
| `erp.viewContatos` | Ver e gerenciar contatos/clientes |
| `erp.viewProdutos` | Ver e gerenciar produtos e estoque |
| `erp.viewServicos` | Ver e gerenciar serviços |
| `erp.viewUsuariosSistema` | Ver usuários da empresa |
| `erp.manageUsuariosSistema` | Convidar, remover e configurar usuários |
| `erp.viewVendedores` | Ver e gerenciar vendedores |
| `erp.viewAgenda` | Ver módulo de agenda |
| `erp.viewSaude` | Ver módulo Saúde |
| `erp.viewFluxoProjetado` | Ver fluxo de caixa projetado |
| `erp.viewRecorrencia` | Ver recorrência de cobrança |
| `erp.viewWebhooks` | Ver e configurar webhooks externos |
| `erp.viewVeterinaria` | Ver módulo Veterinária |
| `erp.viewImobiliaria` | Ver módulo Imobiliária |
| `erp.viewJuridico` | Ver módulo Jurídico |
| `erp.viewArquitetura` | Ver módulo Arquitetura & Engenharia |
| `erp.viewConfiguracoes` | Ver configurações ERP |
| `erp.viewLgpd` | Ver módulo LGPD |
| `erp.viewSuporte` | Ver módulo de suporte |

**Grupo CRM:**

| Permissão | Descrição |
|---|---|
| `crm.viewDashboard` | Ver dashboard CRM |
| `crm.viewLeads` | Ver e gerenciar leads |
| `crm.viewQuiz` | Criar e gerenciar quizzes |
| `crm.viewConfiguracoes` | Ver configurações CRM |

**Grupo Sistema:**

| Permissão | Descrição |
|---|---|
| `system.viewSettings` | Ver configurações da empresa (sys) |
| `system.manageCompanyUsers` | Gerenciar usuários da empresa |

---

## 6. Engine de Nichos — Como funciona

### Fluxo completo de ativação de um nicho

```
1. Admin Axory abre /admin/saas/empresas/[id] → aba "Nichos"
2. Visualiza card de cada nicho com status ATIVO/INATIVO
3. Clica em "Ativar nicho" no card desejado
4. SaasSimpleNicheToggle faz upsert em saas_empresas_nichos:
   { id_empresa, codigo_nicho, ativo: true, visivel_no_menu: true }
5. Na próxima vez que o usuário da empresa carregar o app:
   CompanyContext carrega nichosAtivos:
   SELECT * FROM saas_empresas_nichos WHERE id_empresa = X
6. isNichoAtivo('veterinaria') → true
7. Sidebar exibe o item "Veterinária"
8. NichoGuard no layout.tsx da rota permite acesso ao conteúdo
9. Para desativar: toggle → false → sidebar some + NichoGuard bloqueia acesso
```

### Tabelas da engine

| Tabela | Papel |
|---|---|
| `saas_nichos_catalogo` | Catálogo global de nichos disponíveis na plataforma (todos os slugs registrados) |
| `saas_empresas_nichos` | Quais nichos cada empresa tem ativados (flag `ativo` + `visivel_no_menu`) |
| `saas_nichos_eventos` | Log de eventos de ativação e desativação de nichos por empresa |

### Slugs de nichos, nomes e editores

| Slug | Nome exibido | Editor no admin | Cor do card |
|---|---|---|---|
| `delivery` | Delivery | Editor customizado com configurações de status de pedido | Laranja |
| `agendamento` | Agendamento | Toggle simples | Azul |
| `saude` | Saúde | Toggle simples | Rosa |
| `veterinaria` | Veterinária | Toggle simples | Âmbar |
| `imobiliaria` | Imobiliária | Toggle simples | Ciano |
| `juridico` | Jurídico | Toggle simples | Roxo |
| `arquitetura` | Arquitetura & Engenharia | Toggle simples | Amarelo |

### Como usar no código frontend

```typescript
// Verificar um nicho
const { ativo } = useNicho('veterinaria');

// Verificar múltiplos nichos
const { algumAtivo, todosAtivos, ativoPorSlug } = useNicho(['saude', 'veterinaria']);

// Slugs tipados (evita magic strings)
import { NICHO_SLUGS } from '@/lib/nichos/useNicho';
NICHO_SLUGS.SAUDE        // → 'saude'
NICHO_SLUGS.VETERINARIA  // → 'veterinaria'
NICHO_SLUGS.IMOBILIARIA  // → 'imobiliaria'
NICHO_SLUGS.JURIDICO     // → 'juridico'
NICHO_SLUGS.ARQUITETURA  // → 'arquitetura'
NICHO_SLUGS.DELIVERY     // → 'delivery'

// Proteção de rota no layout
// Em app/(platform)/erp/veterinaria/layout.tsx:
<NichoGuard slug="veterinaria" nome="Veterinária">
  {children}
</NichoGuard>
// Se nicho inativo → tela "Módulo Veterinária não habilitado"
// Se nicho ativo  → renderiza children normalmente
```

---

## 7. Funções PostgreSQL (RPCs) — Catálogo completo

> Todas as funções usam `SECURITY DEFINER` e `SET search_path = public`.  
> Funções de relatório retornam `JSONB`.  
> Prefixo obrigatório: `fn_`

### Autenticação e contexto

| Função | Descrição |
|---|---|
| `fn_contexto_acesso_usuario` | Contexto completo do usuário (empresa, cargo, permissões, nichos) |
| `fn_meu_contexto_acesso` | Versão simplificada do contexto para UI |
| `fn_minha_permissao` | Verifica se usuário logado tem permissão específica |
| `fn_usuario_tem_permissao` | Verifica permissão de qualquer usuário por UUID |
| `fn_saas_usuario_tem_acesso_empresa` | Valida se usuário interno Axory pode acessar empresa |
| `fn_resolver_contexto_app` | Resolve contexto completo na inicialização do app |

### Início / Dashboard

| Função | Descrição |
|---|---|
| `fn_resumo_inicio_parcelas` | KPIs financeiros da tela inicial (receitas, despesas, saldo previsto, vencido) |
| `fn_erp_inicio_operacional_resumo` | Contagens operacionais (propostas, pedidos, OS em aberto) |
| `fn_erp_inicio_metas_resumo` | Metas vs. realizado do mês por vendedor |
| `fn_erp_inicio_preferencias_bootstrap` | Carrega preferências de personalização do usuário |
| `fn_erp_inicio_salvar_preferencias` | Salva preferências (blocos, atalhos, ordem) |

### Negócios — carregamento e salvamento otimizado

| Função | Descrição |
|---|---|
| `fn_carregar_documento_negocio_bootstrap` | Bootstrap de contexto para novo documento (clientes, catálogo, vendedores, condições) |
| `fn_carregar_documento_negocio_pagina_edicao` | Dados completos de documento existente para edição |
| `fn_carregar_proposta_edicao` | Proposta com todos os itens, parcelas e campos |
| `fn_salvar_proposta_edicao` | Salva proposta completa em uma transação |
| `fn_carregar_pedido_venda_edicao` | Pedido com itens, estoque, parcelas |
| `fn_salvar_pedido_venda_edicao` | Salva pedido completo |
| `fn_carregar_os_edicao` | OS com itens e dados de serviço |
| `fn_salvar_os_edicao` | Salva OS |
| `fn_carregar_contrato_edicao` | Contrato com parcelas e configurações |
| `fn_salvar_contrato_edicao` | Salva contrato |

### Financeiro — parcelas e saldos

| Função | Descrição |
|---|---|
| `fn_erp_atualizar_parcelas_vencidas` | Atualiza status de parcelas cujo vencimento já passou |
| `fn_erp_normalizar_status_vencimento_parcela` | Normaliza status de vencimento |
| `fn_erp_recalcular_saldo_parcela` | Recalcula saldo de parcela considerando múltiplas baixas |
| `fn_atualizar_saldo_parcela` | Atualiza saldo imediatamente após novo pagamento |
| `fn_erp_validar_baixa_extrato_parcela` | Valida se baixa pode ser executada |
| `fn_erp_excluir_lancamento_extrato` | Exclui lançamento de extrato com auditoria |
| `fn_erp_extrato_restaurar_importado_antes_delete` | Restaura extrato importado antes de deletar |

### Financeiro — conciliação e PDV

| Função | Descrição |
|---|---|
| `fn_erp_regras_conciliacao_auditoria` | Auditoria de regras automáticas de conciliação |
| `fn_conciliacao_criar_venda_pdv_avulsa` | Cria venda PDV a partir de transação sem correspondência |

### Financeiro — régua de cobrança

| Função | Descrição |
|---|---|
| `fn_erp_gerar_fila_regua_cobranca` | Gera fila de cobranças da régua manualmente |
| `fn_erp_regua_cobranca_etapa_data` | Calcula data de cada etapa da régua |
| `fn_erp_regua_cobranca_renderizar_mensagem` | Renderiza mensagem com variáveis substituídas (nome, valor, data) |

### Portal do cliente

| Função | Descrição |
|---|---|
| `fn_portal_cliente_salvar_pix_cobranca` | Registra cobrança Pix iniciada pelo portal do cliente |

### Recorrência e contratos

| Função | Descrição |
|---|---|
| `fn_contratos_processar_recorrencia` | Gera próximas parcelas de contratos com recorrência ativa |
| `fn_contrato_proximo_vencimento` | Calcula próxima data de vencimento conforme periodicidade |

### Resultados e análises

| Função | Descrição |
|---|---|
| `fn_fluxo_caixa_projetado` | Projeção consolidada de entradas e saídas futuras por mês |
| `fn_fluxo_caixa_por_categoria` | Fluxo projetado detalhado por categoria financeira |
| `fn_processar_comissao_recebimento` | Processa comissão no momento do recebimento de parcela |
| `fn_processar_gatilho_comissao` | Gatilho de cálculo automático de comissão |
| `fn_calcular_percentual_comissao` | Calcula percentual de comissão considerando faixas |
| `fn_obter_percentual_comissao_faixa` | Retorna percentual para faixa de valor específica |

### Cadastros

| Função | Descrição |
|---|---|
| `fn_atualiza_estoque` | Ajusta saldo de estoque ao vender ou repor produto |
| `fn_gerar_campo_chave_custom` | Gera chave única para campo customizado de documento |

### Auditoria e segurança

| Função | Descrição |
|---|---|
| `fn_trigger_auditoria_generica` | Trigger genérico instalado em tabelas críticas para auditoria automática |
| `fn_auditoria_consultar` | Consulta paginada e filtrada de logs de auditoria |
| `fn_registrar_log` | Registra evento de auditoria manualmente |
| `fn_log_status_com_retroativo` | Log de mudança de status com histórico retroativo |

### LGPD

| Função | Descrição |
|---|---|
| `fn_lgpd_registrar_consentimento` | Registra consentimento do titular de dados |
| `fn_lgpd_revogar_consentimento` | Revoga consentimento existente |
| `fn_lgpd_listar_consentimentos` | Lista consentimentos por empresa |
| `fn_lgpd_abrir_solicitacao` | Abre solicitação de direitos do titular |
| `fn_lgpd_atualizar_solicitacao` | Atualiza status da solicitação em andamento |
| `fn_lgpd_listar_solicitacoes` | Lista solicitações por empresa |
| `fn_lgpd_salvar_politica_retencao` | Cria/edita política de retenção de dados |
| `fn_lgpd_listar_politicas_retencao` | Lista políticas de retenção |

### Backup

| Função | Descrição |
|---|---|
| `fn_registrar_backup` | Registra execução de backup com metadados (tipo, status, tamanho) |
| `fn_backup_saude_verificar` | Verifica se último backup está dentro do prazo esperado |

### Ficha genérica

| Função | Descrição |
|---|---|
| `fn_ficha_templates_listar` | Lista templates disponíveis para uma empresa |
| `fn_ficha_template_salvar` | Cria ou edita template |
| `fn_ficha_campos_listar` | Lista campos de um template |
| `fn_ficha_campo_salvar` | Cria ou edita campo do template |
| `fn_ficha_listar` | Lista fichas vinculadas a uma entidade |
| `fn_ficha_abrir` | Abre ficha com todos os valores preenchidos |
| `fn_ficha_buscar` | Busca ficha por entidade e tipo |
| `fn_ficha_salvar_valores` | Salva valores preenchidos pelo usuário |

### Agenda

| Função | Descrição |
|---|---|
| `fn_agenda_listar_dia` | Lista todos os agendamentos de um dia por empresa |
| `fn_agenda_slots_disponiveis` | Calcula horários livres para data e recurso específicos |
| `fn_agendamento_criar` | Cria agendamento com validação de conflito de horário |
| `fn_agendamento_atualizar_status` | Atualiza status do agendamento |
| `fn_agenda_tipos_listar` | Lista tipos de agendamento configurados |
| `fn_agenda_recursos_listar` | Lista recursos disponíveis |

### Notificações in-app

| Função | Descrição |
|---|---|
| `fn_notificacoes_listar` | Lista notificações do usuário logado com total de não lidas |
| `fn_notificacao_marcar_lida` | Marca notificação específica como lida |
| `fn_notificacoes_marcar_todas_lidas` | Marca todas as notificações como lidas |
| `fn_notificacao_criar` | Cria notificação (uso interno pelos módulos do sistema) |
| `fn_notificacao_inapp_marcar_lida` | Trigger que preenche `lida_em` ao marcar como lida |

### Webhooks

| Função | Descrição |
|---|---|
| `fn_webhooks_listar` | Lista endpoints configurados com estatísticas de uso |
| `fn_webhooks_endpoint_salvar` | Cria ou edita endpoint webhook |
| `fn_webhook_registrar_evento` | Registra novo disparo de evento |
| `fn_webhook_atualizar_status` | Atualiza resultado do disparo (status HTTP, resposta) |
| `fn_webhooks_pendentes_listar` | Lista disparos pendentes de reenvio |

### API Pública

| Função | Descrição |
|---|---|
| `fn_api_tokens_listar` | Lista tokens da empresa (sem expor o token raw) |
| `fn_api_token_criar` | Gera novo token (retorna valor raw apenas uma vez) |
| `fn_api_token_revogar` | Desativa token permanentemente |
| `fn_api_token_stats` | Estatísticas de uso do token por período |

### Relatórios agendados

| Função | Descrição |
|---|---|
| `fn_relatorios_agendados_listar` | Lista relatórios configurados pela empresa |
| `fn_relatorio_agendado_salvar` | Cria ou edita relatório agendado |
| `fn_relatorio_agendado_toggle` | Ativa ou desativa relatório |

### Split e Checkout

| Função | Descrição |
|---|---|
| `fn_contas_recebimento_listar` | Lista contas Asaas configuradas (sem expor API keys) |
| `fn_checkout_links_listar` | Lista links de pagamento/checkout |

### MultiGestão

| Função | Descrição |
|---|---|
| `fn_erp_multi_visao_geral` | Dashboard consolidado de todas as empresas gerenciadas |
| `fn_erp_multi_carteira_clientes` | SLA e saúde de cada empresa da carteira |
| `fn_erp_multi_central_documentos` | Documentos centralizados por empresa |
| `fn_erp_multi_sla_operacional` | SLA operacional da carteira BPO |
| `fn_erp_multi_vencimentos_importantes` | Vencimentos críticos consolidados |

### Admin SaaS

| Função | Descrição |
|---|---|
| `fn_saas_dashboard_resumo` | Resumo do painel super admin (empresas, MRR, usuários) |
| `fn_saas_usuario_tem_acesso_empresa` | Valida acesso de usuário interno Axory a empresa específica |

### Nicho Saúde

| Função | Descrição |
|---|---|
| `fn_saude_paciente_listar` | Lista pacientes com filtros |
| `fn_saude_paciente_buscar` | Busca paciente por nome, CPF ou número de prontuário |
| `fn_saude_paciente_salvar` | Cria ou edita paciente |
| `fn_saude_profissionais_listar` | Lista profissionais de saúde da empresa |
| `fn_saude_evolucoes_listar` | Lista evoluções de um prontuário |
| `fn_saude_evolucao_registrar` | Registra nova evolução SOAP |
| `fn_saude_gerar_numero_prontuario` | Gera número sequencial de prontuário |
| `fn_saude_gerar_numero_recibo` | Gera número sequencial de recibo |
| `fn_saude_recibo_gerar` | Cria recibo e parcela financeira em transação única |

### Nicho Veterinária

| Função | Descrição |
|---|---|
| `fn_vet_animal_listar` | Lista animais com filtros |
| `fn_vet_animal_buscar` | Busca animal por nome, tutor ou número de ficha |
| `fn_vet_animal_salvar` | Cria ou edita animal |
| `fn_vet_evolucoes_listar` | Lista evoluções clínicas de um animal |
| `fn_vet_evolucao_registrar` | Registra nova evolução veterinária |
| `fn_vet_gerar_numero_ficha` | Gera número sequencial de ficha animal |
| `fn_vet_recibo_gerar` | Cria recibo veterinário e parcela financeira |

### Nicho Imobiliária

| Função | Descrição |
|---|---|
| `fn_imobi_imovel_listar` | Lista imóveis com filtros |
| `fn_imobi_imovel_salvar` | Cria ou edita imóvel |
| `fn_imobi_contrato_salvar` | Cria ou edita contrato de locação/venda |

### Nicho Jurídico

| Função | Descrição |
|---|---|
| `fn_jur_processo_listar` | Lista processos com filtros |
| `fn_jur_processo_salvar` | Cria ou edita processo |
| `fn_jur_prazos_urgentes` | Retorna prazos com vencimento nos próximos 7 dias |
| `fn_jur_andamento_registrar` | Registra andamento processual |

### Nicho Arquitetura

| Função | Descrição |
|---|---|
| `fn_arq_projeto_listar` | Lista projetos com filtros |
| `fn_arq_projeto_salvar` | Cria ou edita projeto |
| `fn_arq_etapa_atualizar_status` | Atualiza status de etapa com data de ocorrência |
| `fn_arq_medicao_registrar` | Registra medição e gera fatura no ERP |

### CRONs automáticos (pg_cron)

| Função | Frequência sugerida | Ação |
|---|---|---|
| `fn_erp_cron_processar_despesas_recorrentes` | Diário (07:00) | Gera lançamentos de despesas fixas conforme antecedência |
| `fn_erp_cron_gerar_fila_regua_cobranca` | Diário (06:00) | Popula fila de notificações da régua de cobrança |
| `fn_erp_cron_disparar_worker_fila_notificacoes` | Horário (a cada hora) | Dispara notificações pendentes da fila (WhatsApp/email) |
| `fn_erp_cron_processar_faturamento_contratos` | Diário (05:00) | Gera parcelas recorrentes de contratos ativos |

---

## 8. Banco de Dados — Tabelas por módulo

### Prefixos de nomenclatura obrigatórios

| Prefixo | Domínio | Exemplos |
|---|---|---|
| `sis_` | Sistema central | `sis_empresas`, `sis_membros_equipe`, `sis_cargos` |
| `erp_` | Módulos financeiro e operacional | `erp_parcelas`, `erp_contatos`, `erp_contratos` |
| `crm_` | Módulos de marketing e CRM | `crm_leads`, `crm_quiz` |
| `saas_` | Gestão da plataforma SaaS | `saas_planos`, `saas_empresas_nichos` |
| `saude_` | Vertical Saúde | `saude_prontuarios`, `saude_recibos` |
| `vet_` | Vertical Veterinária | `vet_prontuarios`, `vet_recibos` |
| `imobi_` | Vertical Imobiliária | `imobi_imoveis`, `imobi_contratos` |
| `juridico_` | Vertical Jurídico | `juridico_processos`, `juridico_prazos` |
| `arq_` | Vertical Arquitetura | `arq_projetos`, `arq_etapas` |
| `delivery.` | Schema separado Delivery | `delivery.cardapios`, `delivery.pedidos_publicos` |

### Tabelas por módulo

**Sistema central:**
`sis_empresas` · `sis_membros_equipe` · `sis_cargos` · `sis_logs_sistema` · `sis_fila_notificacoes` · `sis_notificacoes_inapp` · `sis_sessoes_ativas` · `sis_preferencias_usuario_empresa` · `sis_documentacao_sistema`

**Fichas genéricas:**
`sis_ficha_templates` · `sis_ficha_campos` · `sis_fichas` · `sis_ficha_valores`

**LGPD:**
`sis_lgpd_consentimentos` · `sis_lgpd_solicitacoes` · `sis_lgpd_politicas_retencao`

**Backup e CRONs:**
`sis_backup_log` · `sis_cron_execucoes`

**Relatórios agendados:**
`sis_relatorios_agendados` · `sis_relatorios_envios`

**Pacientes e animais (sis_ pois compartilhados):**
`sis_pacientes` · `sis_animais`

---

**Financeiro — Core:**
`erp_parcelas` · `erp_contatos` · `erp_propostas` · `erp_catalogo` · `erp_vendedores` · `erp_formas_pagamento` · `erp_departamentos` · `erp_projetos` · `erp_notas_fiscais` · `erp_grupos_dre` · `erp_categorias` · `erp_contratos` · `erp_os` · `erp_despesas` · `erp_extrato` · `erp_contas_bancarias` · `erp_lancamentos_avulsos` · `erp_financeiro_anexos` · `erp_despesas_recorrentes` · `erp_notas_fiscais_pagamentos`

**Boletos CNAB:**
`erp_boletos_remessas` · `erp_boletos_remessa_itens` · `erp_boletos_retornos` · `erp_boletos_retorno_itens`

**Conciliação e gateway:**
`erp_regras_conciliacao_bancaria` · `erp_gateway_webhook_eventos` · `erp_pdv_formas_pagamento_contas` · `erp_pagamentos_inter_acompanhamento`

**Importação:**
`erp_importacoes_financeiras_lotes`

**Fechamento do mês:**
`erp_fechamento_mes_assinaturas` · `erp_fechamento_mes_revisoes` · `erp_fechamento_mes_itens_manuais_config` · `erp_fechamento_mes_confirmacoes_manuais`

**Orçamentos:**
`erp_orcamentos` · `erp_orcamento_linhas`

**Campos customizados:**
`erp_campos_customizados_opcoes` · `erp_campos_customizados_valores` · `erp_campos_customizados_valor_opcoes`

**Documentos e grupos:**
`erp_itens_proposta` · `erp_documento_token_publico` · `erp_grupos_contatos` · `erp_contatos_grupos` · `erp_regras_categoria_dre`

**Régua de cobrança:**
`erp_reguas_cobranca`

**Início e comunicação:**
`erp_novidades_inicio` · `erp_novidades_inicio_empresas` · `erp_mural_avisos_internos`

**PDF:**
`erp_configuracoes_pdf`

**Webhooks externos:**
`erp_webhooks_endpoints` · `erp_webhooks_log`

**API pública:**
`erp_api_tokens` · `erp_api_logs`

**Split e checkout:**
`erp_contas_recebimento` · `erp_split_regras` · `erp_checkout_links`

**Agenda:**
`erp_agenda_tipos` · `erp_agenda_recursos` · `erp_agendamentos` · `erp_agenda_bloqueios` · `erp_agenda_notificacoes_fila`

**MultiGestão:**
`erp_multi_categorias_tarefas` · `erp_multi_tipos_documentos` · `erp_multi_configuracoes` · `erp_multi_responsaveis_cliente` · `erp_multi_tarefas` · `erp_multi_tarefas_checklist` · `erp_multi_tarefas_comentarios` · `erp_multi_documentos` · `erp_multi_vencimentos_importantes`

---

**CRM:**
`crm_leads` · `crm_quiz` · `crm_questoes` · `crm_opcoes` · `crm_leads_quiz` · `crm_quiz_resultados` · `crm_playbooks` · `crm_interacoes` · `crm_pipelines` · `crm_pipeline_etapas` · `crm_pipeline_leads` · `crm_custom_field_definitions` · `crm_configuracoes_estrategicas`

---

**SaaS — gestão da plataforma:**
`saas_planos` · `saas_empresas_planos` · `saas_cargos_modelo` · `saas_parcerias_bpo` · `saas_parcerias_bpo_delegacoes` · `saas_onboarding_playbooks` · `saas_onboarding_empresas` · `saas_chamados_suporte` · `saas_nichos_catalogo` · `saas_empresas_nichos` · `saas_nichos_eventos` · `saas_status_services` · `saas_status_checks` · `saas_status_incidents` · `saas_status_run_logs` · `saas_metricas_transacionais_eventos` · `saas_metricas_transacionais_diarias`

---

**Saúde (vertical):**
`sis_pacientes` · `saude_profissionais` · `saude_prontuarios` · `saude_prontuario_evolucoes` · `saude_recibos`

**Veterinária (vertical):**
`sis_animais` · `vet_prontuarios` · `vet_prontuario_evolucoes` · `vet_recibos`

**Imobiliária (vertical):**
`imobi_imoveis` · `imobi_contratos` · `imobi_visitas`

**Jurídico (vertical):**
`juridico_processos` · `juridico_prazos` · `juridico_andamentos` · `juridico_honorarios`

**Arquitetura (vertical):**
`arq_projetos` · `arq_etapas` · `arq_medicoes`

**Delivery (schema separado):**
`delivery.configuracoes_empresa` · `delivery.status_empresa` · `delivery.status_empresa_transicoes` · `delivery.cardapios` · `delivery.cardapio_itens` · `delivery.pedidos_publicos` · `delivery.eventos_pedido`

---

## 9. Admin SaaS

**Rota base:** `/admin/saas`  
**Acesso:** Permissões `saas.*` — exclusivo para equipe interna Axory

O painel administrativo SaaS é a central de operações da plataforma. Permite gerenciar todas as empresas clientes, planos, usuários e configurações globais.

### Seções do painel

| Seção | Rota | Funcionalidade principal |
|---|---|---|
| **Dashboard** | `/admin/saas` | MRR, empresas ativas, usuários totais, churn, novos clientes |
| **Empresas** | `/admin/saas/empresas` | Listagem e gestão completa de todas as empresas |
| **Detalhe da empresa** | `/admin/saas/empresas/[id]` | 7 abas: Dados, Flags, Nichos, Assinatura, Membros, Plano de contas, Logs |
| **Nichos** | `/admin/saas/nichos` | Catálogo de nichos disponíveis; detalhe por nicho |
| **Planos** | `/admin/saas/planos` | CRUD de planos SaaS com preços e limites |
| **Cargos** | `/admin/saas/cargos` | Modelos de cargo com matrizes de permissões |
| **Usuários internos** | `/admin/saas/usuarios-internos` | Equipe Axory com perfis de acesso ao admin |
| **Usuários** | `/admin/saas/usuarios` | Todos os usuários de todas as empresas clientes |
| **Logs** | `/admin/saas/logs` | Logs globais do sistema com filtros |
| **Suporte** | `/admin/saas/suporte` | Chamados abertos pelos clientes |
| **Bancos** | `/admin/saas/bancos` | Lista de bancos e configurações para boletos |
| **Notas Fiscais** | `/admin/saas/notas-fiscais` | NFs de cobrança do próprio SaaS |
| **Emails** | `/admin/saas/emails` | Central de e-mails enviados pelo sistema |
| **Propostas** | `/admin/saas/propostas` | Propostas comerciais para novos clientes |
| **Início ERP** | `/admin/saas/inicio-erp` | Configurar novidades e atalhos da tela inicial do ERP |
| **Régua de Cobrança** | `/admin/saas/regua-cobranca` | Configuração da régua global |
| **Portal Clientes** | `/admin/saas/portal/clientes` | Portal de acesso dos clientes |
| **Integrações Pedidos** | `/admin/saas/integracoes-pedidos` | Integrações de pedidos externos |
| **Status Page** | `/admin/saas/status-page` | Monitoramento de status dos serviços da plataforma |
| **Documentação** | `/admin/saas/documentacao-sis` | Documentação técnica (tabela `sis_documentacao_sistema`) |
| **Configurações** | `/admin/saas/configuracoes` | Configurações globais do SaaS |
| **Plano de Contas** | `/admin/saas/plano-contas` | Modelo de plano de contas para importação nas empresas |

### Listagem de empresas — detalhe

**Filtros:** busca (razão social, fantasia, CPF/CNPJ), plano (GRATIS, STARTER, PRO, ENTERPRISE), tipo (SAAS, CLIENTE_FINAL, PARCEIRO_BPO), status da conta (ATIVO, SUSPENSO, CANCELADO), módulos (ERP e/ou CRM)

**Colunas:** Empresa, Documento, Tipo, Plano, Status, Módulos ativos, Data de cadastro, Ações

**Flags de módulo na listagem (toggles inline):**
- `acesso_erp` — habilitar/desabilitar módulo ERP
- `acesso_crm` — habilitar/desabilitar módulo CRM
- `gestao_financeira` — habilitar/desabilitar gestão financeira

**Ações da listagem:**
- Suspender / Reativar empresa (altera `status_conta`)
- Ver detalhe completo
- Excluir empresa (requer digitar "EXCLUIR" para confirmar — ação irreversível)
- Criar nova empresa (`SaasCompanyCreateDrawer`)

**Paginação:** 8 empresas por página com skeleton loading

### Detalhe da empresa — 7 abas

**1. Dados gerais:**
- Edição de todos os dados cadastrais
- Tipo de empresa, tipo de pessoa, CPF/CNPJ, email suporte, telefone, site
- Plano atual, status da conta
- Salvar flags principais (gestao_financeira, acesso_erp, acesso_crm)
- Botão "Salvar flags"

**2. Flags e plano:**
- Toggles de módulos (ERP, CRM, gestão financeira)
- Visualização do plano contratado

**3. Nichos (central de controle de verticais):**
- Card para cada um dos 7 nichos disponíveis
- Badge de status: **ATIVO** (verde) / **INATIVO** (cinza)
- Para nichos com editor simples: botão **"Ativar nicho"** / **"Desativar nicho"** com confirmação visual
- Para Delivery: botão **"Editar nicho"** → abre editor detalhado com configurações de status de pedido
- Toggle em tempo real — salva imediatamente em `saas_empresas_nichos`
- Ao salvar, atualiza o contexto da empresa no próximo login

**4. Assinatura:**
- Controle do plano: seleção de plano, ciclo (mensal/anual), status (ATIVA, TRIAL, SUSPENSA, CANCELADA)
- Data de assinatura e dia de vencimento (1-28)
- Descontos: nenhum, percentual ou valor fixo
- Observações de cobrança
- Via RPC `saas_fn_configurar_assinatura_empresa`

**5. Onboarding:**
- Playbook de onboarding vinculado
- Status: NÃO_INICIADO, EM_ANDAMENTO, AGUARDANDO_CLIENTE, CONCLUÍDO, CANCELADO
- Etapa atual, progresso percentual (0-100%), barra de progresso
- Observações

**6. Membros:**
- Lista de todos os membros da equipe da empresa
- Nome, email, cargo, status

**7. Plano de contas:**
- Indicadores: grupos DRE importados, categorias criadas
- Botão "Importar modelo padrão Axory" (via RPC)
- Permite reaplicar modelo a empresas que precisam resetar

**8. Logs da empresa:**
- Eventos de auditoria filtrados pela empresa
- Notificações relacionadas à empresa
- Últimas 25 ocorrências de cada tipo

---

*Documento gerado em Jun/2026 — AxHub v2.0*  
*Equipe Axory · axory.com.br*  
*Total de linhas: ~1.700 · Módulos cobertos: 27 genéricos + 7 nichos · Tabelas: ~130+ · RPCs: 131+*
