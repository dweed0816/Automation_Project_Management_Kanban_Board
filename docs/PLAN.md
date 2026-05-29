# Project Plan: Automation Project Management Kanban Board

## Status legend
- [ ] Not started
- [x] Complete

---

## Part 2: Scaffolding

Set up Docker infrastructure, FastAPI backend, and start/stop scripts. Confirm a working "hello world" locally.

### Steps
- [ ] Create `backend/` Python project structure with `uv` (pyproject.toml, main.py)
- [ ] Add FastAPI app with:
  - [ ] A `/health` endpoint returning `{"status": "ok"}`
  - [ ] A `/api/hello` endpoint returning `{"message": "hello world"}`
  - [ ] Static file serving of `frontend/out/` at `/` (NextJS export target)
- [ ] Create `Dockerfile` in project root:
  - [ ] Uses a Python base image
  - [ ] Installs `uv`, installs Python dependencies via `uv`
  - [ ] Copies backend and frontend build output into image
  - [ ] Exposes port 8000, runs uvicorn on startup
- [ ] Create `docker-compose.yml` in project root for local development
- [ ] Create `appsettings.json` in project root with MS SQL connection string placeholder
- [ ] Create start/stop scripts in `scripts/`:
  - [ ] `start_mac.sh`
  - [ ] `start_linux.sh`
  - [ ] `start_windows.bat`
  - [ ] `stop_mac.sh`
  - [ ] `stop_linux.sh`
  - [ ] `stop_windows.bat`
- [ ] Create a minimal placeholder `frontend/out/index.html` (static hello world HTML) to validate static serving before NextJS is built

### Tests
- [ ] `GET /health` returns 200 `{"status": "ok"}`
- [ ] `GET /api/hello` returns 200 `{"message": "hello world"}`
- [ ] `GET /` serves the static HTML file with 200
- [ ] Docker image builds without error (`docker build`)
- [ ] Container starts and all above endpoints respond (`docker-compose up`)

### Success criteria
Docker container starts locally, `/health` and `/api/hello` return correct JSON, and `/` serves static HTML. Start/stop scripts exist for all three platforms.

---

## Part 3: Frontend

Build the full NextJS frontend from scratch per `frontend/AGENTS.md`. Integrate all layout, functionality, and design requirements.

### Steps
- [ ] Initialise NextJS app in `frontend/` (TypeScript, App Router, Tailwind CSS)
- [ ] Copy `external_files/Ascential_Logo.webp` into `frontend/public/`
- [ ] Implement page layout — 3 vertical sections:
  - [ ] Section 1 — Page Banner:
    - [ ] Company logo (Ascential_Logo.webp)
    - [ ] Page title: "Ascential: Automation Project Management Kanban Board"
    - [ ] Logged-in user name display
    - [ ] Logged-in user role display
  - [ ] Section 2 — Project Dashboard:
    - [ ] Customer dropdown
    - [ ] Project dropdown
    - [ ] Manager text box
    - [ ] Status dropdown
    - [ ] Start Date date picker
    - [ ] End Date date picker
    - [ ] Project Description textarea
    - [ ] Admin Config button (hidden for non-admin users)
  - [ ] Section 3 — Project Kanban Board:
    - [ ] Horizontal swimlanes with editable headers
    - [ ] Kanban cards within swimlanes, each with: Title, Task Description, Assigned To, Updates (textarea), Status dropdown
- [ ] Swimlane functionality:
  - [ ] Add swimlane
  - [ ] Delete swimlane
  - [ ] Drag-and-reorder swimlanes (display order only, does not affect SwimlaneID)
  - [ ] SwimlaneID generated as `IIDC-IIDP-A`, `IIDC-IIDP-B`, etc. (upper case alphabet sequence)
  - [ ] SwimlaneID displayed as greyed-out label in each swimlane
