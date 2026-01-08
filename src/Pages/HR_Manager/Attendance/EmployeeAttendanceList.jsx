import { useSocketEvent } from "../../../Context/SocketProvider";
import { EVENT_ATTENDANCE_UPDATE } from "../../../api/socketEvents";

// ... existing imports

function EmployeeAttendanceList() {
  const { axiosPrivate } = useAuth();

  // ... existing state
  const [tableMode, setTableMode] = useState(TABLE_MODES.DEPARTMENT);
  const [tableConfig, setTableConfig] = useState(null);
  const [history, setHistory] = useState([]);
  const [dep, setDep] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  // Ref to hold current department ID for checking if update is relevant
  const currentDeptIdRef = useRef(null);

  // Function to reload data (Departments or Employees based on mode)
  const reloadData = async () => {
    if (tableMode === TABLE_MODES.EMPLOYEE && currentDeptIdRef.current) {
      // Refresh Employee List
      try {
        // Silent refresh (no loading spinner for better UX on live update)
        const res = await axiosPrivate.get(`/attendances/departments/${currentDeptIdRef.current}/`);
        const employeeData = res.data || [];

        setTableConfig(prev => ({
          ...prev,
          Data: employeeData
        }));
      } catch (err) { console.error("Live update failed", err); }
    } else if (tableMode === TABLE_MODES.DEPARTMENT) {
      // Refresh Department List
      try {
        const res = await axiosPrivate.get("/attendances/departments/");
        const departmentData = Array.isArray(res.data) ? res.data : [];

        setTableConfig(prev => ({
          ...prev,
          Data: departmentData
        }));
      } catch (err) { console.error("Live update failed", err); }
    }
  };

  // Real-time Listener
  useSocketEvent(EVENT_ATTENDANCE_UPDATE, (payload) => {
    console.log("⚡ Attendance Update:", payload);
    // Optimization: Could check payload.department_id vs currentDeptIdRef
    reloadData();
  });

  // ... rest of loadDepartments

  const onRowClick = async (rowIndex, index, data) => {
    // ... existing logic
    const id = data[index]?.department_id;
    currentDeptIdRef.current = id; // Track current ID
    // ... rest of logic
  };

  const handleBack = () => {
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setTableConfig(prev);
    setTableMode(TABLE_MODES.DEPARTMENT);
    currentDeptIdRef.current = null; // Reset
  };

  // ... rest of component


  export default EmployeeAttendanceList;