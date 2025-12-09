import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import { sidebarList } from '../Hooks/useSidebarContent';
import useAuth from '../Context/AuthContext';
import Icon from '../Components/Icon';
import { getLocalData  } from '../Hooks/useLocalStorage';
import { useNetwork } from '../Context/NetworkContext';

export default function Sidebar() {
  const { auth } = useAuth();
  const {isLocal, checking} = useNetwork()
  const role = auth?.user?.role;
  const [list, setList] = useState(sidebarList[role] || []);
  const [collapsed, setCollapsed] = useState(false);
  const { changeTheme } = useTheme();
  const location = useLocation(); // 👈 used to highlight active path

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
      className={`bg-green-600 rounded-md p-2.5 px-5 flex w-full justify-between items-center ${
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
    <div id="middle" className="flex relative flex-col w-full flex-1 my-4 overflow-y-auto  scrollbar-hidden  gap-2" >
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
                    ? 'bg-slate-200 dark:bg-slate-700 text-blue-500'
                    : 'hover:bg-slate-50 hover:dark:bg-slate-700'
                }
                ${collapsed ? 'justify-center' : 'justify-start'}
                transition-all`
              }
            >
              <Icon
                name={lists.Icons || 'User'}
                className={`w-5 h-5 ${
                  location.pathname === lists.path
                    ? 'text-blue-500'
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
                <Icon name={lists.Icons} className={`w-4 h-4 ${lists.Visible ? 'text-blue-500' : 'text-slate-400'}`}/>
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
          <NavLink to={'clock_in'} end className={({ isActive }) => `relative z-10  flex rounded-md w-full justify-between items-center px-2.5 py-1.5 ${isActive? 'bg-slate-200 dark:bg-slate-700' : 'hover:bg-slate-50 bg-white dark:bg-slate-800  dark:hover:bg-slate-700'}`}>
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
                    <NavLink key={subs.label} to={subs.subPath} end className={({ isActive }) => `relative z-10 flex rounded-md w-full justify-between items-center px-2.5 py-1.5 ${isActive ? 'bg-slate-200 dark:bg-slate-700 ' : ' bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
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
              <p className="font-semibold text-gray-700 text-sm dark:text-slate-300">
                Help Center
              </p>
            </div>
            <div className="text-xs rounded-full font-semibold items-center bg-red-500 text-white px-1">
              <p className="m-0.5">8</p>
            </div>
          </div>

          <div className="flex w-full justify-between items-center m-0.5">
            <div className="flex items-center gap-1.5 justify-center py-2.5">
              <Icon name="Settings" className="w-5 h-5 text-slate-400" />
              <NavLink to="Setting">
                <p className="font-semibold text-gray-700 text-sm dark:text-slate-300">
                  Settings
                </p>
              </NavLink>
            </div>
          </div>

          <div
            className={`dark:bg-slate-900 flex gap-0.5 rounded-4xl cursor-pointer bg-gray-50 h-fit w-full justify-around items-center m-0.5`}
          >
            <div
              onClick={() => changeTheme('light')}
              className={`flex flex-1 bg-white shadow dark:bg-slate-900 drop-shadow-2xl  rounded-4xl m-1 h-9 items-center gap-1.5 justify-center py-2.5`}
            >
              <Icon name="Sun" className="w-4 h-4" />
              <p className="dark:text-slate-100 font-semibold text-gray-700 text-sm">
                Light
              </p>
            </div>
            <div
              onClick={() => changeTheme('dark')}
              className={`flex bg-gray-50 dark:bg-slate-700 flex-1 rounded-4xl m-1 h-9 items-center gap-1.5 justify-center py-2.5`}
            >
              <Icon name="Moon" className="w-4 h-4" />
              <p className="dark:text-slate-100 font-semibold text-gray-700 text-sm">
                Dark
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div
      className={`bg-white dark:bg-slate-800 dark:text-white flex h-full  ${
        collapsed ? 'w-16' : 'w-64'
      } transition-all duration-300 flex-col items-center shadow px-2.5 py-0.5`}
    >
      {top1}
      {top2}
      {middle1}
      {bottom}
    </div>
  );
}

