import React from 'react'
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import { sidebarList } from '../Hooks/useSidebarContent';
import useAuth from '../Context/AuthContext';
import Icon from '../Components/Icon';
import { getLocalData  } from '../Hooks/useLocalStorage';
import Icon from '../Components/Icon';

function DashboardSkeleton() {
  const { auth } = useAuth();
  const role = auth?.user?.role;
  const [list, setList] = useState(sidebarList[role] || []);
const sidebar =2;
  const top1 = (
    <div
      id="top"
      className="flex w-full justify-between items-center m-0.5 px-2.5"
    >
      <div className="flex items-center justify-center py-2.5">
        <img
          className={`h-9 transition-all duration-300 'block'
          `}
          src="/pic/Robot Thumb Up with Artificial Intelligence.png"
          alt=""
        />
      </div>

      <Icon
        name="PanelLeft"
        className="w-5 h-5 cursor-pointer"
      />
    </div>
  );

  const top2 = (
    <div
      id="top2"
      className={`bg-green-600 rounded-md p-2.5 px-5 flex w-full justify-between items-center `}
    >
      
      <Icon name="LayoutDashboard" className="w-4 h-4 text-white" />
    </div>
  );

  const middle1 = (
    <div
      id="middle"
      className="flex flex-col w-full flex-1 my-4 overflow-y-scroll scrollbar-hidden gap-2"
    >
      {list.map((lists, index) =>
        lists.path ? (
          <div key={index} className="*:cursor-pointer">
            <div
              
              className={({ isActive }) =>
                `flex gap-1.5 rounded-md w-full items-center px-2.5 py-1.5 
                ${
                  isActive
                    ? 'bg-slate-200 dark:bg-slate-700 text-blue-500'
                    : ''
                }
                'justify-start'}
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
            </div>
          </div>
        ) : (
          <div key={index} className="*:cursor-pointer">
            <div
             
              className={`hover:bg-slate-50 dark:hover:bg-slate-700 flex w-full 
                 justify-between
              items-center p-2.5 transition-all`}
            >
              <div className="flex items-center gap-1.5 justify-center">
                <Icon
                  name={lists.Icons}
                  className={`w-4 h-4 ${
                    lists.Visible ? 'text-blue-500' : 'text-slate-400'
                  }`}
                />
              </div>
            </div>

            {/* sub-items */}
            
          </div>
        )
      )}
    </div>
  );

  const bottom = 
    <div id="bottom" className="w-full flex flex-col items-center py-3.5">
     
    </div>









  return (
     <div
      className={`bg-gray-50 flex h-screen gap-0.5 ${theme.state} dark:bg-slate-900`}
    >
      <Sidebar />
      <div className="flex-1 h-full flex flex-col">
        <Header />
        <div className="h-full p-4 flex-1 overflow-y-scroll scrollbar-hidden">
          <div className="h-full w-full bg-white rounded-md overflow-hidden dark:bg-slate-800">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSkeleton