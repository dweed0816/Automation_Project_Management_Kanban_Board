export interface UpdateRecord {
  id: string;
  timestamp: string;
  text: string;
}

export interface KanbanCard {
  kanbanCardId: string;
  title: string;
  taskDescription: string;
  assignedTo: string;
  updates: UpdateRecord[];
  status: string;
  displayOrder: number;
}

export interface Swimlane {
  swimlaneId: string;
  header: string;
  cards: KanbanCard[];
  displayOrder: number;
  cardCounter: number;
}

export interface Project {
  iidp: string;
  projId: string;
  projectName: string;
  description: string;
  customerId: string;
}

export interface Customer {
  iidc: string;
  custId: string;
  customerName: string;
}

export interface AppState {
  customers: Customer[];
  projects: Project[];
  selectedCustomerId: string;
  selectedProjectId: string;
  manager: string;
  status: string;
  startDate: string;
  endDate: string;
  projectDescription: string;
  swimlanes: Swimlane[];
  swimlaneCounter: number;
  swimlanesByProject: Record<string, { swimlanes: Swimlane[]; counter: number }>;
  customerCounter: number;
  projectCounter: number;
  auth: { username: string; role: string };
}
