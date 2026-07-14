<img src="/public/soccer-ball.svg" width="300px" height="300px" align="right"/>

# VemProFut

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?logo=radixui&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?logo=zustand&logoColor=white)

_**Chega de perder tempo montando times e discutindo quem joga primeiro.** O VemProFut é um Progressive Web App (PWA) desenvolvido para organizar peladas de forma rápida, justa e prática, automatizando o sorteio das equipes, o controle das partidas e o histórico dos jogos.**Organize sua pelada em menos de 5 minutos e deixe o app cuidar do resto.**_

## Sobre o projeto

O **VemProFut** nasceu para resolver um problema comum entre grupos de futebol amador: a dificuldade de organizar uma pelada de forma rápida e justa.

Com ele é possível cadastrar jogadores, realizar o sorteio automático das equipes, controlar o andamento das partidas, acompanhar o histórico dos jogos e compartilhar os resultados com qualquer pessoa. Tudo isso em uma interface simples, responsiva e instalável como um aplicativo, graças ao suporte a Progressive Web Apps (PWA).

🔗 **Acesse a aplicação em produção instale no seu smartphone:**

[![VemProFut](https://img.shields.io/badge/VemProFut-Production-18181b?style=for-the-badge)](https://vemprofut-mu.vercel.app)

## Funcionalidades

### Organização

- Criar peladas
- Configurar regras
- Gerenciar jogadores

### Partidas

- Sorteio automático
- Controle das partidas
- Estatísticas em tempo real

### Histórico

- Histórico de peladas
- Estatísticas
- Resumos anteriores

### Compartilhamento

- Gerar imagem de resumo da pelada
- Compartilhar nas redes sociais

### Recursos

- Login com Google.
- Instalação como aplicativo (PWA).

## Tecnologias utilizadas

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Radix UI**
- **React Query**
- **Zod**
- **CI/CD** com GitHub Actions

## Como rodar o projeto

### Pré-requisitos

- Node.js 20+
- Yarn ou npm

### Passos

```bash
# Clone o repositório
git clone https://github.com/daniel-barbosaa/vemprofut.git

# Acesse a pasta
cd vemprofut
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=

**Observação**

O VemProFut utiliza o Supabase como backend para autenticação e persistência dos dados.

Para executar todas as funcionalidades da aplicação, é necessário configurar um projeto próprio no Supabase e informar as credenciais no arquivo .env.

### Executando a aplicação

```bash
# Instale as dependências
yarn install

# Inicie a aplicação
npm run dev
# ou
yarn dev
```
