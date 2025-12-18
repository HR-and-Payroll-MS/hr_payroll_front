// TableProvider.jsx
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import useAuth from "./AuthContext";
import { useSocket } from "./SocketProvider";

const TableContext = createContext(null);

export function TableProvider({ children }) {
  const { axiosPrivate } = useAuth();
  const socket = useSocket();

  // Global state: each table identified by a key
  const [tables, setTables] = useState({});

  /* ---------------- API FETCH ---------------- */
  const fetchTableData = useCallback(
    async (tableKey, url) => {
      if (!tableKey || !url) return;

      try {
        const res = await axiosPrivate.get(url);
        setTables((prev) => ({
          ...prev,
          [tableKey]: {
            ...(prev[tableKey] || {}),
            Data: res.data,
          },
        }));
        return res.data;
      } catch (err) {
        console.error(`Failed to fetch table ${tableKey}:`, err);
        return null;
      }
    },
    [axiosPrivate]
  );

  /* ---------------- GET TABLE ---------------- */
  const getTable = useCallback(
    (tableKey) => {
      return tables[tableKey] || { Data: [], title: [], structure: [], ke: [] };
    },
    [tables]
  );

  /* ---------------- SOCKET UPDATES ---------------- */
  useEffect(() => {
    if (!socket) return;

    const handleTableUpdate = (payload) => {
      // payload example: { tableKey: "employees", rowId: 12, updatedRow: {name: "John"} }
      const { tableKey, rowId, updatedRow, remove } = payload;

      setTables((prev) => {
        const table = prev[tableKey];
        if (!table) return prev;

        if (remove) {
          const newData = table.Data.filter((row) => row.id !== rowId);
          return { ...prev, [tableKey]: { ...table, Data: newData } };
        } else {
          const newData = table.Data.map((row) =>
            row.id === rowId ? { ...row, ...updatedRow } : row
          );
          return { ...prev, [tableKey]: { ...table, Data: newData } };
        }
      });
    };

    socket.on("table_update", handleTableUpdate);

    return () => {
      socket.off("table_update", handleTableUpdate);
    };
  }, [socket]);

  /* ---------------- REMOVE ROW ---------------- */
  const removeTableRow = useCallback((tableKey, rowId) => {
    setTables((prev) => {
      const table = prev[tableKey];
      if (!table) return prev;
      const newData = table.Data.filter((row) => row.id !== rowId);
      return { ...prev, [tableKey]: { ...table, Data: newData } };
    });
  }, []);

  /* ---------------- UPDATE ROW ---------------- */
  const updateTableRow = useCallback((tableKey, rowId, updatedRow) => {
    setTables((prev) => {
      const table = prev[tableKey];
      if (!table) return prev;
      const newData = table.Data.map((row) =>
        row.id === rowId ? { ...row, ...updatedRow } : row
      );
      return { ...prev, [tableKey]: { ...table, Data: newData } };
    });
  }, []);

  return (
    <TableContext.Provider
      value={{
        tables,
        fetchTableData,
        getTable,
        updateTableRow,
        removeTableRow,
        setTables,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export function useTables() {
  return useContext(TableContext);
}

























































// // TableProvider.jsx
// import React, { createContext, useContext, useState, useCallback } from "react";
// import useAuth from "./AuthContext";
// import { useSocket } from "./SocketProvider";

// const TableContext = createContext(null);

// export function TableProvider({ children }) {
//   const { axiosPrivate } = useAuth();
//   const socket = useSocket();

//   // Global state: each table identified by a key
//   const [tables, setTables] = useState({});

//   /* ---------------- API FETCH ---------------- */
//   const fetchTableData = useCallback(
//     async (tableKey, url) => {
//       if (!tableKey || !url) return;

//       try {
//         const res = await axiosPrivate.get(url);
//         setTables((prev) => ({
//           ...prev,
//           [tableKey]: {
//             ...(prev[tableKey] || {}),
//             Data: res.data,
//           },
//         }));
//         return res.data;
//       } catch (err) {
//         console.error(`Failed to fetch table ${tableKey}:`, err);
//         return null;
//       }
//     },
//     [axiosPrivate]
//   );

//   /* ---------------- GET TABLE ---------------- */
//   const getTable = useCallback(
//     (tableKey) => {
//       return tables[tableKey] || { Data: [], title: [], structure: [], ke: [] };
//     },
//     [tables]
//   );

//   /* ---------------- SOCKET UPDATES ---------------- */
//   const updateTableRow = useCallback(
//     (tableKey, rowId, updatedRow) => {
//       setTables((prev) => {
//         const table = prev[tableKey];
//         if (!table) return prev;
//         const newData = table.Data.map((row) =>
//           row.id === rowId ? { ...row, ...updatedRow } : row
//         );
//         return { ...prev, [tableKey]: { ...table, Data: newData } };
//       });
//     },
//     []
//   );

//   /* ---------------- REMOVE ROW ---------------- */
//   const removeTableRow = useCallback((tableKey, rowId) => {
//     setTables((prev) => {
//       const table = prev[tableKey];
//       if (!table) return prev;
//       const newData = table.Data.filter((row) => row.id !== rowId);
//       return { ...prev, [tableKey]: { ...table, Data: newData } };
//     });
//   }, []);

//   return (
//     <TableContext.Provider
//       value={{
//         tables,
//         fetchTableData,
//         getTable,
//         updateTableRow,
//         removeTableRow,
//         setTables,
//       }}
//     >
//       {children}
//     </TableContext.Provider>
//   );
// }

// export function useTables() {
//   return useContext(TableContext);
// }
