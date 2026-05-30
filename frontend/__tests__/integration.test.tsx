import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Swimlane, KanbanCard } from "@/lib/types";
import { swimlaneId, kanbanCardId } from "@/lib/idgen";
import ProjectDashboard from "@/components/ProjectDashboard";

// --- Swimlane / card reorder: IDs must not change ---

function reorder<T>(list: T[], from: number, to: number): T[] {
  const result = [...list];
  const [moved] = result.splice(from, 1);
  result.splice(to, 0, moved);
  return result;
}

describe("reorder does not change IDs", () => {
  it("reordering swimlanes preserves swimlaneIds", () => {
    const swimlanes: Swimlane[] = [
      { swimlaneId: swimlaneId("C", "P", 0), header: "A", cards: [], displayOrder: 0, cardCounter: 0 },
      { swimlaneId: swimlaneId("C", "P", 1), header: "B", cards: [], displayOrder: 1, cardCounter: 0 },
      { swimlaneId: swimlaneId("C", "P", 2), header: "C", cards: [], displayOrder: 2, cardCounter: 0 },
    ];
    const idsBefore = swimlanes.map((s) => s.swimlaneId);
    const reordered = reorder(swimlanes, 0, 2);
    const idsAfter = reordered.map((s) => s.swimlaneId);
    expect(new Set(idsAfter)).toEqual(new Set(idsBefore));
    expect(reordered[0].swimlaneId).toBe("C-P-B");
    expect(reordered[2].swimlaneId).toBe("C-P-A");
  });

  it("reordering cards preserves kanbanCardIds", () => {
    const sid = swimlaneId("C", "P", 0);
    const cards: KanbanCard[] = [
      { kanbanCardId: kanbanCardId(sid, 1), title: "1", taskDescription: "", assignedTo: "", updates: [], status: "Not Started", displayOrder: 0 },
      { kanbanCardId: kanbanCardId(sid, 2), title: "2", taskDescription: "", assignedTo: "", updates: [], status: "Not Started", displayOrder: 1 },
    ];
    const idsBefore = cards.map((c) => c.kanbanCardId);
    const reordered = reorder(cards, 0, 1);
    const idsAfter = reordered.map((c) => c.kanbanCardId);
    expect(new Set(idsAfter)).toEqual(new Set(idsBefore));
  });

  it("adding a swimlane then reordering does not reuse or change existing IDs", () => {
    const initial: Swimlane[] = [
      { swimlaneId: swimlaneId("C", "P", 0), header: "A", cards: [], displayOrder: 0, cardCounter: 0 },
      { swimlaneId: swimlaneId("C", "P", 1), header: "B", cards: [], displayOrder: 1, cardCounter: 0 },
    ];
    const added: Swimlane[] = [
      ...initial,
      { swimlaneId: swimlaneId("C", "P", 2), header: "C", cards: [], displayOrder: 2, cardCounter: 0 },
    ];
    const reordered = reorder(added, 2, 0);
    expect(reordered[0].swimlaneId).toBe("C-P-C");
    expect(reordered[1].swimlaneId).toBe("C-P-A");
    expect(reordered[2].swimlaneId).toBe("C-P-B");
  });
});

// --- Admin Config button visibility ---

const noop = vi.fn();

const baseProps = {
  customers: [{ iidc: "C01", custId: "01", customerName: "Test Co" }],
  projects: [{ iidp: "P01", projId: "01", projectName: "Test Project", description: "", customerId: "C01" }],
  selectedCustomerId: "C01",
  selectedProjectId: "P01",
  manager: "",
  status: "Not Started",
  startDate: "",
  endDate: "",
  projectDescription: "",
  onCustomerChange: noop,
  onProjectChange: noop,
  onManagerChange: noop,
  onStatusChange: noop,
  onStartDateChange: noop,
  onEndDateChange: noop,
  onProjectDescriptionChange: noop,
  onAdminConfig: noop,
};

describe("Admin Config button visibility", () => {
  it("is visible for administrator role", () => {
    render(<ProjectDashboard {...baseProps} role="administrator" />);
    expect(screen.getByText("Admin Config")).toBeTruthy();
  });

  it("is hidden for user role", () => {
    render(<ProjectDashboard {...baseProps} role="user" />);
    expect(screen.queryByText("Admin Config")).toBeNull();
  });
});
