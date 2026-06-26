O AxChat permite conectar canais via **API Oficial do WhatsApp (WABA)** ou por **APIs não oficiais**. A escolha impacta custos, estabilidade e riscos perante a Meta.

> **Recomendação:** utilize a **API Oficial (WABA)** pela estabilidade, segurança e conformidade com as políticas da Meta. A decisão final é do assinante.

---

## Sumário

1. [API Oficial (WABA)](#1-api-oficial-waba)
2. [APIs não oficiais](#2-apis-não-oficiais)
3. [Perguntas frequentes](#3-perguntas-frequentes)

---

## 1. API Oficial (WABA)

A API Oficial é a infraestrutura homologada, construída e mantida pela Meta (WhatsApp).

### Métodos de conexão no AxChat

| Método | Descrição |
| --- | --- |
| **App AxChat (login incorporado)** | Login via Facebook para conectar o número rapidamente pelo app oficial da Axory |
| **App próprio (Tech Provider)** | Cliente cria app no Facebook Developers — indicado para operações com marca própria |

### Coexistência

O AxChat suporta **coexistência** via recurso de dispositivos conectados da Meta, permitindo uso simultâneo no painel e no WhatsApp Business no smartphone.

### Gerenciamento, pagamentos e aprovação

| Item | Detalhe |
| --- | --- |
| Vínculo comercial | Número vinculado ao Business Manager (BM) do cliente |
| Custos de mensagem | Cobrados diretamente pela Meta na BM (janelas de 24h após cota gratuita) |
| Taxa do AxChat | Não há cobrança por mensagem na licença do software |
| Aprovação | Exige verificação da empresa e conformidade com políticas da Meta |

### Risco de bloqueio

Bloqueios na API Oficial **não estão relacionados ao software utilizado**, mas sim às políticas da Meta. A API Oficial elimina banimento por “software não autorizado”, porém o número continua sujeito a avaliações de qualidade, denúncias e regras anti-spam.

---

## 2. APIs não oficiais

APIs não oficiais emulam o comportamento do WhatsApp Web ou Mobile, geralmente via QR Code. Isentam o custo por mensagem da Meta, mas transferem riscos de estabilidade e conformidade ao operador.

### Tipos suportados

| Tipo | Exemplos | Características |
| --- | --- | --- |
| **Nativas** | Baileys, WWebJS | Integradas ao AxChat; conexão por QR Code no painel |
| **Self-hosted** | Evolution API, Wuzapi | Instaladas pelo usuário; integração via Host/Token |
| **Gerenciadas (SaaS)** | Z-API, Uazapi | Serviço pago de terceiros que gerencia a conexão |

### Riscos e responsabilidades

Conforme os [Termos de Uso](/a/axchat-diretrizes-e-politicas-termos-e-condicoes-gerais-de-uso-e-licenciamento), o AxChat **não garante SLA** para conexões não oficiais.

| Risco | Descrição |
| --- | --- |
| **Spam** | Disparos em massa têm alta probabilidade de banimento permanente |
| **IP compartilhado** | Múltiplos números no mesmo IP podem gerar bloqueio em cascata |
| **Desconexões** | Atualizações do WhatsApp podem exigir nova leitura de QR Code |
| **“Aguardando mensagem”** | Falha de sincronização E2E se o celular base perder conexão |

**Recomendações:** evite disparos em massa; em escala, distribua conexões ou use proxies dedicados; mantenha o smartphone base online e com o app ativo.

---

## 3. Perguntas frequentes

**O AxChat cobra taxa sobre mensagens na API Oficial?**
Não. O valor pago refere-se à licença do software. Custos de tráfego são faturados pela Meta.

**A API Oficial garante que meu número nunca será bloqueado?**
Não. Ela evita bloqueios por software não autorizado, mas violações das políticas da Meta (spam, denúncias etc.) podem resultar em banimento.

**Por que existem APIs não oficiais?**
Para flexibilidade em validações, baixo volume ou quem aceita os riscos técnicos e de banimento para evitar custo por conversa da Meta.

**A conexão não oficial desconectou. O suporte resolve?**
Desconexões exigem releitura de QR Code e celular estável. O AxChat publica correções quando há quebra estrutural, mas não restaura sessões individualmente.
