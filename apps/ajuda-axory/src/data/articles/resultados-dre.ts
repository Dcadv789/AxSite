import type { Article } from '../../types';

export const resultadosDreArticles: Article[] = [
  {
    id: 'entendendo-dre',
    slug: 'entendendo-dre',
    collectionId: 'resultados-dre',
    title: 'Entendendo o DRE Gerencial',
    description: 'O que é o DRE, como ele funciona no AxDeal e por que usa a data de competência.',
    keywords: ['dre', 'demonstração de resultado', 'competência', 'gerencial', 'receitas', 'despesas'],
    updatedAt: '2026-06-25',
    related: ['fluxo-de-caixa', 'fechamento-do-mes'],
    body: `
# Entendendo o DRE Gerencial

O **DRE (Demonstração do Resultado do Exercício)** mostra se sua empresa lucrou ou não em um período. No AxDeal, o DRE é **gerencial** — adaptado para a realidade do dia a dia, não apenas para o contador.

## A diferença mais importante: competência x caixa

> O DRE **sempre** usa a **data de competência** — a data em que o fato aconteceu, não quando foi pago.

| Módulo | Data usada |
|--------|-----------|
| **DRE Gerencial** | Data de **competência** (quando aconteceu) |
| **Fluxo de Caixa** | Data de **vencimento** (quando vai entrar/sair) |
| **Extrato Bancário** | Data de **pagamento** (quando o dinheiro moveu) |

### Exemplo prático

> Você prestou um serviço em janeiro, mas o cliente pagou em fevereiro.
> - No **DRE de Janeiro**: a receita aparece (competência = janeiro).
> - No **Extrato de Fevereiro**: o dinheiro aparece (pagamento = fevereiro).

## Estrutura do DRE

\`\`\`mermaid
flowchart TD
  A["RECEITA BRUTA<br/>Tudo que entrou no período"] --> B["(-) Deduções e Impostos"]
  B --> C["= RECEITA LÍQUIDA"]
  C --> D["(-) Custos de Vendas (CMV)"]
  D --> E["= LUCRO BRUTO"]
  E --> F["(-) Despesas Operacionais<br/>(aluguel, salários, marketing)"]
  F --> G["= EBITDA / Resultado Operacional"]
  G --> H["(-) Despesas Financeiras<br/>(juros, tarifas)"]
  H --> I["= LUCRO LÍQUIDO"]
\`\`\`

## Como usar o DRE no AxDeal

1. Acesse **Resultados → DRE Gerencial**.
2. Selecione o período (mês, trimestre ou ano).
3. Clique em qualquer **categoria** para ver os lançamentos que a compõem (drill-down).
4. Compare períodos lado a lado (ex.: jan vs. fev) para identificar variações.

## Configurar as categorias do DRE

As categorias são organizadas em **grupos** (ex.: Receita de Serviços, Despesas com Pessoal). Para criar ou reorganizar:

Acesse **Configurações → Estrutura Financeira → Categorias DRE**.
`,
  },
  {
    id: 'fluxo-de-caixa',
    slug: 'fluxo-de-caixa',
    collectionId: 'resultados-dre',
    title: 'Fluxo de Caixa Projetado',
    description: 'Como visualizar e interpretar o fluxo de caixa futuro da sua empresa no AxDeal.',
    keywords: ['fluxo de caixa', 'projeção', 'saldo', 'entradas', 'saídas', 'futuro'],
    updatedAt: '2026-06-25',
    related: ['entendendo-dre', 'fechamento-do-mes'],
    body: `
# Fluxo de Caixa Projetado

O **Fluxo de Caixa Projetado** mostra o que vai entrar e sair do caixa nos próximos meses — com base nas parcelas já lançadas no sistema.

## Como acessar

Acesse **Financeiro → Fluxo de Caixa Projetado** (ou **Resultados → Fluxo de Caixa**).

## O que você vê

- **Gráfico de barras** por mês: barras verdes (entradas), barras vermelhas (saídas) e uma linha de saldo líquido.
- **Tabela consolidada**: saldo inicial, entradas, saídas e saldo final de cada mês.
- **Breakdown por categoria**: expanda qualquer mês para ver quais categorias compõem as entradas e saídas.

## Filtros disponíveis

| Filtro | Opções |
|--------|--------|
| **Período** | 3, 6 ou 12 meses à frente |
| **Conta bancária** | Todas ou uma específica |

## Interpretando o gráfico

\`\`\`mermaid
flowchart LR
  S["Saldo Inicial do mês"] --> E["+ Entradas previstas<br/>(parcelas a receber)"]
  E --> D["- Saídas previstas<br/>(parcelas a pagar)"]
  D --> SF["= Saldo Final do mês"]
  SF --> SNM["Saldo Inicial do próximo mês"]
\`\`\`

> **Atenção:** o fluxo de caixa projetado considera apenas os lançamentos já cadastrados no sistema. Se você tem compromissos financeiros não lançados, o saldo pode ser diferente do real.

## Diferença entre Fluxo de Caixa e DRE

| | Fluxo de Caixa | DRE |
|-|---------------|-----|
| **Pergunta respondida** | Quando vai ter dinheiro em caixa? | Lucrei ou perdi? |
| **Base de data** | Data de **vencimento** | Data de **competência** |
| **Utilidade** | Planejar pagamentos, prever falta de caixa | Avaliar a performance do negócio |
`,
  },
  {
    id: 'comissoes',
    slug: 'comissoes',
    collectionId: 'resultados-dre',
    title: 'Comissões de vendedores',
    description: 'Como funciona o cálculo de comissões, como configurar faixas e como aprovar o pagamento.',
    keywords: ['comissão', 'vendedor', 'faixas', 'percentual', 'aprovação', 'extrato'],
    updatedAt: '2026-06-25',
    related: ['entendendo-dre', 'cadastros-vendedores'],
    body: `
# Comissões de vendedores

O AxDeal calcula as comissões dos vendedores automaticamente quando uma parcela é recebida.

## Como configurar as faixas de comissão

1. Acesse **Configurações → Comercial → Comissões**.
2. Configure para cada vendedor:
   - **Percentual fixo** (ex.: 5% sobre tudo que vender), ou
   - **Faixas por valor** (ex.: até R$ 5.000 → 3%; acima de R$ 5.000 → 6%).
3. Defina o **gatilho**: comissão calculada na emissão ou no recebimento (recomendado: no recebimento).

## Como funciona o cálculo

\`\`\`mermaid
flowchart TD
  A["Parcela paga pelo cliente"] --> B["Sistema verifica se há vendedor vinculado"]
  B --> C["Aplica regra de comissão<br/>(faixa ou percentual fixo)"]
  C --> D["Gera extrato de comissão<br/>no módulo Resultados"]
  D --> E{"Aprovação necessária?"}
  E -->|Sim| F["Gestor aprova no sistema"]
  E -->|Não| G["Comissão disponível para pagamento"]
  F --> G
\`\`\`

## Onde ver as comissões

Acesse **Resultados → Comissões**. Você pode filtrar por:
- Período de competência
- Vendedor específico
- Status (aprovada, pendente)

O relatório mostra para cada vendedor: quantas vendas, valor total vendido e valor de comissão gerado.

## Pagar a comissão

Quando for pagar a comissão, gere a despesa no módulo **Contas a Pagar** vinculada ao vendedor como fornecedor. Isso mantém o controle no DRE.
`,
  },
  {
    id: 'fechamento-do-mes',
    slug: 'fechamento-do-mes',
    collectionId: 'resultados-dre',
    title: 'Fechamento do mês',
    description: 'Como usar o processo guiado de fechamento contábil mensal do AxDeal.',
    keywords: ['fechamento', 'mês', 'checklist', 'contábil', 'revisão', 'confirmação'],
    updatedAt: '2026-06-25',
    related: ['entendendo-dre', 'conciliacao-bancaria'],
    body: `
# Fechamento do mês

O **Fechamento do Mês** é um processo guiado que ajuda você a revisar e confirmar que todos os lançamentos do mês estão corretos antes de "fechar o livro".

## Fluxo do fechamento

\`\`\`mermaid
flowchart TD
  A["Acesse Resultados → Fechamento do Mês"] --> B["Selecione o mês a fechar"]
  B --> C["Checklist automático<br/>(sistema verifica itens críticos)"]
  C --> D{"Há pendências automáticas?"}
  D -->|Sim| E["Corrija as pendências apontadas<br/>(ex.: parcelas sem categoria)"]
  D -->|Não| F["Revisão manual de itens"]
  E --> C
  F --> G["Confirmar cada item<br/>do checklist manualmente"]
  G --> H["Registrar observações de revisão"]
  H --> I["Assinar o fechamento"]
  I --> J["Mês fechado ✅<br/>(aparece no histórico)"]
\`\`\`

## O que o checklist verifica automaticamente

- Parcelas vencidas sem baixa (estão em aberto?)
- Lançamentos sem categoria DRE
- Conta bancária com saldo divergente do extrato
- Notas fiscais com inconsistências

## Itens de confirmação manual

Além dos itens automáticos, você configura checklist manuals específicos da sua empresa (ex.: "Verificar depreciação de equipamentos", "Confirmar comissões aprovadas").

Para configurar os itens manuais: **Configurações → Empresa → Fechamento do Mês**.

## Histórico de fechamentos

Todo mês fechado fica registrado com data, usuário que assinou e as observações de revisão. Isso cria um histórico auditável do processo financeiro.
`,
  },
];
