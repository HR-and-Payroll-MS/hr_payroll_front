import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import useAuth from './AuthContext';
import { TABLE_ENDPOINTS } from '../config/tableConfig';

const TableContext = createContext();
const CACHE_TIME_MS = 5 * 60 * 1000; 

export const TableProvider = ({ children }) => {
  const [tableCache, setTableCache] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const { axiosPrivate } = useAuth();

  // Core fetcher
  const getTableData = useCallback(async (tableName, url, forceRefresh = false) => {
    const now = Date.now();
    const cachedEntry = tableCache[tableName];
    
    if (cachedEntry && (now - cachedEntry.lastUpdated < CACHE_TIME_MS) && !forceRefresh) {
      return cachedEntry.data;
    }

    setLoadingStates(prev => ({ ...prev, [tableName]: true }));
    try {
      const response = await axiosPrivate.get(url);
      const freshData = response.data.results || response.data;
      setTableCache(prev => ({
        ...prev,
        [tableName]: { data: freshData, lastUpdated: now }
      }));
    } catch (error) {
      console.error(`Fetch error for ${tableName}:`, error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [tableName]: false }));
    }
  }, [axiosPrivate, tableCache]);

  // SILENT REFRESH: Updates cache without global loading triggers
  const refreshTableSilently = useCallback(async (tableName) => {
    const url = TABLE_ENDPOINTS[tableName];
    if (!url) return;
    try {
      const response = await axiosPrivate.get(url);
      const freshData = response.data.results || response.data;
      setTableCache(prev => ({
        ...prev,
        [tableName]: { data: freshData, lastUpdated: Date.now() }
      }));
    } catch (err) {
      console.error("Silent refresh failed", err);
    }
  }, [axiosPrivate]);

  const value = useMemo(() => ({
    tableCache,
    loadingStates,
    getTableData,
    refreshTableSilently
  }), [tableCache, loadingStates, getTableData, refreshTableSilently]);

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

export const useTableContext = () => useContext(TableContext);