# Memória dos agentes

Os agentes de IA têm **três camadas de memória**, que juntas dão contexto sem misturar informações entre clientes.

1. **Curto prazo** — as últimas ~30 mensagens (cache rápido, retido por 7 dias).
2. **Longo prazo** — a "ficha" do contato: fatos e um resumo que a IA aprende e relê a cada conversa.
3. **RAG** — busca por **significado** em conversas antigas, recuperando o que é relevante mesmo que tenha sido dito há muito tempo.

## Isolamento

Tudo é **isolado por contato e por organização** — nada vaza entre clientes ou entre empresas. A memória de um contato nunca aparece para outro, e os dados de uma organização nunca são vistos por outra.
