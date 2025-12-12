import { useState } from "react";
import Dropdown from "./Dropdown";
import Icon from "./Icon";

export default function SearchDate({ onSubmit,isSingle=false }) {
  const [mode, setMode] = useState("single");
  const [singleDate, setSingleDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [clicked,setClicked] = useState(false)

  // Runs ONLY when user clicks submit button
  const handleSubmit = () => {
    if(singleDate||(startDate&&endDate))setClicked(true)
    if(isSingle){
      onSubmit && onSubmit(singleDate);
    }
    else{
    if (mode === "single" && singleDate) {
      onSubmit && onSubmit({ type: "single", date: singleDate });
    }

    if (mode === "range" && startDate && endDate) {
        console.log("here")
      onSubmit && onSubmit({
        type: "range",
        from: startDate,
        to: endDate
      });
    }}
  };

  const choice=["single","range"]

  return (
    <div className="px-3 border text-xs border-slate-200 rounded-xl w-fit flex gap-3 bg-slate-50 shadow items-center">

      {/* Mode Switch */}
     {!isSingle&& <Dropdown placeholder="Choose Type" border="" options={choice} onChange={setMode} />}

      {/* Single Date */}
      {mode === "single" && (
        <input
          type="date"
          value={singleDate}
          onChange={(e) => setSingleDate(e.target.value)}
          className="border px-2 py-1 rounded-md"
        />
      )}

      {/* Range */}
      {mode === "range" && (
        <div className="flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded-md"
          />
          <span className="font-semibold">→</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded-md"
          />
        </div>
      )}

      {/* The Button that triggers output */}
      <button
        onClick={handleSubmit}
        className="bg-slate-800 text-xs cursor-pointer text-white px-3 py-1 rounded-md hover:bg-slate-950"
      >
        {clicked? <Icon name={"Check"} className="w-4 h-4"/>:"Apply"}
       
      </button>
    </div>
  );
}
