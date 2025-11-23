import React from "react";

export default function ActionButton({
  isClockedIn,
  hasCheckedOut,
  actionLoading,
  onClick
}) {
  return (
    <button
      onClick={onClick}
      disabled={actionLoading || hasCheckedOut}
      className={`w-48 h-48 rounded-full shadow-lg flex items-center justify-center text-center text-white text-xl font-semibold transition-transform transform hover:scale-105
        ${hasCheckedOut ? 'bg-gray-400 cursor-not-allowed' : isClockedIn ? 'bg-red-600' : 'bg-green-600'}`}
    >
      {actionLoading
        ? "Processing..."
        : hasCheckedOut
        ? "Day Complete"
        : isClockedIn
        ? "CHECK OUT"
        : "CHECK IN"}
    </button>
  );
}
