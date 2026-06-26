import type { Article } from '../../types';

export const inicioDashboardArticles: Article[] = [
  {
    id: 'entendendo-os-cards-do-inicio',
    slug: 'entendendo-os-cards-do-inicio',
    collectionId: 'inicio-dashboard',
    title: 'Entendendo os cards do início',
    description: 'Saiba o que cada número e card da tela inicial do AxDeal significa.',
    keywords: ['dashboard', 'cards', 'resumo', 'receitas', 'despesas', 'saldo', 'atraso', 'início'],
    updatedAt: '2026-06-25',
    related: ['personalizar-dashboard'],
    body: `
# Entendendo os cards do início

A tela inicial do AxDeal (menu **Início**) é o seu painel de controle. Ela reúne os números mais importantes da empresa em um só lugar.

## Cards financeiros

Assim que você entra, vê quatro cards no topo:

| Card | O que mostra |
|------|-------------|
| **Receitas do mês** | Total de parcelas a receber com vencimento no mês atual |
| **Despesas do mês** | Total de parcelas a pagar com vencimento no mês atual |
| **Saldo previsto** | Receitas menos despesas — quanto sobra se tudo for pago |
| **Valor em atraso** | Parcelas já vencidas que ainda não foram pagas |

> **Dica de privacidade:** Clique no ícone de olho (👁) para ocultar os valores — útil quando há pessoas ao redor.

## Resumo operacional

Logo abaixo dos cards financeiros, você vê o andamento da operação:

- **Propostas abertas** — aguardando aprovação do cliente
- **Pedidos de venda em andamento**
- **Ordens de Serviço abertas**
- **Clientes ativos no mês**

## Metas de vendas

Se você ou sua equipe têm metas configuradas, aparece uma barra de progresso por vendedor mostrando o quanto já foi vendido no mês comparado à meta.

## Mural de avisos

Área interna para a gestão publicar avisos para a equipe (ex.: "Reunião sexta às 10h", "Novo procedimento de faturamento").

## Atalhos rápidos

Botões de acesso rápido para as ações mais comuns: **Nova Proposta**, **Nova Venda**, **Novo Cliente**. Você pode personalizar esses atalhos (veja o próximo artigo).
`,
  },
  {
    id: 'personalizar-dashboard',
    slug: 'personalizar-dashboard',
    collectionId: 'inicio-dashboard',
    title: 'Personalizar seu Dashboard',
    description: 'Aprenda a reorganizar blocos, escolher o que aparece e criar atalhos personalizados no início.',
    keywords: ['dashboard', 'personalizar', 'modo edição', 'blocos', 'atalhos', 'drag and drop'],
    updatedAt: '2026-06-25',
    related: ['entendendo-os-cards-do-inicio'],
    body: `
# Personalizar seu Dashboard

Cada usuário pode deixar a tela inicial do AxDeal do seu jeito — escolhendo quais blocos ver e em que ordem.

## Como entrar no Modo Edição

1. Na tela **Início**, clique no botão **"Editar Dashboard"** (ícone de lápis, canto superior direito).
2. Os blocos ficam com uma borda tracejada indicando que estão editáveis.

> **Quem pode editar?** Usuários com cargo **SUPER_ADMIN** ou **SUPORTE** têm acesso ao modo de edição.

## O que você pode fazer no Modo Edição

\`\`\`mermaid
flowchart TD
  Edit["Modo Edição ativado"] --> Reorder["Arrastar e soltar blocos<br/>para reordenar"]
  Edit --> Toggle["Ligar/desligar<br/>blocos visíveis"]
  Edit --> Shortcuts["Gerenciar atalhos rápidos<br/>(adicionar, remover, renomear)"]
  Reorder --> Save["Salvar preferências"]
  Toggle --> Save
  Shortcuts --> Save
\`\`\`

## Gerenciar atalhos rápidos

1. No Modo Edição, clique em **"+ Novo atalho"**.
2. Preencha:
   - **Título**: nome que vai aparecer no botão (ex.: "Novo Contrato")
   - **Descrição**: texto de apoio opcional
   - **Link**: rota do sistema (ex.: \`/erp/negocios/contratos/novo\`)
3. Clique em **Salvar**.

Para **remover** um atalho, clique no ícone de lixeira ao lado dele.

## Salvando as alterações

Ao terminar de editar, clique em **"Concluir edição"**. As preferências ficam salvas para você — cada usuário tem sua configuração independente.
`,
  },
];
