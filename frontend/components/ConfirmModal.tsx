"use client";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
    >
      <div className="bg-white rounded shadow-lg p-6" style={{ minWidth: 320, maxWidth: 420 }}>
        <p className="mb-5 text-sm" style={{ color: "var(--foreground)", lineHeight: 1.5 }}>
          {message}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded border cursor-pointer"
            style={{ borderColor: "#ccc", backgroundColor: "#fff", color: "var(--foreground)" }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold rounded text-white cursor-pointer"
            style={{ backgroundColor: "#cc0000" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
