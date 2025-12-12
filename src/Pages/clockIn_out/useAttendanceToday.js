import { useEffect, useState } from "react";
import useAuth from "../../Context/AuthContext";

export default function useAttendanceToday() {
  const [loading, setLoading] = useState(true);
  const [punches, setPunches] = useState([]);
  const [error, setError] = useState(null);
  const { axiosprivate } = useAuth();

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosprivate.get("/attendances/today/");
      setPunches(res.data?.punches || []);
    } catch (e) {
      setPunches([]);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { loading, punches, error, refresh: load };
}
