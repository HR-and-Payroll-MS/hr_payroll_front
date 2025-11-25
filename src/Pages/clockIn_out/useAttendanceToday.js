import { useEffect, useState } from "react";

export default function useAttendanceToday() {
  const [loading, setLoading] = useState(true);
  const [punches, setPunches] = useState([]);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      // real API
      // const res = await fetch('/api/attendance/today');

      // TEMP MOCK:
      const json = {
        punches: [
          { type: 'check_in', time: '2025-11-18T08:00:00Z', location: 'Office' },
          // { type: 'check_out', time: '2025-11-18T08:09:00Z', location: 'Office' }
        ]
      };

      setPunches(json.punches || []);
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
