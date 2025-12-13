// FormFieldEditor.jsx
import React from "react";
import InputField from "../Components/InputField";
import Dropdown from "../Components/Dropdown";
import Icon from "../Components/Icon";

export default function FormFieldEditor({
  field,
  section,
  onUpdate,
  onDelete,
  onAddOption,
  onUpdateOption,
  onDeleteOption,
}) {
  const isScorable = section === "performanceMetrics";
  const types = isScorable
    ? ["number", "dropdown"]
    : ["text", "textarea", "dropdown"];

  return (
    <div className="mb-6 p-5 bg-slate-50 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1 flex flex-col gap-2.5">
          {/* <input type="text" value={field.name} onChange={(e) => onUpdate(field.id, { name: e.target.value })} placeholder="Field label" className="text-lg font-medium border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full mb-3"/> */}
          <InputField border="inset-shadow-2xs border border-slate-200" maxWidth=" bg-white" suggestion={false} placeholder="Field label" icon={false} onSelect={(e)=>{onUpdate(field.id, { name: e})}}/>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="flex-1 flex flex-col gap-2.5">
              <label className="block text-sm font-medium">Type</label>
              {/* <select value={field.type} onChange={(e) => onUpdate(field.id, { type: e.target.value, options: e.target.value !== "dropdown" ? [] : field.options })} className="border rounded p-2 w-full" >
                {types.map((t) => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select> */}
              <Dropdown placeholder={field.type} onChange={(e) => onUpdate(field.id, { type: e, options: e!== "dropdown" ? [] : field.options })} options={types}/>
            </div>

            {isScorable && (
              <div 
          className="flex flex-col gap-2.5">
                <label className="block text-sm font-medium">Weight (Max Points)</label>
                <input  type="number" value={field.weight || 0} onChange={(e) => onUpdate(field.id, { weight: +e.target.value })} 
          className="text-slate-700 bg-white inset-shadow-2xs border border-slate-200 dark:text-slate-200 p-2 outline-none rounded w-full"  min="0" />
              </div>
            )}
          </div>

          {field.type === "dropdown" && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Dropdown Options</h4>
              {field.options.map((opt) => (
                <div key={opt.id} className="flex gap-3 mb-2 items-center">
                  {/* <input
                    type="text"
                    value={opt.label}
                    onChange={(e) => onUpdateOption(opt.id, { label: e.target.value })}
                    placeholder="w-64 border p-2 rounded"
                  /> */}
                      <InputField 
                      border="inset-shadow-2xs border border-slate-200"
                      maxWidth="max-w-3/5 bg-white"
                      suggestion={false} placeholder="Insert Option Label" 
                      icon={false} 
                      onSelect={(e) => onUpdateOption(opt.id, { label: e })}/>
                  {isScorable && (
        <input
                      type="number"
                      value={opt.point || 0}
                      onChange={(e) => onUpdateOption(opt.id, { point: +e.target.value })}
                      className="w-24 border p-1.5 bg-white border-slate-200 inset-shadow-2xs rounded "
                      placeholder="Points"
                    />
                  )}
                  <button
                    onClick={() => onDeleteOption(opt.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                onClick={onAddOption}
                className="text-sm text-blue-600 hover:underline"
              >
                + Add Option
              </button>
            </div>
          )}
        </div>

        <button onClick={onDelete} className="ml-6 bg-red-600 hover:bg-red-700 text-red-100 px-4 py-2 rounded">
         <Icon name="Trash" className="w-4 h-4"/>
        </button>
      </div>
    </div>
  );
}