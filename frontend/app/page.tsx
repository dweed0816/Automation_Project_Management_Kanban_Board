"use client";

import { useState, useCallback } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { initialState } from "@/lib/initialData";
import { swimlaneId, kanbanCardId } from "@/lib/idgen";
import type { AppState, KanbanCard, Customer, Project, Swimlane } from "@/lib/types";
import Banner from "@/components/Banner";
import ProjectDashboard from "@/components/ProjectDashboard";
import KanbanBoard from "@/components/KanbanBoard";
import AdminConfigModal from "@/components/AdminConfigModal";

function generateUpdateId(): string {
  return `u-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function Home() {
  const [state, setState] = useState<AppState>(initialState);
  const [showAdminConfig, setShowAdminConfig] = useState(false);

  const selectedCustomer = state.customers.find(
    (c) => c.iidc === state.selectedCustomerId
  );
  const selectedProject = state.projects.find(
    (p) => p.iidp === state.selectedProjectId
  );

  function handleCustomerChange(iidc: string) {
    const firstProj = state.projects.find((p) => p.customerId === iidc);
    setState((prev) => ({
      ...prev,
      selectedCustomerId: iidc,
      selectedProjectId: firstProj?.iidp ?? "",
      projectDescription: firstProj?.description ?? "",
      swimlanes: [],
      swimlaneCounter: 0,
    }));
  }

  function handleProjectChange(iidp: string) {
    const proj = state.projects.find((p) => p.iidp === iidp);
    setState((prev) => ({
      ...prev,
      selectedProjectId: iidp,
      projectDescription: proj?.description ?? "",
      swimlanes: [],
      swimlaneCounter: 0,
    }));
  }

  function handleAddSwimlane() {
    const cust = state.customers.find((c) => c.iidc === state.selectedCustomerId);
    const proj = state.projects.find((p) => p.iidp === state.selectedProjectId);
    if (!cust || !proj) return;

    const newCounter = state.swimlaneCounter;
    const id = swimlaneId(cust.iidc, proj.iidp, newCounter);
    const newSwimlane: Swimlane = {
      swimlaneId: id,
      header: "New Swimlane",
      cards: [],
      displayOrder: state.swimlanes.length,
      cardCounter: 0,
    };
    setState((prev) => ({
      ...prev,
      swimlaneCounter: prev.swimlaneCounter + 1,
      swimlanes: [...prev.swimlanes, newSwimlane],
    }));
  }

  function handleDeleteSwimlane(swimId: string) {
    setState((prev) => {
      const remaining = prev.swimlanes
        .filter((s) => s.swimlaneId !== swimId)
        .map((s, i) => ({ ...s, displayOrder: i }));
      return { ...prev, swimlanes: remaining };
    });
  }

  function handleHeaderChange(swimId: string, header: string) {
    setState((prev) => ({
      ...prev,
      swimlanes: prev.swimlanes.map((s) =>
        s.swimlaneId === swimId ? { ...s, header } : s
      ),
    }));
  }

  function handleAddCard(swimId: string) {
    setState((prev) => ({
      ...prev,
      swimlanes: prev.swimlanes.map((lane) => {
        if (lane.swimlaneId !== swimId) return lane;
        const counter = lane.cardCounter;
        const card: KanbanCard = {
          kanbanCardId: kanbanCardId(swimId, counter + 1),
          title: "New Card",
          taskDescription: "",
          assignedTo: "",
          updates: [],
          status: "Not Started",
          displayOrder: lane.cards.length,
        };
        return {
          ...lane,
          cardCounter: counter + 1,
          cards: [...lane.cards, card],
        };
      }),
    }));
  }

  function handleDeleteCard(swimId: string, cardId: string) {
    setState((prev) => ({
      ...prev,
      swimlanes: prev.swimlanes.map((lane) => {
        if (lane.swimlaneId !== swimId) return lane;
        const remaining = lane.cards
          .filter((c) => c.kanbanCardId !== cardId)
          .map((c, i) => ({ ...c, displayOrder: i }));
        return { ...lane, cards: remaining };
      }),
    }));
  }

  function handleUpdateCard(swimId: string, cardId: string, updated: Partial<KanbanCard>) {
    setState((prev) => ({
      ...prev,
      swimlanes: prev.swimlanes.map((lane) => {
        if (lane.swimlaneId !== swimId) return lane;
        return {
          ...lane,
          cards: lane.cards.map((c) =>
            c.kanbanCardId === cardId ? { ...c, ...updated } : c
          ),
        };
      }),
    }));
  }

  function handleAddUpdate(swimId: string, cardId: string, text: string) {
    const record = {
      id: generateUpdateId(),
      timestamp: new Date().toISOString(),
      text,
    };
    setState((prev) => ({
      ...prev,
      swimlanes: prev.swimlanes.map((lane) => {
        if (lane.swimlaneId !== swimId) return lane;
        return {
          ...lane,
          cards: lane.cards.map((c) =>
            c.kanbanCardId === cardId
              ? { ...c, updates: [...c.updates, record] }
              : c
          ),
        };
      }),
    }));
  }

  function handleEditUpdate(swimId: string, cardId: string, updateId: string, text: string) {
    setState((prev) => ({
      ...prev,
      swimlanes: prev.swimlanes.map((lane) => {
        if (lane.swimlaneId !== swimId) return lane;
        return {
          ...lane,
          cards: lane.cards.map((c) => {
            if (c.kanbanCardId !== cardId) return c;
            return {
              ...c,
              updates: c.updates.map((u) =>
                u.id === updateId ? { ...u, text } : u
              ),
            };
          }),
        };
      }),
    }));
  }

  function handleDeleteUpdate(swimId: string, cardId: string, updateId: string) {
    setState((prev) => ({
      ...prev,
      swimlanes: prev.swimlanes.map((lane) => {
        if (lane.swimlaneId !== swimId) return lane;
        return {
          ...lane,
          cards: lane.cards.map((c) => {
            if (c.kanbanCardId !== cardId) return c;
            return {
              ...c,
              updates: c.updates.filter((u) => u.id !== updateId),
            };
          }),
        };
      }),
    }));
  }

  const handleDragEnd = useCallback((result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "SWIMLANE") {
      setState((prev) => {
        const sorted = [...prev.swimlanes].sort(
          (a, b) => a.displayOrder - b.displayOrder
        );
        const [moved] = sorted.splice(source.index, 1);
        sorted.splice(destination.index, 0, moved);
        const reordered = sorted.map((s, i) => ({ ...s, displayOrder: i }));
        return { ...prev, swimlanes: reordered };
      });
      return;
    }

    if (type === "CARD") {
      setState((prev) => {
        const fromLane = prev.swimlanes.find(
          (s) => s.swimlaneId === source.droppableId
        );
        const toLane = prev.swimlanes.find(
          (s) => s.swimlaneId === destination.droppableId
        );
        if (!fromLane || !toLane) return prev;

        const sourceCards = [...fromLane.cards].sort(
          (a, b) => a.displayOrder - b.displayOrder
        );
        const [movedCard] = sourceCards.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
          sourceCards.splice(destination.index, 0, movedCard);
          const reordered = sourceCards.map((c, i) => ({ ...c, displayOrder: i }));
          return {
            ...prev,
            swimlanes: prev.swimlanes.map((s) =>
              s.swimlaneId === source.droppableId
                ? { ...s, cards: reordered }
                : s
            ),
          };
        }

        const destCards = [...toLane.cards].sort(
          (a, b) => a.displayOrder - b.displayOrder
        );
        destCards.splice(destination.index, 0, movedCard);

        return {
          ...prev,
          swimlanes: prev.swimlanes.map((s) => {
            if (s.swimlaneId === source.droppableId) {
              return {
                ...s,
                cards: sourceCards.map((c, i) => ({ ...c, displayOrder: i })),
              };
            }
            if (s.swimlaneId === destination.droppableId) {
              return {
                ...s,
                cards: destCards.map((c, i) => ({ ...c, displayOrder: i })),
              };
            }
            return s;
          }),
        };
      });
    }
  }, []);

  function handleAdminSave(data: {
    customers: Customer[];
    projects: Project[];
    customerCounter: number;
    projectCounter: number;
  }) {
    setState((prev) => ({
      ...prev,
      customers: data.customers,
      projects: data.projects,
      customerCounter: data.customerCounter,
      projectCounter: data.projectCounter,
    }));
    setShowAdminConfig(false);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--background)" }}>
      <Banner username={state.auth.username} role={state.auth.role} />

      <ProjectDashboard
        customers={state.customers}
        projects={state.projects}
        selectedCustomerId={state.selectedCustomerId}
        selectedProjectId={state.selectedProjectId}
        manager={state.manager}
        status={state.status}
        startDate={state.startDate}
        endDate={state.endDate}
        projectDescription={state.projectDescription}
        role={state.auth.role}
        onCustomerChange={handleCustomerChange}
        onProjectChange={handleProjectChange}
        onManagerChange={(v) => setState((p) => ({ ...p, manager: v }))}
        onStatusChange={(v) => setState((p) => ({ ...p, status: v }))}
        onStartDateChange={(v) => setState((p) => ({ ...p, startDate: v }))}
        onEndDateChange={(v) => setState((p) => ({ ...p, endDate: v }))}
        onProjectDescriptionChange={(v) => setState((p) => ({ ...p, projectDescription: v }))}
        onAdminConfig={() => setShowAdminConfig(true)}
      />

      <KanbanBoard
        swimlanes={state.swimlanes}
        onDragEnd={handleDragEnd}
        onAddSwimlane={handleAddSwimlane}
        onDeleteSwimlane={handleDeleteSwimlane}
        onHeaderChange={handleHeaderChange}
        onAddCard={handleAddCard}
        onDeleteCard={handleDeleteCard}
        onUpdateCard={handleUpdateCard}
        onAddUpdate={handleAddUpdate}
        onEditUpdate={handleEditUpdate}
        onDeleteUpdate={handleDeleteUpdate}
      />

      {showAdminConfig && (
        <AdminConfigModal
          customers={state.customers}
          projects={state.projects}
          customerCounter={state.customerCounter}
          projectCounter={state.projectCounter}
          onClose={() => setShowAdminConfig(false)}
          onSave={handleAdminSave}
        />
      )}
    </div>
  );
}
