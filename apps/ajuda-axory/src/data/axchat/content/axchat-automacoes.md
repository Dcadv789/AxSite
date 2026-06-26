# Automações

Em **Automações** você cria regras no formato **"quando X acontecer, faça Y"**.

## Gatilhos

O que dispara a regra:

- Tag adicionada ou removida.
- Mensagem recebida (com palavras-chave ou anexo).
- Status da conversa mudou.
- Conversa atribuída.
- Disparo manual.

## Condições

Filtros que refinam quando a ação ocorre, com operadores (igual, contém, começa com, vazio…) combinados por **E / OU**.

## Ações

O que a regra executa:

- Adicionar ou remover tag.
- Adicionar a um funil ou mover de etapa.
- Atribuir a um atendente.
- Enviar mensagem (texto ou template).

## Proteções

Para evitar disparos descontrolados, há mecanismos de segurança:

- **Prioridade** entre regras.
- **Limite de execuções por minuto.**
- **Prevenção de loop** (cascata com profundidade máxima).
- **Auto-pausa** após falhas seguidas.
- Máximo de **100 automações por organização**.