- [ ] Kanban card functionality:
  - [ ] Add card to a swimlane
  - [ ] Delete card
  - [ ] Drag-and-reorder cards within and between swimlanes (display order only, does not affect KanbanCardID)
  - [ ] Card drag only initiates from the card title block
  - [ ] KanbanCardID generated as `SwimlaneID-1`, `SwimlaneID-2`, etc.
  - [ ] KanbanCardID displayed as greyed-out label in each card
  - [ ] Updates field: each save creates a new timestamped record; records displayed newest-first; individual records editable and deletable
- [ ] Admin Config modal (admin role only):
  - [ ] Section 1 — Customer: select existing or create new; fields: IIDC (read-only), Cust ID (editable), Customer Name (editable)
  - [ ] Section 2 — Project: select existing or create new; fields: IIDP (read-only), Proj ID (editable), Project Name (editable)
  - [ ] Section 3 — Project Description textarea
- [ ] Apply colour scheme throughout (purple headings, orange links, dark orange buttons, yellow accents, grey labels)
- [ ] Apply professional minimalistic style per design spec
- [ ] All data is local/in-memory state for now (backend integration comes in Part 7)
- [ ] Configure NextJS for static export (`output: 'export'`) so `next build` produces `frontend/out/`

### Tests
- [ ] Unit tests for SwimlaneID generation logic (sequence A, B, C...)
- [ ] Unit tests for KanbanCardID generation logic (SwimlaneID-1, SwimlaneID-2...)
- [ ] Unit tests for Updates timestamp ordering (newest-first)
- [ ] Integration test: add swimlane, add card, reorder — IDs unchanged
- [ ] Integration test: Admin Config modal visible for admin role, hidden for user role
- [ ] `next build` completes without errors and produces `frontend/out/`

### Success criteria
The app runs locally via `npm run dev`. All three sections render correctly. Swimlanes and cards can be added, deleted, and dragged. IDs are generated correctly and displayed as greyed labels. Admin Config modal is role-gated. `next build` produces a static export.

---

## Part 4: Fake user sign-in

Add a login page with hardcoded credentials. Gate the main app behind authentication. Role-based access controls take effect post-login.

### Steps
- [ ] Create a `/login` page in NextJS
- [ ] On app load at `/`, redirect unauthenticated users to `/login`
- [ ] Implement hardcoded credential check:
  - [ ] User: username `user`, password `password`, role `user`
  - [ ] Admin: username `admin`, password `password`, role `administrator`
- [ ] Store session in a client-side context/cookie (no real auth — testing only)
- [ ] Display logged-in username and role in the Page Banner (Section 1)
- [ ] Admin Config button visible only when role is `administrator`
- [ ] Add logout capability

### Tests
- [ ] Visiting `/` while unauthenticated redirects to `/login`
- [ ] Login with `user` / `password` succeeds, role is `user`, Admin Config button hidden
- [ ] Login with `admin` / `password` succeeds, role is `administrator`, Admin Config button visible
- [ ] Invalid credentials show an error message, no redirect
- [ ] Logout clears session and redirects to `/login`

### Success criteria
Both test accounts log in correctly. Role is reflected in the banner and controls access to the Admin Config button. Invalid credentials are rejected with a clear error.

---

## Part 5: Database modelling

Propose a database schema for the full Kanban application, compatible with both SQLite (testing) and MS SQL (production). Get user sign-off before implementation.

### Steps
- [ ] Design schema tables covering:
  - [ ] Users (id, username, password_hash, role)
  - [ ] Customers (IIDC, cust_id, customer_name)
  - [ ] Projects (IIDP, proj_id, project_name, customer_iidc, manager, status, start_date, end_date, project_description)
  - [ ] Swimlanes (id, swimlane_id, project_iidp, header, display_order)
  - [ ] KanbanCards (id, kanban_card_id, swimlane_id, title, task_description, assigned_to, status, display_order)
  - [ ] CardUpdates (id, kanban_card_id, update_text, created_at)
