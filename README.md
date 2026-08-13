# Portfólio — Michelly Cruz (v2)

Versão renovada do [portfólio original](https://github.com/michellycruz/portfolio), agora com **React + TypeScript + Tailwind** no frontend e **Go** no backend, mantendo a identidade visual neobrutalista (cores pastéis, bordas grossas, sombras duras) com um acabamento mais moderno, responsivo e animado.

## Estrutura

```
portfolio-v2/
├── backend/    # API em Go (conteúdo + formulário de contato)
└── frontend/   # React + Vite + Tailwind v4 + Framer Motion
```

## Backend (Go)

```bash
cd backend
go run .
```

Roda por padrão em `http://localhost:8080`. Endpoints:

- `GET /api/content` — todo o conteúdo do portfólio (perfil, experiência, formação, cursos, skills, projetos)
- `GET /api/profile`, `/api/experience`, `/api/education`, `/api/skills`, `/api/projects` — seções individuais
  (`/api/education` devolve `{ education, institutions }` e `/api/skills` devolve `{ infraSkills, infraHighlights, categories }`)
- `POST /api/contact` — recebe `{ name, email, message }`, valida e envia por e-mail (ou loga no console se SMTP não estiver configurado)
- `GET /healthz` — health check

Configuração via variáveis de ambiente (copie `backend/.env.example` para `backend/.env` e exporte, ou defina direto no ambiente):

| Variável | Descrição |
|---|---|
| `PORT` | Porta do servidor (padrão `8080`) |
| `FRONTEND_ORIGIN` | Origem permitida no CORS (padrão `http://localhost:5173`) |
| `STATIC_DIR` | Caminho do build do frontend (`frontend/dist`) para servir tudo por um único binário |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Credenciais SMTP para o formulário de contato |
| `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | Remetente e destinatário das mensagens de contato |

Sem SMTP configurado, o formulário continua funcionando normalmente — a mensagem é registrada no log do servidor em vez de enviada por e-mail. Isso é o suficiente para desenvolvimento local.

## Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Roda por padrão em `http://localhost:5173` e consome a API do backend (`VITE_API_URL`, padrão `http://localhost:8080`). Se a API estiver offline, a página usa automaticamente um conteúdo local de fallback (`src/data/fallback-content.ts`) para nunca ficar em branco.

Para build de produção:

```bash
npm run build
```

Gera `frontend/dist`, que pode ser servido por qualquer host estático **ou** diretamente pelo binário Go (defina `STATIC_DIR=../frontend/dist` no backend).

## Deploy em um único binário

```bash
cd frontend && npm run build
cd ../backend
STATIC_DIR=../frontend/dist FRONTEND_ORIGIN=* go run .
```

O Go passa a servir a SPA e a API na mesma porta.

## Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, lucide-react
- **Backend:** Go (biblioteca padrão `net/http`, sem framework externo)
- **Conteúdo:** mesmo currículo/experiência/projetos do portfólio original, agora servidos via API em vez de hardcoded no HTML
