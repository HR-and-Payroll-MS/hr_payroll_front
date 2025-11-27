import React, { useState } from "react";
import Dropdown from "../../../Components/Dropdown";
import DocumentList from "../../../Components/DocumentList";
import AddNewItemModal from "../../../utils/AddNewItemModal";
/**
 * Props (extended from previous):
 *  - data
 *  - sectionKey
 *  - path
 *  - handleInputChange(section, path, value)
 *  - editMode
 *  - handleAddItem(section, path, defaultValue)  <-- will still be used after modal saves
 *  - handleRemoveItem(section, path, index)
 *  - formSchemas: { [sectionKey]: { [arrayKey]: { fieldKey: fieldDef } } }
 */
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
  const [modalConfig, setModalConfig] = useState(null); // { title, fields, arrayPath }

  if (!data) return <div className="text-sm text-gray-500">No data</div>;
  const isEditing = !!editMode?.[sectionKey];

  const openAddModalFor = (arrayKey, arrayPath, fieldsSchema) => {
    setModalConfig({
      title: `Add to ${humanLabel(arrayKey)}`,
      fields: fieldsSchema,
      arrayPath,
    });
    setModalOpen(true);
  };

  const onModalSave = (newItem) => {
    if (!modalConfig) return;
    // call the provided handleAddItem(section, path, defaultValue)
    handleAddItem(sectionKey, modalConfig.arrayPath, newItem);
    setModalOpen(false);
    setModalConfig(null);
  };

  const entries = Object.entries(data);

  return (
    <div className="w-full flex flex-col gap-4">
      {entries.map(([key, value]) => {
        const fullPath = path ? `${path}.${key}` : key;

        // nested object
        if (value && typeof value === "object" && !Array.isArray(value) && !value.__type) {
          return (
            <div key={fullPath} className="w-full  rounded p-3 bg-slate-50">{/*border was deleted */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{humanLabel(key)}</h3>
              </div>
<RenderNestedPolicyFields
                data={value}
                sectionKey={sectionKey}
                path={fullPath}
                handleInputChange={handleInputChange}
                editMode={editMode}
                handleAddItem={handleAddItem}
                handleRemoveItem={handleRemoveItem}
                formSchemas={formSchemas}
              />
            </div>
          );
        }

        // array handling (with Add button that opens modal)
        if (Array.isArray(value)) {
          // determine form schema for this array if available
          const sectionSchemas = formSchemas?.[sectionKey] ?? {};
          const arraySchema = sectionSchemas?.[key]; // shape: { fieldKey: fieldDef }

          return (
            <div key={fullPath} className="w-full  rounded p-3 bg-slate-50">{/* border deleted here too */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{humanLabel(key)}</h3>
                {isEditing && (
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 bg-green-100 text-sm rounded"
                      onClick={() => {
                        if (arraySchema) {
                          // open modal with schema
                          openAddModalFor(key, fullPath, arraySchema);
                        } else {
                          // fallback: add empty (old behavior)
                          handleAddItem(sectionKey, fullPath, {});
                        }
                      }}
                    >
                      + Add
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {value.length === 0 && <div className="text-sm text-gray-500">No items</div>}
                {value.map((item, idx) => {
                  const itemPath = `${fullPath}[${idx}]`;
                  if (item && typeof item === "object") {
                    return (
                      <div key={itemPath} className="p-3 bg-white  rounded flex flex-col gap-3">{/* border deleted here too */}
                        <div className="flex justify-end gap-2">
                          {isEditing && (
                            <button
                              className="text-red-500 px-2 py-1 border rounded"
                              onClick={() => handleRemoveItem(sectionKey, fullPath, idx)}
                            >
                              Delete
                            </button>
                          )}
                        </div>

                        <RenderNestedPolicyFields
                          data={item}
                          sectionKey={sectionKey}
                          path={itemPath}
                          handleInputChange={handleInputChange}
                          editMode={editMode}
                          handleAddItem={handleAddItem}
                          handleRemoveItem={handleRemoveItem}
                          formSchemas={formSchemas}
                        />
                      </div>
                      );
                  } else {
                    // primitive list
                    return (
                      <div key={itemPath} className="flex items-center gap-3">
                        <div className="flex-1">{String(item)}</div>
                        {isEditing && (
                          <button
                            className="text-red-500 px-2 py-1 border rounded"
                            onClick={() => handleRemoveItem(sectionKey, fullPath, idx)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          );
        }

        // primitive or typed field (render same as before)
        if (value && typeof value === "object" && value.__type) {
          // typed wrappers (dropdown/documents)
          if (value.__type === "dropdown") {
            return (
              <div key={fullPath} className="w-full flex gap-3 items-center">
                <div className="min-w-[220px] text-gray-500">{humanLabel(key)}</div>
                <div className="flex-1">
                  {isEditing ? (
                    <Dropdown
                      options={value.options || []}
                      placeholder={humanLabel(key)}
                      value={value.value}
                      onChange={(v) => handleInputChange(sectionKey, fullPath + ".value", v)}
                    />
                  ) : (
                    <div className="font-semibold">{String(value.value)}</div>
                  )}
                </div>
              </div>
            );
          }

          if (value.__type === "documents") {
            return (
              <div key={fullPath} className="w-full flex gap-3 items-start">
                <div className="min-w-[220px] text-gray-500">{humanLabel(key)}</div>
                <div className="flex-1">
                  <DocumentList
                    files={value.value || []}
                    isEditing={isEditing}
                    onChange={(files) => handleInputChange(sectionKey, fullPath + ".value", files)}
                  />
                </div>
              </div>
            );
          }
        }

        // fallback primitive
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
                <div className="font-semibold">{value === "" || value === undefined ? <span className="text-gray-400 italic">Not provided</span> : String(value)}</div>
              )}
            </div>
          </div>
        );
      })}

      {/* Add New Item Modal */}
      {modalConfig && (
        <AddNewItemModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setModalConfig(null);
          }}
          onSave={onModalSave}
          title={modalConfig.title}
          fields={modalConfig.fields}
        />
      )}
    </div>
  );
};

export default RenderNestedPolicyFields;










































// import React from "react";
// import DocumentList from "../../../Components/DocumentList";
// import Dropdown from "../../../Components/Dropdown";

// const defaultRenderers = {
//   text: ({ value, onChange }) => (
//     <input
//       className="w-full border rounded px-2 py-1"
//       value={value ?? ""}
//       onChange={(e) => onChange(e.target.value)}
//     />
//   ),
//   number: ({ value, onChange }) => (
//     <input
//       type="number"
//       className="w-full border rounded px-2 py-1"
//       value={value ?? ""}
//       onChange={(e) => onChange(Number(e.target.value))}
//     />
//   ),
//   textarea: ({ value, onChange }) => (
//     <textarea
//       className="w-full border rounded px-2 py-1"
//       value={value ?? ""}
//       onChange={(e) => onChange(e.target.value)}
//     />
//   ),
//   time: ({ value, onChange }) => (
//     <input
//       type="time"
//       className="w-full border rounded px-2 py-1"
//       value={value ?? ""}
//       onChange={(e) => onChange(e.target.value)}
//     />
//   ),
//   date: ({ value, onChange }) => (
//     <input
//       type="date"
//       className="w-full border rounded px-2 py-1"
//       value={value ?? ""}
//       onChange={(e) => onChange(e.target.value)}
//     />
//   ),
//   boolean: ({ value, onChange }) => (
//     <select className="w-full border rounded px-2 py-1" value={value ? "true" : "false"} onChange={(e) => onChange(e.target.value === "true")}>
//       <option value="true">Yes</option>
//       <option value="false">No</option>
//     </select>
//   ),
// };

// const humanLabel = (key) =>
//   String(key)
//     .replace(/([A-Z])/g, " $1")
//     .replace(/_/g, " ")
//     .replace(/^./, (str) => str.toUpperCase());

// /**
//  * Props:
//  *  - data : object (section data)
//  *  - sectionKey : string (top-level section name)
//  *  - path : internal (defaults "")
//  *  - handleInputChange(section, path, value)
//  *  - editMode
//  *  - handleAddItem(section, path, defaultValue)
//  *  - handleRemoveItem(section, path, index)
//  */
// const RenderNestedPolicyFields = ({
//   data,
//   sectionKey,
//   path = "",
//   handleInputChange,
//   editMode = {},
//   handleAddItem,
//   handleRemoveItem,
// }) => {
//   if (!data) return <div className="text-sm text-gray-500">No data</div>;

//   const isEditing = !!editMode?.[sectionKey];

//   const renderPrimitive = (key, val, fullPath) => {
//     // Try to infer types for primitive: number, boolean, time, date, or enum (if val is object {value, options})
//     // For simplicity we support typed shapes:
//     const typed = typeof val === "object" && val !== null && val.__type;
//     if (typed) {
//       const type = val.__type;
//       const value = val.value;
//       const options = val.options;
//       if (type === "dropdown") {
//         return (
//           <Dropdown
//             options={options}
//             placeholder={humanLabel(key)}
//             value={value}
//             onChange={(v) => handleInputChange(sectionKey, fullPath, v)}
//           />
//         );
//       } else if (type === "documents") {
//         // value is array of files
//         return (
//           <DocumentList
//             files={value || []}
//             isEditing={isEditing}
//             onChange={(files) => handleInputChange(sectionKey, fullPath, files)}
//           />
//         );
//       } else {
//         // fallback to default renderer map
//         const Renderer = defaultRenderers[type] ?? defaultRenderers.text;
//         return <Renderer value={value} onChange={(v) => handleInputChange(sectionKey, fullPath, v)} />;
//       }
//     }

//     // if primitive (string/number)
//     const valType = typeof val;
//     const Renderer = valType === "number" ? defaultRenderers.number : defaultRenderers.text;
//     return (
//       <Renderer
//         value={val}
//         onChange={(v) => handleInputChange(sectionKey, fullPath, v)}
//       />
//     );
//   };

//   const entries = Object.entries(data);
//   return (
//     <div className="w-full flex flex-col gap-4">
//       {entries.map(([key, value]) => {
//         const fullPath = path ? `${path}.${key}` : key;

//         // object but not typed (general nested object)
//         if (value && typeof value === "object" && !Array.isArray(value) && !value.__type) {
//           return (
//             <div key={fullPath} className="w-full border rounded p-3 bg-slate-50">
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="font-semibold">{humanLabel(key)}</h3>
//                 {isEditing && (
//                   <div className="text-sm text-gray-500 italic">{/* could add section-level actions */}</div>
//                 )}
//               </div>

//               <RenderNestedPolicyFields
//                 data={value}
//                 sectionKey={sectionKey}
//                 path={fullPath}
//                 handleInputChange={handleInputChange}
//                 editMode={editMode}
//                 handleAddItem={handleAddItem}
//                 handleRemoveItem={handleRemoveItem}
//               />
//             </div>
//           );
//         }

//         // array
//         if (Array.isArray(value)) {
//           return (
//             <div key={fullPath} className="w-full border rounded p-3 bg-slate-50">
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="font-semibold">{humanLabel(key)}</h3>
//                 {isEditing && (
//                   <button
//                     className="px-2 py-1 bg-green-100 text-sm rounded"
//                     onClick={() => {
//                       // determine default value for array items - try to clone first item or use {}
//                       const defaultValue = value.length > 0 && typeof value[0] === "object" ? Object.fromEntries(Object.keys(value[0]).map(k => [k, ""])) : "";
//                       handleAddItem(sectionKey, fullPath, defaultValue);
//                     }}
//                   >
//                     + Add
//                   </button>
//                 )}
//               </div>

//               <div className="flex flex-col gap-3">
//                 {value.length === 0 && <div className="text-sm text-gray-500">No items</div>}
//                 {value.map((item, idx) => {
//                   const itemPath = `${fullPath}[${idx}]`;
//                   if (item && typeof item === "object") {
//                     return (
//                       <div key={itemPath} className="p-3 bg-white border rounded flex flex-col gap-3">
//                         <div className="flex justify-end gap-2">
//                           {isEditing && (
//                             <button
//                               className="text-red-500 px-2 py-1 border rounded"
//                               onClick={() => handleRemoveItem(sectionKey, fullPath, idx)}
//                             >
//                               Delete
//                             </button>
//                           )}
//                         </div>
//                         <RenderNestedPolicyFields
//                           data={item}
//                           sectionKey={sectionKey}
//                           path={itemPath}
//                           handleInputChange={handleInputChange}
//                           editMode={editMode}
//                           handleAddItem={handleAddItem}
//                           handleRemoveItem={handleRemoveItem}
//                         />
//                       </div>
//                     );
//                   } else {
//                     // primitive list like ["Mon", "Tue"]
//                     return (
//                       <div key={itemPath} className="flex items-center gap-3">
//                         <div className="flex-1">{item}</div>
//                         {isEditing && (
//                           <button
//                             className="text-red-500 px-2 py-1 border rounded"
//                             onClick={() => handleRemoveItem(sectionKey, fullPath, idx)}
//                           >
//                             Delete
//                           </button>
//                         )}
//                       </div>
//                     );
//                   }
//                 })}
//               </div>
//             </div>
//           );
//         }

//         // primitive value (string/number/typed wrapper)
//         return (
//           <div key={fullPath} className="w-full flex gap-3 items-center">
//             <div className="min-w-[220px] text-gray-500">{humanLabel(key)}</div>
//             <div className="flex-1">{isEditing ? renderPrimitive(key, value, fullPath) : <div className="font-semibold">{(value === "" || value === undefined) ? <span className="text-gray-400 italic">Not provided</span> : String(value)}</div>}</div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default RenderNestedPolicyFields;