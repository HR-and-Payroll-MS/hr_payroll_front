import React, { useState } from 'react';
import Table from '../../../Components/Table';
import Header from '../../../Components/Header';
import { SearchStatus } from '../../../Components/Level2Hearder';
import { useNavigate } from "react-router-dom";

function EmployeeDirectory() {
  const navigate = useNavigate();

  const onRowClick = (id) => {
    navigate(`/hr_dashboard/users/${id}`);
  };

const [filters, setFilters] = useState({});
    
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
      <Header Title="Employee Directory" subTitle="view all employees and click to view detail"/>
      <SearchStatus onFiltersChange={updateFilter} />
        {console.log(dynamicURL)}
      <Table Data={[]} URL={dynamicURL} title={title} Structure={structure} ke={ke2} onRowClick={onRowClick} />
    </div>
  );
}

export default EmployeeDirectory;
