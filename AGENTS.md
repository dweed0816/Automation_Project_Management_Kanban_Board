# The Automation Project Kanban web app

## Business Requirements

This project is building a Dynamic Project Management Kanban Board. Key features:
- Users are intended to be signed in using Single Sign On
- Users will be assigned different roles. It is expected that the SSO provider handles user authentication, while the backend database in this application handles user authorization.
- When signed in, the user sees a Kanban board representing their project. Users with elevated roles will be able to acccess "administrator only" features.
- The Main page has 2 main sections "Project Dashboard" and "Project Kanban Board"
- Depending on user selection of "Customer" and "Project" in dropdown boxes in the "Project Dashboard" section, all other fields will be dynamically populated with project specific data retrieved from backend database.
- "Project Kanban Board" contains Kanban Cards nested within swimlanes. Swimlanes and Kanban cards can be dragged and re-ordered by the user.
- There is an AI chat feature in the form of a widget that can be triggered to to create / edit / move one or more cards

## Limitations

For testing the Project Kanban app, there will only be 2 user sign in accounts with different roles (User account role - hardcoded to 'user' and 'password', Admin account role - hardcoded to 'admin' and 'password) but it is intended that Single Sign On authentication be used when deploying the web app. The database will support multiple users with different roles in deployment.

For the MVP, this will run locally (in a docker container)

## Technical Decisions

- NextJS frontend
- Python FastAPI backend, including serving the static NextJS site at /
- Everything packaged into a Docker container
- Use "uv" as the package manager for python in the Docker container
- Use OpenRouter for the AI calls. An OPENROUTER_API_KEY is in .env in the project root
- Use `openai/gpt-oss-120b` as the model
- Use SQLLite local database as the database for testing, creating a new db if it doesn't exist. Final backend deployment is intended to be in a MS SQL database, create the necessary hooks for eventual deployment. 
- Start and Stop server scripts for Mac, PC, Linux in scripts/

## Starting Point

A working frontend has been built and is already in frontend. This is not yet designed for the Docker setup. It's a pure frontend-only demo.

## Color Scheme

- Accent Yellow: `#ecad0a` - accent lines, highlights
- Orange: `#de7621` - links, key sections
- Dark Orange: `#dd7722` - submit buttons, important actions
- Purple: `#5522dd` - main headings
- Gray Text: `#888888` - supporting text, labels

## Coding standards

1. Use latest versions of libraries and idiomatic approaches as of today
2. Keep it simple - NEVER over-engineer, ALWAYS simplify, NO unnecessary defensive programming. No extra features - focus on simplicity.
3. Be concise. Keep README minimal. IMPORTANT: no emojis ever
4. When hitting issues, always identify root cause before trying a fix. Do not guess. Prove with evidence, then fix the root cause.

## Working documentation

All documents for planning and executing this project will be in the docs/ directory.
Please review the docs/PLAN.md document before proceeding.