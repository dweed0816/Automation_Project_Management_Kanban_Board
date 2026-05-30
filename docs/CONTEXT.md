# Session Handoff: Automation Project Management Kanban Board

## Primary Goal
Build a full-stack Dynamic PM Kanban Board web app for Ascential. The app is being built incrementally across 10 parts defined in `docs/PLAN.md`. Parts 2 and 3 are complete. Part 4 is next.

---

## Architecture

| Layer | Technology | Notes |
|---|---|---|
| Frontend | Next.js 16, TypeScript, App Router, Tailwind v4 | Static export (`output: 'export'`) → `frontend/out/` |
| Backend | Python FastAPI, served via uvicorn | Serves frontend static files at `/` |
| Container | Docker + docker-compose | Single container, port 8000 |
| Package manager | uv (Python), npm (Node) | |
| Database | SQLite (dev), MS SQL (prod hook via `appsettings.json`) | Not yet implemented — Part 6 |
| AI | OpenRouter, model `openai/gpt-oss-120b` | Not yet implemented — Part 8 |

**Key decisions:**
- All state is in-memory (no backend calls) until Part 7
- Drag-and-drop uses `@hello-pangea/dnd`; card drag initiates from title block only
- Swimlane and card IDs are monotonically incrementing (never reused after delete)
- Unit + integration tests use Vitest + React Testing Library
- `npm run dev` must use `--webpack` flag on this machine — Turbopack panics due to Windows MAX_PATH limit on the long project directory path. `next build` is unaffected.

---

## Completed Parts

### Part 2 — Scaffolding (complete, all tests pass)
- `backend/main.py` — FastAPI with `/health`, `/api/hello`, static file serving
- `backend/pyproject.toml` — uv project file
- `Dockerfile` + `docker-compose.yml`
- `appsettings.json` — MS SQL connection string placeholder
- `scripts/` — start/stop scripts for Mac, Linux, Windows
- `frontend/out/index.html` — placeholder (later replaced by Next.js build output)

### Part 3 — Frontend (complete, all tests pass, verified in browser)
All state is in-memory. Key files:

| File | Purpose |
|---|---|
| `frontend/app/page.tsx` | Root client component; all state and handlers |
| `frontend/components/Banner.tsx` | Section 1: logo, title, username, role |
| `frontend/components/ProjectDashboard.tsx` | Section 2: customer/project dropdowns, fields, Admin Config button |
| `frontend/components/KanbanBoard.tsx` | Section 3: DnD context, swimlane list, + Swimlane button |
| `frontend/components/SwimlaneRow.tsx` | Individual swimlane with drag handle, editable header, cards |
| `frontend/components/KanbanCard.tsx` | Individual card; drag handle is title only |
| `frontend/components/UpdatesField.tsx` | Timestamped update records, newest-first, editable/deletable |
| `frontend/components/AdminConfigModal.tsx` | Admin-only modal: manage customers and projects |
| `frontend/components/ConfirmModal.tsx` | Reusable delete confirmation modal |
| `frontend/lib/types.ts` | All TypeScript interfaces incl. AppState |
| `frontend/lib/idgen.ts` | `swimlaneId()`, `kanbanCardId()`, `indexToLetter()` |
| `frontend/lib/initialData.ts` | Seed state: 1 customer, 1 project, 2 swimlanes, 4 cards |
| `frontend/__tests__/` | 22 unit + integration tests, all passing |

**Bugs found and fixed during Part 3 verification:**
- `UpdatesField` called `toLocaleString()` during SSR causing a React hydration mismatch → fixed with `suppressHydrationWarning`
- Switching Customer/Project dropdown cleared the board permanently → fixed by persisting board per project in `AppState.swimlanesByProject`

**Post-verification tweaks applied (same session):**
- Finger cursor (`cursor-pointer`) on all action buttons
- Project Dashboard layout: 3 rows (Customer/Project/Manager/Status → Start/End Date → Description)
- Section headers "Project Dashboard" and "Project Kanban Board" now `#5522dd` purple, larger
- "+ Swimlane" button moved to below the last swimlane
- Delete on swimlane or card now shows a styled confirmation modal before proceeding

---

## Next Step: Part 4 — Fake User Sign-in

From `docs/PLAN.md`:

- Create `/login` page in Next.js
- Redirect unauthenticated users from `/` to `/login`
- Hardcoded credentials:
  - `user` / `password` → role `user`
  - `admin` / `password` → role `administrator`
- Store session in client-side context/cookie (no real auth)
- Display logged-in username and role in the Banner (already wired — `page.tsx` passes `state.auth`)
- Admin Config button already gated on `role === 'administrator'`
- Add logout

The auth user is currently hardcoded as `{ username: 'admin', role: 'administrator' }` in `initialData.ts`. Part 4 replaces this with the real login flow.

---

## Environment Notes
- Working directory: `Automation_Project_Management_Kanban_Board/`
- Dev server: `cd frontend && npx next dev --webpack --port <port>`
- Tests: `cd frontend && npx vitest run`
- Build: `cd frontend && npm run build` (produces `frontend/out/`)
- Docker: `docker-compose up --build` from project root
- `.env` contains `OPENROUTER_API_KEY` (used in Parts 8–10)
