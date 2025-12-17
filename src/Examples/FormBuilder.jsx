// FormBuilder.jsx
import React, { useState } from "react";
import FormFieldEditor from "./FormField";
import InputField from "../Components/InputField";
import FormRenderer from "./FormRenderer";
import FileDrawer from "../Components/FileDrawer";

export default function FormBuilder({ formData, setFormData }) {
  const addField = (section) => {
    const newField = {
      id: Date.now().toString(),
      name: "New Field",
      type: section === "performanceMetrics" ? "number" : "text",
      weight: section === "performanceMetrics" ? 10 : 0,
      options: [],
    };

    setFormData({
      ...formData,
      [section]: [...formData[section], newField],
    });
  };

  const updateField = (section, id, updates) => {
    setFormData({
      ...formData,
      [section]: formData[section].map((f) =>
        f.id === id ? { ...f, ...updates } : f
      ),
    });
  };

  const deleteField = (section, id) => {
    setFormData({
      ...formData,
      [section]: formData[section].filter((f) => f.id !== id),
    });
  };

  const addOption = (section, fieldId) => {
    const newOpt = { id: Date.now().toString(), label: "Option", point: 0 };
    setFormData({
      ...formData,
      [section]: formData[section].map((f) =>
        f.id === fieldId ? { ...f, options: [...f.options, newOpt] } : f
      ),
    });
  };

  const updateOption = (section, fieldId, optId, updates) => {
    setFormData({
      ...formData,
      [section]: formData[section].map((f) => {
        if (f.id !== fieldId) return f;
        return {
          ...f,
          options: f.options.map((o) =>
            o.id === optId ? { ...o, ...updates } : o
          ),
        };
      }),
    });
  };

  const deleteOption = (section, fieldId, optId) => {
    setFormData({
      ...formData,
      [section]: formData[section].map((f) => {
        if (f.id !== fieldId) return f;
        return {
          ...f,
          options: f.options.filter((o) => o.id !== optId),
        };
      }),
    });
  };

  /* ===== FILE DRAWER STATE (LIKE TableStructures) ===== */
  const [isFormPreviewOpen, setFormPreviewOpen] = useState(false);
  const [isJsonPreviewOpen, setJsonPreviewOpen] = useState(false);

  const openFormPreview = () => {
    setJsonPreviewOpen(false);
    setFormPreviewOpen(true);
  };

  const openJsonPreview = () => {
    setFormPreviewOpen(false);
    setJsonPreviewOpen(true);
  };

  return (
    <div className="mx-auto p-6 border-amber-100 rounded-2xl border-2">
      {/* Title */}
      <div className="mb-8 bg-slate-50 p-4 rounded shadow">
        <label className="block text-lg font-medium mb-2">Form Title</label>
        <InputField
        searchMode="input"
          border="inset-shadow-2xs border border-slate-200"
          maxWidth="bg-white"
          suggestion={false}
          placeholder="Employee Efficiency Format"
          icon={false}
          onSelect={(e) => setFormData({ ...formData, title: e })}
        />
      </div>

      {/* Performance Metrics */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-slate-700">
          Performance Metrics (Scorable)
        </h2>

        {formData.performanceMetrics.map((field) => (
          <FormFieldEditor
            key={field.id}
            field={field}
            section="performanceMetrics"
            onUpdate={(id, updates) =>
              updateField("performanceMetrics", id, updates)
            }
            onDelete={() =>
              deleteField("performanceMetrics", field.id)
            }
            onAddOption={() =>
              addOption("performanceMetrics", field.id)
            }
            onUpdateOption={(optId, updates) =>
              updateOption("performanceMetrics", field.id, optId, updates)
            }
            onDeleteOption={(optId) =>
              deleteOption("performanceMetrics", field.id, optId)
            }
          />
        ))}

        <button
          onClick={() => addField("performanceMetrics")}
          className="mt-4 text-sm px-4 py-3 shadow bg-slate-600 text-white rounded hover:bg-slate-700"
        >
          + Add Scorable Field
        </button>
      </section>

      {/* Feedback */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-slate-700">
          Feedback Sections (Non-scorable)
        </h2>

        {formData.feedbackSections.map((field) => (
          <FormFieldEditor
            key={field.id}
            field={field}
            section="feedbackSections"
            onUpdate={(id, updates) =>
              updateField("feedbackSections", id, updates)
            }
            onDelete={() =>
              deleteField("feedbackSections", field.id)
            }
            onAddOption={() =>
              addOption("feedbackSections", field.id)
            }
            onUpdateOption={(optId, updates) =>
              updateOption("feedbackSections", field.id, optId, updates)
            }
            onDeleteOption={(optId) =>
              deleteOption("feedbackSections", field.id, optId)
            }
          />
        ))}

        <button
          onClick={() => addField("feedbackSections")}
          className="mt-4 text-sm px-4 py-3 shadow bg-slate-600 text-white rounded hover:bg-slate-700"
        >
          + Add Feedback Field
        </button>
      </section>

      {/* ===== FILE DRAWERS (TableStructures STYLE) ===== */}
      {isFormPreviewOpen && (
        <FileDrawer
          transparency="bg-slate-900/30 dark:bg-slate-900/20"
          width="w-1/2"
          isModalOpen={isFormPreviewOpen}
          closeModal={setFormPreviewOpen}
        >
          <div className="mt-10 p-6 bg-gray-200 rounded-lg">
            <h3 className="text-xl font-bold pb-4 mb-3">
              Live FORM Preview
            </h3>
            <FormRenderer savedForm={formData} />
          </div>
        </FileDrawer>
      )}

      {isJsonPreviewOpen && (
        <FileDrawer
          transparency="bg-slate-900/30 dark:bg-slate-900/20"
          width="w-1/2"
          isModalOpen={isJsonPreviewOpen}
          closeModal={setJsonPreviewOpen}
        >
          <div className="mt-10 p-6 bg-gray-200 shadow rounded-lg">
            <h3 className="text-xl font-bold mb-3">
              Live JSON Preview
            </h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </FileDrawer>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={openFormPreview}
          className="mt-4 text-sm px-4 py-3 shadow bg-slate-600 text-white rounded hover:bg-slate-700"
        >
          Live Preview
        </button>

        <button
          onClick={openJsonPreview}
          className="mt-4 text-sm px-4 py-3 shadow bg-slate-600 text-white rounded hover:bg-slate-700"
        >
          Live JSON
        </button>
      </div>
    </div>
  );
}
