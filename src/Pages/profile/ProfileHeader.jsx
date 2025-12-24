// import ProfilePicture from "./ProfilePicture";
// import Icon from '../../Components/Icon'

//  export default function ProfileHeader({ employeeData, setEmployeeData }) {
//   const general = employeeData?.general || {};
//   const job = employeeData?.job || {};

//   return (
//     <div className="w-full bg-white rounded-md  pb-4  overflow-hidden">
//       <div className="h-34 bg-cover bg-center" style={{ backgroundImage:"url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')" }} />
//       <div className="relative px-6 -mt-14">
//         <ProfilePicture 
//            currentPhoto={general?.profilepicture} 
//            setEmployeeData={setEmployeeData} 
//          />
//         <div className="flex justify-between">
//           <div className="mt-4">
//             <h2 className="text-xl font-semibold">Kumaran Selvam</h2>
//             <p className="text-gray-600 text-sm">UI/UX Designer • India</p>
//           </div>
          
//             <div id="middle" className="items-center justify-baseline flex flex-col flex-1">
//               <div className="flex items-start gap-2 justify-start p-1 rounded hover:bg-slate-50">
//                 <Icon className='w-4 h-4' name={'Mail'}/>
//                 <p className="font-semibold text-xs text-gray-700 rounded-md">
//                   {employeeData?.general?.emailaddress || "No email"}
//                 </p>
//               </div>
        
//               <div className="flex items-start gap-2 justify-start p-1 rounded hover:bg-slate-50">
//                 <Icon className='w-4 h-4' name={'Phone'}/>
//                 <p className="font-semibold text-xs text-gray-700 rounded-md">
//                   {employeeData?.general?.phonenumber || "0972334145"}
//                 </p>
//               </div>
        
//               <div className="flex items-start gap-2 justify-start p-1 rounded hover:bg-slate-50">
//                 <Icon className='w-4 h-4' name={'MapPinned'}/>
//                 <p className="font-semibold text-xs text-gray-700 rounded-md">
//                   {employeeData?.general?.timezone || "GMT+07:00"}
//                 </p>
//               </div>
//             </div>
//             <div id="bottom" className="flex-2 flex items-end justify-between">
//               <div className="flex items-center gap-1.5 justify-between p-2 rounded hover:bg-slate-50">
//                 <div>
//                   <p className="font-semibold text-gray-400 text-xs">Department</p>
//                   <p className="font-bold text-gray-700 text-xs">
//                     {employeeData?.job?.department || "Designer"}
//                   </p>
//                 </div>
//               </div>
        
//               <div className="flex items-center gap-1.5 justify-between p-2 rounded hover:bg-slate-50">
//                 <div>
//                   <p className="font-semibold text-gray-400 text-xs">Office</p>
//                   <p className="font-bold text-gray-700 text-xs">
//                     {employeeData?.job?.office || "Unpixel Studio"}
//                   </p>
//                 </div>
//               </div>
        
//               <div className="flex items-center gap-1.5 justify-between p-2 rounded hover:bg-slate-50">
//                 <div>
//                   <p className="font-semibold text-gray-400 text-xs">Line Manager</p>
//                   <div className="flex items-center gap-1.5 my-1.5">
//                   <img
//                   className="w-6 h-6 object-fill rounded-full"
//                   src={employeeData?.general?.profilepicture || "\\pic\\download (48).png"}
//                   alt="Profile"
//                 />
//                     <p className="font-bold text-gray-700 text-xs">
//                       {employeeData?.job?.linemanager || "Skylar Catzoni"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//         </div>
//       </div>
//     </div>

//   );
// }


import ProfilePicture from "./ProfilePicture";
import Icon from '../../Components/Icon'

export default function ProfileHeader({ employeeData, setEmployeeData }) {
  const general = employeeData?.general || {};
  const job = employeeData?.job || {};
  console.log(employeeData,"employeeData",general,"general", job,"job")
  return (
    <div className="w-full bg-white rounded-md pb-4 overflow-hidden">
      <div 
        className="h-34 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')" }} 
      />
      <div className="relative px-6 -mt-14">
        {/* Pass the dynamic photo and state setter */}
        <ProfilePicture 
          currentPhoto={general?.photo} 
          userName={general?.fullname}
          setEmployeeData={setEmployeeData} 
        />
        
        <div className="flex justify-between">
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{general?.fullname || "Kumaran Selvam"}</h2>
            <p className="text-gray-600 text-sm">{job?.jobtitle || "UI/UX Designer"} • {general?.country || "India"}</p>
          </div>
          
          <div id="middle" className="items-center justify-baseline flex flex-col flex-1">
            <div className="flex items-start gap-2 justify-start p-1 rounded hover:bg-slate-50">
              <Icon className='w-4 h-4' name={'Mail'}/>
              <p className="font-semibold text-xs text-gray-700">
                {general?.emailaddress || "No email"}
              </p>
            </div>
            <div className="flex items-start gap-2 justify-start p-1 rounded hover:bg-slate-50">
              <Icon className='w-4 h-4' name={'Phone'}/>
              <p className="font-semibold text-xs text-gray-700">
                {general?.phonenumber || "0972334145"}
              </p>
            </div>
            <div className="flex items-start gap-2 justify-start p-1 rounded hover:bg-slate-50">
              <Icon className='w-4 h-4' name={'MapPinned'}/>
              <p className="font-semibold text-xs text-gray-700">
                {general?.timezone || "GMT+07:00"}
              </p>
            </div>
          </div>

          <div id="bottom" className="flex-2 flex items-end justify-between">
            <div className="flex items-center gap-1.5 p-2 rounded hover:bg-slate-50">
              <div>
                <p className="font-semibold text-gray-400 text-xs uppercase tracking-wider">Department</p>
                <p className="font-bold text-gray-700 text-xs">
                  {job?.department || "Designer"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded hover:bg-slate-50">
              <div>
                <p className="font-semibold text-gray-400 text-xs uppercase tracking-wider">Office</p>
                <p className="font-bold text-gray-700 text-xs">
                  {job?.office || "Unpixel Studio"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded hover:bg-slate-50">
              <div>
                <p className="font-semibold text-gray-400 text-xs uppercase tracking-wider">Line Manager</p>
                <div className="flex items-center gap-1.5 my-1.5">
                  <img
                    className="w-6 h-6 object-cover rounded-full"
                    src={job?.manager_photo || "/pic/download (48).png"}
                    alt="Manager"
                  />
                  <p className="font-bold text-gray-700 text-xs">
                    {job?.linemanager || "Skylar Catzoni"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}