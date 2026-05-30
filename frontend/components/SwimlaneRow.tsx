"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import type { DraggableProvided, DraggableStateSnapshot, DroppableProvided } from "@hello-pangea/dnd";
import type { Swimlane, KanbanCard as KanbanCardType } from "@/lib/types";
import KanbanCard from "./KanbanCard";

interface SwimlaneRowProps {
  swimlane: Swimlane;
  index: number;
  onDeleteSwimlane: () => void;
  onHeaderChange: (header: string) => void;
  onAddCard: () => void;
  onDeleteCard: (cardId: string) => void;
  onUpdateCard: (cardId: string, updated: Partial<KanbanCardType>) => void;
  onAddUpdate: (cardId: string, text: string) => void;
  onEditUpdate: (cardId: string, updateId: string, text: string) => void;
  onDeleteUpdate: (cardId: string, updateId: string) => void;
}

export default function SwimlaneRow({
  swimlane,
  index,
  onDeleteSwimlane,
  onHeaderChange,
  onAddCard,
  onDeleteCard,
  onUpdateCard,
  onAddUpdate,
  onEditUpdate,
  onDeleteUpdate,
}: SwimlaneRowProps) {
  const sortedCards = [...swimlane.cards].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  return (
    <Draggable draggableId={`swimlane-${swimlane.swimlaneId}`} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="w-full rounded border mb-3"
          style={{
            ...provided.draggableProps.style,
            borderColor: snapshot.isDragging ? "var(--accent-yellow)" : "#e0e0e0",
            backgroundColor: "#f4f4f8",
          }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2 border-b"
            style={{ borderColor: "var(--accent-yellow)", backgroundColor: "#fffdf0" }}
          >
            <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing text-gray-400 select-none px-1" title="Drag to reorder swimlane">
              &#9776;
            </div>
            <input
              type="text"
              value={swimlane.header}
              onChange={(e) => onHeaderChange(e.target.value)}
              className="flex-1 font-bold rounded px-2 py-0.5"
              style={{
                border: "none",
                borderBottom: "1px solid #ccc",
                backgroundColor: "transparent",
                fontSize: "0.95rem",
                color: "var(--orange)",
              }}
            />
            <span style={{ color: "var(--gray-text)", fontSize: "0.72rem" }}>
              {swimlane.swimlaneId}
            </span>
            <button
              onClick={onAddCard}
              className="px-3 py-1 text-xs font-semibold text-white rounded"
              style={{ backgroundColor: "var(--dark-orange)" }}
            >
              + Card
            </button>
            <button
              onClick={onDeleteSwimlane}
              className="px-2 py-1 text-xs font-semibold rounded border"
              style={{ color: "#cc0000", borderColor: "#cc0000", backgroundColor: "transparent" }}
            >
              Delete
            </button>
          </div>

          <Droppable droppableId={swimlane.swimlaneId} direction="horizontal" type="CARD">
            {(dropProvided: DroppableProvided) => (
              <div
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
                className="flex flex-row gap-3 px-3 py-3 overflow-x-auto min-h-[120px]"
              >
                {sortedCards.map((card, cardIdx) => (
                  <KanbanCard
                    key={card.kanbanCardId}
                    card={card}
                    index={cardIdx}
                    onDelete={() => onDeleteCard(card.kanbanCardId)}
                    onUpdate={(updated) => onUpdateCard(card.kanbanCardId, updated)}
                    onAddUpdate={(text) => onAddUpdate(card.kanbanCardId, text)}
                    onEditUpdate={(updateId, text) => onEditUpdate(card.kanbanCardId, updateId, text)}
                    onDeleteUpdate={(updateId) => onDeleteUpdate(card.kanbanCardId, updateId)}
                  />
                ))}
                {dropProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
