import type { Article } from '../../types';

export const financeiroArticles: Article[] = [
  {
    id: 'contas-a-receber',
    slug: 'contas-a-receber',
    collectionId: 'financeiro',
    title: 'Dar baixa em uma conta a receber',
    description: 'Como registrar o pagamento de uma parcela recebida, com ou sem juros e desconto.',
    keywords: ['contas a receber', 'baixa', 'recebimento', 'parcela', 'liquidar', 'pagar'],
    updatedAt: '2026-06-25',
    related: ['contas-a-pagar', 'conciliacao-bancaria'],
    body: `
# Dar baixa em uma conta a receber

Quando um cliente paga, você precisa registrar o recebimento no AxDeal. Esse processo se chama **"dar baixa"** na parcela.

## Fluxo de recebimento

\`\`\`mermaid
flowchart TD
  A["Acesse Financeiro → Contas a Receber"] --> B["Localize a parcela<br/>(busca, filtro de status ou período)"]
  B --> C["Clique em 'Baixar' (ícone ✓) na linha"]
  C --> D["Preencha o drawer de baixa"]
  D --> E{"Valor pago = valor original?"}
  E -->|Sim, pago integral| F["Informar data, conta e forma de pagamento"]
  E -->|Não, houve juros ou desconto| G["Informar acréscimos/descontos"]
  F --> H["Salvar → Parcela fica PAGA ✅"]
  G --> H
\`\`\`

## Campos do drawer de baixa

| Campo | O que preencher |
|-------|----------------|
| **Data do pagamento** | Quando o dinheiro entrou na conta |
| **Valor recebido** | Valor que o cliente pagou |
| **Juros / Multa** | Acréscimos por atraso |
| **Desconto concedido** | Se você deu desconto |
| **Conta bancária** | Para onde o dinheiro foi |
| **Forma de pagamento** | PIX, transferência, dinheiro, cartão |
| **Comprovante** | Upload do comprovante (opcional) |

## Cards de resumo no topo da página

| Card | Significado |
|------|------------|
| **Vencido** | Parcelas com vencimento passado e ainda em aberto |
| **Vence hoje** | O que vence na data de hoje |
| **Futuros** | Vence nos próximos 30 dias |
| **Total geral** | Saldo devedor de todos os clientes |

## Baixa em massa

Para dar baixa em várias parcelas de uma vez:
1. Selecione as parcelas clicando nas caixas de seleção.
2. Clique em **"Liquidar em massa"** na barra de ações.
3. Configure os parâmetros comuns (data, conta, forma).

## Importar parcelas em lote

Se você tem muitos lançamentos para criar de uma vez, use a **importação por planilha XLSM**. Acesse o botão "Importar" na tela de Contas a Receber e baixe o modelo.
`,
  },
  {
    id: 'contas-a-pagar',
    slug: 'contas-a-pagar',
    collectionId: 'financeiro',
    title: 'Contas a pagar e despesas recorrentes',
    description: 'Como lançar pagamentos, criar despesas fixas mensais e configurar geração automática.',
    keywords: ['contas a pagar', 'despesas', 'recorrente', 'fixas', 'fornecedor', 'baixa pagamento'],
    updatedAt: '2026-06-25',
    related: ['contas-a-receber', 'conciliacao-bancaria'],
    body: `
# Contas a pagar e despesas recorrentes

## Lançar um pagamento avulso

1. Acesse **Financeiro → Contas a Pagar**.
2. Clique em **"+ Novo Pagamento"**.
3. Preencha: fornecedor, valor, vencimento, categoria financeira, forma de pagamento.
4. Salve. A parcela aparece na lista com status **EM ABERTO**.

Quando pagar, clique no ícone de baixa (✓) e preencha os dados do pagamento.

## Despesas recorrentes (fixas)

Para despesas que se repetem todo mês (aluguel, internet, salários de prestadores), use as **Despesas Recorrentes**:

Acesse **Financeiro → Contas a Pagar → Despesas Recorrentes**.

### Como funciona

\`\`\`mermaid
flowchart TD
  A["Crie a despesa recorrente<br/>(periodicidade, valor, vencimento)"] --> B["Sistema gera parcelas automaticamente<br/>(via CRON diário)"]
  B --> C["Parcela aparece em Contas a Pagar"]
  C --> D["Você paga e dá baixa normalmente"]
  D --> B
\`\`\`

### Configurações de recorrência

| Campo | Opções |
|-------|--------|
| **Periodicidade** | Semanal, quinzenal, mensal, bimestral, trimestral, semestral, anual |
| **Vigência** | Indeterminada, até uma data específica, ou quantidade máxima de parcelas |
| **Antecedência** | Quantos dias antes do vencimento o sistema gera a parcela |

### Exemplo prático

> Aluguel de R$ 3.000 todo dia 5 do mês, por tempo indeterminado, gerado 3 dias antes:
> - Periodicidade: Mensal
> - Dia do vencimento: 5
> - Antecedência: 3 dias
> - Vigência: Indeterminada

Todo mês, no dia 2, o sistema cria automaticamente a parcela de aluguel em Contas a Pagar.
`,
  },
  {
    id: 'boletos-cnab',
    slug: 'boletos-cnab',
    collectionId: 'financeiro',
    title: 'Emitir boletos e processar CNAB',
    description: 'Como emitir boletos bancários, gerar remessas CNAB e processar o retorno de cobranças.',
    keywords: ['boleto', 'cnab', 'remessa', 'retorno', 'linha digitável', 'pix boleto', 'banco'],
    updatedAt: '2026-06-25',
    related: ['contas-a-receber', 'conciliacao-bancaria'],
    body: `
# Emitir boletos e processar CNAB

## Emitir um boleto

Você pode emitir um boleto para qualquer parcela de Contas a Receber:

1. Em **Financeiro → Contas a Receber**, encontre a parcela.
2. Clique nas ações (⋮) e selecione **"Emitir Boleto"**.
3. O AxDeal registra o boleto no banco via integração.
4. Após o registro, a **linha digitável**, o **QR Code PIX** (se habilitado) e o **PDF** ficam disponíveis.

> **Pré-requisito:** configure sua conta bancária com as credenciais do banco em **Configurações → Estrutura Financeira → Contas Bancárias**.

## CNAB: Remessa e Retorno

Para clientes que têm muitos boletos, o processo CNAB automatiza o registro em lote:

\`\`\`mermaid
flowchart LR
  A["Emitir boletos no AxDeal"] --> B["Gerar arquivo de REMESSA CNAB"]
  B --> C["Enviar arquivo ao banco<br/>(internet banking)"]
  C --> D["Banco registra e processa"]
  D --> E["Baixar arquivo de RETORNO<br/>do internet banking"]
  E --> F["Importar RETORNO no AxDeal<br/>Financeiro → Boletos → Retorno"]
  F --> G["AxDeal dá baixa automática<br/>nas parcelas pagas"]
\`\`\`

### Importar retorno CNAB

1. Acesse **Financeiro → Boletos → Importar Retorno**.
2. Selecione a conta bancária (CNAB240 ou CNAB400).
3. Faça o upload do arquivo \`.RET\` ou \`.txt\`.
4. O sistema processa e mostra um relatório de ocorrências: quantas foram pagas, rejeitadas ou com erro.

## Configuração visual do boleto

Quer personalizar as cores e o layout do boleto PDF? Acesse **Configurações → Impressões & PDF → Boleto Bancário**. Há um preview em tempo real.
`,
  },
  {
    id: 'importar-extrato-ofx',
    slug: 'importar-extrato-ofx',
    collectionId: 'financeiro',
    title: 'Importar extrato OFX do banco',
    description: 'Como exportar o extrato do internet banking e importar no AxDeal para conciliação.',
    keywords: ['ofx', 'extrato', 'importar', 'internet banking', 'conciliação', 'transações'],
    updatedAt: '2026-06-25',
    related: ['conciliacao-bancaria', 'conta-digital-pix'],
    body: `
# Importar extrato OFX do banco

O formato **OFX** é um padrão universal de extrato bancário que a maioria dos bancos disponibiliza para download no internet banking.

## Como exportar o OFX do seu banco

1. Acesse o internet banking da sua empresa.
2. Vá na seção de **Extrato** ou **Movimentações**.
3. Selecione o período desejado.
4. Escolha exportar no formato **OFX** (ou "Microsoft Money").
5. Salve o arquivo no computador.

> Cada banco tem um menu diferente. Geralmente está em "Exportar extrato" ou "Baixar extrato".

## Importar no AxDeal

1. Acesse **Financeiro → Extrato**.
2. Clique em **"Importar OFX"**.
3. Selecione a conta bancária correspondente.
4. Faça o upload do arquivo OFX.
5. O sistema lê as transações e as apresenta para revisão.

## Status das transações importadas

| Status | O que significa |
|--------|----------------|
| **PENDENTE** | Transação importada, aguarda vinculação |
| **SUGERIDO** | Sistema encontrou uma parcela compatível automaticamente |
| **CONCILIADO** | Vinculado manualmente ou aceito a sugestão |
| **IGNORADO** | Marcado para não conciliar (ex.: transferência interna) |

## Próximo passo: Conciliação Bancária

Após importar o OFX, vá para **Financeiro → Conciliação Bancária** para confirmar que cada lançamento do banco bate com o que está no sistema. Veja o artigo **"Conciliação bancária passo a passo"** para continuar.
`,
  },
  {
    id: 'conciliacao-bancaria',
    slug: 'conciliacao-bancaria',
    collectionId: 'financeiro',
    title: 'Conciliação bancária passo a passo',
    description: 'Como conciliar o extrato do banco com os lançamentos do AxDeal e tratar diferenças.',
    keywords: ['conciliação bancária', 'extrato', 'conciliar', 'diferença', 'juros', 'taxa'],
    updatedAt: '2026-06-25',
    related: ['importar-extrato-ofx', 'conta-digital-pix'],
    body: `
# Conciliação bancária passo a passo

A **conciliação bancária** é o processo de confirmar que o que está no sistema bate exatamente com o extrato real do banco. É uma das práticas mais importantes para a saúde financeira da empresa.

## Fluxo completo

\`\`\`mermaid
flowchart TD
  A["1. Acesse Financeiro → Conciliação Bancária"] --> B["2. Selecione a conta bancária e o período"]
  B --> C["3. Faça upload do extrato OFX<br/>ou adicione lançamentos manualmente"]
  C --> D["4. Sistema sugere vinculações automáticas<br/>(mesmo valor e data aproximada)"]
  D --> E{"Sugestão correta?"}
  E -->|Sim| F["Aceitar sugestão → CONCILIADO ✅"]
  E -->|Não| G["Buscar a parcela correta manualmente"]
  G --> F
  F --> H{"Valor bate exatamente?"}
  H -->|Sim| I["Pronto"]
  H -->|Não| J["Configurar a diferença<br/>(juros, multa, taxa, desconto)"]
  J --> I
  I --> K{"Transação sem lançamento no sistema?"}
  K -->|Sim| L["Criar venda PDV avulsa<br/>ou lançar manualmente"]
  K -->|Não| M["Conciliação do período concluída ✅"]
  L --> M
\`\`\`

## Tipos de diferença

Quando o valor pago pelo cliente é diferente do valor original da parcela, você precisa informar o motivo:

| Tipo | Quando usar |
|------|------------|
| **JUROS** | Cliente pagou com acréscimo por atraso |
| **MULTA** | Cobrança de multa por inadimplência |
| **TAXA** | Taxa bancária descontada no crédito |
| **DESCONTO** | Você concedeu desconto |
| **PARCIAL** | Pagamento parcial — saldo continua em aberto |

## Regras automáticas de conciliação

Para agilizar o processo, você pode configurar **Regras** que conciliam automaticamente certos tipos de transação:

- Vá em **Configurações → Estrutura Financeira → Regras de Conciliação**.
- Configure critérios por palavra-chave na descrição (ex.: "PAGTO PIX"), valor ou banco de origem.
`,
  },
  {
    id: 'conta-digital-pix',
    slug: 'conta-digital-pix',
    collectionId: 'financeiro',
    title: 'Conta Digital e cobrança via PIX',
    description: 'Como usar a Conta Digital integrada ao AxDeal para receber via PIX e acompanhar o saldo.',
    keywords: ['conta digital', 'pix', 'qr code', 'saldo', 'inter', 'asaas', 'receber'],
    updatedAt: '2026-06-25',
    related: ['conciliacao-bancaria', 'vender-no-pdv'],
    body: `
# Conta Digital e cobrança via PIX

O AxDeal permite integrar sua **conta bancária digital** (Inter ou Asaas) diretamente no sistema para receber cobranças e acompanhar o saldo em tempo real.

## O que você consegue fazer

- Ver o **saldo atual** da conta sem sair do AxDeal
- Acompanhar o **extrato** de entradas e saídas
- Gerar **cobranças PIX** com QR Code dinâmico
- Emitir **boletos** que ficam disponíveis na conta digital
- O sistema **detecta automaticamente** quando um PIX cai — sem precisar dar baixa manual

## Gerar uma cobrança PIX

\`\`\`mermaid
flowchart LR
  A["Financeiro → Conta Digital"] --> B["Aba Resumo → Gerar PIX"]
  B --> C["Informar valor e descrição"]
  C --> D["Sistema gera QR Code dinâmico"]
  D --> E["Cliente escaneia e paga"]
  E --> F["Webhook confirma pagamento"]
  F --> G["Parcela baixada automaticamente ✅"]
\`\`\`

## Configurar a integração

1. Vá em **Configurações → Estrutura Financeira → Contas Bancárias**.
2. Encontre a conta e clique em **"Configurar integração"**.
3. Insira as credenciais do banco (Client ID, Client Secret ou chave API).
4. Ative a integração.

> **Atenção:** Guarde suas credenciais em local seguro. O AxDeal não exibe a chave novamente após salvar.

## Aba Extrato

O extrato da Conta Digital mostra todos os movimentos da conta bancária real, com status de cada transação:
- **Compensado**: confirmado e disponível
- **Agendado**: transferência agendada
- **Em análise**: aguardando processamento
`,
  },
];
