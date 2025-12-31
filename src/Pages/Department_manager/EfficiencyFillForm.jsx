import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormRenderer from '../../Examples/FormRenderer';
import useAuth from '../../Context/AuthContext';
import AlertModal from '../../Components/Modals/AlertModal';
import useData from '../../Context/DataContextProvider';

const BASE_URL = import.meta.env.VITE_BASE_URL;
function EfficiencyFillForm() {
    // const { id: employeeId } = useParams();  
    const employeeId = useParams().id;
    const {employees} = useData();
    const { axiosPrivate } = useAuth();
    
    const [formData, setFormData] = useState(null);
    const [employeeData, setEmployeeData] = useState(null); // New state for employee info
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (!employeeId) return;

      const loadEmployee = async () => {
        if (!employees.data) {
          await employees.get();
        }

        const emp = employees.getById(employeeId);
        
        setEmployeeData(emp);
      };
      
      loadEmployee();
    }, [employeeId, employees]);




    const [alertConfig, setAlertConfig] = useState({
      isOpen: false,
      type: "error",
      message: ""
    });

    const showAlert = (type, msg) => {
      setAlertConfig({ isOpen: true, type, message: msg });
    };
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          
          // Fetch both the Form Schema and Employee Details concurrently
          const [schemaRes, employeeRes] = await Promise.all([
            axiosPrivate.get(`/efficiency/templates/schema/`)
          ]);

          setFormData({
            title: schemaRes.data.title || "Employee Efficiency Format",
            performanceMetrics: schemaRes.data.performanceMetrics || [],
            feedbackSections: schemaRes.data.feedbackSections || [],
          });

          // setEmployeeData(employeeRes.data);
          
        } catch (err) {
          console.error(err);
          showAlert("error", `Failed to load data: ${err.response?.data?.message || err.message}`);
          
          // Fallback for form data so the page doesn't crash
          setFormData({
            title: "Employee Efficiency Format",
            performanceMetrics: [],
            feedbackSections: [],
          });
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [axiosPrivate, employeeId]);

  if (loading) return <div className="p-6 text-center">Loading Profile...</div>;

  return (
    <div className='p-6 h-full flex flex-col space-y-4'>
     { console.log(employeeData?.photo)}
        {/* --- Employee Profile Header --- */}
        {employeeData && (
            <div className="flex items-center space-x-4 p-4  dark:shadow-slate-900 dark:shadow-md dark:inset-shadow-xs dark:inset-shadow-slate-600 bg-white dark:bg-slate-900 rounded-lg shadow-sm ">
                {employeeData?.photo?(
              <img className="h-18 min-w-18    rounded-full" 
              src={`${BASE_URL}${employeeData?.photo}`}
  
              alt=""
            />):(
            
            <div className='rounded-full h-18 min-w-18  bg-slate-800 shadow dark:shadow-slate-900 dark:shadow-md dark:inset-shadow-xs dark:inset-shadow-slate-600 border border-slate-400 dark:bg-slate-600 text-slate-100 text-center items-center flex justify-center' >
                  {(employeeData?.fullname ?? "")
                    .split(" ")
                    .map(n => n[0])
                    .slice(0, 2)
                    .join("") || "NA"}
                            
              </div>)}
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{employeeData?.fullname}</h2>
                    <p className="text-gray-500">{employeeData?.department || 'Position Not Set'}</p>
                    <div className="flex space-x-4 mt-1 text-sm">
                        <span className="text-gray-400">ID: <b className="text-gray-600">{employeeId}</b></span>
                        <span className="text-gray-400">Dept: <b className="text-gray-600">{employeeData?.department}</b></span>
                    </div>
                </div>
            </div>
        )}

        {/* --- Evaluation Form --- */}
        <div className=" flex-1 overflow-x-auto hover-bar rounded-lg">
            <FormRenderer savedForm={formData} employeeId={employeeId} />
        </div>

        <AlertModal 
            isOpen={alertConfig.isOpen} 
            close={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))} 
            type={alertConfig.type} 
            message={alertConfig.message} 
        />
    </div>
  )
}

export default EfficiencyFillForm;