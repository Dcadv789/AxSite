# Canais e como conectar

Os **canais** são as conexões de mensageria que alimentam a caixa de entrada.

## Tipos suportados

- **WhatsApp Oficial (Meta Cloud)**
- **WhatsApp Zappfy / Uazapi**
- **Instagram**
- **Telegram**
- **Interno** — console dentro do app, usado por agentes de IA e pelo assistente pessoal.

## Como conectar

Em **Configurações → Canais → Novo canal**, escolha o tipo e informe as credenciais:

- **WhatsApp Oficial:** via **Coexistência** (popup de cadastro embutido da Meta — o número segue funcionando no app e, em paralelo, na Cloud API) ou por tokens manuais.
- **WhatsApp Zappfy:** instância + token do provedor (o webhook é configurado automaticamente).
- **Instagram:** token de longa duração da conta business (Graph API) + webhook.
- **Telegram:** token do bot.

## Recursos por canal

- **Visibilidade (ORG / PRIVADO) e membros:** na aba **Agentes** do canal você define quem tem acesso. É aqui que o dono cria uma **caixa privada** e adiciona ou remove pessoas.
- **Sincronização de histórico:** importa conversas, contatos e mensagens passadas do provedor (na criação e sob demanda; nem todo provedor suporta).
- **Saúde do WhatsApp:** qualidade do número, nome do negócio e status do webhook.

> **Webhooks:** para Instagram/Meta há uma URL de callback a registrar no painel da Meta. Ela aparece em **Configurações → Integrações**. Para automação de **comentários** do Instagram, é preciso assinar o campo `comments`.
