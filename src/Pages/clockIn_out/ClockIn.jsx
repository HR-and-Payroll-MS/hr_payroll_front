import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAttendanceToday from "./useAttendanceToday";
import ActionButton from "./ActionButton";
import PunchStats from "./PunchStats";
import PunchTimeline from "./PunchTimeline";
import useAuth from "../../Context/AuthContext";

export default function ClockIn() {
  const { loading, punches, error, refresh } = useAttendanceToday();
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);
  const { axiosPrivate } = useAuth();

  // determine punch state
  const checkInPunch = punches.find((p) => p.type === "check_in");
  const checkOutPunch = punches.find((p) => p.type === "check_out");

  const isClockedIn = !!checkInPunch && !checkOutPunch;
  const hasCheckedOut = !!checkOutPunch;

  // determine last punch for display
  const lastPunch = punches[punches.length - 1] || null;

  async function performAction() {
    setActionLoading(true);
    setActionError(null);

    try {
      // timestamp (YYYY-mm-dd HH:mm)
      const now = new Date();
      const timestamp =
        now.getFullYear() +
        "-" +
        String(now.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(now.getDate()).padStart(2, "0") +
        " " +
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");

      // Optional location (you can update this later)
      const location = null;

      let payload = {};

      // ======= SEND CORRECT PAYLOAD =======
      if (!checkInPunch) {
        // no punches → CHECK IN
        payload = {
          clock_in: timestamp,
          clock_in_location: location,
        };
      } else if (checkInPunch && !checkOutPunch) {
        // CHECK OUT
        payload = {
          clock_out: timestamp,
          clock_out_location: location,
        };
      }

      await axiosPrivate.post("/attendances/checkIn/", payload);

      await refresh();
    } catch (e) {
      setActionError(e?.response?.data?.message || e.message);
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Attendance — Admin Panel</h1>
        <p className="text-sm text-gray-500">
          Clock in/out for employees (office network only)
        </p>
      </header>

      <section className="flex flex-col items-center gap-4">
        <ActionButton
          isClockedIn={isClockedIn}
          hasCheckedOut={hasCheckedOut}
          actionLoading={actionLoading}
          onClick={performAction}
        />

        <div className="mt-3 text-sm text-gray-600">
          {loading
            ? "Loading..."
            : error
            ? `Error: ${error}`
            : isClockedIn
            ? `Currently checked in — last at ${new Date(
                lastPunch?.time
              ).toLocaleTimeString()}`
            : hasCheckedOut
            ? "Day completed"
            : "Not checked in"}
        </div>

        {actionError && (
          <div className="text-sm text-red-600">Action failed: {actionError}</div>
        )}

        <PunchStats punches={punches} lastPunch={lastPunch} />
      </section>

      <section className="mt-8 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-3">Today's punches</h2>
        <PunchTimeline loading={loading} punches={punches} />
      </section>
    </div>
  );
}
