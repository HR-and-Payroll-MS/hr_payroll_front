import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAttendanceToday from "./useAttendanceToday";
import ActionButton from "./ActionButton";
import PunchStats from "./PunchStats";
import PunchTimeline from "./PunchTimeline";

export default function ClockIn() {
  const { loading, punches, error, refresh } = useAttendanceToday();
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  const lastPunch = punches[punches.length - 1] || null;
  const isClockedIn = lastPunch?.type === "check_in";
  const hasCheckedOut = punches.some((p) => p.type === "check_out");

  async function performAction() {
    setActionLoading(true);
    setActionError(null);

    try {
      const action = isClockedIn ? "check_out" : "check_in";
      await fetch("/api/attendance/check", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action })
      });

      await refresh();
    } catch (e) {
      setActionError(e.message);
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
                lastPunch.time
              ).toLocaleTimeString()}`
            : "Not checked in"}
        </div>

        {actionError && (
          <div className="text-sm text-red-600">Action failed: {actionError}</div>
        )}

        <PunchStats punches={punches} lastPunch={lastPunch} />
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Today's punches</h2>
        <PunchTimeline loading={loading} punches={punches} />
      </section>
    </div>
  );
}
