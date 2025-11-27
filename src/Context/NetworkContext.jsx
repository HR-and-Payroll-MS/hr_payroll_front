import { createContext, useContext, useEffect, useState } from "react";

const NetworkContext = createContext(null);

export function NetworkProvider({ children }) {
  const [isLocal, setIsLocal] = useState(false); //default = null = loading, true/false = known
  const [checking, setChecking] = useState(false);//default = true don't forget
  const [error, setError] = useState(null);//nothing changed now

  useEffect(() => {
    let mounted = true;
    async function checkLocal() {
      try {
        setChecking(true);
        const res = await fetch("/api/is-local", { credentials: 'same-origin' });
        if (!res.ok) {
          if (mounted) {
            setIsLocal(false);
            setError(`Network check failed: ${res.status}`);
          }
          return;
        }
        const json = await res.json();
        if (mounted) {
          setIsLocal(Boolean(json.allowed));
          setError(null);
        }
      } catch (e) {
        if (mounted) {
          setIsLocal(false);
          setError(e.message);
        }
      } finally {
        if (mounted) setChecking(false);
      }
    }
    // checkLocal();
    return () => (mounted = false);
  }, []);

  return (
    <NetworkContext.Provider value={{ isLocal, checking, error, refresh: () => window.location.reload() }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  return useContext(NetworkContext);
}