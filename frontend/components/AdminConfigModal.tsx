"use client";

import { useState, useEffect } from "react";
import type { Customer, Project } from "@/lib/types";
import { nextIidc, nextIidp } from "@/lib/idgen";

interface AdminConfigModalProps {
  customers: Customer[];
  projects: Project[];
  customerCounter: number;
  projectCounter: number;
  onClose: () => void;
  onSave: (data: {
    customers: Customer[];
    projects: Project[];
    customerCounter: number;
    projectCounter: number;
  }) => void;
}

const labelStyle: React.CSSProperties = {
  color: "var(--gray-text)",
  fontSize: "0.8rem",
  fontWeight: 600,
  display: "block",
  marginBottom: 3,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #ddd",
  borderRadius: 4,
  padding: "6px 10px",
  fontSize: "0.88rem",
  backgroundColor: "#fff",
};

const readonlyStyle: React.CSSProperties = {
  ...inputStyle,
  backgroundColor: "#f0f0f0",
  color: "var(--gray-text)",
};

export default function AdminConfigModal({
  customers: initialCustomers,
  projects: initialProjects,
  customerCounter: initialCustCounter,
  projectCounter: initialProjCounter,
  onClose,
  onSave,
}: AdminConfigModalProps) {
  const [customers, setCustomers] = useState<Customer[]>([...initialCustomers]);
  const [projects, setProjects] = useState<Project[]>([...initialProjects]);
  const [custCounter, setCustCounter] = useState(initialCustCounter);
  const [projCounter, setProjCounter] = useState(initialProjCounter);

  const [selectedIidc, setSelectedIidc] = useState<string>(
    initialCustomers[0]?.iidc ?? ""
  );
  const [selectedIidp, setSelectedIidp] = useState<string>(
    initialProjects[0]?.iidp ?? ""
  );

  const [custMode, setCustMode] = useState<"select" | "new">("select");
  const [projMode, setProjMode] = useState<"select" | "new">("select");

  const [newCustId, setNewCustId] = useState("");
  const [newCustName, setNewCustName] = useState("");

  const [editCustId, setEditCustId] = useState("");
  const [editCustName, setEditCustName] = useState("");

  const [newProjId, setNewProjId] = useState("");
  const [newProjName, setNewProjName] = useState("");

  const [editProjId, setEditProjId] = useState("");
  const [editProjName, setEditProjName] = useState("");

  const [projDescription, setProjDescription] = useState("");

  const activeCust = customers.find((c) => c.iidc === selectedIidc);
  const filteredProjects = projects.filter((p) => p.customerId === selectedIidc);
  const activeProj = projects.find((p) => p.iidp === selectedIidp);

  useEffect(() => {
    if (activeCust && custMode === "select") {
      setEditCustId(activeCust.custId);
      setEditCustName(activeCust.customerName);
    }
  }, [selectedIidc, custMode, activeCust]);

  useEffect(() => {
    if (activeProj && projMode === "select") {
      setEditProjId(activeProj.projId);
      setEditProjName(activeProj.projectName);
      setProjDescription(activeProj.description);
    }
  }, [selectedIidp, projMode, activeProj]);

  useEffect(() => {
    if (filteredProjects.length > 0 && projMode === "select") {
      const first = filteredProjects[0];
      setSelectedIidp(first.iidp);
    }
  }, [selectedIidc]);

  function handleSave() {
    let updatedCustomers = [...customers];
    let updatedProjects = [...projects];
    let newCustCounter = custCounter;
    let newProjCounter = projCounter;

    if (custMode === "new") {
      const iidc = nextIidc(newCustCounter + 1);
      newCustCounter += 1;
      const cust: Customer = {
        iidc,
        custId: newCustId.trim(),
        customerName: newCustName.trim(),
      };
      updatedCustomers = [...updatedCustomers, cust];
      setCustCounter(newCustCounter);
    } else if (activeCust) {
      updatedCustomers = updatedCustomers.map((c) =>
        c.iidc === selectedIidc
          ? { ...c, custId: editCustId.trim(), customerName: editCustName.trim() }
          : c
      );
    }

    if (projMode === "new") {
      const iidp = nextIidp(newProjCounter + 1);
      newProjCounter += 1;
      const proj: Project = {
        iidp,
        projId: newProjId.trim(),
        projectName: newProjName.trim(),
        description: projDescription.trim(),
        customerId: custMode === "new"
          ? nextIidc(newCustCounter)
          : selectedIidc,
      };
      updatedProjects = [...updatedProjects, proj];
      setProjCounter(newProjCounter);
    } else if (activeProj) {
      updatedProjects = updatedProjects.map((p) =>
        p.iidp === selectedIidp
          ? {
              ...p,
              projId: editProjId.trim(),
              projectName: editProjName.trim(),
              description: projDescription.trim(),
            }
          : p
      );
    }

    onSave({
      customers: updatedCustomers,
      projects: updatedProjects,
      customerCounter: newCustCounter,
      projectCounter: newProjCounter,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
        style={{ borderTop: "4px solid var(--accent-yellow)" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#eee" }}>
          <h2 className="font-bold text-lg" style={{ color: "var(--purple)" }}>
            Admin Config
          </h2>
          <button onClick={onClose} style={{ color: "var(--gray-text)", fontSize: "1.2rem" }}>
            x
          </button>
        </div>

        <div className="px-6 py-4 flex flex-col gap-5">
          <section>
            <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--orange)" }}>
              Customer
            </h3>
            <div className="flex gap-3 mb-3">
              <button
                onClick={() => setCustMode("select")}
                className="px-3 py-1 text-xs rounded border font-semibold"
                style={{
                  borderColor: "var(--dark-orange)",
                  backgroundColor: custMode === "select" ? "var(--dark-orange)" : "transparent",
                  color: custMode === "select" ? "#fff" : "var(--dark-orange)",
                }}
              >
                Select Existing
              </button>
              <button
                onClick={() => setCustMode("new")}
                className="px-3 py-1 text-xs rounded border font-semibold"
                style={{
                  borderColor: "var(--dark-orange)",
                  backgroundColor: custMode === "new" ? "var(--dark-orange)" : "transparent",
                  color: custMode === "new" ? "#fff" : "var(--dark-orange)",
                }}
              >
                Create New
              </button>
            </div>

            {custMode === "select" && (
              <div className="flex flex-col gap-2">
                <div>
                  <label style={labelStyle}>Select Customer</label>
                  <select
                    value={selectedIidc}
                    onChange={(e) => setSelectedIidc(e.target.value)}
                    style={inputStyle}
                  >
                    {customers.map((c) => (
                      <option key={c.iidc} value={c.iidc}>{c.customerName}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label style={labelStyle}>IIDC</label>
                    <input type="text" value={selectedIidc} readOnly style={readonlyStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Cust ID</label>
                    <input
                      type="text"
                      value={editCustId}
                      onChange={(e) => setEditCustId(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Customer Name</label>
                    <input
                      type="text"
                      value={editCustName}
                      onChange={(e) => setEditCustName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            )}

            {custMode === "new" && (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label style={labelStyle}>IIDC</label>
                  <input
                    type="text"
                    value={nextIidc(custCounter + 1)}
                    readOnly
                    style={readonlyStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Cust ID</label>
                  <input
                    type="text"
                    value={newCustId}
                    onChange={(e) => setNewCustId(e.target.value)}
                    style={inputStyle}
                    placeholder="e.g. XYZ"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Customer Name</label>
                  <input
                    type="text"
                    value={newCustName}
                    onChange={(e) => setNewCustName(e.target.value)}
                    style={inputStyle}
                    placeholder="Name"
                  />
                </div>
              </div>
            )}
          </section>

          <section>
            <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--orange)" }}>
              Project
            </h3>
            <div className="flex gap-3 mb-3">
              <button
                onClick={() => setProjMode("select")}
                className="px-3 py-1 text-xs rounded border font-semibold"
                style={{
                  borderColor: "var(--dark-orange)",
                  backgroundColor: projMode === "select" ? "var(--dark-orange)" : "transparent",
                  color: projMode === "select" ? "#fff" : "var(--dark-orange)",
                }}
              >
                Select Existing
              </button>
              <button
                onClick={() => setProjMode("new")}
                className="px-3 py-1 text-xs rounded border font-semibold"
                style={{
                  borderColor: "var(--dark-orange)",
                  backgroundColor: projMode === "new" ? "var(--dark-orange)" : "transparent",
                  color: projMode === "new" ? "#fff" : "var(--dark-orange)",
                }}
              >
                Create New
              </button>
            </div>

            {projMode === "select" && (
              <div className="flex flex-col gap-2">
                <div>
                  <label style={labelStyle}>Select Project</label>
                  <select
                    value={selectedIidp}
                    onChange={(e) => setSelectedIidp(e.target.value)}
                    style={inputStyle}
                  >
                    {filteredProjects.map((p) => (
                      <option key={p.iidp} value={p.iidp}>{p.projectName}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label style={labelStyle}>IIDP</label>
                    <input type="text" value={selectedIidp} readOnly style={readonlyStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Proj ID</label>
                    <input
                      type="text"
                      value={editProjId}
                      onChange={(e) => setEditProjId(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Project Name</label>
                    <input
                      type="text"
                      value={editProjName}
                      onChange={(e) => setEditProjName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            )}

            {projMode === "new" && (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label style={labelStyle}>IIDP</label>
                  <input
                    type="text"
                    value={nextIidp(projCounter + 1)}
                    readOnly
                    style={readonlyStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Proj ID</label>
                  <input
                    type="text"
                    value={newProjId}
                    onChange={(e) => setNewProjId(e.target.value)}
                    style={inputStyle}
                    placeholder="e.g. PRJ"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Project Name</label>
                  <input
                    type="text"
                    value={newProjName}
                    onChange={(e) => setNewProjName(e.target.value)}
                    style={inputStyle}
                    placeholder="Name"
                  />
                </div>
              </div>
            )}
          </section>

          <section>
            <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--orange)" }}>
              Project Description
            </h3>
            <textarea
              value={projDescription}
              onChange={(e) => setProjDescription(e.target.value)}
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder="Short description of the project"
            />
          </section>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: "#eee" }}>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded border"
            style={{ borderColor: "#ddd", color: "var(--gray-text)" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-semibold text-white rounded"
            style={{ backgroundColor: "var(--dark-orange)" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
