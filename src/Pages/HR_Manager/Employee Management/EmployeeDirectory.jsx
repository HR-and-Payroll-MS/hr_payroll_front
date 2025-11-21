import React, { useState } from 'react';
import Table from '../../../Components/Table';
import Header from '../../../Components/Header';
import { SearchStatus } from '../../../Components/Level2Hearder';
import { useNavigate } from "react-router-dom";

function EmployeeDirectory() {
  const navigate = useNavigate();

  const onRowClick = (id) => {
    navigate(`/hr_dashboard/users/${id}`, { state: id });
  };

  const [filters, setFilters] = useState({});

const updateFilters = (value) => {
  setFilters(prev => {
    const updated = { ...prev, ...value };
    // console.log("Filters updated:", updated);
    return updated;
  });
};


  const queryString = new URLSearchParams(
    Object.entries(filters).filter(([k,v]) => v && v !== "")
  ).toString();

  const dynamicURL = queryString ? `/employees/?${queryString}` : "/employees/";
  // console.log("Dynamic URL:", dynamicURL);

  const structure = [3,1,1,1,1,1];
  const ke2 = [
    ["general_photo", "general_full_name", "email"],
    ["general_phonenumber"],
    ["job_joindate"],
    ["general_gender"],
    ["status"],
    ["marital_status"],
  ];
  const title = ['USER','PHONE','JOIN DATE','GENDER','STATUS','MARITAL STATUS'];

  return (
    <div className='p-4 flex flex-col h-full'>
      <Header Title="Employee Directory" subTitle="view all employees and click to view detail"/>
      <SearchStatus onFiltersChange={updateFilters} />

      <Table
        Data={[]}
        URL={dynamicURL}
        title={title}
        Structure={structure}
        ke={ke2}
        onRowClick={onRowClick}
        totPage={10}
      />
    </div>
  );
}

export default EmployeeDirectory;