- [ ] Save schema as `docs/schema.json`
- [ ] Document schema decisions and MS SQL compatibility notes in `docs/DATABASE.md`
- [ ] Present schema to user for review and sign-off

### Tests
- [ ] Schema JSON is valid and complete
- [ ] All foreign key relationships are documented
- [ ] MS SQL compatibility confirmed (data types, no SQLite-only features)

### Success criteria
User has reviewed and approved the schema. `docs/schema.json` and `docs/DATABASE.md` exist and are complete.

---

## Part 6: Backend

Implement API routes in FastAPI backed by SQLite. Database auto-created on first run. All routes tested with backend unit tests.

### Steps
- [ ] Set up SQLite database initialisation in backend (create tables if not exist, using schema from Part 5)
- [ ] Add `appsettings.json` hook: if MS SQL connection string is present and valid, use MS SQL; otherwise fall back to SQLite
- [ ] Implement API routes:
  - [ ] `POST /api/auth/login` — validate credentials, return session token
  - [ ] `GET /api/customers` — list all customers
  - [ ] `POST /api/customers` — create customer
  - [ ] `PUT /api/customers/{iidc}` — update customer
  - [ ] `GET /api/projects` — list projects (optionally filtered by customer)
  - [ ] `POST /api/projects` — create project
  - [ ] `PUT /api/projects/{iidp}` — update project
  - [ ] `GET /api/projects/{iidp}/swimlanes` — get swimlanes for a project
  - [ ] `POST /api/projects/{iidp}/swimlanes` — create swimlane
  - [ ] `PUT /api/swimlanes/{id}` — update swimlane (header, display_order)
  - [ ] `DELETE /api/swimlanes/{id}` — delete swimlane
  - [ ] `GET /api/swimlanes/{id}/cards` — get cards for a swimlane
  - [ ] `POST /api/swimlanes/{id}/cards` — create card
  - [ ] `PUT /api/cards/{id}` — update card
  - [ ] `DELETE /api/cards/{id}` — delete card
  - [ ] `GET /api/cards/{id}/updates` — get updates for a card (newest-first)
  - [ ] `POST /api/cards/{id}/updates` — add update
  - [ ] `PUT /api/updates/{id}` — edit update
  - [ ] `DELETE /api/updates/{id}` — delete update
- [ ] Seed database with test data (2 users, 1 customer, 1 project, sample swimlanes and cards)

### Tests
- [ ] Backend unit tests for every API route (happy path and error cases)
- [ ] Test SQLite DB is created from scratch when no DB file exists
- [ ] Test auth: valid credentials return token, invalid return 401
- [ ] Test CRUD for customers, projects, swimlanes, cards, updates
- [ ] Test display_order updates do not change IDs (SwimlaneID, KanbanCardID)

### Success criteria
All API routes return correct responses. SQLite DB auto-created on startup. All backend unit tests pass. `appsettings.json` hook documented and in place for future MS SQL connection.

---

## Part 7: Frontend + Backend integration

Replace all in-memory frontend state with live API calls. Full end-to-end persistent Kanban board.

### Steps
- [ ] Replace hardcoded login with `POST /api/auth/login` call; store token
- [ ] Replace in-memory customer/project data with API calls on dropdown selection
- [ ] On project selection, fetch swimlanes and cards from backend
- [ ] Wire up all create/update/delete actions for swimlanes, cards, and updates to API calls
- [ ] Wire up drag-and-reorder to persist `display_order` via API
- [ ] Wire up Admin Config modal save actions to customer/project API routes
- [ ] Handle loading and error states gracefully in the UI
- [ ] Ensure NextJS static export still works (`next build` → `frontend/out/`) with API base URL configurable via environment variable

