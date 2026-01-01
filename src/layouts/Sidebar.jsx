
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import { sidebarList } from '../Hooks/useSidebarContent';
import useAuth from '../Context/AuthContext';
import Icon from '../Components/Icon';
import { getLocalData  } from '../Hooks/useLocalStorage';
import { useNetwork } from '../Context/NetworkContext';

export default function Sidebar() {

  const clockinPath={Payroll:"payroll",Manager:"hr_dashboard",Employee:"employee","Line Manager":"department_manager"}

  const { auth } = useAuth();
  const {isLocal, checking} = useNetwork()
  const role = auth?.user?.role;
  const [list, setList] = useState(sidebarList[role] || []);
  const [collapsed, setCollapsed] = useState(false);
  const {theme, changeTheme } = useTheme();
  const location = useLocation();
  const toggleVisible = (label) =>
    setList((prev) =>
      prev.map((item) =>
        item.label === label
          ? { ...item, Visible: !item.Visible, path: null }
          : item
      )
    );

  const handleIconClick = (path) => {
    if (collapsed) {
      setCollapsed(false);
    } else {
      return path;
    }
  };

  const top1 = (
    <div
      id="top"
      className="flex w-full justify-between items-center m-0.5 px-2.5"
    >
      <div className="flex items-center justify-center py-2.5">
        <img
          className={`h-9 transition-all duration-300 ${
            collapsed ? 'hidden' : 'block'
          }`}
          src="/pic/Robot Thumb Up with Artificial Intelligence.png"
          alt=""
        />
        {!collapsed && (
          <p className="dark:bg-slate-800 dark:text-white font-bold text-gray-700 text-xl">
            HRDashboard
          </p>
        )}
      </div>

      <Icon
        name="PanelLeft"
        className="w-5 h-5 cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      />
    </div>
  );

  const top2 = (
    <NavLink
      to=""
      id="top2"
      className={`bg-green-600 shadow rounded-md p-2.5 px-5 flex w-full justify-between items-center ${
        collapsed ? 'justify-center' : ''
      }`}
    >
      {!collapsed && (
        <p className="font-semibold text-white text-xs">Dashboard</p>
      )}
      <Icon name="LayoutDashboard" className="w-4 h-4 text-white" />
    </NavLink>
  );

  const middle1 = (
    <div id="middle" className="flex relative  flex-col w-full flex-1 my-4 hover-bar overflow-y-auto  gap-2" >
      {list.map((lists, index) =>
        lists.path ? (
          <div key={index} className="cursor-pointer">
            <NavLink
              to={collapsed ? '#' : lists.path} // prevent navigation when collapsed
              onClick={() => handleIconClick(lists.path)}
              end
              className={({ isActive }) =>
                `flex gap-1.5 rounded-md w-full items-center px-2.5 py-1.5 
                ${
                  isActive
                    ? 'bg-slate-200 shadow dark:bg-slate-700 text-green-700'
                    : 'hover:bg-slate-50 hover:dark:bg-slate-700'
                }
                ${collapsed ? 'justify-center' : 'justify-start'}
                transition-all`
              }
            >
              <Icon
                name={lists.Icons || 'User'}
                className={`w-4 h-4 ${
                  location.pathname === lists.path
                    ? 'text-green-700'
                    : 'text-slate-400'
                }`}
              />
              {!collapsed && (
                <p className="dark:text-slate-300 flex-1 font-semibold text-gray-700 text-sm">
                  {lists.label}
                </p>
              )}
            </NavLink>
          </div>
        ) : (
          <div key={index} className="cursor-pointer">
            <div 
              onClick={() => { if (collapsed) setCollapsed(false); else toggleVisible(lists.label);}}
              className={` ${lists.Visible ?"":'hover:bg-slate-50 dark:hover:bg-slate-700'} flex w-full ${collapsed ? 'justify-center' : 'justify-between'} items-center p-2.5 transition-all`}>
              <div className="flex items-center gap-1.5 justify-center">
                <Icon name={lists.Icons} className={`w-4 h-4 ${lists.Visible ? 'text-green-700' : 'text-slate-400'}`}/>
                {!collapsed && (
                  <p className="dark:text-slate-300 font-semibold text-gray-700 text-sm">
                    {lists.label}
                  </p>
                )}
              </div>
              {!collapsed && (
                <Icon name="ChevronDown" className={`w-4 h-4 text-slate-400 transition-transform ${lists.Visible ? 'rotate-180' : ''}`}/>
              )}
            </div>

            {/* sub-items */}
            {!collapsed && (
              <div className={`${lists.Visible ? 'flex' : 'hidden'}  dark:border-slate-500 ml-4 my-1.5  border-l  relative rounded border-gray-300 flex-col gap-1.5`}>
                {(lists.label === "Attendance")?( <>{
                checking ? (
        <div className='relative px-4.5'>
          <div className='absolute left-0 top-1/2 -translate-y-1/2 w-[30%] h-2 border-b-1  border-slate-300 dark:border-slate-500 rounded-full z-0 '/>
          <div className="relative z-10 px-3 py-1 rounded bg-yellow-50 text-sm text-yellow-800">Checking network...</div>
        </div>
        ) : (isLocal) ? (<div className='relative px-4.5 '>
                    <div className='absolute left-0 top-1/2 -translate-y-1/2 w-[30%] h-2 border-b-1 border-slate-300 dark:border-slate-500 rounded-full z-0 '/>
          <NavLink to={`/${clockinPath[role]}/clock_in`} end className={({ isActive }) => `relative z-10  flex rounded-md w-full justify-between items-center px-2.5 py-1.5 ${isActive? 'bg-slate-200 shadow dark:bg-slate-700' : 'hover:bg-slate-50 bg-white dark:bg-slate-800  dark:hover:bg-slate-700'}`}>
                  <p className="dark:text-slate-300 font-semibold text-gray-700 text-sm">
                      Clock In
                    </p>
          </NavLink></div>
        ) : (<div className='relative px-4.5 '>
                    <div className='absolute left-0 top-1/2 -translate-y-1/2 w-[30%] h-2 border-b-1  border-slate-300 dark:border-slate-500 rounded-full z-0 '/>
          
          <div className="relative z-10 px-3 bg-white dark:bg-slate-800  py-1 hover:cursor-not-allowed rounded text-sm text-gray-400">Clock In</div></div>
        ) }
          <div className={`px-5 flex gap-1 items-center  text-xs font-light ${checking ? 'text-gray-400' : isLocal ? 'text-green-500' : 'text-amber-400'}`}>
          <Icon name="ShieldAlert" className={`w-3 h-3 ${checking ? 'text-gray-400' : isLocal ? 'text-green-500' : 'text-amber-400'}`}/>
           {checking ? 'checking...' : isLocal ? 'office network' : 'external network'}
           </div></>
):("")}
                {lists.sub?.map((subs,index) => (
                  <div key={index} className='relative px-4.5 '>
                    <div className='absolute left-0 top-1/2 -translate-y-1/2 w-[30%] h-2 border-b-1 border-slate-300 dark:border-slate-500 rounded-full z-0 '></div>
                    <NavLink key={subs.label} to={subs.subPath} end className={({ isActive }) => `relative z-10 flex rounded-md w-full justify-between items-center px-2.5 py-1.5 ${isActive ? 'bg-slate-200 shadow dark:bg-slate-700 ' : ' bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                      <p className="dark:text-slate-300 font-semibold text-gray-700 text-sm">
                        {subs.label}
                      </p>
                    </NavLink>
                    </div>
                ))}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );

  const bottom = (
    <div id="bottom" className="w-full flex flex-col items-center py-3.5">
      {!collapsed && (
        <>
          <div className="flex w-full justify-between items-center m-0.5">
            <div className="flex items-center gap-1.5 justify-center py-2.5">
              <Icon name="HelpCircle" className="w-5 h-5 text-slate-400" />
              <NavLink to="HelpCenter/shortcut">
              <p className="font-semibold text-gray-700 text-sm dark:text-slate-300">
                Help Center
              </p>
              </NavLink>
            </div>
            <div className="text-xs rounded-full font-semibold items-center bg-red-500 text-white px-1">
              <p className="m-0.5">8</p>
            </div>
          </div>

          <div className="flex w-full justify-between items-center m-0.5">
            <div className="flex items-center gap-1.5 justify-center py-2.5">
              <Icon name="Settings" className="w-5 h-5 text-slate-400" />
              <NavLink to="Setting/CompanyInfo">
                <p className="font-semibold text-gray-700 text-sm dark:text-slate-300">
                  Settings
                </p>
              </NavLink>
            </div>
          </div>
<div className="relative dark:bg-slate-900  inset-shadow-slate-200 inset-shadow-2xs shadow shadow-slate-100 dark:inset-shadow-xs dark:inset-shadow-black dark:shadow dark:shadow-slate-700 flex gap-0.5 rounded-4xl cursor-pointer bg-gray-50 h-11 w-full justify-around items-center m-0.5 p-1 overflow-hidden">
            
            {/* Animated Background Slider */}
            <div 
              className={`absolute top-1 bottom-1 w-[48%] rounded-4xl transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] bg-white dark:bg-slate-800 shadow-md ${theme === 'dark' ? 'left-[50%]' : 'left-[1%]'}`}
            />

            <div
              onClick={() => changeTheme('light')}
              className={`relative z-10 flex flex-1 h-full items-center gap-1.5 justify-center py-2.5 transition-colors duration-300 ${theme === 'light' ? 'text-gray-800' : 'text-slate-400'}`}
            >
              <Icon name="Sun" className="w-4 h-4" />
              <p className="font-bold text-xs uppercase tracking-widest">
                Light
              </p>
            </div>
            <div
  onClick={() => changeTheme('dark')}
  className={`relative z-10 flex flex-1 h-full items-center gap-1.5 justify-center py-2.5 transition-all duration-300 rounded-4xl
    ${theme === 'dark' 
      ? 'bg-gray-50 dark:bg-slate-700 shadow-md dark:shadow-slate-950 dark:inset-shadow-xs dark:inset-shadow-slate-600 text-white' 
      : 'text-slate-500'
    }`}
>
  <Icon name="Moon" className={`w-4 h-4 ${theme === 'dark' ? 'text-white' : 'text-slate-500'}`} />
  <p className="font-bold text-xs uppercase tracking-widest">
    Dark
  </p>
</div>
          </div>
          {/* <div
            className={`dark:bg-slate-900 inset-shadow-slate-200 inset-shadow-2xs shadow shadow-slate-100 dark:inset-shadow-xs dark:inset-shadow-black dark:shadow dark:shadow-slate-700 flex gap-0.5 rounded-4xl cursor-pointer bg-gray-50 h-fit w-full justify-around items-center m-0.5`}
          >
            <div
              onClick={() => changeTheme('light')}
              className={`flex flex-1 bg-white shadow dark:bg-slate-900 drop-shadow-2xl  rounded-4xl m-1 h-9 items-center gap-1.5 justify-center py-2.5`}
            >
              <Icon name="Sun" className="w-4 h-4" />
              <p className="dark:text-slate-100  font-semibold text-gray-700 text-sm">
                Light
              </p>
            </div>
            <div
              onClick={() => changeTheme('dark')}
              className={`flex bg-gray-50 dark:shadow-slate-950 dark:shadow-md dark:inset-shadow-xs dark:inset-shadow-slate-600 dark:bg-slate-700 flex-1 rounded-4xl m-1 h-9 items-center gap-1.5 justify-center py-2.5`}
            >
              <Icon name="Moon" className="w-4  h-4" />
              <p className="dark:text-slate-100 font-semibold text-gray-700 text-sm">
                Dark
              </p>
            </div>
          </div> */}
        </>
      )}
    </div>
  );

  return (
    <div
      className={`bg-white  dark:bg-slate-800 dark:text-white flex h-full dark:shadow-slate-600  ${
        collapsed ? 'w-16' : 'w-64 min-w-64'
      } transition-all duration-300 flex-col items-center shadow px-2.5 py-0.5`}
    >
      {top1}
      {top2}
      {middle1}
      {bottom}
    </div>
  );
}






























































// import { useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import { useTheme } from '../Context/ThemeContext';
// import { sidebarList } from '../Hooks/useSidebarContent';
// import useAuth from '../Context/AuthContext';
// import Icon from '../Components/Icon';
// import { useNetwork } from '../Context/NetworkContext';

// export default function Sidebar() {
//   const clockinPath = { Payroll: "payroll", Manager: "hr_dashboard" };

//   const { auth } = useAuth();
//   const { isLocal, checking } = useNetwork();
//   const { theme, changeTheme } = useTheme(); // Assuming 'theme' is available to track state
//   const role = auth?.user?.role;
//   const [list, setList] = useState(sidebarList[role] || []);
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();

//   const toggleVisible = (label) =>
//     setList((prev) =>
//       prev.map((item) =>
//         item.label === label
//           ? { ...item, Visible: !item.Visible, path: null }
//           : item
//       )
//     );

//   const handleIconClick = (path) => {
//     if (collapsed) {
//       setCollapsed(false);
//     } else {
//       return path;
//     }
//   };

//   const top1 = (
//     <div id="top" className="flex w-full justify-between items-center m-0.5 px-2.5">
//       <div className="flex items-center justify-center py-2.5">
//         <img
//           className={`h-9 transition-all duration-300 ${collapsed ? 'hidden' : 'block'}`}
//           src="/pic/Robot Thumb Up with Artificial Intelligence.png"
//           alt=""
//         />
//         {!collapsed && (
//           <p className="dark:text-white font-bold text-gray-700 text-xl uppercase tracking-tighter">
//             HRDashboard
//           </p>
//         )}
//       </div>

//       <Icon
//         name="PanelLeft"
//         className="w-5 h-5 cursor-pointer"
//         onClick={() => setCollapsed(!collapsed)}
//       />
//     </div>
//   );

//   const top2 = (
//     <NavLink
//       to=""
//       id="top2"
//       className={`bg-green-600 shadow rounded-md p-2.5 px-5 flex w-full justify-between items-center ${collapsed ? 'justify-center' : ''}`}
//     >
//       {!collapsed && (
//         <p className="font-semibold text-white text-xs uppercase tracking-widest">Dashboard</p>
//       )}
//       <Icon name="LayoutDashboard" className="w-4 h-4 text-white" />
//     </NavLink>
//   );

//   const middle1 = (
//     <div id="middle" className="flex relative flex-col w-full flex-1 my-4 hover-bar overflow-y-auto gap-2">
//       {list.map((lists, index) =>
//         lists.path ? (
//           <div key={index} className="cursor-pointer">
//             <NavLink
//               to={collapsed ? '#' : lists.path}
//               onClick={() => handleIconClick(lists.path)}
//               end
//               className={({ isActive }) =>
//                 `flex gap-1.5 rounded-md w-full items-center px-2.5 py-1.5 
//                 ${isActive
//                   ? 'bg-slate-200 shadow dark:bg-slate-700 text-green-700'
//                   : 'hover:bg-slate-50 hover:dark:bg-slate-700'
//                 }
//                 ${collapsed ? 'justify-center' : 'justify-start'}
//                 transition-all`
//               }
//             >
//               <Icon
//                 name={lists.Icons || 'User'}
//                 className={`w-5 h-5 ${location.pathname === lists.path ? 'text-green-700' : 'text-slate-400'}`}
//               />
//               {!collapsed && (
//                 <p className="dark:text-slate-300 flex-1 font-semibold text-gray-700 text-sm uppercase tracking-wider">
//                   {lists.label}
//                 </p>
//               )}
//             </NavLink>
//           </div>
//         ) : (
//           <div key={index} className="cursor-pointer">
//             <div 
//               onClick={() => { if (collapsed) setCollapsed(false); else toggleVisible(lists.label);}}
//               className={` ${lists.Visible ? "" : 'hover:bg-slate-50 dark:hover:bg-slate-700'} flex w-full ${collapsed ? 'justify-center' : 'justify-between'} items-center p-2.5 transition-all`}>
//               <div className="flex items-center gap-1.5 justify-center">
//                 <Icon name={lists.Icons} className={`w-4 h-4 ${lists.Visible ? 'text-green-700' : 'text-slate-400'}`}/>
//                 {!collapsed && (
//                   <p className="dark:text-slate-300 font-semibold text-gray-700 text-sm uppercase tracking-wider">
//                     {lists.label}
//                   </p>
//                 )}
//               </div>
//               {!collapsed && (
//                 <Icon name="ChevronDown" className={`w-4 h-4 text-slate-400 transition-transform ${lists.Visible ? 'rotate-180' : ''}`}/>
//               )}
//             </div>

//             {!collapsed && (
//               <div className={`${lists.Visible ? 'flex' : 'hidden'} dark:border-slate-500 ml-4 my-1.5 border-l relative rounded border-gray-300 flex-col gap-1.5`}>
//                 {lists.label === "Attendance" && (
//                   <>
//                     {checking ? (
//                       <div className='relative px-4.5'>
//                         <div className='absolute left-0 top-1/2 -translate-y-1/2 w-[30%] h-2 border-b-1 border-slate-300 dark:border-slate-500 rounded-full z-0 '/>
//                         <div className="relative z-10 px-3 py-1 rounded bg-yellow-50 text-[10px] font-bold text-yellow-800 uppercase">Checking network...</div>
//                       </div>
//                     ) : isLocal ? (
//                       <div className='relative px-4.5 '>
//                         <div className='absolute left-0 top-1/2 -translate-y-1/2 w-[30%] h-2 border-b-1 border-slate-300 dark:border-slate-500 rounded-full z-0 '/>
//                         <NavLink to={`/${clockinPath[role]}/clock_in`} end className={({ isActive }) => `relative z-10 flex rounded-md w-full justify-between items-center px-2.5 py-1.5 ${isActive ? 'bg-slate-200 shadow dark:bg-slate-700' : 'hover:bg-slate-50 bg-white dark:bg-slate-800 dark:hover:bg-slate-700'}`}>
//                           <p className="dark:text-slate-300 font-semibold text-gray-700 text-sm uppercase tracking-tighter">Clock In</p>
//                         </NavLink>
//                       </div>
//                     ) : (
//                       <div className='relative px-4.5 '>
//                         <div className='absolute left-0 top-1/2 -translate-y-1/2 w-[30%] h-2 border-b-1 border-slate-300 dark:border-slate-500 rounded-full z-0 '/>
//                         <div className="relative z-10 px-3 bg-white dark:bg-slate-800 py-1 hover:cursor-not-allowed rounded text-sm text-gray-400 uppercase">Clock In</div>
//                       </div>
//                     )}
//                     <div className={`px-5 flex gap-1 items-center text-[10px] uppercase font-bold ${checking ? 'text-gray-400' : isLocal ? 'text-green-500' : 'text-amber-400'}`}>
//                       <Icon name="ShieldAlert" className={`w-3 h-3`}/>
//                       {checking ? 'checking...' : isLocal ? 'office network' : 'external network'}
//                     </div>
//                   </>
//                 )}
//                 {lists.sub?.map((subs, index) => (
//                   <div key={index} className='relative px-4.5 '>
//                     <div className='absolute left-0 top-1/2 -translate-y-1/2 w-[30%] h-2 border-b-1 border-slate-300 dark:border-slate-500 rounded-full z-0 '></div>
//                     <NavLink key={subs.label} to={subs.subPath} end className={({ isActive }) => `relative z-10 flex rounded-md w-full justify-between items-center px-2.5 py-1.5 ${isActive ? 'bg-slate-200 shadow dark:bg-slate-700 ' : ' bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
//                       <p className="dark:text-slate-300 font-semibold text-gray-700 text-sm uppercase tracking-tighter">
//                         {subs.label}
//                       </p>
//                     </NavLink>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )
//       )}
//     </div>
//   );

//   const bottom = (
//     <div id="bottom" className="w-full flex flex-col items-center py-3.5">
//       {!collapsed && (
//         <>
//           <div className="flex w-full justify-between items-center m-0.5">
//             <div className="flex items-center gap-1.5 justify-center py-2.5">
//               <Icon name="HelpCircle" className="w-5 h-5 text-slate-400" />
//               <NavLink to="HelpCenter">
//                 <p className="font-semibold text-gray-700 text-sm dark:text-slate-300 uppercase tracking-wider">
//                   Help Center
//                 </p>
//               </NavLink>
//             </div>
//             <div className="text-xs rounded-full font-semibold items-center bg-red-500 text-white px-1">
//               <p className="m-0.5">8</p>
//             </div>
//           </div>

//           <div className="flex w-full justify-between items-center m-0.5">
//             <div className="flex items-center gap-1.5 justify-center py-2.5">
//               <Icon name="Settings" className="w-5 h-5 text-slate-400" />
//               <NavLink to="Setting">
//                 <p className="font-semibold text-gray-700 text-sm dark:text-slate-300 uppercase tracking-wider">
//                   Settings
//                 </p>
//               </NavLink>
//             </div>
//           </div>

//           {/* THEME TOGGLE WITH ANIMATION */}
//           <div className="relative dark:bg-slate-900 inset-shadow-slate-200 inset-shadow-2xs shadow shadow-slate-100 dark:inset-shadow-xs dark:inset-shadow-black dark:shadow dark:shadow-slate-700 flex gap-0.5 rounded-4xl cursor-pointer bg-gray-50 h-11 w-full justify-around items-center m-0.5 p-1 overflow-hidden">
            
//             {/* Animated Background Slider */}
//             <div 
//               className={`absolute top-1 bottom-1 w-[48%] rounded-4xl transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] bg-white dark:bg-slate-800 shadow-md ${theme === 'dark' ? 'left-[50%]' : 'left-[1%]'}`}
//             />

//             <div
//               onClick={() => changeTheme('light')}
//               className={`relative z-10 flex flex-1 h-full items-center gap-1.5 justify-center py-2.5 transition-colors duration-300 ${theme === 'light' ? 'text-gray-800' : 'text-slate-400'}`}
//             >
//               <Icon name="Sun" className="w-4 h-4" />
//               <p className="font-bold text-xs uppercase tracking-widest">
//                 Light
//               </p>
//             </div>
//             <div
//               onClick={() => changeTheme('dark')}
//               className={`relative z-10 flex flex-1 h-full items-center gap-1.5 justify-center py-2.5 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-500'}`}
//             >
//               <Icon name="Moon" className="w-4 h-4" />
//               <p className="font-bold text-xs uppercase tracking-widest">
//                 Dark
//               </p>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );

//   return (
//     <div
//       className={`bg-white dark:bg-slate-800 dark:text-white flex h-full ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 flex-col items-center shadow px-2.5 py-0.5`}
//     >
//       {top1}
//       {top2}
//       {middle1}
//       {bottom}
//     </div>
//   );
// }
















































// import { useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import { useTheme } from '../Context/ThemeContext';
// import { sidebarList } from '../Hooks/useSidebarContent';
// import useAuth from '../Context/AuthContext';
// import Icon from '../Components/Icon';
// import { useNetwork } from '../Context/NetworkContext';

// export default function Sidebar() {
//   const { auth } = useAuth();
//   const { isLocal, checking } = useNetwork();
//   const role = auth?.user?.role;
//   const [list, setList] = useState(sidebarList[role] || []);
//   const [collapsed, setCollapsed] = useState(false);
//   const { theme, changeTheme } = useTheme(); // Assuming theme is returned from context
//   const location = useLocation();

//   const toggleVisible = (label) =>
//     setList((prev) =>
//       prev.map((item) =>
//         item.label === label ? { ...item, Visible: !item.Visible, path: null } : item
//       )
//     );

//   // --- STYLING CONSTANTS FOR 3D DEPTH ---
//   const sunkenPanel = "bg-gray-100 shadow-[inset_4px_4px_8px_#cbd5e1,inset_-4px_-4px_8px_#ffffff] dark:bg-slate-900 dark:shadow-[inset_5px_5px_10px_#000000,inset_-1px_-1px_5px_#475569]";
//   const raisedCard = "bg-gray-50 shadow-[4px_4px_8px_#cbd5e1,-4px_-4px_8px_#ffffff] dark:bg-slate-700 dark:shadow-[6px_6px_12px_#000000] border border-white/20 dark:border-slate-600";
//   const activeSunken = "bg-gray-200 shadow-[inset_2px_2px_5px_#94a3b8,inset_-2px_-2px_5px_#ffffff] dark:bg-slate-800 dark:shadow-[inset_4px_4px_8px_#000000] text-emerald-600 dark:text-emerald-400";

//   return (
//     <div className={`transition-all duration-500 ease-in-out flex h-full flex-col items-center px-3 py-4 ${collapsed ? 'w-20' : 'w-64'} 
//       ${raisedCard} border-r`}>
      
//       {/* TOP SECTION */}
//       <div className="flex w-full justify-between items-center mb-6 px-2">
//         {!collapsed && <p className="font-black text-slate-800 dark:text-white text-xl tracking-tighter uppercase">HR Dashboard</p>}
//         <div onClick={() => setCollapsed(!collapsed)} className={`p-2 cursor-pointer rounded-xl transition-all active:scale-90 ${sunkenPanel}`}>
//           <Icon name="PanelLeft" className="w-5 h-5 text-emerald-500" />
//         </div>
//       </div>

//       {/* DASHBOARD BUTTON */}
//       <NavLink to="" className={`flex w-full items-center p-3 mb-6 rounded-2xl transition-all group ${sunkenPanel} ${collapsed ? 'justify-center' : 'justify-between'}`}>
//          {!collapsed && <p className="font-black text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300">Main Menu</p>}
//          <Icon name="LayoutDashboard" className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
//       </NavLink>

//       {/* NAVIGATION LIST */}
//       <div className="flex flex-col w-full flex-1 overflow-y-auto scrollbar-hidden gap-4">
//         {list.map((item, index) => (
//           <div key={index} className="w-full">
//             <NavLink
//               to={collapsed ? '#' : item.path}
//               onClick={() => collapsed ? setCollapsed(false) : !item.path && toggleVisible(item.label)}
//               className={({ isActive }) => `
//                 flex items-center gap-4 p-3 rounded-2xl transition-all duration-300
//                 ${item.path && isActive ? activeSunken : `hover:translate-x-1 ${collapsed ? 'justify-center' : ''}`}
//               `}
//             >
//               <div className={`p-2 rounded-xl transition-all ${item.path && location.pathname === item.path ? 'text-emerald-500' : 'text-slate-400'}`}>
//                 <Icon name={item.Icons || 'User'} className="w-5 h-5" />
//               </div>
//               {!collapsed && <p className="font-black text-[10px] uppercase tracking-[0.2em]">{item.label}</p>}
//               {!collapsed && !item.path && <Icon name="ChevronDown" className={`w-3 h-3 transition-transform ${item.Visible ? 'rotate-180' : ''}`} />}
//             </NavLink>

//             {/* SUB-ITEMS WITH 3D TRACK */}
//             {!collapsed && item.Visible && item.sub && (
//               <div className={`ml-8 mt-2 pl-4 border-l-2 border-emerald-500/30 flex flex-col gap-2`}>
//                 {item.sub.map((sub, i) => (
//                   <NavLink key={i} to={sub.subPath} className={({isActive}) => `text-[9px] font-bold uppercase tracking-widest py-1 transition-all ${isActive ? 'text-emerald-500 scale-105' : 'text-slate-500 hover:text-emerald-400'}`}>
//                     {sub.label}
//                   </NavLink>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* BOTTOM SECTION & 3D ANIMATED TOGGLE */}
//       <div className="w-full pt-4 mt-auto border-t border-slate-200 dark:border-slate-700 flex flex-col gap-4">
//         {!collapsed && (
//           <div className="flex flex-col gap-1">
//              <div className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-emerald-500 transition-colors">
//                 <Icon name="Settings" className="w-4 h-4" />
//                 <p className="font-black text-[9px] uppercase tracking-widest">Settings</p>
//              </div>
//           </div>
//         )}

//         {/* --- THE NEW 3D TOGGLE SWITCH --- */}
//         <div className={`relative flex items-center p-1 h-12 rounded-2xl ${sunkenPanel} ${collapsed ? 'w-12 justify-center' : 'w-full'}`}>
//           {/* Animated Slider background */}
//           {!collapsed && (
//             <div 
//               className={`absolute top-1 bottom-1 w-[48%] rounded-xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
//               ${theme === 'dark' ? 'left-[50%] bg-slate-800 shadow-[2px_2px_5px_#000000]' : 'left-1 bg-white shadow-[2px_2px_5px_#cbd5e1]'} 
//               border border-white/10 flex items-center justify-center`}
//             >
//               <div className="w-1 h-4 bg-emerald-500/50 rounded-full mx-0.5" />
//               <div className="w-1 h-4 bg-emerald-500/50 rounded-full mx-0.5" />
//             </div>
//           )}

//           {/* Toggle Buttons */}
//           <button 
//             onClick={() => changeTheme('light')} 
//             className={`relative z-10 flex-1 flex items-center justify-center gap-2 ${collapsed && theme !== 'light' ? 'hidden' : ''}`}
//           >
//             <Icon name="Sun" className={`w-4 h-4 ${theme === 'light' ? 'text-emerald-500 scale-110' : 'text-slate-500'} transition-all`} />
//             {!collapsed && <span className={`text-[9px] font-black uppercase ${theme === 'light' ? 'text-slate-800' : 'text-slate-500'}`}>Light</span>}
//           </button>

//           <button 
//             onClick={() => changeTheme('dark')} 
//             className={`relative z-10 flex-1 flex items-center justify-center gap-2 ${collapsed && theme !== 'dark' ? 'hidden' : ''}`}
//           >
//             <Icon name="Moon" className={`w-4 h-4 ${theme === 'dark' ? 'text-emerald-400 scale-110' : 'text-slate-400'} transition-all`} />
//             {!collapsed && <span className={`text-[9px] font-black uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-500'}`}>Dark</span>}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
























// import { useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import { useTheme } from '../Context/ThemeContext';
// import { sidebarList } from '../Hooks/useSidebarContent';
// import useAuth from '../Context/AuthContext';
// import Icon from '../Components/Icon';
// import { useNetwork } from '../Context/NetworkContext';

// export default function Sidebar() {
//   const clockinPath = { Payroll: "payroll", Manager: "hr_dashboard" };

//   const { auth } = useAuth();
//   const { isLocal, checking } = useNetwork();
//   const role = auth?.user?.role;
//   const [list, setList] = useState(sidebarList[role] || []);
//   const [collapsed, setCollapsed] = useState(false);
//   const { changeTheme } = useTheme();
//   const location = useLocation();

//   const toggleVisible = (label) =>
//     setList((prev) =>
//       prev.map((item) =>
//         item.label === label
//           ? { ...item, Visible: !item.Visible, path: null }
//           : item
//       )
//     );

//   const handleIconClick = (path) => {
//     if (collapsed) {
//       setCollapsed(false);
//     } else {
//       return path;
//     }
//   };

//   const top1 = (
//     <div id="top" className="flex w-full justify-between items-center m-0.5 px-2.5">
//       <div className="flex items-center justify-center py-2.5">
//         <img
//           className={`h-9 transition-all duration-300 ${collapsed ? 'hidden' : 'block'}`}
//           src="/pic/Robot Thumb Up with Artificial Intelligence.png"
//           alt="Logo"
//         />
//         {!collapsed && (
//           <p className="dark:text-white font-bold text-slate-700 text-xl tracking-tight ml-2">
//             HRDashboard
//           </p>
//         )}
//       </div>

//       <Icon
//         name="PanelLeft"
//         className="w-5 h-5 cursor-pointer text-slate-400 hover:text-emerald-500 transition-colors"
//         onClick={() => setCollapsed(!collapsed)}
//       />
//     </div>
//   );

//   const top2 = (
//     <NavLink
//       to=""
//       id="top2"
//       className={`bg-emerald-600 shadow-lg shadow-emerald-500/20 rounded-lg p-2.5 px-5 flex w-full justify-between items-center transition-all active:scale-95 ${
//         collapsed ? 'justify-center' : ''
//       }`}
//     >
//       {!collapsed && (
//         <p className="font-bold text-white text-xs uppercase tracking-widest">Dashboard</p>
//       )}
//       <Icon name="LayoutDashboard" className="w-4 h-4 text-white" />
//     </NavLink>
//   );

//   const middle1 = (
//     <div id="middle" className="flex relative flex-col w-full flex-1 my-4 hover-bar overflow-y-auto gap-2">
//       {list.map((lists, index) =>
//         lists.path ? (
//           <div key={index} className="cursor-pointer">
//             <NavLink
//               to={collapsed ? '#' : lists.path}
//               onClick={() => handleIconClick(lists.path)}
//               end
//               className={({ isActive }) =>
//                 `flex gap-3 rounded-lg w-full items-center px-3 py-2 transition-all 
//                 ${isActive
//                   ? 'bg-gray-100 dark:bg-slate-700 shadow-inner dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600 text-emerald-600 dark:text-emerald-400'
//                   : 'text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700/50'
//                 }
//                 ${collapsed ? 'justify-center' : 'justify-start'}`
//               }
//             >
//               <Icon
//                 name={lists.Icons || 'User'}
//                 className={`w-5 h-5 transition-colors`}
//               />
//               {!collapsed && (
//                 <p className="flex-1 font-bold text-xs uppercase tracking-wider">
//                   {lists.label}
//                 </p>
//               )}
//             </NavLink>
//           </div>
//         ) : (
//           <div key={index} className="cursor-pointer group">
//             <div 
//               onClick={() => { if (collapsed) setCollapsed(false); else toggleVisible(lists.label);}}
//               className={`flex w-full ${collapsed ? 'justify-center' : 'justify-between'} items-center p-2.5 rounded-lg transition-all ${lists.Visible ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700/50'}`}>
//               <div className="flex items-center gap-3 justify-center">
//                 <Icon name={lists.Icons} className="w-5 h-5"/>
//                 {!collapsed && (
//                   <p className="font-bold text-xs uppercase tracking-wider">
//                     {lists.label}
//                   </p>
//                 )}
//               </div>
//               {!collapsed && (
//                 <Icon name="ChevronDown" className={`w-4 h-4 transition-transform ${lists.Visible ? 'rotate-180' : ''}`}/>
//               )}
//             </div>

//             {!collapsed && (
//               <div className={`${lists.Visible ? 'flex' : 'hidden'} ml-6 my-1 border-l-2 border-slate-200 dark:border-slate-600 flex-col gap-1`}>
//                 {lists.label === "Attendance" && (
//                   <>
//                     <div className='pl-4 py-1'>
//                       {checking ? (
//                         <div className="px-3 py-1.5 rounded bg-amber-50 dark:bg-amber-500/10 text-[10px] font-bold text-amber-600 uppercase">Checking network...</div>
//                       ) : isLocal ? (
//                         <NavLink to={`/${clockinPath[role]}/clock_in`} end className={({ isActive }) => 
//                           `flex rounded-md w-full px-3 py-1.5 transition-all ${isActive ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600' : 'text-slate-500 dark:text-slate-300 hover:text-emerald-500'}`
//                         }>
//                           <p className="text-[10px] font-bold uppercase tracking-widest">Clock In</p>
//                         </NavLink>
//                       ) : (
//                         <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase cursor-not-allowed opacity-50">Clock In (Offline)</div>
//                       )}
//                       <div className={`mt-1 flex gap-1 items-center text-[9px] font-bold uppercase tracking-tighter ${checking ? 'text-slate-400' : isLocal ? 'text-emerald-500' : 'text-amber-500'}`}>
//                         <Icon name="ShieldAlert" className="w-3 h-3"/>
//                         {checking ? 'detecting...' : isLocal ? 'office network' : 'external network'}
//                       </div>
//                     </div>
//                   </>
//                 )}
//                 {lists.sub?.map((subs, idx) => (
//                   <NavLink key={idx} to={subs.subPath} end className={({ isActive }) => 
//                     `flex rounded-md w-full px-7 py-1.5 transition-all ${isActive ? 'text-emerald-600 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-emerald-500'}`
//                   }>
//                     <p className="text-[10px] font-bold uppercase tracking-widest">{subs.label}</p>
//                   </NavLink>
//                 ))}
//               </div>
//             )}
//           </div>
//         )
//       )}
//     </div>
//   );

//   const bottom = (
//     <div id="bottom" className="w-full flex flex-col items-center gap-1 py-4 border-t border-slate-100 dark:border-slate-700">
//       {!collapsed && (
//         <>
//           <NavLink to="HelpCenter" className="flex w-full justify-between items-center px-3 py-2 text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors">
//             <div className="flex items-center gap-3">
//               <Icon name="HelpCircle" className="w-5 h-5" />
//               <p className="font-bold text-xs uppercase tracking-wider">Help Center</p>
//             </div>
//             <div className="bg-rose-500 text-white text-[10px] font-bold px-1.5 rounded-full">8</div>
//           </NavLink>

//           <NavLink to="Setting" className="flex w-full items-center gap-3 px-3 py-2 text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors">
//             <Icon name="Settings" className="w-5 h-5" />
//             <p className="font-bold text-xs uppercase tracking-wider">Settings</p>
//           </NavLink>

//           {/* Sunken Theme Switcher */}
//           <div className="mt-2 flex p-1 rounded-xl bg-gray-100 dark:bg-slate-900 shadow-inner dark:inset-shadow-xs dark:inset-shadow-black w-full justify-around items-center">
//             <button
//               onClick={() => changeTheme('light')}
//               className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
//                 changeTheme === 'light' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'
//               }`}
//             >
//               <Icon name="Sun" className="w-4 h-4" />
//               <span className="text-[10px] font-bold uppercase">Light</span>
//             </button>
//             <button
//               onClick={() => changeTheme('dark')}
//               className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
//                 changeTheme === 'dark' ? 'bg-slate-700 shadow dark:inset-shadow-xs dark:inset-shadow-slate-600 text-emerald-400' : 'text-slate-500'
//               }`}
//             >
//               <Icon name="Moon" className="w-4 h-4" />
//               <span className="text-[10px] font-bold uppercase">Dark</span>
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );

//   return (
//     <div className={`bg-white dark:bg-slate-800 border-r border-slate-100 dark:border-slate-700 flex h-full ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 flex-col items-center px-4 py-2`}>
//       {top1}
//       <div className="w-full my-2">{top2}</div>
//       {middle1}
//       {bottom}
//     </div>
//   );
// }






















