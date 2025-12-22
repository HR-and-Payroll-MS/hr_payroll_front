import React, { useCallback, useState, useMemo } from 'react';
import Table from '../../../Components/Table';
import Header from '../../../Components/Header';
import { SearchStatus } from '../../../Components/Level2Hearder';
import { useNavigate } from "react-router-dom";
import ExportTable from '../../../Components/ExportTable';
import { useTable } from '../../../Context/useTable';

function EmployeeDirectory() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [ExportData, setExportData] = useState(null);

  // 1. Fetch data using the hook (Name based, no dynamic URL here to prevent loops)
  const { data, isLoading, refresh } = useTable("users");

  const onRowClick = (id) => navigate(`/hr_dashboard/users/${id}`);
  const handleSearchClick = (e) => navigate(`/hr_dashboard/users/${e}`);

  const updateFilter = (obj) => {
    const key = Object.keys(obj)[0];
    const value = obj[key];
    setFilters(prev => {
      if (value == null || value === "") {
        const { [key]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: value };
    });
  };

  const handleExportData = useCallback((newData) => {
    setExportData(newData);
  }, []);

  // 2. Client-Side Filtering Logic (The "Best" Way)
  // We use useMemo so this only recalculates when data, filters, or searchTerm changes
  const filteredData = useMemo(() => {
    // Ensure we are working with an array (handles your .results structure)
    const sourceData = data?.results || data || [];
    
    return sourceData.filter(item => {
      // A. Search Term Filter (checks fullname)
      const matchesSearch = item?.general?.fullname
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      // B. Dropdown/Status Filters
      // This checks if the item's properties match all active filters
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        // This handles nested paths (e.g., if key is "gender", check item.general.gender)
        // Adjust this logic if your SearchStatus sends keys like "payroll_employeestatus"
        return item.general?.[key] === value || item.payroll?.[key] === value || item.job?.[key] === value;
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, filters, searchTerm]);

  const structure = [3, 1, 1, 1, 1, 1];
  const title = ['USER', 'PHONE', 'JOIN DATE', 'GENDER', 'STATUS', 'MARITAL STATUS'];
  const ke2 = [
    ["general_photo", "general_fullname", "general_emailaddress"],
    ["general_phonenumber"],
    ["job_joindate"],
    ["general_gender"],
    ["payroll_employeestatus"],
    ["general_maritalstatus"],
  ];

  if (isLoading && (!data || data.length === 0)) return <p className="p-6">Loading Users...</p>;

  return (
    <div className='p-4 flex flex-col h-full'>
      <Header Title="Employee Directory" subTitle="View all employees and click to view detail">
        <div className="flex gap-2">
          <input
            className="border p-2 rounded-lg text-sm w-64"
            placeholder="Search by name..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={refresh} 
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            🔄 Refresh
          </button>
        </div>
        
        {ExportData && (
          <ExportTable 
            data={ExportData} 
            title={title} 
            bodyStructure={structure} 
            keys={ke2} 
          />
        )}
      </Header>

      <SearchStatus 
        employeeClicked={handleSearchClick} 
        onFiltersChange={updateFilter} 
      />

      <div className="flex-1 mt-4">
        <Table 
          Data={filteredData} 
          setExportData={handleExportData} 
          title={title} 
          Structure={structure} 
          ke={ke2} 
          onRowClick={onRowClick} 
        />
      </div>
    </div>
  );
}

export default EmployeeDirectory;














// import React, { useCallback, useState } from 'react';
// import Table from '../../../Components/Table';
// import Header from '../../../Components/Header';
// import { SearchStatus } from '../../../Components/Level2Hearder';
// import { useNavigate } from "react-router-dom";
// import ExportTable from '../../../Components/ExportTable';

// function EmployeeDirectory() {
//   const navigate = useNavigate();
//   const handleSearchClick=(e)=>navigate(`/hr_dashboard/users/${e}`);
//   const onRowClick = (id) => navigate(`/hr_dashboard/users/${id}`);
//   const [filters, setFilters] = useState({});
//   const [ExportData,setExportData]= useState(null)
//   function updateFilter(obj){
//       const key = Object.keys(obj)[0];
//       const value = obj[key]
//       setFilters(prev =>{
//           if(value == null || value === "" ){
//               const {[key]:removed, ...rest}=prev;
//               return rest;
//           }
//           return {...prev,[key]:value};
//       });
//   }
//   const handleExportData = useCallback((newData) => {
//   setExportData(newData);
//   }, []);
//   const queryString = new URLSearchParams(
//     Object.entries(filters).filter(([k,v]) => v && v !== "")
//   ).toString();
//   const dynamicURL = queryString ? `/employees/?${queryString}` : "/employees/";
//   console.log("Dynamic URL:", dynamicURL);
//   const structure = [3,1,1,1,1,1];
//   const ke2 = [
//     ["general_photo", "general_fullname", "general_emailaddress"],
//     ["general_phonenumber"],
//     ["job_joindate"],
//     ["general_gender"],
//     ["payroll_employeestatus"],
//     ["general_maritalstatus"],
//   ];
//   const title = ['USER','PHONE','JOIN DATE','GENDER','STATUS','MARITAL STATUS'];
//   return (
//     <div className='p-4 flex flex-col h-full'>
//       <Header Title="Employee Directory" subTitle="view all employees and click to view detail">
//         {ExportData&&<ExportTable data={ExportData} title={title} bodyStructure={structure} keys={ke2}/>}
//       </Header>
//       <SearchStatus employeeClicked={handleSearchClick} onFiltersChange={updateFilter} />
//         {console.log(dynamicURL)}
//       <Table Data={[]} setExportData={handleExportData} URL={dynamicURL} title={title} Structure={structure} ke={ke2} onRowClick={onRowClick} />
//     </div>
//   );
// }

// export default EmployeeDirectory;
























































































// // EmployeeDirectory.jsx
// import React, { useCallback, useMemo, useState } from 'react';
// import Table from '../../../Components/Table';
// import Header from '../../../Components/Header';
// import { SearchStatus } from '../../../Components/Level2Hearder';
// import { useNavigate } from "react-router-dom";
// import ExportTable from '../../../Components/ExportTable';

// function EmployeeDirectory() {
//   const navigate = useNavigate();

//   const onRowClick = useCallback((id) => {
//     navigate(`/hr_dashboard/users/${id}`);
//   }, [navigate]);

//   const [filters, setFilters] = useState({});
//   const [ExportData, setExportData] = useState(null);

//   const updateFilter = useCallback((obj) => {
//     const key = Object.keys(obj)[0];
//     const value = obj[key];

//     setFilters(prev => {
//       if (value == null || value === "") {
//         const { [key]: removed, ...rest } = prev;
//         return rest;
//       }
//       return { ...prev, [key]: value };
//     });
//   }, []);

//   // Memoize query string and dynamic URL to prevent unnecessary re-creation
//   const queryString = useMemo(() => {
//     const params = new URLSearchParams(
//       Object.entries(filters).filter(([k, v]) => v && v !== "")
//     );
//     return params.toString();
//   }, [filters]);

//   const dynamicURL = useMemo(() => {
//     return queryString ? `/employees/?${queryString}` : "/employees/";
//   }, [queryString]);

//   // Memoize static configuration to prevent new references on every render
//   const title = useMemo(() => [
//     'USER', 'PHONE', 'JOIN DATE', 'GENDER', 'STATUS', 'MARITAL STATUS'
//   ], []);

//   const structure = useMemo(() => [3, 1, 1, 1, 1, 1], []);

//   const ke2 = useMemo(() => [
//     ["general_photo", "general_fullname", "general_emailaddress"],
//     ["general_phonenumber"],
//     ["job_joindate"],
//     ["general_gender"],
//     ["payroll_employeestatus"],
//     ["general_maritalstatus"],
//   ], []);

//   // Stable callback for exporting data
//   const handleExportData = useCallback((newData) => {
//     setExportData(newData);
//   }, []);

//   return (
//     <div className='p-4 flex flex-col h-full'>
//       <Header 
//         Title="Employee Directory" 
//         subTitle="view all employees and click to view detail"
//       >
//         {ExportData && ExportData.length > 0 && (
//           <ExportTable 
//             data={ExportData} 
//             title={title} 
//             bodyStructure={structure} 
//             keys={ke2}
//             fileName="Employee Directory"
//           />
//         )}
//       </Header>

//       <SearchStatus onFiltersChange={updateFilter} />

//       <Table 
//         Data={[]}
//         setExportData={handleExportData}
//         URL={dynamicURL}
//         title={title}
//         Structure={structure}
//         ke={ke2}
//         onRowClick={onRowClick}
//       />
//     </div>
//   );
// }

// export default EmployeeDirectory;