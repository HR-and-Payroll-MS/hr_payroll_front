export const initialPolicies = {
  general: {
    companyName: "Example Co",
    effectiveDate: "2025-01-01",
    adminContact: "hr@example.com",
    policyVersion: "v2.0",
  },

  attendancePolicy: {
    shiftTimes: [
      { name: "Day Shift", start: "09:00", "end": "17:00" },
      { name: "Night Shift", start: "18:00", "end": "02:00" },
    ],
    gracePeriod: {
      minutesAllowed: 15,
      lateAfter: 15,
      allowedOccurrencesPerMonth: 3,
      penaltyRule: "Salary deduction after limit exceeded",
    },
    lateEarlyRules: {
      earlyleaveminutes: 20,
      acceptableLateMinutes: 10,
      halfDayLateAfterMinutes: 120,
      halfDayEarlyLeaveMinutes: 120,
      acceptableLateMinutes: 15,
    },
    absentRules: {
      absentAfterMinutes: 240,
      noClockInAbsent: true,
    },
    workFromHome: {
      allowedDaysPerMonth: 4,
      approvalRequired: {
        __type: "dropdown",
        options: ["Yes", "No"],
        value: "Yes",
      },
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
      { id: "casual", name: "Casual Leave", paid: true, daysPerYear: 7 },
    ],
    accrualRules: {
      monthlyAccrualDays: 1.75,
      carryoverLimit: 12,
      expiryMonths: 18,
      proRataJoining: true,
    },
    eligibilityRules: {
      maternityMinServiceMonths: 3,
      sabbaticalMinYears: 5,
      casualLeaveProbation: false,
    },
    encashmentRules: {
      allowedAtSeparation: true,
      maxEncashableDays: 30,
    },
    documentationRules: {
      sickLeaveCertificateAfterDays: 2,
      bereavementRequired: true,
      studyLeaveDocs: "Enrollment letter",
    },
  },

  holidayPolicy: {
    fixedHolidays: [
      { date: "2025-01-01", name: "New Year" },
      { date: "2025-05-01", name: "Labor Day" },
    ],
    floatingHolidays: [{ name: "Religious Holiday", rule: "Employee Choice (1/year)" }],
    companyHolidays: [{ date: "2025-12-31", name: "Year End Closure" }],
    holidayPayRules: {
      holidayIsPaid: { __type: "dropdown", options: ["Yes", "No"], value: "Yes" },
      holidayOvertimeRate: 2.0,
    },
  },

  shiftPolicy: {
    workweek: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    weeklyOff: ["Sat", "Sun"],
    shiftPatterns: [
      { id: 1, name: "Fixed Day Shift", type: "fixed" },
      { id: 2, name: "Night Rotation", "type": "rotational" },
    ],
    rotationRules: {
      rotationEveryDays: 14,
      nightShiftAllowance: 300,
    },
  },

  overtimePolicy: {
    rates: {
      standardRate: 1.5,
      weekendRate: 2.0,
      holidayRate: 2.0,
    },
    compOff: {
      allowed: true,
      expireDays: 60,
    },
    minOvertimeMinutes: 30,
    approvalRequired: { __type: "dropdown", options: ["Yes", "No"], value: "Yes" },
  },

  probationPolicy: {
    durationMonths: 3,
    extensionMonths: 3,
    noticePeriodDuringProbationDays: 15,
    trainingRequired: true,
  },

  expensePolicy: {
    dailyPerDiem: 500,
    travelLimits: {
      flightClass: "Economy",
      hotelPerNight: 2000,
    },
    approvalWorkflow: ["manager", "finance"],
  },

  loanPolicy: {
    maxAmountMultiplier: 3,
    maxRepaymentMonths: 12,
    interestRate: 0,
    eligibilityMinServiceMonths: 6,
  },

  terminationPolicy: {
    noticePeriodDays: {
      probation: 15,
      confirmed: 30,
      senior: 60,
    },
    handoverChecklist: ["Laptop", "ID Card", "Keys"],
  },

  disciplinaryPolicy: {
    warningRules: {
      firstWarning: "Verbal Warning",
      secondWarning: "Written Warning",
      thirdWarning: "Final Warning / Suspension",
    },
    penalties: {
      repeatedLatePenalty: "Deduction",
      absencePenalty: "Warning Letter",
    },
    escalation: {
      steps: ["manager", "hr", "director"],
    },
  },

  jobStructurePolicy: {
    jobLevels: ["Intern", "Junior", "Mid", "Senior", "Lead", "Manager", "Director"],
    departments: ["HR", "Finance", "Engineering", "Operations", "Sales", "Marketing"],
    promotionRules: {
      minimumMonthsPerLevel: 12,
      requiredPerformanceRating: "Exceeds Expectations",
    },
  },

  salaryStructurePolicy: {
    allowances: [
      { name: "Transport", calculationType: "Fixed Amount", value: 1500, isTaxable: true, isRecurring: true },
      { name: "Housing", calculationType: "Fixed Amount", value: 3000, isTaxable: true, isRecurring: true },
    ],
    standardDeductions: [
      { name: "Social Security", calculationType: "Percentage of Gross", value: 5, isPreTax: true },
    ],
    taxRules: [
      { name: "Bracket 1", minIncome: 0, maxIncome: 10000, rate: 0 },
      { name: "Bracket 2", minIncome: 10001, maxIncome: 25000, rate: 10 },
      { name: "Bracket 3", minIncome: 25001, maxIncome: 50000, rate: 20 },
    ],
  },

  recruitmentPolicy: {
    onboarding: {
      probationMonths: 3,
      extensionMonths: 3,
      autoGenerateId: true,
      idPrefix: "EMP-",
    },
    requiredDocuments: [
      { name: "Passport", isRequired: true, expiryAlertDays: 30 },
      { name: "Resume", isRequired: true, expiryAlertDays: 0 },
    ],
  },

  efficiencyPolicy: {
    performanceReviews: {
      frequency: "Bi-Annually",
      ratingScale: 5,
      selfAssessmentRequired: true,
    },
    kpis: [
      { name: "Attendance Score", weight: 20 },
      { name: "Project Completion", weight: 50 },
    ],
  },

  announcementPolicy: {
    categories: [
      { name: "General", color: "#3B82F6" },
      { name: "Urgent", color: "#EF4444" },
    ],
    retention: {
      autoArchiveDays: 365,
    },
  },
};