import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../Context/AuthContext'

export default function ProtectedRoutes({allowedRoles}) 
{
    const { auth } = useAuth();
    if(!auth?.user) return <Navigate to="/login" replace />
    if(!allowedRoles.includes(auth?.user?.role)) return <Navigate to="/unauthorized" replace />
    return <Outlet/>
}

//rfce