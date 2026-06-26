Este documento descreve os requisitos técnicos para utilizar o **AxChat** em modelo **nuvem (SaaS)**. A Axory hospeda e opera a plataforma; o Cliente acessa pelo navegador e configura canais, usuários e integrações conforme seu plano.

> Requisitos detalhados e atualizados também estão disponíveis em [axory.com.br](https://axory.com.br).

---

## Sumário

1. [Requisitos do navegador e do dispositivo](#1-requisitos-do-navegador-e-do-dispositivo)
2. [Requisitos de conexão](#2-requisitos-de-conexão)
3. [Plataformas integradas](#3-plataformas-integradas)
4. [Escalabilidade e consumo de recursos](#4-escalabilidade-e-consumo-de-recursos)
5. [Manutenção e segurança](#5-manutenção-e-segurança)

---

## 1. Requisitos do navegador e do dispositivo

Para acessar o painel do AxChat, cada usuário deve utilizar um dispositivo que atenda, no mínimo:

| Requisito | Especificação mínima |
| --- | --- |
| Memória (RAM) | 8 GB ou superior |
| Processador | Intel i5 ou equivalente |
| Sistema operacional | Atualizado (Windows, macOS ou Linux) |
| Navegador | Chrome, Edge ou Firefox em versão recente |

Recomendamos manter o sistema operacional e o navegador atualizados para garantir desempenho, segurança e compatibilidade com os recursos da plataforma.

---

## 2. Requisitos de conexão

| Requisito | Descrição |
| --- | --- |
| Internet | Conexão estável e de boa qualidade |
| Latência | Quanto menor, melhor a experiência no painel |
| Idade mínima | 13 anos ou mais, conforme termos das plataformas integradas |

---

## 3. Plataformas integradas

O uso do AxChat pressupõe conformidade com os termos das plataformas conectadas, em especial:

- **WhatsApp** — [termos e políticas](https://www.whatsapp.com/legal/)
- **Instagram** — [termos de uso da Meta](https://www.facebook.com/legal/terms)
- **Telegram** — termos próprios da plataforma

O Cliente é responsável por manter suas contas e integrações em conformidade com as regras de cada rede.

---

## 4. Escalabilidade e consumo de recursos

O AxChat **não limita** o número de canais ou usuários na licença. A capacidade operacional depende do plano contratado e da intensidade de uso.

Projeção média de consumo por componente na plataforma (valores aproximados, podem variar conforme o volume de mensagens e o tamanho da equipe):

| Componente | Descrição | Consumo estimado |
| --- | --- | --- |
| **WABA** | Canal WhatsApp via API Oficial | até 100 MB por canal conectado |
| **Zappfy** | WhatsApp não oficial via QR Code | até 250 MB por canal conectado |
| **Canal interno** | Canal nativo da plataforma AxChat | consumo proporcional ao uso na instância |
| **Usuário logado** | Atendente com sessão ativa no painel | 100 a 150 MB por sessão |

> Comece com o plano adequado ao seu volume atual e monitore o desempenho conforme a operação cresce. Em caso de lentidão, avalie upgrade de plano com a equipe comercial.

---

## 5. Manutenção e segurança

A Axory realiza atualizações e manutenção da infraestrutura da plataforma. O Cliente é responsável por:

- gestão de usuários e permissões internas;
- segurança das credenciais de acesso;
- configuração adequada de integrações de terceiros;
- conformidade com as políticas do WhatsApp, Instagram, Telegram e demais canais conectados.

Consulte o guia completo em [Manutenção e Segurança](/a/axchat-diretrizes-e-politicas-manutencao-e-seguranca).
