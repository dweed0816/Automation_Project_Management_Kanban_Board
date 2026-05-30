import type { AppState } from "./types";

export const initialState: AppState = {
  auth: { username: "admin", role: "administrator" },
  customers: [
    { iidc: "CUST01", custId: "ASC", customerName: "Ascential" },
  ],
  projects: [
    {
      iidp: "PROJ01",
      projId: "AUTO",
      projectName: "Automation Platform",
      description: "Automate project management processes end-to-end.",
      customerId: "CUST01",
    },
  ],
  selectedCustomerId: "CUST01",
  selectedProjectId: "PROJ01",
  manager: "Jane Smith",
  status: "In Progress",
  startDate: "2025-01-01",
  endDate: "2025-12-31",
  projectDescription: "Automate project management processes end-to-end.",
  swimlanes: [
    {
      swimlaneId: "CUST01-PROJ01-A",
      header: "To Do",
      displayOrder: 0,
      cardCounter: 2,
      cards: [
        {
          kanbanCardId: "CUST01-PROJ01-A-1",
          title: "Set up repository",
          taskDescription: "Initialise the Git monorepo and CI pipeline.",
          assignedTo: "Alice",
          updates: [
            {
              id: "u1",
              timestamp: "2025-01-05T09:00:00.000Z",
              text: "Repository created and CI configured.",
            },
          ],
          status: "Complete",
          displayOrder: 0,
        },
        {
          kanbanCardId: "CUST01-PROJ01-A-2",
          title: "Define data models",
          taskDescription: "Draft entity schemas for customers, projects and cards.",
          assignedTo: "Bob",
          updates: [],
          status: "Not Started",
          displayOrder: 1,
        },
      ],
    },
    {
      swimlaneId: "CUST01-PROJ01-B",
      header: "In Progress",
      displayOrder: 1,
      cardCounter: 2,
      cards: [
        {
          kanbanCardId: "CUST01-PROJ01-B-1",
          title: "Build backend API",
          taskDescription: "Implement REST endpoints for all entities.",
          assignedTo: "Carol",
          updates: [
            {
              id: "u2",
              timestamp: "2025-02-10T14:30:00.000Z",
              text: "Auth endpoints complete. Working on projects endpoint.",
            },
          ],
          status: "In Progress",
          displayOrder: 0,
        },
        {
          kanbanCardId: "CUST01-PROJ01-B-2",
          title: "Design UI mockups",
          taskDescription: "Create Figma mockups for all key screens.",
          assignedTo: "David",
          updates: [],
          status: "In Progress",
          displayOrder: 1,
        },
      ],
    },
  ],
  swimlaneCounter: 2,
  swimlanesByProject: {},
  customerCounter: 1,
  projectCounter: 1,
};
