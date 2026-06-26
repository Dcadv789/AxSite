# Departamentos, SLA e Watchdog

## Departamentos

Departamentos agrupam atendentes por time ou skill. Cada um tem uma **regra de distribuição**:

- **Round-robin:** reveza as conversas entre os atendentes.
- **Menos ocupado:** envia para quem tem menos conversas.
- **Manual:** sem distribuição automática.

Um departamento pode ser definido como o **padrão** para conversas que chegam sem rota.

## SLA

São metas de tempo, em minutos, por departamento:

- **Primeira resposta**
- **Resolução**

Os timers correm em segundo plano e **alertam ou escalam** quando estouram. Eles param quando a conversa é resolvida ou quando o atendente responde.

## Watchdog (reengajamento)

O **Watchdog** é um monitor que detecta conversas "presas" — quando o cliente falou e ninguém respondeu. Depois de um tempo configurável, ele **reaciona a IA**, respeitando quem desligou a IA de propósito. Ele conta as tentativas e marca a conversa como "presa pra valer" quando o limite estoura.
