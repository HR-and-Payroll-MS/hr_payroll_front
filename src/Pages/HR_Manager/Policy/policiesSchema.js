// policiesSchema.js
// This file contains an initial policies object you can replace with data from backend.
// The schema also shows lightweight typed wrappers for special renderers:
// - { __type: "dropdown", options: [...], value: "..." }
// - { __type: "documents", value: [...] } -> DocumentList
//
// Replace values with actual backend fields.

export const initialPolicies = {
  general: {
    companyName: "Example Co",
    effectiveDate: "2025-01-01",
    adminContact: "hr@example.com",
    policyVersion: "v1.0",
  },

  attendancePolicy: {
    shiftTimes: [
      { name: "Day Shift", start: "09:00", end: "17:00" },
      { name: "Night Shift", start: "18:00", end: "02:00" },
    ],
    gracePeriod: {
      minutesAllowed: 10,
      lateAfter: 10,
      penaltyRule: "3 late arrivals per month = 1 warning",
    },
    lateEarlyRules: {
      halfDayLateAfterMinutes: 120,
      halfDayEarlyLeaveMinutes: 120,
      acceptableLateMinutes: 10,
    },
    absentRules: {
      absentAfterMinutes: 240,
      noClockInAbsent: true,
    },
    overtimeRules: {
      overtimeAllowed: { __type: "dropdown", options: ["Yes", "No"], value: "Yes" },
      overtimeApprovalRequired: { __type: "dropdown", options: ["Yes", "No"], value: "Yes" },
      minMinutes: 60,
      maxDailyHours: 4,
      maxWeeklyHours: 20,
    },
    breakRules: {
      lunchBreakAutoDeduct: { __type: "dropdown", options: ["Yes", "No"], value: "Yes" },
      lunchBreakMinutes: 60,
      breakType: { __type: "dropdown", options: ["fixed", "flexible"], value: "fixed" },
    },
    attendanceCorrection: {
      documentationRequired: { __type: "dropdown", options: ["Yes", "No"], value: "Yes" },
      approvalFlow: ["manager", "hr"],
    },
  },

  leavePolicy: {
    leaveTypes: [
      { id: "annual", name: "Annual Leave", paid: true, daysPerYear: 21 },
      { id: "sick", name: "Sick Leave", paid: true, daysPerYear: 15 },
    ],
    accrualRules: {
      monthlyAccrualDays: 1.75,
      carryoverLimit: 12,
      expiryMonths: 12,
    },
    eligibilityRules: {
      maternityMinServiceMonths: 3,
      sabbaticalMinYears: 5,
    },
    documentationRules: {
      sickLeaveCertificateAfterDays: 2,
      bereavementRequired: true,
      studyLeaveDocs: "Enrollment letter",
    },
    approvalWorkflow: {
      annualLeave: ["manager", "hr"],
      sickLeave: ["hr"],
      maternityLeave: ["hr"],
    },
  },

  holidayPolicy: {
    fixedHolidays: [
      { date: "2025-01-01", name: "New Year" },
      { date: "2025-04-20", name: "National Day" },
    ],
    floatingHolidays: [{ name: "Easter", rule: "auto-calc" }],
    companyHolidays: [{ date: "2025-12-31", name: "Company Foundation Day" }],
    holidayPayRules: {
      holidayIsPaid: { __type: "dropdown", options: ["Yes", "No"], value: "Yes" },
      holidayOvertimeRate: 2,
    },
  },

  shiftPolicy: {
    workweek: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    weeklyOff: ["Sat", "Sun"],
    shiftPatterns: [
      { id: 1, name: "Fixed Day Shift", type: "fixed" },
      { id: 2, name: "Night Rotation", type: "rotational" },
    ],
    rotationRules: {
      rotationEveryDays: 7,
      nightShiftAllowance: 300,
    },
  },

  overtimePolicy: {
    overtimeRate: 1.5,
    weekendRate: 2,
    holidayRate: 2,
    minOvertimeMinutes: 30,
    approvalRequired: { __type: "dropdown", options: ["Yes", "No"], value: "Yes" },
  },

  disciplinaryPolicy: {
    warningRules: {
      firstWarning: "3 lateness in a month",
      secondWarning: "6 lateness in a month",
      thirdWarning: "Disciplinary meeting",
    },
    penalties: {
      repeatedLatePenalty: "Salary deduction",
      absencePenalty: "Written warning",
    },
    escalation: {
      steps: ["manager", "hr", "director"],
    },
  },

  jobStructurePolicy: {
    jobLevels: ["Junior", "Mid", "Senior", "Lead"],
    departments: ["HR", "Finance", "Engineering", "Operations"],
    promotionRules: {
      minimumMonthsPerLevel: 12,
      requiredPerformanceRating: "B or higher",
    },
  },

  salaryStructurePolicy: {
    baseSalaryTemplate: {
      gradeA: 25000,
      gradeB: 20000,
      gradeC: 15000,
    },
    allowances: {
      transport: 1000,
      housing: 3000,
      meal: 500,
    },
    deductions: {
      pensionPercent: 7,
      taxBracket: [
        { min: 0, max: 10000, rate: 5 },
        { min: 10001, max: 20000, rate: 15 },
        { min: 20001, max: 40000, rate: 25 },
      ],
    },
  },
};