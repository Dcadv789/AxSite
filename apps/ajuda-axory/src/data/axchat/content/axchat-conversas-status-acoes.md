# Conversas: status e ações

## Status (máquina de estados)

Toda conversa passa por estados bem definidos:

- **PENDENTE:** na fila, sem atendente.
- **BOT:** a IA está conduzindo.
- **ABERTA:** um atendente humano está conduzindo.
- **AGUARDANDO:** o atendente respondeu e está esperando o cliente.
- **FECHADA:** resolvida (pode ser reaberta).

## O que o atendente faz

Na conversa, o atendente pode:

- **Atribuir / assumir** ("atribuir a mim").
- **Mudar o status** e **mudar de departamento**.
- **Arquivar / desarquivar** e marcar **lida / não lida**.
- **Adicionar nota interna** (visível só para a equipe).
- **Responder** com texto, mídia ou áudio.
- **Apagar mensagem** ("revogar" — apaga no app do cliente nos canais que suportam).
- **Transcrever áudio** recebido.
- **Vincular a conversa a um card do funil**.

> A revogação de mensagens depende do canal — nem todo provedor suporta apagar a mensagem no app do cliente.
