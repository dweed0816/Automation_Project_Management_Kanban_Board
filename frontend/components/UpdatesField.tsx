"use client";

import { useState } from "react";
import type { UpdateRecord } from "@/lib/types";

interface UpdatesFieldProps {
  updates: UpdateRecord[];
  onAddUpdate: (text: string) => void;
  onEditUpdate: (id: string, text: string) => void;
  onDeleteUpdate: (id: string) => void;
}

export default function UpdatesField({
  updates,
  onAddUpdate,
  onEditUpdate,
  onDeleteUpdate,
}: UpdatesFieldProps) {
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const sorted = [...updates].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  function handleSave() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onAddUpdate(trimmed);
    setDraft("");
  }

  function startEdit(rec: UpdateRecord) {
    setEditingId(rec.id);
    setEditText(rec.text);
  }

  function commitEdit(id: string) {
    onEditUpdate(id, editText.trim());
    setEditingId(null);
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold" style={{ color: "var(--gray-text)" }}>
        Updates
      </label>
      <div className="flex gap-1">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={2}
          placeholder="Add update..."
          className="flex-1 border rounded p-1 text-xs"
          style={{ borderColor: "#ddd", resize: "vertical" }}
        />
        <button
          onClick={handleSave}
          className="self-end px-2 py-1 text-xs text-white rounded"
          style={{ backgroundColor: "var(--dark-orange)" }}
        >
          Save
        </button>
      </div>
      {sorted.length > 0 && (
        <div className="flex flex-col gap-1 mt-1 max-h-32 overflow-y-auto">
          {sorted.map((rec) => (
            <div
              key={rec.id}
              className="border rounded p-1 text-xs"
              style={{ borderColor: "#eee", backgroundColor: "#fafafa" }}
            >
              <div className="flex justify-between items-start gap-1">
                {editingId === rec.id ? (
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={2}
                    className="flex-1 border rounded p-1 text-xs"
                    style={{ borderColor: "#ccc", resize: "vertical" }}
                  />
                ) : (
                  <span className="flex-1 whitespace-pre-wrap">{rec.text}</span>
                )}
                <div className="flex gap-1 shrink-0">
                  {editingId === rec.id ? (
                    <button
                      onClick={() => commitEdit(rec.id)}
                      className="text-xs px-1 py-0.5 rounded"
                      style={{ color: "var(--dark-orange)" }}
                    >
                      OK
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(rec)}
                      className="text-xs px-1 py-0.5 rounded"
                      style={{ color: "var(--orange)" }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteUpdate(rec.id)}
                    className="text-xs px-1 py-0.5 rounded"
                    style={{ color: "#cc0000" }}
                  >
                    Del
                  </button>
                </div>
              </div>
              <div suppressHydrationWarning style={{ color: "var(--gray-text)", fontSize: "0.65rem" }} className="mt-0.5">
                {new Date(rec.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
