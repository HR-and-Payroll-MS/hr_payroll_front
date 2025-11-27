import React, { useState, useEffect } from "react";
import Modal from "../Components/Modal";
import FieldRenderer from "./FieldRenderer";

/**
 * Props:
 * - isOpen
 * - onClose()
 * - onSave(newItem)
 * - title (string)
 * - fields: { fieldKey: fieldDef }  (fieldDef: see FieldRenderer)
 * - initial?: object (optional initial values)
 */
const AddNewItemModal = ({ isOpen, onClose, onSave, title = "Add item", fields = {}, initial = {} }) => {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (isOpen) {
      // initialize form with initial or empty keys
      const init = {};
      Object.keys(fields).forEach((k) => {
        init[k] = initial[k] ?? (fields[k].default ?? "");
      });
      setForm(init);
    }
  }, [isOpen, fields, initial]);

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} location="center" className="px-4">
      {/* backdrop already provided by your Modal - we render the centered card with animation */}
      <div
        className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg transform transition-all duration-200 ease-out"
        style={{
          // slide down + fade: animate from translateY(-10px) -> 0 and opacity via Tailwind (we'll use classes)
        }}
      >
        {/* animated container */}
        <div className="p-4 animate-modal-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <div>
              <button
                onClick={onClose}
                className="px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(fields).map(([key, def]) => (
                <div key={key}>
                  <FieldRenderer
                    fieldKey={key}
                    fieldDef={def}
                    value={form[key]}
                    onChange={(v) => setField(key, v)}
                  />
                </div>
              ))}
            </div>
        <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* local styles for the animation - you can move to your global CSS */}
      <style>{`
        @keyframes modalIn {
          from { transform: translateY(-10px) scale(.99); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-modal-in { animation: modalIn 180ms ease-out both; }
      `}</style>
    </Modal>
  );
};

export default AddNewItemModal;