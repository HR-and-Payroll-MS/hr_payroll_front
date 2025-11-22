import InputField from "./InputField"
import Dropdown from "./Dropdown"

export function SearchStatus({ onFiltersChange }) {

  const handleFilter = (item, key) => {
  if (!item) return;
  // console.log("Dropdown selected:", item, "key:", key);
   if(item==="Job Type"||item === "Department"||item === "Gender" || item === "Status") onFiltersChange({ [key]: "" });
   else onFiltersChange({ [key]: item.content || item });
};

  const handleEmployeeSelect = (employee) => {
    onFiltersChange({ employee: employee.name });
  };

  const viewOptions = [
    {content:'Card View',svg:"Grip"},
    {content:'Tabular View',svg:"Grid3x3"}
  ];
  const depOptions = [
    {content:'Department',svg:null,placeholder:true},
    {content:'Human Resource',svg:null},
    {content:'Finance',svg:null},
    {content:'IT',svg:null},
  ];
  const genderOptions = [
    {content:'Gender',svg:null,placeholder:true},
    {content:'Female',svg:null},
    {content:'Male',svg:null},
    {content:'What else ?',svg:null},
  ];
  const jobOptions = [
    {content:'Job Type',svg:null,placeholder:true},
    {content:'fullTime',svg:null},
    {content:'PartTime',svg:null},
  ];
  const statOptions = [
    {content:'Status',svg:null,placeholder:true},
    {content:'Active',svg:null},
    {content:'InActive',svg:null},
  ];

  return (
    <div id="left" className="flex py-2.5 gap-3 justify-between items-center">

      <InputField  placeholder={"Search Employee"} apiEndpoint="/api/employees/search" displayKey="name" onSelect={handleEmployeeSelect} />

      <div className="flex dark:text-slate-300 dark:border-slate-700 text-gray-700 items-center justify-between rounded-md">
        <Dropdown onChange={(i) => handleFilter(i,"job_type")} options={jobOptions} text="text-xs font-semibold" placeholder="Job Type" border="border gap-1 border-gray-100"/>
      </div>

      <div className="flex dark:text-slate-300 dark:border-slate-700 text-gray-700 items-center justify-between rounded-md">
        <Dropdown onChange={(i) => handleFilter(i,"gender")} options={genderOptions} text="text-xs font-semibold" placeholder="Gender" border="border gap-1 border-gray-100"/>
      </div>

      <div className="flex dark:text-slate-300 dark:border-slate-700 text-gray-700 items-center justify-between rounded-md">
        <Dropdown onChange={(i) => handleFilter(i,"department")} options={depOptions} text="text-xs font-semibold" placeholder="Department" border="border gap-1 border-gray-100"/>
      </div>

      <div className="flex dark:text-slate-300 dark:border-slate-700 text-gray-700 items-center justify-between rounded-md">
        <Dropdown onChange={(i) => handleFilter(i,"status")} options={statOptions} text="text-xs font-semibold" placeholder="All Status" border="border gap-1 border-gray-100"/>
      </div>

      <div className="flex dark:text-slate-300 dark:border-slate-700 text-gray-700 items-center justify-between rounded-md">
        <Dropdown onChange={(i) => console.log(i)} options={viewOptions} text="text-xs font-semibold" placeholder="View" showIcons Svg={"AlignEndVertical"} border="border gap-1 border-gray-100"/>
      </div>

    </div>
  );
}


export  function DateStatus() {
    const left = <div
          id="left"
          className="flex py-2.5 gap-3  justify-between items-center  "
        >
          <div
            className={`flex  dark:text-slate-300 dark:border-slate-700 flex-1  text-gray-700 border border-gray-100 items-center  justify-between gap-1.5 px-5 py-2.5 rounded-md`}
          >
            <p className="text-xs font-semibold">01 Jan 2023 - 10 Mar 2023</p>
            <img className="h-4" src="\svg\date-2-svgrepo-com.svg" alt="" />
          </div>
          <div
            className={`flex  dark:text-slate-300 dark:border-slate-700  text-gray-700 border border-gray-100 items-center  justify-between gap-1.5 px-5 py-2.5 rounded-md`}
          >
            <p className="text-xs font-semibold">All Record</p>
            <img className="h-4" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
          </div>
          <div
            className={`flex  dark:text-slate-300 dark:border-slate-700  text-gray-700 border border-gray-100 items-center  justify-between gap-1.5 px-5 py-2.5 rounded-md`}
          >
            <p className="text-xs font-semibold">All Location</p>
            <img className="h-4" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
          </div>
          <div
            className={`flex dark:text-slate-300 dark:border-slate-700  text-gray-700 border border-gray-100 items-center  justify-between gap-1.5 px-5 py-2.5 rounded-md`}
          >
            <div
              onClick={() => setOpen((set) => !set)}
              className="text-xs cursor-pointer  font-semibold"
            >
              All Status
            </div>
            <img className="h-4" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
          </div>
        </div>
  return (
    <>{left}</>
  )
}
export function AttendanceFilterBar({ filters, setFilters }) {
  const months = [
    {content:"January"},{content:"February"},{content:"March"},{content:"April"},{content:"May"},{content:"June"},
    {content:"July"},{content:"August"},{content:"September"},{content:"October"},{content:"November"},{content:"December"}
  ];
  const years = Array.from({ length: 5 }, (_, i) =>{ const yearz =new Date().getFullYear() - i;return {content:yearz}});
  const statuses = [{content:"All"}, {content:"Present"}, {content:"Absent"}, {content:"Late"}, {content:"Leave"}];
  
  return (
    <div className="flex gap-3 max-w-2/3 items-center bg-white border rounded p-3">
      <Dropdown placeholder="Month" options={months} onChange={(e) => setFilters((f) => ({ ...f, month: e }))}/>
      <Dropdown placeholder="Year" options={years} onChange={(e) => setFilters((f) => ({ ...f, year: e }))}/>
      <Dropdown placeholder="status" options={statuses}  onChange={(e) => setFilters((f) => ({ ...f, status: e}))}/>
    </div>
  )
}





















































































































      {/* <div>
        <label className="text-xs block">Month</label>
        <select
          value={filters.month}
          onChange={(e) => setFilters((f) => ({ ...f, month: +e.target.value }))}
          className="border rounded px-2 py-1 text-sm"
        >
          {months.map((m, i) => (
            <option key={m} value={i + 1}>{m}</option>
          ))}
        </select>
      </div> */}

      {/* <div>
        <label className="text-xs block">Year</label>
        <select
          value={filters.year}
          onChange={(e) => setFilters((f) => ({ ...f, year: +e.target.value }))}
          className="border rounded px-2 py-1 text-sm"
        >
          {years.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div> */}

      {/* <div>
        <label className="text-xs block">Status</label>
        <select
          value={filters.status}
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
          className="border rounded px-2 py-1 text-sm"
        >
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div> */}