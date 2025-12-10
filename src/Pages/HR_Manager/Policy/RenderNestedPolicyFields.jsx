import React, { useState, useMemo, useCallback } from "react";
import Dropdown from "../../../Components/Dropdown";
import DocumentList from "../../../Components/DocumentList";
import AddNewItemModal from "../../../utils/AddNewItemModal";
import { policyFormSchemas } from "./PolicyFormSchemas";

// Convert camelCase/snake_case → Human label
const humanLabel = (key) =>
  String(key)
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (str) => str.toUpperCase());

const RenderNestedPolicyFields = ({
  data,
  sectionKey,
  path = "",
  handleInputChange,
  editMode = {},
  handleAddItem,
  handleRemoveItem,
  formSchemas = {},
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);

  if (!data) return <div className="text-sm text-gray-500">No data</div>;
  const isEditing = !!editMode?.[sectionKey];

  const entries = useMemo(() => Object.entries(data), [data]);

  /** ---------------------------------------------
   * Modal opening for arrays (supports deeply nested schemas)
   * ----------------------------------------------*/
  const openAddModalFor = useCallback((arrayKey, arrayPath) => {
    // retrieve schema from formSchemas dynamically using the path
    const pathSegments = arrayPath.split(".");
    let schema = formSchemas?.[sectionKey];
    pathSegments.forEach((seg) => {
      if (schema?.[seg]) schema = schema[seg];
    });

    // fallback: if schema is not found, just use an empty object
    const stableFields = schema && typeof schema === "object" && !Array.isArray(schema) ? { ...schema } : {};

    setModalConfig({
      title: `Add to ${humanLabel(arrayKey)}`,
      fields: stableFields,
      arrayPath,
    });
    setModalOpen(true);
  }, [formSchemas, sectionKey]);

  const onModalSave = useCallback((newItem) => {
    if (!modalConfig) return;
    handleAddItem(sectionKey, modalConfig.arrayPath, newItem);
    setModalOpen(false);
    setModalConfig(null);
  }, [modalConfig, handleAddItem, sectionKey]);

  return (
    <div className="w-full flex flex-col gap-4">
      {entries.map(([key, value]) => {
        const fullPath = path ? `${path}.${key}` : key;

        // NESTED OBJECT
        if (value && typeof value === "object" && !Array.isArray(value) && !value.__type) {
          return (
            <div key={fullPath} className="w-full rounded p-3 bg-slate-50">
              <h3 className="font-semibold mb-2">{humanLabel(key)}</h3>
              <MemoizedRenderFields
                data={value}
                sectionKey={sectionKey}
                path={fullPath}
                handleInputChange={handleInputChange}
                editMode={editMode}
                formSchemas={formSchemas}
                handleAddItem={handleAddItem}
                handleRemoveItem={handleRemoveItem}
              />
            </div>
          );
        }

        // ARRAY FIELD
        if (Array.isArray(value)) {
          return (
            <div key={fullPath} className="w-full rounded p-3 bg-slate-50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{humanLabel(key)}</h3>
                {isEditing && (
                  <button
                    onClick={() => openAddModalFor(key, fullPath)}
                    className="px-2 py-1 bg-green-100 text-sm rounded"
                  >
                    + Add
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {value.length === 0 && <div className="text-sm text-gray-500">No items</div>}

                {value.map((item, idx) => {
                  const itemPath = `${fullPath}[${idx}]`;

                  if (typeof item === "object") {
                    return (
                      <div key={itemPath} className="p-3 bg-white rounded flex flex-col gap-3">
                        {isEditing && (
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleRemoveItem(sectionKey, fullPath, idx)}
                              className="text-red-500 px-2 py-1 border rounded"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                        <MemoizedRenderFields
                          data={item}
                          sectionKey={sectionKey}
                          path={itemPath}
                          handleInputChange={handleInputChange}
                          editMode={editMode}
                          formSchemas={formSchemas}
                          handleAddItem={handleAddItem}
                          handleRemoveItem={handleRemoveItem}
                        />
                      </div>
                    );
                  }

                  return (
                    <div key={itemPath} className="flex items-center gap-3">
                      <div className="flex-1">{String(item)}</div>
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveItem(sectionKey, fullPath, idx)}
                          className="text-red-500 px-2 py-1 border rounded"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        // TYPED FIELD: DROPDOWN
        if (value?.__type === "dropdown") {
          return (
            <div key={fullPath} className="w-full flex gap-3 items-center">
              <div className="min-w-[220px] text-gray-500">{humanLabel(key)}</div>
              <div className="flex-1">
                {isEditing ? (
                  <Dropdown
                    options={value.options}
                    value={value.value}
                    placeholder={humanLabel(key)}
                    onChange={(v) => handleInputChange(sectionKey, `${fullPath}.value`, v)}
                  />
                ) : (
                  <div className="font-semibold">{String(value.value)}</div>
                )}
              </div>
            </div>
          );
        }

        // TYPED FIELD: DOCUMENTS
        if (value?.__type === "documents") {
          return (
            <div key={fullPath} className="w-full flex gap-3 items-start">
              <div className="min-w-[220px] text-gray-500">{humanLabel(key)}</div>
              <div className="flex-1">
                <DocumentList
                  files={value.value || []}
                  isEditing={isEditing}
                  onChange={(files) => handleInputChange(sectionKey, `${fullPath}.value`, files)}
                />
              </div>
            </div>
          );
        }

        // PRIMITIVE FIELD
        return (
          <div key={fullPath} className="w-full flex gap-3 items-center">
            <div className="min-w-[220px] text-gray-500">{humanLabel(key)}</div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  value={value ?? ""}
                  onChange={(e) => handleInputChange(sectionKey, fullPath, e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                <div className="font-semibold">
                  {value ? String(value) : <span className="text-gray-400 italic">Not provided</span>}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Add New Item Modal */}
      {modalConfig && (
        <AddNewItemModal
          isOpen={modalOpen}
          onClose={() => { setModalOpen(false); setModalConfig(null); }}
          onSave={onModalSave}
          title={modalConfig.title}
          fields={modalConfig.fields}
        />
      )}
    </div>
  );
};

const MemoizedRenderFields = React.memo(RenderNestedPolicyFields);
export default MemoizedRenderFields;
