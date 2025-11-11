import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmployeeAttendance, fetchAttendanceSummary } from "../api";
import AttendanceSummaryCards from "./AttendanceSummaryCards";
import AttendanceTable from "./AttendanceTable";
import AttendanceFilterBar from "./AttendanceFilterBar";

export default function EmployeeAttendanceDetail() {
  const { id } = useParams(); // /attendance/:id
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [summary, setSummary] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [filters, setFilters] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    status: "All",
  });
  const [loading, setLoading] = useState(false);

  // Fetch employee details from your employees list or API
  useEffect(() => {
    // In a real app, you’d fetch from /api/employees/:id
    // For demo, just simulate:
    setEmployee({
      id,
      name: "John Doe",
      department: "Engineering",
      jobTitle: "Software Engineer",
      avatar: "/pic/default-avatar.png",
    });
  }, [id]);

  // Fetch summary + attendance data
  useEffect(() => {
    if (!employee?.id) return;
    (async () => {
      setLoading(true);
      try {
        const [sum, att] = await Promise.all([
          fetchAttendanceSummary(employee.id),
          fetchEmployeeAttendance({ employeeId: employee.id, ...filters }),
        ]);
        setSummary(sum);
        setAttendance(att);
      } catch (err) {
        console.error("Failed to load attendance", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [employee, filters]);

  if (!employee) return <div className="p-6">Loading employee...</div>;
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>
        <img
          src={employee.avatar}
          alt={employee.name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{employee.name}</h1>
          <p className="text-sm text-slate-500">
            {employee.jobTitle} • {employee.department}
          </p>
        </div>
      </div>

      {/* Summary cards */}
      {summary && <AttendanceSummaryCards data={summary} />}

      {/* Filters */}
      <AttendanceFilterBar filters={filters} setFilters={setFilters} />

      {/* Table */}
      <AttendanceTable data={attendance} loading={loading} />
    </div>
  );
}