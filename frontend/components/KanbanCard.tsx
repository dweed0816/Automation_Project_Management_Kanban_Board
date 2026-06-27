"use client";

import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import type { DraggableProvided } from "@hello-pangea/dnd";
import type { KanbanCard as KanbanCardType, UpdateRecord } from "@/lib/types";
import UpdatesField from "./UpdatesField";
import ConfirmModal from "./ConfirmModal";

const CARD_STATUS_OPTIONS = ["Not Started", "In Progress", "On Hold", "Blocked", "Complete"];

const STATUS_HEADER_BG: Record<string, string> = {
  "In Progress": "#fffde7",
  "On Hold":     "#fee2e2",
  "Blocked":     "#fee2e2",
  "Complete":    "#dcfce7",
};

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
  const [confirmDelete, setConfirmDelete] = useState(false);
  const headerBg = STATUS_HEADER_BG[card.status] ?? "#fff";

  return (
    <Draggable draggableId={card.kanbanCardId} index={index}>
      {(provided: DraggableProvided) => (
        <>
          {confirmDelete && (
            <ConfirmModal
              message={`Delete card "${card.title}"? This cannot be undone.`}
              onConfirm={() => { setConfirmDelete(false); onDelete(); }}
              onCancel={() => setConfirmDelete(false)}
            />
          )}
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="rounded border flex flex-col overflow-hidden"
            style={{
              ...provided.draggableProps.style,
              backgroundColor: "#fff",
              borderColor: "var(--accent-yellow)",
              borderLeftWidth: 3,
              minWidth: 220,
              maxWidth: 260,
            }}
          >
            {/* Status-coloured header */}
            <div style={{ backgroundColor: headerBg, padding: "8px 10px" }}>
              <div className="flex items-start gap-1">
                <div
                  {...provided.dragHandleProps}
                  className="cursor-grab active:cursor-grabbing text-gray-400 select-none px-1 pt-1 shrink-0"
                  title="Drag to reorder card"
                >
                  &#9776;
                </div>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => onUpdate({ title: e.target.value })}
                  className="flex-1 font-semibold rounded px-1 py-0.5"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #ddd",
                    fontSize: "0.88rem",
                    color: "var(--purple)",
                    backgroundColor: "transparent",
                  }}
                />
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="text-xs px-1 rounded shrink-0 cursor-pointer"
                  style={{ color: "#cc0000", lineHeight: 1.4 }}
                  title="Delete card"
                >
                  x
                </button>
              </div>
            </div>

            {/* Card body */}
            <div className="flex flex-col" style={{ padding: "8px 10px", gap: 6 }}>
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

              <span style={{ color: "var(--gray-text)", fontSize: "0.65rem" }}>
                {card.kanbanCardId}
              </span>
            </div>
          </div>
        </>
      )}
    </Draggable>
  );
}
