import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../Context/AuthContext';
import { getLocalData } from '../Hooks/useLocalStorage';

export default function ProtectedRoutes({ allowedRoles }) {
  const { auth, setAuth, isAuthLoading } = useAuth();

  useEffect(() => {
    if (!auth?.user && getLocalData('role') && getLocalData('id')) {
      const data = {
        accessToken: localStorage.getItem('access'),
        user: {
          role: getLocalData('role'),
          id: getLocalData('id'),
        },
      };
       setAuth({accessToken:data.accessToken,user:data.user});
    }
  }, [auth]);

  if (isAuthLoading) {
    return <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-slate-700 h-10 w-10"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 bg-slate-700 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 bg-slate-700 rounded col-span-2"></div>
          <div class="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div class="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
</div>; // or a spinner
  }

  if (!auth?.user) {
    console.log('No auth user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(auth?.user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}




// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'
// import useAuth from '../Context/AuthContext'
// import { getLocalData } from '../Hooks/useLocalStorage';

// export default function ProtectedRoutes({allowedRoles}) 
// {
//     const { auth ,setUser } = useAuth();
//     if(!auth?.user){
//         if(getLocalData("role")&& getLocalData("id"))
//            { const data={accessToken:"",user:{role:getLocalData("role"),id:getLocalData("id")}}
//            try{ setUser(data)}catch(e){ console.log(e)}}


//          return <Navigate to="/login" replace />
        
//         }
//     if(!allowedRoles.includes(auth?.user?.role)) return <Navigate to="/unauthorized" replace />
//     return <Outlet/>
// }

// //rfce