# Deploy automático na VPS

O workflow [`deploy.yml`](workflows/deploy.yml) builda e publica a cada push no `master`.

O build (frontend + backend) **sempre** roda, servindo de CI. As etapas de deploy
só rodam depois que os secrets abaixo existirem — antes disso elas são puladas
com um aviso, sem falhar o workflow.

## Como funciona

O build acontece no runner do GitHub (Ubuntu), não na VPS — então a VPS não
precisa ter Node nem Go instalados. O que sobe por `rsync` é só o resultado:

| Origem (runner) | Destino (VPS) |
| --- | --- |
| `frontend/dist/` | `$DEPLOY_PATH/dist/` |
| `backend/portfolio` (binário Linux) | `$DEPLOY_PATH/portfolio` |

Depois o serviço é reiniciado e o workflow **confere que o site realmente
atualizou**, comparando o hash do bundle recém-buildado com o que está sendo
servido em produção. Se não bater, o workflow falha — foi exatamente esse tipo
de deploy silenciosamente antigo que deixou o site servindo uma build de dias
atrás.

### Dois cuidados embutidos

- **O `.env` nunca é tocado.** Ele fica fora do git e guarda o SMTP. O
  `--delete` do rsync é aplicado só na pasta `dist/`, que é 100% gerada. Se o
  `.env` sumisse, o `checkMailConfig` em `main.go` derrubaria o servidor de
  propósito e o site sairia do ar.
- **`VITE_API_URL` é definida como vazia** no build. Se ficar indefinida,
  `lib/api.ts` cai no default `http://localhost:8080` e o site publicado passa a
  chamar a máquina do visitante. Vazia, as chamadas viram `/api/...` relativas —
  que é como a build atual em produção já funciona.

## 1. Descobrir os valores na VPS

```bash
systemctl list-units --type=service | grep -iE 'portfolio|site|go'   # -> SERVICE_NAME
systemctl show -p WorkingDirectory,ExecStart NOME_DO_SERVICO         # -> DEPLOY_PATH
```

Confirme que o `WorkingDirectory` é a pasta que contém o `.env` — o
`envfile.Load(".env")` lê o arquivo **relativo ao diretório de trabalho** do
processo, então um `WorkingDirectory` errado faz o backend subir sem SMTP.

## 2. Criar a chave de deploy

Na VPS, com o usuário que vai receber o deploy:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/gh_deploy -N '' -C 'github-actions'
cat ~/.ssh/gh_deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
cat ~/.ssh/gh_deploy          # <- a chave PRIVADA, vai no secret VPS_SSH_KEY
```

Apague o arquivo da chave privada da VPS depois de copiar (`rm ~/.ssh/gh_deploy`);
ela só precisa existir nos secrets do GitHub.

## 3. Permitir o restart sem senha

```bash
sudo visudo -f /etc/sudoers.d/portfolio-deploy
```

```
SEU_USUARIO ALL=(root) NOPASSWD: /usr/bin/systemctl stop SERVICE, /usr/bin/systemctl start SERVICE, /usr/bin/systemctl is-active SERVICE, /usr/bin/journalctl -u SERVICE *
```

Troque `SEU_USUARIO` e `SERVICE`. Restringir aos comandos exatos evita dar sudo
irrestrito a uma chave automatizada.

## 4. Cadastrar no GitHub

**Settings → Secrets and variables → Actions**

Em *Secrets*:

| Secret | Valor |
| --- | --- |
| `VPS_HOST` | IP ou host da VPS (ex.: `187.110.167.76`) |
| `VPS_USER` | usuário do SSH |
| `VPS_SSH_KEY` | conteúdo do `gh_deploy` (chave privada, inteira) |

Em *Variables*:

| Variable | Valor | Obrigatória |
| --- | --- | --- |
| `DEPLOY_PATH` | pasta do app na VPS (ex.: `/opt/portfolio`) | sim |
| `SERVICE_NAME` | nome do serviço systemd | sim |
| `VPS_PORT` | porta do SSH (padrão `22`) | não |
| `VPS_ARCH` | `amd64` (padrão) ou `arm64` | não |
| `SITE_URL` | padrão `https://michellycruz.com.br` | não |

## 5. Rodar

Push no `master`, ou **Actions → Deploy → Run workflow** para disparar à mão.

## Rollback

O binário anterior fica salvo como `portfolio.prev`:

```bash
cd $DEPLOY_PATH
sudo systemctl stop SERVICE && mv -f portfolio.prev portfolio && sudo systemctl start SERVICE
```

## Serviço systemd (referência)

Caso precise recriar a unit:

```ini
[Unit]
Description=Portfolio (Go)
After=network.target

[Service]
Type=simple
User=SEU_USUARIO
WorkingDirectory=/opt/portfolio
ExecStart=/opt/portfolio/portfolio
Environment=STATIC_DIR=/opt/portfolio/dist
Environment=FRONTEND_ORIGIN=https://michellycruz.com.br
Restart=on-failure
RestartSec=3

[Install]
WantedBy=multi-user.target
```

O `PORT` e as credenciais SMTP vêm do `.env` em `WorkingDirectory`. Variáveis
reais do ambiente têm precedência sobre o arquivo (ver `envfile.Load`).
