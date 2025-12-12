import { createContext, useContext, useEffect, useState, useCallback } from "react";
import useAuth from "./AuthContext";
import { getLocalData } from "../Hooks/useLocalStorage";

const NetworkContext = createContext(null);

export function NetworkProvider({ children }) {
  const [isLocal, setIsLocal] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState(null);

  const { axiosPrivate } = useAuth();

  const checkLocal = useCallback(async () => {
    setChecking(true);
    setError(null);

    try {
      // const res = await axiosPrivate.get(`/employees/${getLocalData("id")}/attendances/network-status/`);
      // console.log("Network status response:", res);
      // // const json = res?.data?.is_office_network ?? false;
      conosle.log("Checking network status...",getLocalData("id"));
      // setIsLocal(json);
    } catch (err) {
      // If axiosPrivate refreshes token, this catch may still fire from first 401
      if (err?.response?.status !== 401) {
        setError(err.message || "Network check failed");
      }
      setIsLocal(false);
    } finally {
      setChecking(false);
    }
  }, [axiosPrivate]);

  useEffect(() => {
    let active = true;

    // wrap checkLocal so it won't set state after unmount
    const safeCheck = async () => {
      try {
        
      conosle.log("Checking network status...",getLocalData("id"));
        // const res = await axiosPrivate.get("/attendances/check-network/");
        // if (!active) return;

        // setIsLocal(res.data?.is_office_network ?? false);
        // setError(null);
      } catch (err) {
        if (!active) return;

        if (err?.response?.status !== 401) {
          setError(err.message);
        }
        setIsLocal(false);
      } finally {
        if (active) setChecking(false);
      }
    };

    safeCheck();
    return () => {
      active = false;
    };
  }, [axiosPrivate]);

  // safe for re-renders
  const refresh = useCallback(() => {
    checkLocal();
  }, [checkLocal]);

  return (
    <NetworkContext.Provider value={{ isLocal, checking, error, refresh }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  return useContext(NetworkContext);
}
