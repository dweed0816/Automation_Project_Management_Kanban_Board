# High level steps for project

Part 1: Plan

Enrich this document to plan out each of these parts in detail, with substeps listed out as a checklist to be checked off by the agent, and with tests and success critieria for each. Ensure the user checks and approves the plan.

Part 2: Scaffolding

Set up the Docker infrastructure, the backend in backend/ with FastAPI, and write the start and stop scripts in the scripts/ directory. This should serve example static HTML to confirm that a 'hello world' example works running locally and also make an API call.

Part 3: Frontend

Review the AGENTS.md file in the frontend folder. Build frontend according to the requirements documented in AGENTS.md. Comprehensive unit and integration tests.

Part 3B: Frontend - Further enhancements

Make the following enhancements to the frontend
- Implement a unique identifier for each Swimlane within the project named SwimlaneID in the backend database. For the SwimlaneID, generate it by using the sequence: IIDC-IIDP-running (upper case) alphabet. Note that the SwimlaneID should not be used to set the order for which swimlanes are displayed on the web app. The Swimlanes should be able to be reordered without changing their unique SwimlaneIDs. SwimlaneID should be displayed as a greyed out text label in each swimlane.
- Implement a unique identifier for each Kanban card within the project named KanbanCardID in the backend database. For the KanbanCardID, generate it by using sequence: SwimlaneID-running number. Note that the KanbanCardID should not be used to set the order which Kanban cards are displayed in the web app. The Kanban cards should be able to be reordered without changing their unique KanbancardIDs. KanbanCardID should be displayed as a greyed out text label in each Kanban Card.
- Kanban card drag is janky. Only allow card drag functionality when user drags from the Kanban card title block.
- Save each Details update as a new record in the database, with a timestamp of when each record was saved. When calling back records for display in web application, display them in the order of newest to oldest. Allow functionality to edit or delete previous records.
Comprehensive unit and integration tests.

Part 4: Add in a fake user sign in experience

Now update so that on first hitting /, you need to log in with dummy credentials. Create 2 user accounts with different credentials and roles for testing. General user credentials: "user", "password". Admin user credentials: "admin", "password". The Admin user should be assigned the "Administrator" role and is able to see and click on the "Admin Config" button in the home page to invoke the Admin configuration modal. Comprehensive tests.

Part 5: Database modeling

Now propose a database schema, compatible for eventual deployment in MS SQL, for the Kanban, saving it as JSON. Document the database approach in docs/ and get user sign off.

Part 6: Backend

Now add API routes to allow the backend to read and change the Kanban for a given user; test this thoroughly with backend unit tests. The database should be created if it doesn't exist.

Part 7: Frontend + Backend

Now have the frontend actually use the backend API, so that the app is a proper persistent Kanban board. Test very throughly.

Part 8: AI connectivity

Now allow the backend to make an AI call via OpenRouter. Test connectivity with a simple "2+2" test and ensure the AI call is working.

Part 9: Now extend the backend call so that it always calls the AI with the JSON of the Kanban board, plus the user's question (and conversation history). The AI should respond with Structured Outputs that includes the response to the user and optionaly an update to the Kanban. Test thoroughly.

Part 10: Now add a beautiful sidebar widget to the UI supporting full AI chat, and allowing the LLM (as it determines) to update the Kanban based on its Structured Outputs. If the AI updates the Kanban, then the UI should refresh automatically.