Este documento detalha as práticas de **manutenção e segurança** do AxChat em modelo **nuvem (SaaS)** — o que é responsabilidade da Axory e o que cabe ao Cliente.

---

## Sumário

1. [Atualizações da plataforma](#1-atualizações-da-plataforma)
2. [Responsabilidades do Cliente](#2-responsabilidades-do-cliente)
3. [Acesso e credenciais](#3-acesso-e-credenciais)
4. [Backups e retenção de dados](#4-backups-e-retenção-de-dados)
5. [Integrações de terceiros](#5-integrações-de-terceiros)

---

## 1. Atualizações da plataforma

O AxChat está em desenvolvimento contínuo. A Axory libera atualizações de correção, segurança e novos recursos na infraestrutura em nuvem, sem necessidade de ação manual do Cliente para aplicar patches do sistema.

| Recurso | Onde consultar |
| --- | --- |
| Changelog público | [roadmap.axory.com.br/changelog](https://roadmap.axory.com.br/changelog) |
| Comunicados | E-mail cadastrado e avisos no painel administrativo |

> Manter-se informado sobre atualizações ajuda a aproveitar novos recursos e acompanhar mudanças que possam exigir reconfiguração de canais ou integrações.

---

## 2. Responsabilidades do Cliente

Mesmo em modelo SaaS, o Cliente deve adotar boas práticas na operação diária:

| Área | Responsabilidade do Cliente |
| --- | --- |
| Usuários e permissões | Criar, revisar e desativar acessos da equipe |
| Credenciais | Proteger logins, senhas e tokens de integração |
| Operação dos canais | Cumprir políticas do WhatsApp e demais plataformas |
| Integrações | Configurar e manter ferramentas de terceiros conectadas |
| Dados dos contatos finais | Cumprir a LGPD perante titulares (ver [Aviso de Privacidade](/a/axchat-diretrizes-e-politicas-aviso-de-privacidade)) |

---

## 3. Acesso e credenciais

Após o primeiro acesso, recomendamos:

- alterar senhas padrão ou temporárias imediatamente;
- utilizar senhas fortes e exclusivas para cada usuário;
- revisar periodicamente quem possui perfil de administrador;
- desativar usuários que não fazem mais parte da equipe;
- não compartilhar credenciais entre atendentes.

Em caso de suspeita de comprometimento de conta, altere a senha e abra um chamado em [suporte.axory.com.br](https://suporte.axory.com.br).

---

## 4. Backups e retenção de dados

A Axory adota medidas de redundância e proteção na infraestrutura da plataforma. O Cliente deve:

- exportar dados críticos quando necessário para fins de auditoria ou migração;
- documentar configurações importantes de integrações e automações;
- manter cópias de templates, fluxos e materiais de negócio criados fora do AxChat.

Solicitações de exportação ou exclusão de dados cadastrais do Cliente podem ser feitas conforme o [Aviso de Privacidade](/a/axchat-diretrizes-e-politicas-aviso-de-privacidade).

---

## 5. Integrações de terceiros

Integrações com APIs não oficiais, gateways, CRMs e ferramentas de automação introduzem riscos próprios. Antes de ativar qualquer integração:

1. Leia os termos do provedor de destino.
2. Avalie se a configuração atende às políticas do WhatsApp.
3. Teste em ambiente controlado antes de escalar o volume.

Para comparativo entre API Oficial e não oficial, consulte [API Oficial vs. Não Oficial](/a/axchat-diretrizes-e-politicas-api-oficial-vs-api-nao-oficial).