### Tests
- [ ] End-to-end: login, select project, add swimlane, add card, refresh page — data persists
- [ ] End-to-end: reorder swimlanes, refresh — order persists, IDs unchanged
- [ ] End-to-end: add card update, edit it, delete it — all operations persist
- [ ] End-to-end: admin user can create customer and project via modal
- [ ] Integration tests covering API error handling (e.g. 401 redirects to login)

### Success criteria
All Kanban data is persisted via the backend. Refreshing the page restores full board state. All end-to-end tests pass. App runs correctly inside Docker container.

---

## Part 8: AI connectivity

Connect the backend to OpenRouter. Verify the integration with a simple test call.

### Steps
- [ ] Add `OPENROUTER_API_KEY` to `.env` (already present — confirm it is loaded by backend)
- [ ] Add OpenRouter client to backend using the `openai` SDK pointed at OpenRouter's base URL
- [ ] Use model `openai/gpt-oss-120b`
- [ ] Implement `POST /api/ai/test` endpoint that sends "What is 2+2?" to the model and returns the response
- [ ] Ensure API key is never logged or exposed in responses

### Tests
- [ ] `POST /api/ai/test` returns a response containing "4" (or equivalent)
- [ ] Endpoint returns a clear error if `OPENROUTER_API_KEY` is missing or invalid
- [ ] API key is not present in any response body or server logs

### Success criteria
`POST /api/ai/test` returns a valid AI response. Key is loaded from `.env` and never exposed.

---

## Part 9: AI backend — Structured Outputs

Extend the AI endpoint to accept the full Kanban state and user question, and return structured responses that optionally include Kanban updates.

### Steps
- [ ] Define a Structured Output schema (Pydantic model) for AI responses:
  - [ ] `message` (str) — AI's text response to the user
  - [ ] `kanban_update` (optional) — partial or full Kanban update (swimlanes/cards to create, update, move, or delete)
- [ ] Implement `POST /api/ai/chat` endpoint:
  - [ ] Accepts: current Kanban JSON, user message, conversation history
  - [ ] Builds system prompt describing the Kanban schema and the AI's update capabilities
  - [ ] Calls OpenRouter with Structured Outputs enforced
  - [ ] Returns `message` and optional `kanban_update`
- [ ] Apply any `kanban_update` returned by the AI to the database within the same request

### Tests
- [ ] Test: send a Kanban + "Add a card called Test Card to the first swimlane" — response includes correct `kanban_update`
- [ ] Test: send a Kanban + "What is the status of the project?" — response has `message` only, no `kanban_update`
- [ ] Test: conversation history is included correctly across multiple turns
- [ ] Test: malformed AI response is handled gracefully (no crash, error returned to client)

### Success criteria
`POST /api/ai/chat` returns structured responses. AI can update the Kanban via its response. Conversation history is maintained across turns. All tests pass.

---

## Part 10: AI frontend widget

Add an AI chat sidebar widget to the UI. Display AI responses and automatically refresh the Kanban when the AI makes updates.

### Steps
- [ ] Add a collapsible sidebar widget to the frontend (toggle button always visible)
- [ ] Widget contains a full chat interface: message history display, text input, send button
- [ ] On send, call `POST /api/ai/chat` with current Kanban state and conversation history
- [ ] Display AI `message` response in the chat history
- [ ] If response includes `kanban_update`, refresh the Kanban board automatically
- [ ] Maintain conversation history client-side across messages within a session
- [ ] Apply colour scheme and minimalistic design consistent with the rest of the app
- [ ] Widget is available to all logged-in users

### Tests
- [ ] UI test: widget opens and closes correctly
- [ ] UI test: message is sent and response displayed in chat history
- [ ] UI test: if AI returns a Kanban update, board refreshes without full page reload
- [ ] UI test: conversation history accumulates correctly across multiple turns
- [ ] UI test: widget is accessible on all screen sizes without breaking the board layout

### Success criteria
The AI chat widget is functional and visually consistent. Sending a message that triggers a Kanban update causes the board to refresh automatically. Chat history persists for the session. All tests pass.
