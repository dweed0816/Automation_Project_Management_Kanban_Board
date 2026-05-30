"use client";

import { Draggable } from "@hello-pangea/dnd";
import type { DraggableProvided } from "@hello-pangea/dnd";
import type { KanbanCard as KanbanCardType, UpdateRecord } from "@/lib/types";
import UpdatesField from "./UpdatesField";

const CARD_STATUS_OPTIONS = ["Not Started", "In Progress", "On Hold", "Complete"];

interface KanbanCardProps {
  card: KanbanCardType;
  index: number;
  onDelete: () => void;
  onUpdate: (updated: Partial<KanbanCardType>) => void;
  onAddUpdate: (text: string) => void;
  onEditUpdate: (id: string, text: string) => void;
  onDeleteUpdate: (id: string) => void;
}

const fieldLabel: React.CSSProperties = {
  color: "var(--gray-text)",
  fontSize: "0.72rem",
  fontWeight: 600,
  display: "block",
  marginBottom: 2,
};

const fieldInput: React.CSSProperties = {
  width: "100%",
  border: "1px solid #e0e0e0",
  borderRadius: 3,
  padding: "3px 6px",
  fontSize: "0.8rem",
  backgroundColor: "#fff",
};

export default function KanbanCard({
  card,
  index,
  onDelete,
  onUpdate,
  onAddUpdate,
  onEditUpdate,
  onDeleteUpdate,
}: KanbanCardProps) {
  return (
    <Draggable draggableId={card.kanbanCardId} index={index}>
      {(provided: DraggableProvided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="rounded border flex flex-col"
          style={{
            ...provided.draggableProps.style,
            backgroundColor: "#fff",
            borderColor: "var(--accent-yellow)",
            borderLeftWidth: 3,
            minWidth: 220,
            maxWidth: 260,
            padding: 10,
            gap: 6,
          }}
        >
          <div className="flex justify-between items-start gap-1">
            <div
              {...provided.dragHandleProps}
              className="flex-1 cursor-grab active:cursor-grabbing"
              title="Drag to reorder"
            >
              <input
                type="text"
                value={card.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                className="w-full font-semibold rounded px-1 py-0.5"
                style={{
                  border: "none",
                  borderBottom: "1px solid #ddd",
                  fontSize: "0.88rem",
                  color: "var(--purple)",
                  backgroundColor: "transparent",
                  cursor: "inherit",
                }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              />
            </div>
            <button
              onClick={onDelete}
              className="text-xs px-1 rounded shrink-0"
              style={{ color: "#cc0000", lineHeight: 1.4 }}
              title="Delete card"
            >
              x
            </button>
          </div>

          <span style={{ color: "var(--gray-text)", fontSize: "0.65rem" }}>
            {card.kanbanCardId}
          </span>

          <div>
            <label style={fieldLabel}>Task Description</label>
            <textarea
              value={card.taskDescription}
              onChange={(e) => onUpdate({ taskDescription: e.target.value })}
              rows={2}
              style={{ ...fieldInput, resize: "vertical" }}
            />
          </div>

          <div>
            <label style={fieldLabel}>Assigned To</label>
            <input
              type="text"
              value={card.assignedTo}
              onChange={(e) => onUpdate({ assignedTo: e.target.value })}
              style={fieldInput}
            />
          </div>

          <UpdatesField
            updates={card.updates}
            onAddUpdate={onAddUpdate}
            onEditUpdate={onEditUpdate}
            onDeleteUpdate={onDeleteUpdate}
          />

          <div>
            <label style={fieldLabel}>Status</label>
            <select
              value={card.status}
              onChange={(e) => onUpdate({ status: e.target.value })}
              style={fieldInput}
            >
              {CARD_STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </Draggable>
  );
}
