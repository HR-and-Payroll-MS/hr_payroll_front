import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import useAuth from './AuthContext';
import { getLocalData } from '../Hooks/useLocalStorage';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { axiosPrivate } = useAuth();
  const employeeId = getLocalData('user_id')
  const getProfile = useCallback(async (forceRefresh = false) => {
    if (profile && !forceRefresh) {
      return profile;
    }

    setLoading(true);
    try {
      const response = await axiosPrivate.get(`/employees/${employeeId}`);
      const data = response.data;
      setProfile(data);
      return data;
    } catch (error) {
      console.error("Profile fetch failed:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [axiosPrivate, profile]);
  const refreshProfile = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(`/employees/${employeeId}`);
      const data = response.data;
      setProfile(data);
    } catch (error) {
      console.error("Silent profile refresh failed:", error);
    }
  }, [axiosPrivate]);
  const clearProfile = useCallback(() => setProfile(null), []);
  const value = useMemo(() => ({
    profile,
    loading,
    getProfile,
    refreshProfile,
    clearProfile
  }), [profile, loading, getProfile, refreshProfile, clearProfile]);

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }
  return context;
};
