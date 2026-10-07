# Green Chillyz Catering — Platform

Premium catering services platform. This repository contains the **foundation architecture only** — no UI or product features are built yet.

## Monorepo layout

```
.
├── client/          Next.js 16 (App Router, TypeScript)
├── server/          NestJS 12 (modular, TypeScript)
├── docs/            mdBook documentation
├── pnpm-workspace.yaml
└── .env.example
```

## Prerequisites

| Tool          | Version                       |
| ------------- | ----------------------------- |
| Node.js       | 22.x LTS                      |
| pnpm          | 12.x                          |
| Rust + mdBook | Latest stable (for docs only) |

## Environment setup

Copy `.env.example` and fill in your values:

```bash
cp .env.example .env
```

Required variables:

| Variable               | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`  | NestJS server base URL (e.g. `http://localhost:4000/api/v1`)      |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for metadata (e.g. `http://localhost:3000`)       |
| `DATABASE_URL`         | Supabase PostgreSQL pooled connection (port 6543, pgbouncer=true) |
| `DIRECT_URL`           | Supabase PostgreSQL direct connection (port 5432, for migrations) |
| `CORS_ORIGINS`         | Comma-separated allowed origins for NestJS CORS                   |

**Never prefix `DATABASE_URL`, `DIRECT_URL`, or any secret with `NEXT_PUBLIC_`.**

## Development

```bash
# Install all workspace dependencies
pnpm install

# Start NestJS API (port 4000)
pnpm --filter server dev

# Start Next.js client (port 3000)
pnpm --filter client dev

# Generate Prisma client after schema changes
pnpm db:generate

# Create a migration during development
pnpm db:migrate:dev

# Apply migrations in production/CI
pnpm db:migrate:deploy

# Open Prisma Studio
pnpm db:studio
```

## Verify the server is running

```
GET http://localhost:4000/api/v1/health
```

Returns `{ status, database, timestamp, version }`.

## Build

```bash
# Build NestJS (outputs to server/dist/)
pnpm --filter server build

# Build Next.js (outputs to client/.next/)
pnpm --filter client build
```

## Type checking

```bash
pnpm --filter server typecheck
pnpm --filter client build   # Next.js runs tsc as part of build
```

## Documentation

The `docs/` folder is an [mdBook](https://rust-lang.github.io/mdBook/) project.

```bash
cd docs
mdbook serve   # live-reload at http://localhost:3001
mdbook build   # output to docs/book/
```

## Architecture decisions

See [docs/src/09-technical-architecture.md](docs/src/09-technical-architecture.md) for the full architecture, data flow diagram, environment strategy, and module map.

See [docs/src/12-decisions-constraints.md](docs/src/12-decisions-constraints.md) for logged decisions and constraints.

## What is NOT in this repository

- No UI components or visual design
- No authentication / admin dashboard
- No WhatsApp / email automation
- No payment system
- No QSR, Games, Coins, or Franchise platform (separate platform)
- No fake or demo data
