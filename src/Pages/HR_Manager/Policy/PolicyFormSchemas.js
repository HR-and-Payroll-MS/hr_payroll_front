// field types: text|number|time|date|dropdown|textarea|boolean
export const policyFormSchemas = {
  attendancePolicy: {
    shiftTimes: {
      name: { type: "text", label: "Shift Name", placeholder: "e.g. Day Shift" },
      start: { type: "time", label: "Start Time" },
      end: { type: "time", label: "End Time" },
    },
    // if you want to allow adding approvalFlow steps, you could create schema for objects inside attendanceCorrection.approvalFlow etc.
  },

  leavePolicy: {
    leaveTypes: {
      id: { type: "text", label: "ID (slug)", placeholder: "annual" },
      name: { type: "text", label: "Leave Name", placeholder: "Annual Leave" },
      paid: { type: "boolean", label: "Paid?" },
      daysPerYear: { type: "number", label: "Days per Year", default: 0 },
    },
  },

  holidayPolicy: {
    fixedHolidays: {
      date: { type: "date", label: "Date" },
      name: { type: "text", label: "Holiday Name" },
    },
    companyHolidays: {
      date: { type: "date", label: "Date" },
      name: { type: "text", label: "Holiday Name" },
    },
  },

  shiftPolicy: {
    shiftPatterns: {
      id: { type: "number", label: "ID" },
      name: { type: "text", label: "Pattern Name" },
      type: { type: "dropdown", label: "Pattern Type", options: ["fixed", "rotational"] },
    },
  },

  salaryStructurePolicy: {
    deductions: {
      // example: letting the admin add taxBracket item
      shiftTimes: {
        min: { type: "number", label: "Min" },
        max: { type: "number", label: "Max" },
        rate: { type: "number", label: "Rate (%)" },
      },
    },
    // NOTE: top-level arrays like salaryStructurePolicy.deductions.taxBracket -> to add, open modal with arrayPath "deductions.taxBracket"
  },

  // Add more schemas per your needs...
};
