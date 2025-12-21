import React, { useCallback, useState } from 'react';
import Table from '../../../Components/Table';
import Header from '../../../Components/Header';
import { SearchStatus } from '../../../Components/Level2Hearder';
import { useNavigate } from "react-router-dom";
import ExportTable from '../../../Components/ExportTable';

function EmployeeDirectory() {
  const navigate = useNavigate();
  const handleSearchClick=(e)=>{
    
    navigate(`/hr_dashboard/users/${e}`);
  }
  const onRowClick = (id) => {
    navigate(`/hr_dashboard/users/${id}`);
  };

const [filters, setFilters] = useState({});

const [ExportData,setExportData]= useState(null)
    
    function updateFilter(obj){
        const key = Object.keys(obj)[0];
        const value = obj[key]
        setFilters(prev =>{
            if(value == null || value === "" ){
                const {[key]:removed, ...rest}=prev;
                return rest;
            }
            return {...prev,[key]:value};
        });
    }
    
    const handleExportData = useCallback((newData) => {
  setExportData(newData);
}, []);
      const queryString = new URLSearchParams(
        Object.entries(filters).filter(([k,v]) => v && v !== "")
      ).toString();
    
      const dynamicURL = queryString ? `/employees/?${queryString}` : "/employees/";
      console.log("Dynamic URL:", dynamicURL);

  const structure = [3,1,1,1,1,1];
  const ke2 = [
    ["general_photo", "general_fullname", "general_emailaddress"],
    ["general_phonenumber"],
    ["job_joindate"],
    ["general_gender"],
    ["payroll_employeestatus"],
    ["general_maritalstatus"],
  ];
  const title = ['USER','PHONE','JOIN DATE','GENDER','STATUS','MARITAL STATUS'];

  return (
    <div className='p-4 flex flex-col h-full'>
      <Header Title="Employee Directory" subTitle="view all employees and click to view detail">
        {ExportData&&<ExportTable data={ExportData} title={title} bodyStructure={structure} keys={ke2}/>}
      </Header>
      <SearchStatus employeeClicked={handleSearchClick} onFiltersChange={updateFilter} />
        {console.log(dynamicURL)}
      <Table Data={[]} setExportData={handleExportData} URL={dynamicURL} title={title} Structure={structure} ke={ke2} onRowClick={onRowClick} />
    </div>
  );
}

export default EmployeeDirectory;









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