import { useEffect, useRef } from 'react';
import { useTableContext } from './TableContext';
import { TABLE_ENDPOINTS } from '../config/tableConfig';

export const useTable = (tableName) => {
  const { tableCache, loadingStates, getTableData, refreshTableSilently } = useTableContext();
  const fetchUrl = TABLE_ENDPOINTS[tableName];
  
  // Use a ref to prevent re-fetching if tableName hasn't changed
  const hasFetched = useRef(false);

  useEffect(() => {
    if (fetchUrl && !tableCache[tableName] && !hasFetched.current) {
      getTableData(tableName, fetchUrl);
      hasFetched.current = true;
    }
  }, [tableName, fetchUrl, getTableData, tableCache]);

  return {
    data: tableCache[tableName]?.data || [],
    isLoading: loadingStates[tableName] || false,
    // Calling this will update the table without a full-page reload feel
    refresh: () => refreshTableSilently(tableName),
  };
};