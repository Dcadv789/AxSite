# Integrações (visão geral)

A tabela abaixo resume as integrações do AxChat: para que servem, o que cada uma exige e onde configurá-las.

| Integração | Para quê | O que precisa | Onde |
|---|---|---|---|
| WhatsApp Oficial (Meta) | Atendimento | Coexistência ou tokens Meta | Canais |
| WhatsApp Zappfy | Atendimento | Instância + token | Canais |
| Instagram | Atendimento + Marketing | Token Graph + IG User ID + webhook | Canais / Integrações |
| Telegram | Atendimento | Token do bot | Canais |
| Meta Ads | Anúncios (marketing) | Token + Ad Account + Page + Pixel | Integrações |
| Google Business | Posts / reviews (marketing) | Token OAuth + Account + Location | Integrações |
| OpenAI (imagem) | Criativos de marketing | `OPENAI_API_KEY` | Integrações |
| MinIO (storage) | Hospedar imagens | Endpoint / keys / bucket (servidor) | Infra |
| DeepSeek (LLM) | Cérebro dos agentes | Chave por organização | Config → IA |
| Google Calendar | Agenda do assistente | App OAuth Google | Em andamento |
| Banco de vendas (SQL) | ROAS por produto | DSN `SALES_DB_URL` | Variáveis |

> Para conectar os canais de atendimento (WhatsApp, Instagram, Telegram), veja **Canais e como conectar**. As integrações de marketing são detalhadas em **Marketing (add-on)**.
