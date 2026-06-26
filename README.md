# Axory Sites (Monorepo)

Repositório com os sites estáticos da Axory, organizados como monorepo para deploy independente no Coolify.

## Estrutura

```
apps/
├── axsite/         → Site principal (axory.com.br)
├── ajuda-axory/    → Central de ajuda (ajuda.axory.com.br)
└── bio-axory/      → Link na bio (bio.axory.com.br)
```

## Desenvolvimento local

```bash
npm install

# Site principal
npm run dev:axsite      # http://localhost:5173

# Central de ajuda
npm run dev:ajuda

# Link na bio
npm run dev:bio
```

## Build

```bash
npm run build:axsite
npm run build:ajuda
npm run build:bio
npm run build           # build dos três
```

## Deploy no Coolify

Os três sites saem do mesmo repositório, em **containers separados**, cada um com **seu próprio subdomínio**. Há duas formas de fazer — escolha uma.

| Serviço | Pasta | Domínio sugerido |
|---------|-------|------------------|
| Axsite (site) | `apps/axsite` | axory.com.br |
| Ajuda Axory | `apps/ajuda-axory` | ajuda.axory.com.br |
| Bio Axory | `apps/bio-axory` | bio.axory.com.br |

### Opção A — Um stack só (Docker Compose) — recomendado

Mantém os serviços juntos no Coolify, mas em containers separados. Ideal para trocar o subdomínio de cada um num lugar só.

1. No Coolify, crie **um** recurso do tipo **Docker Compose** apontando para este repositório.
2. O compose usado é o [`docker-compose.yaml`](./docker-compose.yaml) da raiz (sobe os serviços `axsite`, `ajuda` e `bio`).
3. Em **cada serviço**, defina o **Domain (FQDN)** no Coolify — é aí que você troca o subdomínio. O Coolify cuida do SSL.

### Opção B — Recursos separados (Base Directory)

1. Crie um **Resource** no Coolify a partir do repositório GitHub.
2. Build Pack: **Dockerfile** e **Base Directory** = `apps/axsite`; configure o domínio.
3. Repita para `apps/ajuda-axory` e `apps/bio-axory`, cada um com o seu domínio.

Em ambos os casos cada app já traz o seu próprio **Dockerfile** + **nginx.conf** e builda isolado (o contexto de build é a pasta do app).
