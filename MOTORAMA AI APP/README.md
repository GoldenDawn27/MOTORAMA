# Motorama (Next.js stack) — Starter Repo

This starter implements Motorama V1/V2/V3 backbone using:
- Next.js (App Router) + TypeScript
- PostgreSQL
- Prisma
- Shared package for types + validation rules/engine

## Requirements
- Node 18+ (or 20+)
- pnpm
- PostgreSQL

## Setup
```bash
pnpm install
cp apps/web/.env.example apps/web/.env
# edit DATABASE_URL + AUTH_API_KEY
pnpm db:migrate
pnpm dev
```

## Auth (MVP)
All API routes require:
`Authorization: Bearer <AUTH_API_KEY>`
(If AUTH_API_KEY is unset, auth is disabled for dev.)

## Implemented API routes
- /api/health
- /api/v1/projects (POST)
- /api/v1/projects/list (GET)
- /api/v1/projects/[project_id] (GET)
- /api/v1/snapshots/draft (POST)
- /api/v1/validation/run (POST)
- /api/v1/snapshots/[snapshot_id]/freeze (POST)
- /api/v1/patents/drafts (POST)
- /api/v1/patents/drafts/[patent_draft_id] (GET)
- /api/v1/patents/drafts/[patent_draft_id]/comments (POST)
- /api/v1/patents/drafts/[patent_draft_id]/export (POST, mock)
- /api/v1/counsel/tasks (GET)
- /api/v1/counsel/tasks/[task_id]/resolve (POST)
- /api/v1/compendium/seed/import (POST)
- /api/v1/compendium/vehicles (GET)

## Where your existing artifacts live
- docs/motorama_openapi_3_1.json
- docs/motorama_v3_schema.sql
- docs/motorama_validation_rules_v2.json
- docs/motorama_v3_seed_100.json
- docs/motorama_fixtures.zip
