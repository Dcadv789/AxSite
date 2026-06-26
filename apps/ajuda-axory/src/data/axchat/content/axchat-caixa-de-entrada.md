# Caixa de entrada (Inbox)

A caixa de entrada é o **coração do AxChat** — onde a equipe atende os clientes. Ela é dividida em três painéis.

## Lista de conversas (painel esquerdo)

- **Busca** (Ctrl/Cmd+K) por nome, telefone, protocolo ou texto das mensagens.
- **Escopos:** "Todas as conversas" vs "Minhas conversas".
- **Filtros:** status, canal, não lidas, arquivadas, grupos e tags.
- **Visões salvas:** combinações de filtros que você nomeia e reutiliza.

Cada conversa na lista mostra avatar, nome, prévia da última mensagem, ícone do canal, selo de não lida, indicador de status (cor) e horário.

## Janela de conversa (centro)

- **Cabeçalho:** nome + canal, atribuição (escolher atendente), tags, botão de registros do agente de IA, botão da ficha do contato e menu (renomear, arquivar, configurar IA).
- **Thread:** bolhas de entrada (cliente) e saída (atendente), com status de entrega (na fila / enviada / entregue / lida / falhou) e mídias (imagem, áudio com player, vídeo, documento, localização, resposta a story).
- **Aviso de janela de 24h (WhatsApp):** passado o prazo desde a última mensagem do cliente, só é possível enviar um **template aprovado** (HSM).
- **Compositor:** texto (Enter envia, Shift+Enter quebra linha), **áudio**, **arquivo**, **respostas rápidas** (digite `/`) e **templates do WhatsApp** (quando fora da janela).

## Ficha do contato (painel direito)

Nome, telefone, e-mail, tags, canais vinculados, **notas internas** (não vão para o cliente) e atalho para todas as conversas daquele contato.

## Registros do agente de IA (painel direito)

Linha do tempo das execuções da IA naquela conversa: agente, skills chamadas, status, tokens e o detalhe de cada chamada de ferramenta (input / output / erro). Ótimo para auditar o que a IA fez.
