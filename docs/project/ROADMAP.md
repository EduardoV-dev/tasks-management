# Project Roadmap

## Status Legend

- `[x]` implemented and verified in the repository
- `[ ]` planned or in progress
- A user story is complete only when both its backend and frontend boxes are checked.

## Current State

| Area | Status | Notes |
| --- | --- | --- |
| Monorepo | [x] | pnpm workspace with `apps/api` and `apps/web` |
| API scaffold | [x] | NestJS starter endpoint only |
| Web scaffold | [x] | Next.js starter page and UI button only |
| Quality tooling | [x] | Biome, Jest, Husky, commitlint, Turbo, CI |
| Database and Prisma | [ ] | No schema, migrations, or database module |
| Configuration and security | [ ] | No env validation, CORS, cookies, or global validation |
| Product functionality | [ ] | No users, auth, sessions, or tasks implemented |

## User Stories

| # | User story | Backend | Frontend | Specification |
| --- | --- | --- | --- | --- |
| 01 | Register an account | [ ] | [ ] | [Backend](01-register-account/backend.md) · [Frontend](01-register-account/frontend.md) |
| 02 | Log in | [ ] | [ ] | [Backend](02-login/backend.md) · [Frontend](02-login/frontend.md) |
| 03 | Maintain an authenticated session | [ ] | [ ] | [Backend](03-maintain-session/backend.md) · [Frontend](03-maintain-session/frontend.md) |
| 04 | Manage active sessions | [ ] | [ ] | [Backend](04-manage-active-sessions/backend.md) · [Frontend](04-manage-active-sessions/frontend.md) |
| 05 | Create a personal task | [ ] | [ ] | [Backend](05-create-personal-task/backend.md) · [Frontend](05-create-personal-task/frontend.md) |
| 06 | View personal tasks | [ ] | [ ] | [Backend](06-view-personal-tasks/backend.md) · [Frontend](06-view-personal-tasks/frontend.md) |
| 07 | Update or delete a personal task | [ ] | [ ] | [Backend](07-update-delete-personal-tasks/backend.md) · [Frontend](07-update-delete-personal-tasks/frontend.md) |

## Delivery Order

1. Foundation: PostgreSQL, Prisma, environment validation, global request validation, CORS, and cookie parsing.
2. Identity: user persistence, registration, login, access-token guard, and `/api/auth/me`.
3. Sessions: refresh-token rotation, logout, and device management.
4. Tasks: ownership-aware CRUD, query features, and statistics.
5. Client: authentication shell, task workspace, and session settings.
6. Quality: unit tests, end-to-end flows, Swagger, and setup documentation.

## Cross-Cutting Requirements

- `whitelist: true` and `forbidNonWhitelisted: true` for request validation.
- Global JWT authentication guard; only explicit public endpoints bypass it.
- Access tokens expire in 15 minutes; refresh tokens expire in 30 days.
- Refresh tokens are rotated and stored only as hashes.
- CORS permits only the configured frontend origin with credentials.
- Tests must cover cross-user task isolation and session revocation.

## Definition of Done

The MVP is complete when every story row has both boxes checked, the core unit and end-to-end tests pass, Swagger documents the API, and a fresh clone can be configured and run using the root README.
