import type { Article } from '../../types';

export const primeirosPassosArticles: Article[] = [
  {
    id: 'o-que-e-axdeal',
    slug: 'o-que-e-axdeal',
    collectionId: 'primeiros-passos',
    title: 'O que é o AxDeal?',
    description: 'Conheça o AxDeal, o ERP da Axory para gestão financeira e operacional de empresas.',
    keywords: ['axdeal', 'erp', 'o que é', 'visão geral', 'apresentação'],
    updatedAt: '2026-06-25',
    related: ['conhecendo-a-navegacao', 'cargos-e-permissoes'],
    body: `
# O que é o AxDeal?

O **AxDeal** é o sistema de gestão empresarial (ERP) da Axory. Ele foi criado para ajudar pequenas e médias empresas a controlar as finanças, as vendas e a operação do dia a dia — tudo em um único lugar, sem precisar de planilhas ou sistemas separados.

## Para que serve?

| Área | O que você consegue fazer |
|------|--------------------------|
| **Negócios** | Criar propostas, pedidos de venda, ordens de serviço, contratos e emitir notas fiscais |
| **Financeiro** | Controlar contas a receber e a pagar, emitir boletos, importar extratos bancários e conciliar pagamentos |
| **Resultados** | Ver o DRE gerencial, o fluxo de caixa, as comissões dos vendedores e o fechamento do mês |
| **Cadastros** | Gerenciar clientes, produtos, serviços, estoque e usuários |
| **Automações** | Configurar régua de cobrança automática, despesas recorrentes e relatórios por e-mail |

## Quem usa o AxDeal?

O sistema é multiusuário — cada membro da equipe tem seu próprio acesso com um **cargo** que define o que pode ver e fazer. Por exemplo:
- O **dono** vê tudo, inclusive relatórios financeiros sigilosos.
- O **vendedor** vê somente seus próprios clientes e propostas.
- O **financeiro** cuida das contas sem ver a operação comercial.

> **Dica:** Acesse o AxDeal pelo navegador (Chrome, Edge ou Firefox atualizado). Não precisa instalar nada!

## Como está organizado?

O menu lateral do AxDeal é dividido em grandes áreas:

\`\`\`mermaid
flowchart LR
  A[Menu Principal] --> B[Negócios]
  A --> C[Financeiro]
  A --> D[Resultados]
  A --> E[Cadastros]
  A --> F[Configurações]
  A --> G[CRM]
\`\`\`

Cada área tem sub-menus específicos. Nos próximos artigos você vai aprender a usar cada um deles.
`,
  },
  {
    id: 'conhecendo-a-navegacao',
    slug: 'conhecendo-a-navegacao',
    collectionId: 'primeiros-passos',
    title: 'Conhecendo a tela e a navegação',
    description: 'Aprenda a se orientar no AxDeal: menu lateral, barra superior, filtros e tabelas.',
    keywords: ['navegação', 'interface', 'menu', 'tela', 'layout', 'barra superior'],
    updatedAt: '2026-06-25',
    related: ['o-que-e-axdeal', 'cargos-e-permissoes'],
    body: `
# Conhecendo a tela e a navegação

Ao entrar no AxDeal, você vai ver três regiões principais:

## 1. Menu lateral (esquerda)

O menu lateral é a principal forma de navegar entre os módulos. Ele fica fixo na tela enquanto você trabalha.

- **Clique em uma área** (ex.: Financeiro) para expandir o sub-menu.
- O **item ativo** fica destacado em azul.
- Em telas menores, o menu pode ser recolhido clicando no ícone ☰.

## 2. Barra superior (topo)

A barra do topo contém:

| Elemento | Função |
|----------|--------|
| Nome da página | Informa onde você está |
| Sino (🔔) | Notificações de eventos do sistema |
| Avatar/nome | Acessa seu perfil e o botão de sair |
| Ícone de tema | Alterna entre modo claro e escuro |

## 3. Área de conteúdo (centro)

É onde as listas, formulários e gráficos aparecem. A maioria das páginas segue este padrão:

\`\`\`mermaid
flowchart TD
  Top["Cards de Resumo (totais e alertas)"]
  Top --> Filters["Barra de Filtros (busca, período, status)"]
  Filters --> Table["Tabela de Dados (com paginação)"]
  Table --> Actions["Ações por linha (editar, excluir, mais opções)"]
\`\`\`

## Dicas de uso rápido

- **Clique no número do documento** (proposta, pedido, etc.) para abrir o detalhe.
- **Ícone de três pontinhos (⋮)** ao lado de cada linha abre um menu de ações contextuais.
- **Filtros avançados**: clique no botão "Filtros" para expandir opções como período, status, categoria financeira.
- **Colunas configuráveis**: em muitas listas você pode escolher quais colunas ver clicando no ícone de colunas.
`,
  },
  {
    id: 'cargos-e-permissoes',
    slug: 'cargos-e-permissoes',
    collectionId: 'primeiros-passos',
    title: 'Cargos, permissões e acesso de usuários',
    description: 'Entenda como funcionam os cargos no AxDeal e o que cada nível de acesso pode fazer.',
    keywords: ['cargos', 'permissões', 'acesso', 'usuários', 'super admin', 'vendedor'],
    updatedAt: '2026-06-25',
    related: ['conhecendo-a-navegacao', 'convidar-usuarios'],
    body: `
# Cargos, permissões e acesso de usuários

O AxDeal usa um sistema de **cargos** para controlar o que cada usuário pode ver e fazer. Isso garante que informações sensíveis (como dados financeiros) fiquem restritas a quem precisa delas.

## Hierarquia de acesso

\`\`\`mermaid
flowchart TD
  SA["SUPER_ADMIN<br/>Acesso total ao sistema"] --> AD["ADMIN<br/>Gestão da empresa"]
  AD --> GE["GERENTE<br/>Visualização ampla, relatórios"]
  GE --> FI["FINANCEIRO<br/>Módulos financeiros"]
  GE --> VE["VENDEDOR<br/>Próprios clientes e pedidos"]
  GE --> OP["OPERACIONAL<br/>OS e produção"]
  GE --> SU["SUPORTE<br/>Acesso de leitura"]
\`\`\`

## O que cada cargo pode fazer (resumo)

| Cargo | Ver financeiro | Ver todos os clientes | Configurar sistema | Convidar usuários |
|-------|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✅ | ✅ | ✅ | ✅ |
| ADMIN | ✅ | ✅ | ✅ | ✅ |
| GERENTE | ✅ | ✅ | ❌ | ❌ |
| FINANCEIRO | ✅ | ✅ | ❌ | ❌ |
| VENDEDOR | ❌ | Apenas os seus | ❌ | ❌ |
| OPERACIONAL | ❌ | ✅ | ❌ | ❌ |
| SUPORTE | Leitura | Leitura | ❌ | ❌ |

> **Importante:** O **vendedor** só enxerga os clientes, propostas e pedidos que ele mesmo criou. Isso é intencional para manter a privacidade entre a equipe comercial.

## Como convidar um novo usuário

Veja o artigo **"Convidar usuários para o sistema"** na seção de Cadastros para o passo a passo completo.
`,
  },
];
