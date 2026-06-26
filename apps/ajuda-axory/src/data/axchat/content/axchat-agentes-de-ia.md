# Agentes de IA (Jarvis)

Os **agentes de IA** atendem clientes usando um LLM, apoiados por **skills** (ferramentas) e capazes de **escalar para um humano** quando necessário.

## Como funcionam

- **Tipos:**
  - **ORQUESTRADOR:** recebe a conversa, entende a intenção e delega.
  - **WORKER:** especialista que executa a tarefa.
  - A hierarquia (quem reporta a quem) aparece no **organograma**.
- **Setores:** ATENDIMENTO e MARKETING (e PESSOAL para o assistente). Cada canal roteia para os agentes do setor certo.
- **Skills:** funções que o agente pode chamar — responder, transferir, consultar sistemas externos via HTTP/SQL, etc. Skills sensíveis podem exigir **aprovação humana** (gating): em vez de executar, criam uma pendência no inbox.
- **Tools:** as conexões (HTTP/SQL) que as skills usam. São configuráveis por organização.

## Execuções

A aba **Execuções** mostra cada run com **custo, tokens, duração** e o detalhe das chamadas — ótimo para auditar falhas silenciosas e entender exatamente o que o agente fez.

> Diferente do **Chatbot** (fluxos fixos por palavra-chave), os agentes de IA entendem linguagem natural e decidem o próximo passo sozinhos.
