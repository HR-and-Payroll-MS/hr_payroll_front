import { useEffect, useState } from "react";
import useAuth from "../../Context/AuthContext";
import { getLocalData } from "../../Hooks/useLocalStorage";

export default function useAttendanceToday() {
  const [loading, setLoading] = useState(true);
  const [punches, setPunches] = useState([]);
  const [error, setError] = useState(null);
  const { axiosPrivate } = useAuth();

  async function load() {
    setLoading(true);
    setError(null);

    try {
      // console.log("here here here")
      const res = await axiosPrivate.get(`employees/${getLocalData("user_id")}/attendances/today/`);
      console.log(res?.data?.punches)
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
