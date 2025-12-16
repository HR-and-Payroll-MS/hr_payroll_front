import React from 'react'
import Icon from '../../../../Components/Icon';
import useAuth from '../../../../Context/AuthContext';
function EmployeeProfile({employeeData,role}) {  
  const {axiosPrivate} = useAuth();
  const handleDelete = async () => {
    
  try {
    const response = await axiosPrivate.delete(`/employees/${employeeData?.id}/`);
    
    console.log("Delete response:", response.data);
    console.log("Deleted user:", employeeData?.general?.fullname);

  } catch (error) {
    console.error("Failed to delete employee:", error);
  }
};

  return ( <div id="left" className="flex bg-white w-full flex-col h-full p-2 px-4 gap-4">
        {/* TOP SECTION */}
        <div id="top" className="items-center justify-center flex flex-col flex-2">
          <div className="flex items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
            <img
              className="w-20 h-20 object-fill rounded-full"
                src={
    employeeData?.general?.photo
      ? `http://172.16.27.124:3000${employeeData.general.photo}`
      : "/pic/download (48).png"
  }
              alt="Profile"
            />
          </div>
    
          <div className="flex flex-col items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
            <p className="font-bold text-gray-700 text-lg">
              {employeeData?.general?.fullname || "Not Provided"}
            </p>
            <p className="font-semibold text-gray-500 text-xs">
              {employeeData?.job?.jobtitle || "Not Provided"}
            </p>
          </div>
    
          <div className="flex items-center gap-1.5 justify-center p-2 rounded hover:bg-slate-50">
            <p className={`font-bold px-6 py-1 text-xs rounded-md ${
              employeeData?.payroll?.employeestatus === "Active"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}>
              {employeeData?.payroll?.employeestatus || "unknown"}
            </p>
          </div>
        </div>
    
        <hr className="text-gray-200" />
    
        {/* MIDDLE SECTION */}
        <div id="middle" className="items-start flex flex-col flex-1">
          <div className="flex items-start gap-2 justify-start p-2 rounded hover:bg-slate-50">
            <Icon className='w-4 h-4' name={'Mail'}/>
            <p className="font-semibold text-xs text-gray-700 rounded-md">
              {employeeData?.general?.emailaddress || "No email"}
            </p>
          </div>
    
          <div className="flex items-start gap-2 justify-start p-2 rounded hover:bg-slate-50">
            <Icon className='w-4 h-4' name={'Phone'}/>
            <p className="font-semibold text-xs text-gray-700 rounded-md">
              {employeeData?.general?.phonenumber || "0972334145"}
            </p>
          </div>
    
          <div className="flex items-start gap-2 justify-start p-2 rounded hover:bg-slate-50">
            <Icon className='w-4 h-4' name={'MapPinned'}/>
            <p className="font-semibold text-xs text-gray-700 rounded-md">
              {employeeData?.general?.timezone || "GMT+07:00"}
            </p>
          </div>
        </div>
    
        <hr className="text-gray-200" />
    
        {/* BOTTOM SECTION */}
        <div id="bottom" className="flex-2">
          <div className="flex items-center gap-1.5 justify-between p-2 rounded hover:bg-slate-50">
            <div>
              <p className="font-semibold text-gray-400 text-xs">Department</p>
              <p className="font-bold text-gray-700 text-xs">
                {employeeData?.job?.department || "Designer"}
              </p>
            </div>
          </div>
    
          <div className="flex items-center gap-1.5 justify-between p-2 rounded hover:bg-slate-50">
            <div>
              <p className="font-semibold text-gray-400 text-xs">Office</p>
              <p className="font-bold text-gray-700 text-xs">
                {employeeData?.job?.office || "Unpixel Studio"}
              </p>
            </div>
          </div>
    
          <div className="flex items-center gap-1.5 justify-between p-2 rounded hover:bg-slate-50">
            <div>
              <p className="font-semibold text-gray-400 text-xs">Line Manager</p>
              <div className="flex items-center gap-1.5 my-1.5">
               <img
              className="w-6 h-6 object-fill rounded-full"
              src={employeeData?.general?.profilepicture || "\\pic\\download (48).png"}
              alt="Profile"
            />
                <p className="font-bold text-gray-700 text-xs">
                  {employeeData?.job?.linemanager || "Skylar Catzoni"}
                </p>
              </div>
            </div>
          </div>
    
         {role==="HR"&& <div  onClick={handleDelete} className="flex bg-red-800 hover:cursor-pointer text-white items-center justify-center gap-1.5 px-5 py-3 rounded-md">
            <p className="text-xs font-semibold">Delete User</p>
            <Icon className='w-4 h-4' name={'Trash'}/>
          </div>}
        </div>
      </div>
    );
    
  
}

export default EmployeeProfile