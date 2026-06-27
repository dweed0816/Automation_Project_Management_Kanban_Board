"use client";

import type { Customer, Project } from "@/lib/types";

interface ProjectDashboardProps {
  customers: Customer[];
  projects: Project[];
  selectedCustomerId: string;
  selectedProjectId: string;
  manager: string;
  status: string;
  startDate: string;
  endDate: string;
  projectDescription: string;
  role: string;
  onCustomerChange: (id: string) => void;
  onProjectChange: (id: string) => void;
  onManagerChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onStartDateChange: (v: string) => void;
  onEndDateChange: (v: string) => void;
  onProjectDescriptionChange: (v: string) => void;
  onAdminConfig: () => void;
}

const STATUS_OPTIONS = ["Not Started", "In Progress", "On Hold", "Complete"];

const labelStyle = { color: "var(--gray-text)", fontSize: "0.8rem", fontWeight: 600 };
const inputStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: 4,
  padding: "6px 10px",
  fontSize: "0.9rem",
  width: "100%",
  backgroundColor: "#fff",
  color: "var(--foreground)",
};

export default function ProjectDashboard({
  customers,
  projects,
  selectedCustomerId,
  selectedProjectId,
  manager,
  status,
  startDate,
  endDate,
  projectDescription,
  role,
  onCustomerChange,
  onProjectChange,
  onManagerChange,
  onStatusChange,
  onStartDateChange,
  onEndDateChange,
  onProjectDescriptionChange,
  onAdminConfig,
}: ProjectDashboardProps) {
  const filteredProjects = projects.filter(
    (p) => p.customerId === selectedCustomerId
  );

  return (
    <section
      className="w-full px-6 py-4 border-b"
      style={{ borderColor: "var(--accent-yellow)", backgroundColor: "#fff" }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold" style={{ color: "#5522dd" }}>
          Project Dashboard
        </h2>
        {role === "administrator" && (
          <button
            onClick={onAdminConfig}
            className="px-4 py-2 text-sm font-semibold text-white rounded cursor-pointer flex items-center gap-2"
            style={{ backgroundColor: "var(--dark-orange)" }}
          >
            <span>⚙</span>
            Admin Config
          </button>
        )}
      </div>

      {/* Row 1: Customer, Project, Manager, Status */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4 mb-3">
        <div className="flex flex-col gap-1">
          <label style={labelStyle}>Customer</label>
          <select
            value={selectedCustomerId}
            onChange={(e) => onCustomerChange(e.target.value)}
            style={inputStyle}
          >
            {customers.map((c) => (
              <option key={c.iidc} value={c.iidc}>{c.customerName}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label style={labelStyle}>Project</label>
          <select
            value={selectedProjectId}
            onChange={(e) => onProjectChange(e.target.value)}
            style={inputStyle}
          >
            {filteredProjects.map((p) => (
              <option key={p.iidp} value={p.iidp}>{p.projectName}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label style={labelStyle}>Manager</label>
          <input
            type="text"
            value={manager}
            onChange={(e) => onManagerChange(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label style={labelStyle}>Status</label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            style={inputStyle}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: Start Date, End Date */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4 mb-3">
        <div className="flex flex-col gap-1">
          <label style={labelStyle}>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label style={labelStyle}>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Row 3: Project Description */}
      <div className="flex flex-col gap-1">
        <label style={labelStyle}>Project Description</label>
        <textarea
          value={projectDescription}
          onChange={(e) => onProjectDescriptionChange(e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: "vertical", maxWidth: 800 }}
        />
      </div>
    </section>
  );
}
