"use client";

import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import type { DroppableProvided } from "@hello-pangea/dnd";
import type { Swimlane, KanbanCard } from "@/lib/types";
import SwimlaneRow from "./SwimlaneRow";

interface KanbanBoardProps {
  swimlanes: Swimlane[];
  onDragEnd: (result: DropResult) => void;
  onAddSwimlane: () => void;
  onDeleteSwimlane: (swimlaneId: string) => void;
  onHeaderChange: (swimlaneId: string, header: string) => void;
  onAddCard: (swimlaneId: string) => void;
  onDeleteCard: (swimlaneId: string, cardId: string) => void;
  onUpdateCard: (swimlaneId: string, cardId: string, updated: Partial<KanbanCard>) => void;
  onAddUpdate: (swimlaneId: string, cardId: string, text: string) => void;
  onEditUpdate: (swimlaneId: string, cardId: string, updateId: string, text: string) => void;
  onDeleteUpdate: (swimlaneId: string, cardId: string, updateId: string) => void;
}

export default function KanbanBoard({
  swimlanes,
  onDragEnd,
  onAddSwimlane,
  onDeleteSwimlane,
  onHeaderChange,
  onAddCard,
  onDeleteCard,
  onUpdateCard,
  onAddUpdate,
  onEditUpdate,
  onDeleteUpdate,
}: KanbanBoardProps) {
  const sortedSwimlanes = [...swimlanes].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  return (
    <section className="w-full px-6 py-4 flex-1">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold" style={{ color: "var(--purple)" }}>
          Project Kanban Board
        </h2>
        <button
          onClick={onAddSwimlane}
          className="px-4 py-2 text-sm font-semibold text-white rounded"
          style={{ backgroundColor: "var(--dark-orange)" }}
        >
          + Swimlane
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="swimlane-list" direction="vertical" type="SWIMLANE">
          {(provided: DroppableProvided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col"
            >
              {sortedSwimlanes.map((lane, idx) => (
                <SwimlaneRow
                  key={lane.swimlaneId}
                  swimlane={lane}
                  index={idx}
                  onDeleteSwimlane={() => onDeleteSwimlane(lane.swimlaneId)}
                  onHeaderChange={(header) => onHeaderChange(lane.swimlaneId, header)}
                  onAddCard={() => onAddCard(lane.swimlaneId)}
                  onDeleteCard={(cardId) => onDeleteCard(lane.swimlaneId, cardId)}
                  onUpdateCard={(cardId, updated) => onUpdateCard(lane.swimlaneId, cardId, updated)}
                  onAddUpdate={(cardId, text) => onAddUpdate(lane.swimlaneId, cardId, text)}
                  onEditUpdate={(cardId, updateId, text) => onEditUpdate(lane.swimlaneId, cardId, updateId, text)}
                  onDeleteUpdate={(cardId, updateId) => onDeleteUpdate(lane.swimlaneId, cardId, updateId)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}
