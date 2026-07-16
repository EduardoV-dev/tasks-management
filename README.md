# Task Management

An authenticated personal task manager built as a learning-focused full-stack monorepo. Users will register, manage device sessions, and create tasks visible only to their own account.

## Status

The repository currently contains NestJS and Next.js starter applications plus shared tooling. The product features are planned in the [project roadmap](docs/project/ROADMAP.md).

## MVP

- Account registration and login
- Short-lived JWT access tokens and rotating refresh-token cookies
- Device session listing, single-session revocation, and logout from all devices
- Personal task CRUD with ownership enforcement
- Search, filters, sorting, pagination, and per-user task statistics

Email verification, password recovery, OAuth, roles, and multi-factor authentication are outside this MVP.

## Stack

- Backend: NestJS, TypeScript, PostgreSQL, Prisma, Passport, JWT, Argon2
- Frontend: Next.js, TypeScript, TanStack Query, React Hook Form, Zod, Tailwind CSS, shadcn/ui
- Tooling: pnpm workspaces, Turborepo, Biome, Jest, Supertest, Husky, GitHub Actions

## Workspace

```text
apps/
  api/  NestJS API
  web/  Next.js application
docs/project/  Roadmap and user-story specifications
```

## Requirements

- Node.js 24 or newer
- pnpm 11 or newer
- PostgreSQL, once the database story is implemented

## Setup

```bash
pnpm install
pnpm --filter api start:dev
pnpm --filter web dev
```

The API currently defaults to port `3000`; the target configuration uses port `3001` so the web app can use port `3000`.

## Environment

Create `apps/api/.env` when configuration is implemented:

```env
NODE_ENV=development
PORT=3001
DATABASE_URL=
FRONTEND_URL=http://localhost:3000
JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=30d
REFRESH_COOKIE_NAME=refresh_token
```

Use separate strong JWT secrets. Never commit `.env` files.

## Commands

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm test:coverage
pnpm build
```

## Documentation

The [roadmap](docs/project/ROADMAP.md) is the source of truth for progress. Each user story has separate `backend.md` and `frontend.md` specifications so either surface can be completed and checked independently.

## Security Baseline

- Hash passwords and refresh tokens with Argon2.
- Keep refresh tokens in HTTP-only cookies, never local storage.
- Protect API routes by default and validate all request DTOs.
- Scope every task query to the authenticated user ID.
- Return `404` for another user's task to avoid exposing its existence.
- Do not return password hashes, token hashes, or raw refresh tokens.
