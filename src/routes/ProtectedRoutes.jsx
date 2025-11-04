import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../Context/AuthContext';
import { getLocalData } from '../Hooks/useLocalStorage';
import DashboardSkeleton from '../animations/DashboardSkeleton';

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
    return <DashboardSkeleton/> // or a spinner
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