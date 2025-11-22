import { formatDateForInput } from "./formatDateForInput"; 
// Render fields dynamically
export const RenderFields = ({handleInputChange,sectionKey, sectionData, editMode}) => {
  console.log("section key: ",sectionKey);
  console.log("edit Mode: ",editMode);
  console.log("section data: ",sectionData);
  console.log("handleInputChange : ",handleInputChange);

  if (!sectionData) return null;

  const isEditing = editMode[sectionKey];
  return Object.entries(sectionData).map(([key, value]) => {
    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

    return (
      <div key={key} className="w-96 flex gap-2 justify-between text-nowrap">
        <p className="flex">
          <span className="min-w-40 text-gray-400">{label} </span>
          {isEditing ? (
            <input
  type={key.toLowerCase().includes("date") ? "date" : "text"}
  value={
    key.toLowerCase().includes("date")
      ? formatDateForInput(value)
      : value || ""
  }
  onChange={(e) => handleInputChange(sectionKey, key, e.target.value) } className="w-full border outline-none border-slate-300 rounded px-3 mt-1 py-1 focus:ring-1 focus:ring-green-500" />

          ) : (
            <span className="text-gray-700 font-semibold">
              {value || (
                <span className="text-gray-400 italic">Not provided</span>
              )}
            </span>
          )}
        </p>
        <span className="text-slate-100">|</span>
      </div>
    );
  });
};
