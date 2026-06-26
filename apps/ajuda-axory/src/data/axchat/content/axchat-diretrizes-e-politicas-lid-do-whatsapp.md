O WhatsApp passou a usar o identificador interno **LID** (Linked ID) em algumas conversas, em vez de expor diretamente o número de telefone. Isso pode gerar **contatos duplicados** na plataforma.

Este guia explica o que é o LID, por que a duplicação acontece e como usar as ferramentas do AxChat para corrigir.

---

## Sumário

1. [O que é o LID](#1-o-que-é-o-lid)
2. [Ferramentas de correção](#2-ferramentas-de-correção)
3. [Detalhamento técnico](#3-detalhamento-técnico)

---

## 1. O que é o LID

O **LID** é um identificador privado do WhatsApp usado para representar o usuário sem expor o número real. Quando um cliente inicia conversa e possui privacidade restrita, o WhatsApp pode enviar o LID em vez do telefone.

**O problema:** o sistema pode manter temporariamente dois registros da mesma pessoa:

1. Registro com o **número de telefone** (correto).
2. Registro com o **LID** (temporário).

Até a vinculação automática, o histórico fica dividido entre os dois contatos.

> **API Oficial (WABA):** instabilidades de LID ocorrem em APIs **não oficiais** (Baileys, WWebJS, Uazapi, Evolution etc.). Na WABA, a integração usa BSUID (Business-Scoped User ID), com resolução consistente dos contatos.

---

## 2. Ferramentas de correção

O AxChat oferece quatro ferramentas para resolver inconsistências de LID:

### Ferramenta 1 — Atualizar LID (individual)

| Item | Detalhe |
| --- | --- |
| **Onde** | Atendimento → Conversa → Detalhes do contato → aba Util. → **Atualizar LID** |
| **Uso** | Corrigir o contato que você está atendendo no momento |

### Ferramenta 2 — Agrupar LID (em massa)

| Item | Detalhe |
| --- | --- |
| **Onde** | Contatos → Utilitários → **Agrupar LID** |
| **Uso** | Varre o tenant e une mensagens de contatos com o mesmo LID |

### Ferramenta 3 — Scan de contatos sem LID

| Item | Detalhe |
| --- | --- |
| **Onde** | Configurações → Configurações Gerais → Ações do Sistema |
| **Uso** | Busca contatos que ainda não possuem LID registrado |

> **Atenção:** em bases muito grandes, esta operação pode demorar ou gerar alto volume de requisições à API do WhatsApp.

### Ferramenta 4 — Consolidar duplicatas LID (avançado)

| Item | Detalhe |
| --- | --- |
| **Onde** | Configurações → Configurações Gerais → Ações do Sistema |
| **Uso** | Mescla pares duplicados por cruzamento de LID e Pushname |

**Operação destrutiva** — pode alterar dados em múltiplas tabelas. Faça backup antes. O sistema permite auditoria (Dry Run) antes de aplicar mudanças reais.

**Mesclagem manual:**

| Campo | Significado |
| --- | --- |
| **ID primary (mantém)** | ID do contato “bom” — sobrevive com histórico completo |
| **ID duplicate (mescla)** | ID do contato duplicado — será desativado após a fusão |

Ao mesclar, conversas, mensagens, tags e anotações migram para o contato principal.

---

## 3. Detalhamento técnico

A fusão automática (Ferramentas 1 e 2) só ocorre quando:

- existe um **contato original** com o número correto no campo `number`;
- existe um **contato duplicado** cujo campo `lid` é **exatamente igual** ao `number` do original.

Se o LID for diferente do número, o sistema não une automaticamente por segurança. Nesses casos, use a **Ferramenta 4** para mesclagem manual.
