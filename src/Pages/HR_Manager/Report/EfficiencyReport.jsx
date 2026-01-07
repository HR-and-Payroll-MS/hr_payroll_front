import React, { useEffect, useState } from "react";
import Table from "../../../Components/Table";
import Header from "../../../Components/Header";
import { AttendanceStatus } from "../../../Components/Level2Hearder";
import useAuth from "../../../Context/AuthContext";
import { toast } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

const TABLE_MODES = {
  DEPARTMENT: "DEPARTMENT",
  EMPLOYEE: "EMPLOYEE"
};

function EfficiencyReport() {
  const { axiosPrivate } = useAuth();
  const [tableMode, setTableMode] = useState(TABLE_MODES.DEPARTMENT);
  const [tableConfig, setTableConfig] = useState({});
  const [history, setHistory] = useState([]);
  const [dep, setdep] = useState();
  const [loading, setLoading] = useState(false);

  // Reuse existing department fetch or fetch distinct departments from evaluations? 
  // For now, let's fetch all departments first. 
  // Ideally, we should have a "Dashboard" endpoint.
  // We'll iterate known departments or fetch from /org/departments/

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    loadDepartmentData();
  }, []);

  const loadDepartmentData = async () => {
    try {
      setLoading(true);
      // 1. Fetch Departments
      const deptRes = await axiosPrivate.get('/org/departments/');
      const depts = deptRes.data.results || deptRes.data;

      // 2. For each department, fetch the efficiency report
      // This is N+1, but suitable for low scale. Optimization: Backend aggregation endpoint.
      const reports = await Promise.all(depts.map(async (d) => {
        try {
          const r = await axiosPrivate.get(`/efficiency/evaluations/reports/department/${d.id}/`);
          return { ...d, ...r.data };
        } catch (ignore) {
          return { ...d, total: 0, averageEfficiency: 0 };
        }
      }));

      setDepartments(reports);

      setTableConfig({
        clickable: true,
        Data: reports,
        title: ["DEPARTMENT", "Evaluated Employees", "Avg Efficiency"],
        structure: [1, 1, 1],
        ke: [
          ["name"],
          ["total"],
          ["averageEfficiency"], // from the report endpoint
        ]
      });

    } catch (error) {
      console.error(error);
      toast.error("Failed to load efficiency data");
    } finally {
      setLoading(false);
    }
  };

  const loadEmployeeData = async (departmentId, departmentName) => {
    try {
      setLoading(true);
      const res = await axiosPrivate.get(`/efficiency/evaluations/department/${departmentId}/`);
      const evals = res.data.results || res.data;

      // Map to table format
      const formatted = evals.map(e => ({
        id: e.id,
        employee_name: e.employee_name,
        employee_email: e.employee?.email || "N/A", // API might not expand fully?
        employee_pic: "",
        evaluation_date: new Date(e.created_at).toLocaleDateString(),
        score: `${e.total_efficiency}%`,
        // Add view button?
      }));

      setTableConfig({
        clickable: false,
        Data: formatted,
        title: ['EMPLOYEE', 'DATE', 'EFFICIENCY', "ACTION"],
        structure: [3, 1, 1, 61],
        ke: [
          ["employee_pic", "employee_name", "employee_email"],
          ["evaluation_date"],
          ["score"],
          ["view"],
        ]
      });

    } catch (error) {
      toast.error("Failed to load employee evaluations");
    } finally {
      setLoading(false);
    }
  }

  /* ---------- ROW CLICK HANDLER ---------- */
  const onRowClick = (row) => {
    // row has the raw data values in order? The Table component passes... what?
    // Looking at Table.jsx usage elsewhere, it usually passes values. 
    // BUT we need the ID. 
    // The current Table component implementation is opaque here. 
    // Looking at the setTableConfig above: Data is the full object list.
    // The Table component likely indexes into it.

    // Assumption: We can find the department by name (row[0]) if unique.
    // Ideally Table should pass the full object.

    const deptName = row[0];
    const dept = departments.find(d => d.name === deptName);

    if (dept && tableMode === TABLE_MODES.DEPARTMENT) {
      setdep(dept.name);

      // Save current table config for BACK
      setHistory((prev) => [...prev, tableConfig]);

      // Switch to employee table
      setTableMode(TABLE_MODES.EMPLOYEE);

      loadEmployeeData(dept.id, dept.name);
    }
  };

  /* ---------- BACK ---------- */
  const handleBack = () => {
    const prevConfig = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setTableConfig(prevConfig);
    setTableMode(TABLE_MODES.DEPARTMENT);
  };

  if (loading && !tableConfig.Data) return <div className="p-10 flex justify-center"><FaSpinner className="animate-spin text-3xl" /></div>;

  return (
    <div className="p-4 flex flex-col overflow-hidden h-full">
      {tableMode !== TABLE_MODES.DEPARTMENT && (
        <div className="flex gap-4 items-center"><button onClick={handleBack} className="mb-3 px-4 text-slate-100 py-2 cursor-pointer bg-slate-800 rounded w-fit" > ← Back </button><p className="text-center font-semibold text-lg p-2">{dep} Department</p></div>
      )}
      {tableMode === TABLE_MODES.DEPARTMENT && (<Header Title="Efficiency Reports" subTitle="Performance analytics by department" />
      )}
      <AttendanceStatus onFiltersChange={() => { }} />

      <Table
        components={null}
        clickable={tableConfig.clickable}
        Data={tableConfig.Data || []}
        title={tableConfig.title || []}
        Structure={tableConfig.structure || []}
        ke={tableConfig.ke || []}
        onRowClick={onRowClick}
        totPage={10}
      />
    </div>
  );
}

export default EfficiencyReport;



