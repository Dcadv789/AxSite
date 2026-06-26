import type { Article } from '../../types';

export const cadastrosArticles: Article[] = [
  {
    id: 'cadastrar-clientes',
    slug: 'cadastrar-clientes',
    collectionId: 'cadastros',
    title: 'Cadastrar clientes e contatos',
    description: 'Como adicionar clientes, organizar por grupos e acessar o histórico completo.',
    keywords: ['cliente', 'contato', 'cadastro', 'cnpj', 'cpf', 'grupos', 'histórico'],
    updatedAt: '2026-06-25',
    related: ['produtos-e-estoque', 'convidar-usuarios'],
    body: `
# Cadastrar clientes e contatos

No AxDeal, **Clientes** e **Contatos** são a mesma base de dados — qualquer pessoa física ou jurídica com quem sua empresa se relaciona.

## Como cadastrar um novo cliente

1. Acesse **Cadastros → Clientes** (ou **Contatos**).
2. Clique em **"+ Novo Cliente"**.
3. Preencha os dados principais:

| Campo | Detalhe |
|-------|---------|
| **Nome / Razão Social** | Nome completo ou razão social da empresa |
| **Nome Fantasia** | Nome comercial (se empresa) |
| **CPF / CNPJ** | Documento único — o sistema valida o formato |
| **E-mail** | Usado para envio de boletos e régua de cobrança |
| **Telefone** | Número com DDD (usado para WhatsApp) |
| **Endereço** | Completo com CEP — preenchimento automático pelo CEP |

4. Salve.

## Campos adicionais (abas)

Além dos dados básicos, o cadastro do cliente tem abas com:
- **Histórico**: propostas, pedidos, OS, contratos e parcelas vinculadas.
- **Grupos**: categorize o cliente em grupos (ex.: "Clientes Premium", "Clientes PF").
- **Campos customizados**: campos extras que você configurou no sistema.
- **Portal do cliente**: link tokenizado para o cliente ver e pagar cobranças online.

## Acessar o histórico de um cliente

Na listagem, clique no nome do cliente para abrir a ficha completa. Na aba **Histórico**, você vê tudo que aconteceu com aquele cliente no sistema.

## Grupos de contatos

Para segmentar sua base de clientes:
1. Acesse **Cadastros → Contatos**.
2. Clique em **"Gerenciar Grupos"**.
3. Crie grupos (ex.: "Inadimplentes", "VIP", "Prospect").
4. Na ficha do cliente, adicione o grupo desejado.
`,
  },
  {
    id: 'produtos-e-estoque',
    slug: 'produtos-e-estoque',
    collectionId: 'cadastros',
    title: 'Produtos, serviços e estoque',
    description: 'Como cadastrar produtos e serviços, controlar estoque e acompanhar movimentações.',
    keywords: ['produto', 'serviço', 'estoque', 'saldo', 'custo', 'movimentação', 'cmv'],
    updatedAt: '2026-06-25',
    related: ['cadastrar-clientes', 'pedidos-vs-os'],
    body: `
# Produtos, serviços e estoque

## Cadastrar um produto

1. Acesse **Cadastros → Produtos** e clique em **"+ Novo Produto"**.
2. Preencha:

| Campo | O que preencher |
|-------|----------------|
| **Código** | Código interno ou SKU |
| **Nome** | Nome do produto |
| **Unidade** | UN, KG, M, L, etc. |
| **Preço de venda** | Valor que aparece nas propostas e PDV |
| **Preço de custo** | Custo de aquisição (usado no CMV) |
| **Estoque mínimo** | Quantidade mínima para alerta |

## Controle de estoque

O estoque do AxDeal é **movimentado automaticamente** quando você:
- **Lança um Pedido de Venda** → baixa o estoque (saída)
- **Estorna o lançamento de um pedido** → devolve ao estoque (entrada)

> O custo de cada item é registrado **no momento da saída** — isso garante que o CMV reflita o custo real do produto quando foi vendido, mesmo que o preço de custo mude depois.

## Ver o inventário completo

Acesse **Cadastros → Produtos → Estoque Geral** para ver:
- Saldo atual de todos os produtos
- Movimentações de entrada e saída
- Produtos abaixo do estoque mínimo (alerta em vermelho)

## Cadastrar um serviço

1. Acesse **Cadastros → Serviços** e clique em **"+ Novo Serviço"**.
2. Preencha o nome, unidade e preço.
3. Para emissão de NF, informe o **código de serviço municipal** e o **código federal**.

> **Serviços não têm controle de estoque** — apenas produtos físicos.
`,
  },
  {
    id: 'cadastros-vendedores',
    slug: 'cadastros-vendedores',
    collectionId: 'cadastros',
    title: 'Vendedores, metas e comissões',
    description: 'Como cadastrar vendedores, definir metas mensais e configurar faixas de comissão.',
    keywords: ['vendedor', 'meta', 'comissão', 'faixas', 'escopo', 'cadastro vendedor'],
    updatedAt: '2026-06-25',
    related: ['comissoes', 'cargos-e-permissoes'],
    body: `
# Vendedores, metas e comissões

## Cadastrar um vendedor

1. Acesse **Cadastros → Vendedores** e clique em **"+ Novo Vendedor"**.
2. Vincule o vendedor a um **usuário do sistema** (quem vai fazer login).
3. Defina a **meta mensal** de vendas (valor em R$).

## Escopo de visibilidade

Se habilitado, o vendedor só vê no sistema:
- Os **clientes** que ele cadastrou
- As **propostas, pedidos e OS** que ele criou

Isso mantém a privacidade comercial entre a equipe. Gestores e ADMIN veem tudo.

## Configurar comissões por vendedor

As regras de comissão ficam em **Configurações → Comercial → Comissões**:

| Modo | Como funciona |
|------|--------------|
| **Percentual fixo** | Ex.: 5% sobre toda venda aprovada |
| **Faixas** | Ex.: até R$ 3.000 → 3%; de R$ 3.001 a R$ 8.000 → 5%; acima → 7% |

O sistema aplica o percentual correto automaticamente quando a parcela é recebida.

## Acompanhar metas

No dashboard (tela Início), a seção **"Metas de Vendas"** mostra uma barra de progresso por vendedor com o quanto já foi vendido no mês em relação à meta configurada.
`,
  },
  {
    id: 'convidar-usuarios',
    slug: 'convidar-usuarios',
    collectionId: 'cadastros',
    title: 'Convidar usuários para o sistema',
    description: 'Como adicionar novos membros da equipe ao AxDeal, atribuir cargos e gerenciar acessos.',
    keywords: ['usuário', 'convidar', 'equipe', 'cargo', 'acesso', 'ativar', 'desativar'],
    updatedAt: '2026-06-25',
    related: ['cargos-e-permissoes', 'cadastros-vendedores'],
    body: `
# Convidar usuários para o sistema

Cada pessoa da equipe tem seu próprio login e acesso configurado por cargo.

## Como convidar um novo membro

1. Acesse **Cadastros → Usuários do Sistema**.
2. Clique em **"+ Convidar Membro"**.
3. Informe o **e-mail** da pessoa.
4. Selecione o **cargo** (define o que ela poderá ver e fazer).
5. Clique em **Enviar convite**.

A pessoa receberá um e-mail com o link para criar a senha e acessar o sistema.

## Gerenciar membros existentes

Na listagem de usuários, você pode:
- **Alterar o cargo** de um membro (clique em editar).
- **Desativar** um membro que saiu da empresa (ele não conseguirá mais fazer login, mas o histórico dele é preservado).
- **Reativar** um membro desativado.

## Histórico de acessos

O sistema registra o histórico de sessões de cada usuário. Para auditar quem acessou e quando, vá em **Resultados → Auditoria** e filtre pelo usuário.

> **Dica de segurança:** quando um colaborador sair da empresa, desative o acesso imediatamente antes de qualquer outro procedimento.
`,
  },
];
