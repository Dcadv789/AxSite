import type { Article } from '../../types';

export const negociosArticles: Article[] = [
  {
    id: 'criar-proposta',
    slug: 'criar-proposta',
    collectionId: 'negocios',
    title: 'Criar uma proposta do rascunho à aprovação',
    description: 'Passo a passo para criar, enviar e acompanhar uma proposta comercial no AxDeal.',
    keywords: ['proposta', 'criar proposta', 'aprovação', 'enviar proposta', 'status proposta'],
    updatedAt: '2026-06-25',
    related: ['pedidos-vs-os', 'contratos-faturamento', 'emitir-nota-fiscal'],
    body: `
# Criar uma proposta do rascunho à aprovação

Uma **proposta comercial** no AxDeal é o documento que você envia ao cliente com os serviços ou produtos, valores e condições de pagamento. Ela pode ser transformada em pedido, OS, contrato ou nota fiscal depois que for aprovada.

## Ciclo de vida de uma proposta

\`\`\`mermaid
flowchart LR
  R["📝 RASCUNHO"] --> AE["📤 AGUARDANDO ENVIO"]
  AE --> E["✉️ ENVIADA"]
  E --> V["👁️ VISUALIZADA"]
  V --> N["💬 EM NEGOCIAÇÃO"]
  N --> AP["✅ APROVADA"]
  N --> RE["❌ RECUSADA"]
  AP --> EX["⏰ EXPIRADA"]
  E --> EX
  AP --> CA["🚫 CANCELADA"]
\`\`\`

## Passo a passo para criar uma proposta

### 1. Acesse o módulo de Negócios

No menu lateral, clique em **Negócios** → **Propostas**. Clique no botão **"+ Nova Proposta"**.

### 2. Preencha o cabeçalho

| Campo | O que colocar |
|-------|--------------|
| **Cliente** | Digite o nome e selecione da lista. Se não existir, clique em "+ Novo cliente" |
| **Título** | Nome da proposta (ex.: "Consultoria Financeira — Jan/2026") |
| **Validade** | Data limite para o cliente aceitar |
| **Vendedor** | Quem criou ou é responsável pela oportunidade |

### 3. Adicione os itens

1. Clique em **"+ Adicionar item"**.
2. Escolha se é um **Serviço** ou **Produto** do catálogo.
3. Informe a quantidade e o valor unitário.
4. Se houver desconto, informe em R$ ou %.

### 4. Configure as condições de pagamento

- Escolha quantas parcelas e as datas de vencimento.
- Selecione a forma de pagamento (PIX, boleto, cartão).
- Você pode usar um template de parcelamento pré-configurado nas **Configurações**.

### 5. Envie ao cliente

Clique em **"Enviar proposta"**. Você pode:
- Enviar pelo **WhatsApp** (gera um PDF e abre o link do WhatsApp com o arquivo).
- Copiar o link da proposta para enviar por e-mail.

### 6. Acompanhe o status

O sistema registra automaticamente quando o cliente **visualizou** a proposta. Você pode mudar o status manualmente conforme a negociação avança.

### 7. Quando o cliente aceitar

Clique em **"Aprovar"** para mudar o status para APROVADA. A partir daí, você pode:
- **Converter em Pedido de Venda** ou **Ordem de Serviço**
- **Emitir Nota Fiscal** diretamente
- **Lançar as parcelas no financeiro**
`,
  },
  {
    id: 'pedidos-vs-os',
    slug: 'pedidos-vs-os',
    collectionId: 'negocios',
    title: 'Pedidos de Venda x Ordens de Serviço: qual usar?',
    description: 'Entenda a diferença entre Pedido de Venda e Ordem de Serviço e quando usar cada um.',
    keywords: ['pedido de venda', 'ordem de serviço', 'OS', 'diferença', 'kanban', 'status'],
    updatedAt: '2026-06-25',
    related: ['criar-proposta', 'contratos-faturamento'],
    body: `
# Pedidos de Venda x Ordens de Serviço: qual usar?

Tanto o **Pedido de Venda** quanto a **Ordem de Serviço (OS)** são documentos de execução no AxDeal. A diferença está no **tipo de entrega**:

| | Pedido de Venda | Ordem de Serviço |
|-|----------------|-----------------|
| **Para que serve** | Venda de produtos físicos ou entrega de pacotes | Prestação de serviços com execução e acompanhamento |
| **Fluxo de status** | RASCUNHO → EM ABERTO → EM ANDAMENTO → ATENDIDO | EM ABERTO → EM ANDAMENTO → AGUARDANDO PEÇA → CONCLUÍDO |
| **Controla estoque** | ✅ Sim | Pode ter itens mistos (serviços + peças) |
| **Exemplos** | Venda de equipamento, kit de produtos, pacote digital | Manutenção, instalação, atendimento técnico, consulta |

## Fluxo dos status

### Pedido de Venda

\`\`\`mermaid
flowchart LR
  R["📝 RASCUNHO"] --> A["📋 EM ABERTO"]
  A --> B["⚙️ EM ANDAMENTO"]
  B --> C["✅ ATENDIDO"]
  A --> D["🚫 CANCELADO"]
  B --> D
\`\`\`

### Ordem de Serviço

\`\`\`mermaid
flowchart LR
  A["📋 EM ABERTO"] --> B["⚙️ EM ANDAMENTO"]
  B --> C["🔩 AGUARDANDO PEÇA"]
  B --> D["📦 AGUARDANDO RETIRADA"]
  C --> B
  D --> E["✅ CONCLUÍDO"]
  B --> E
  A --> F["🚫 CANCELADO"]
\`\`\`

## Como visualizar em Kanban

Além da tabela, você pode ver seus pedidos e OS em formato **Kanban** — colunas por status com cards que você arrasta de um estágio para o outro. Basta clicar no ícone de Kanban no canto superior direito da listagem.

## Ações disponíveis em ambos

- **Lançar no financeiro**: gera as parcelas a receber automaticamente.
- **Lançar no estoque**: baixa ou credita os produtos.
- **Enviar PDF por WhatsApp**.
- **Emitir Nota Fiscal** a partir do documento.
`,
  },
  {
    id: 'contratos-faturamento',
    slug: 'contratos-faturamento',
    collectionId: 'negocios',
    title: 'Contratos e faturamento recorrente',
    description: 'Como criar contratos, configurar recorrência de cobrança e acompanhar o faturamento mensal.',
    keywords: ['contrato', 'recorrência', 'faturamento', 'cobrança mensal', 'assinatura', 'reajuste'],
    updatedAt: '2026-06-25',
    related: ['criar-proposta', 'contas-a-receber'],
    body: `
# Contratos e faturamento recorrente

O módulo de **Contratos** é ideal para clientes que pagam mensalmente — serviços de assinatura, mensalidades, retentores. O AxDeal gera as cobranças automaticamente todo mês.

## Estrutura de um contrato

\`\`\`mermaid
flowchart TD
  C["Contrato"] --> D["Aba Detalhes<br/>Cliente, vigência, valor, serviços"]
  C --> F["Aba Financeiro<br/>Parcelas geradas, status de cada uma"]
  C --> FAT["Aba Faturamento<br/>Periodicidade, reajuste, próximo vencimento"]
\`\`\`

## Como criar um contrato

1. Vá em **Negócios → Contratos** e clique em **"+ Novo Contrato"**.
2. Preencha os dados do cliente, serviços contratados e valor.
3. Na aba **Faturamento**, configure:
   - **Periodicidade**: mensal, trimestral, semestral ou anual.
   - **Dia do vencimento**: o dia do mês em que a cobrança cai.
   - **Índice de reajuste**: IGPM, IPCA ou percentual fixo (aplicado anualmente).
4. Salve o contrato.

## Geração automática de cobranças

O sistema gera a próxima parcela automaticamente todo mês com base na periodicidade configurada. Você também pode **acionar manualmente** antes da data prevista.

## Status do contrato

| Status | Significado |
|--------|------------|
| EM ABERTO | Contrato vigente e ativo |
| EM NEGOCIAÇÃO | Renegociação de termos em andamento |
| AGUARDANDO ASSINATURA | Enviado, aguardando aceite |
| GANHO | Contrato assinado e em execução |
| PERDIDO | Cliente não renovou |
| CANCELADO | Encerrado antes do prazo |

## Dica: Recorrência de Cobrança

Para uma visão geral de todos os contratos recorrentes ativos (próximas cobranças, histórico), acesse o menu **Recorrência** no menu lateral.
`,
  },
  {
    id: 'vender-no-pdv',
    slug: 'vender-no-pdv',
    collectionId: 'negocios',
    title: 'Vender no PDV (Ponto de Venda)',
    description: 'Como usar o PDV do AxDeal para realizar vendas rápidas com PIX, dinheiro e cartão.',
    keywords: ['pdv', 'ponto de venda', 'caixa', 'venda rápida', 'pix', 'cartão', 'dinheiro', 'troco'],
    updatedAt: '2026-06-25',
    related: ['pedidos-vs-os', 'conta-digital-pix'],
    body: `
# Vender no PDV (Ponto de Venda)

O **PDV** do AxDeal é uma tela de vendas rápidas — ideal para balcão, delivery local ou atendimentos presenciais onde você quer fechar a venda na hora.

## Como fazer uma venda no PDV

\`\`\`mermaid
flowchart TD
  A["Abrir PDV<br/>Negócios → PDV → Operacional"] --> B["Buscar produto/serviço<br/>ou filtrar por categoria"]
  B --> C["Adicionar ao carrinho<br/>(clique no item)"]
  C --> D{"Mais itens?"}
  D -->|Sim| B
  D -->|Não| E["Aplicar desconto<br/>(opcional)"]
  E --> F["Selecionar cliente<br/>(opcional)"]
  F --> G["Clique em Finalizar Venda"]
  G --> H["Escolher forma de pagamento"]
  H --> I["PIX / Dinheiro / Cartão"]
  I --> J["Venda concluída<br/>Imprimir ou enviar recibo"]
\`\`\`

## Formas de pagamento

### PIX
- O sistema gera um **QR Code** na tela.
- Se você tem a **Conta Digital** integrada, o AxDeal detecta o pagamento automaticamente.

### Dinheiro
- Informe o valor recebido.
- O sistema calcula o **troco** automaticamente.

### Cartão
- Selecione débito ou crédito.
- Para crédito parcelado, informe o número de parcelas.

## Dividir o pagamento

Você pode usar **mais de uma forma de pagamento** na mesma venda (ex.: parte em PIX, parte em dinheiro). Clique em **"+ Adicionar forma de pagamento"** no modal de pagamento.

## Desconto por item ou desconto global

- **Por item**: clique no ícone de desconto ao lado do item no carrinho.
- **Global**: informe o desconto no campo de desconto total antes de finalizar.

## Histórico de vendas

Para ver as vendas do dia ou rever um recibo passado, acesse **Negócios → PDV → Listagem**. Você pode filtrar por período, forma de pagamento e status.
`,
  },
  {
    id: 'emitir-nota-fiscal',
    slug: 'emitir-nota-fiscal',
    collectionId: 'negocios',
    title: 'Emitir Nota Fiscal (AxConnect)',
    description: 'Como emitir notas fiscais de serviço e produto diretamente do AxDeal via AxConnect.',
    keywords: ['nota fiscal', 'nf', 'nfs-e', 'axconnect', 'emitir', 'sefaz', 'xml', 'danfe'],
    updatedAt: '2026-06-25',
    related: ['criar-proposta', 'pedidos-vs-os'],
    body: `
# Emitir Nota Fiscal (AxConnect)

O AxDeal emite notas fiscais diretamente pelo sistema usando a integração **AxConnect** — sem precisar entrar em outra plataforma.

> **Pré-requisito:** Configure os dados fiscais da empresa em **Configurações → Empresa → Fiscal** (IE, IM, CNAE, regime tributário).

## Como emitir uma NF

### A partir de um documento existente

A forma mais rápida é emitir a NF a partir de uma proposta, pedido, OS ou contrato já existente:

1. Abra o documento desejado.
2. Clique no menu de ações (⋮) e selecione **"Emitir Nota Fiscal"**.
3. O sistema importa os dados automaticamente.

### Criando do zero

Acesse **Negócios → Notas Fiscais** e clique em **"+ Nova NF"**.

## As 5 abas do formulário de NF

\`\`\`mermaid
flowchart LR
  A["1. Dados<br/>Tomador, competência"] --> B["2. Pagamento<br/>Parcelas e condições"]
  B --> C["3. Itens<br/>Tributação NCM, CFOP"]
  C --> D["4. Conferência<br/>Revisão e alertas"]
  D --> E["5. AxConnect<br/>Envio ao SEFAZ"]
\`\`\`

| Aba | O que fazer |
|-----|------------|
| **Dados** | Confirme o tomador (CNPJ/CPF), endereço e a competência |
| **Pagamento** | Revise ou ajuste as condições de pagamento |
| **Itens** | Verifique NCM, CFOP, CST de ICMS/PIS/COFINS de cada item |
| **Conferência** | Leia os alertas antes de enviar — o sistema aponta inconsistências |
| **AxConnect** | Clique em **"Transmitir NF"** e acompanhe o protocolo de autorização |

## Após a autorização

- Faça o **download do XML** e do **PDF (DANFE)** pela listagem de NFs.
- Para **cancelar** uma NF autorizada, acesse a NF na listagem e clique em "Cancelar".

## Status da NF

| Status | O que significa |
|--------|----------------|
| RASCUNHO | Ainda não enviada |
| PROCESSANDO | Em análise pelo SEFAZ |
| AUTORIZADA | Aprovada e com validade fiscal |
| CANCELADA | Cancelada após autorização |
| ERRO | Rejeitada — verifique os dados e reenvie |
`,
  },
];
