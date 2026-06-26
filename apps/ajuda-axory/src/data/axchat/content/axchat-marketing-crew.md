# Marketing (add-on)

O **Marketing** é um add-on vendável: uma **crew de marketing** com 6 agentes que opera Instagram, Google Business e anúncios no Meta. Ele é habilitado pelo Super Admin (`marketingEnabled`) — quando ligado, a crew é **provisionada automaticamente** para a organização.

## A crew

- **Magnus** (orquestrador) — coordena a campanha e delega.
- **Alaric** — Análise & Estratégia: lê o histórico (Meta Ads + Instagram) e a esteira de produtos e recomenda a **alocação de verba do mês** por produto (ROAS real, se houver banco de vendas externo; senão, por proxy CPA/CTR).
- **Wystan** — Mídia paga: monta o **anúncio de ponta a ponta** (campanha → ad set → criativo → ad → ativar), inclusive campanhas de **conversão** (Pixel), e faz a **otimização diária** (pausar / escalar / refinar).
- **Orla** — Criativo: gera a arte (imagem) e escreve a copy.
- **Caspian** — Publicação & Comunidade: publica no Instagram (feed, carrossel, story, reels) e no Google Business e responde **comentários** e **reviews**; automação **comentário → resposta + DM**.
- **Edda** — Mensuração: mede o resultado e fecha o ciclo.

## Segurança e autonomia

- **Leitura, análise e rascunho são autônomos.** Já as ações que **gastam verba, publicam ou ativam** passam por **aprovação humana** (pendência no inbox).
- **Verba acima do teto:** o agente pode recomendar, mas precisa justificar e projetar "aumentar vs não aumentar" — a decisão é sempre humana.
- **Tudo é gravado:** toda ação de marketing (sucesso, falha ou aguardando aprovação) fica no log de negócio e nos logs técnicos.

## Regras da organização

Em **Configurações → Marketing** você define o que a empresa faz, produtos, público, tom, diretrizes, **verba mensal/diária** e, opcionalmente, uma **skill SQL** que puxa a receita por produto de um banco externo.

## Integrações de marketing

Em **Configurações → Integrações**, cada organização preenche **uma vez** e os agentes operam sozinhos:

- **Instagram / Meta:** `IG_ACCESS_TOKEN`, `IG_USER_ID`, `META_ADS_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID`, `FB_PAGE_ID`, `META_PIXEL_ID` (conversão).
- **Google Business:** `GBP_ACCESS_TOKEN`, `GBP_ACCOUNT_ID`, `GBP_LOCATION_ID`.
- **OpenAI (imagem):** `OPENAI_API_KEY` (gera os criativos com gpt-image-1).
- **Storage de imagens (MinIO):** as artes geradas são hospedadas e a URL fica salva no banco (configuração de infraestrutura, no servidor).

Cada campo tem um "Como obter" na própria tela.
