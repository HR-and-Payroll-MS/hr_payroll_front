// field types: text|number|time|date|dropdown|textarea|boolean
export const policyFormSchemas = {
  attendancePolicy: {
    shiftRules: {
      standardWorkHours: { type: "number", label: "Standard Daily Hours" },
      gracePeriodMinutes: { type: "number", label: "Grace Period (Minutes)" },
      latePenalty: { type: "boolean", label: "Apply Late Arrival Penalty?" },
      breakDurationMinutes: { type: "number", label: "Break Duration (Minutes)" },
    },
    overtimeRules: {
      dailyThresholdHours: { type: "number", label: "Daily OT Threshold (Hours)" },
      weeklyThresholdHours: { type: "number", label: "Weekly OT Threshold (Hours)" },
      multiplierWeekday: { type: "number", label: "Weekday Multiplier (e.g. 1.25)" },
      multiplierWeekend: { type: "number", label: "Weekend Multiplier (e.g. 1.5)" },
      multiplierHoliday: { type: "number", label: "Holiday Multiplier (e.g. 2.0)" },
    },
    attendanceCorrection: {
      approvalFlow: { type: "text", label: "Approval Step", placeholder: "e.g. manager" },
      maxCorrectionsPerMonth: { type: "number", label: "Max Corrections / Month" },
    },
  },

  recruitmentPolicy: {
    onboarding: {
      probationMonths: { type: "number", label: "Default Probation (Months)" },
      autoGenerateId: { type: "boolean", label: "Auto-Generate Employee ID?" },
      idPrefix: { type: "text", label: "ID Prefix", placeholder: "EMP-" },
    },
    requiredDocuments: {
      name: { type: "text", label: "Document Name (e.g. Passport)" },
      isRequired: { type: "boolean", label: "Required?" },
      expiryAlertDays: { type: "number", label: "Alert Before Expiry (Days)" },
    },
  },

  efficiencyPolicy: {
    performanceReviews: {
      frequency: { type: "dropdown", label: "Frequency", options: ["Quarterly", "Bi-Annually", "Yearly"] },
      ratingScale: { type: "number", label: "Max Rating (e.g. 5 or 10)" },
      selfAssessmentRequired: { type: "boolean", label: "Require Self Assessment?" },
    },
    kpis: {
      name: { type: "text", label: "Standard KPI Name" },
      weight: { type: "number", label: "Default Weight (%)" },
    },
  },

  announcementPolicy: {
    categories: {
      name: { type: "text", label: "Category Name (e.g. Urgent, General)" },
      color: { type: "text", label: "Color Code (Hex)" },
    },
    retention: {
      autoArchiveDays: { type: "number", label: "Auto-Archive After (Days)" },
    },
  },

  jobStructurePolicy: {
    departments: {
      name: { type: "text", label: "Department Name" },
      code: { type: "text", label: "Cost Center Code" },
    },
    grades: {
      name: { type: "text", label: "Grade Name (e.g. L1, Senior)" },
      minSalary: { type: "number", label: "Min Base Salary" },
      maxSalary: { type: "number", label: "Max Base Salary" },
    },
  },

  leavePolicy: {
    leaveTypes: {
      id: { type: "text", label: "ID (slug)", placeholder: "annual" },
      name: { type: "text", label: "Leave Name", placeholder: "Annual Leave" },
      paid: { type: "boolean", label: "Paid?" },
      daysPerYear: { type: "number", label: "Days per Year", default: 0 },
      requiresApproval: { type: "boolean", label: "Requires Approval?" },
    },
    accrualRules: {
      monthlyAccrualDays: { type: "number", label: "Monthly Accrual" },
      carryoverLimit: { type: "number", label: "Max Carryover Days" },
      resetDate: { type: "date", label: "Reset Date (e.g. Jan 1)" },
    },
  },

  holidayPolicy: {
    fixedHolidays: {
      date: { type: "date", label: "Date" },
      name: { type: "text", label: "Holiday Name" },
    },
    floatingHolidays: {
      name: { type: "text", label: "Holiday Name" },
      rule: { type: "text", label: "Rule (e.g. 1st Monday of May)" },
    },
    companyHolidays: {
      date: { type: "date", label: "Date" },
      name: { type: "text", label: "Holiday Name" },
      isPaid: { type: "boolean", label: "Is Paid?" },
    },
  },

  shiftPolicy: {
    shiftPatterns: {
      id: { type: "text", label: "Pattern ID" },
      name: { type: "text", label: "Pattern Name" },
      type: { type: "dropdown", label: "Pattern Type", options: ["Fixed", "Rotational"] },
      cycleLengthDays: { type: "number", label: "Cycle Length (Days)" },
    },
  },

  disciplinaryPolicy: {
    escalation: {
      level: { type: "number", label: "Level (1-5)" },
      name: { type: "text", label: "Action Name (e.g. Verbal Warning)" },
      description: { type: "text", label: "Description" },
    },
  },

  salaryStructurePolicy: {
    allowances: {
      name: { type: "text", label: "Allowance Name" },
      calculationType: { type: "dropdown", label: "Type", options: ["Fixed Amount", "Percentage of Basic"] },
      value: { type: "number", label: "Default Value" },
      isTaxable: { type: "boolean", label: "Taxable?" },
      isRecurring: { type: "boolean", label: "Recurring?" },
    },
    standardDeductions: {
      name: { type: "text", label: "Deduction Name" },
      calculationType: { type: "dropdown", label: "Type", options: ["Fixed Amount", "Percentage of Gross"] },
      value: { type: "number", label: "Value" },
      isPreTax: { type: "boolean", label: "Pre-Tax?" },
    },
    taxRules: {
      name: { type: "text", label: "Rule Name (e.g. Income Tax)" },
      minIncome: { type: "number", label: "Min Bracket" },
      maxIncome: { type: "number", label: "Max Bracket" },
      rate: { type: "number", label: "Tax Rate (%)" },
    },
  },

  probationPolicy: {
    durationMonths: { type: "number", label: "Default Duration (Months)" },
    extensionMonths: { type: "number", label: "Max Extension (Months)" },
    noticePeriodDuringProbationDays: { type: "number", label: "Notice Period (Days)" },
    trainingRequired: { type: "boolean", label: "Training Required?" },
  },

  expensePolicy: {
    dailyPerDiem: { type: "number", label: "Daily Per Diem" },
    approvalWorkflow: { type: "text", label: "Approval Step", placeholder: "manager" },
    travelLimits: {
      flightClass: { type: "dropdown", label: "Flight Class", options: ["Economy", "Business", "First"] },
      hotelPerNight: { type: "number", label: "Hotel Limit ($)" },
      receiptRequiredAbove: { type: "number", label: "Receipt Required Above ($)" },
    },
    categories: {
      name: { type: "text", label: "Category (e.g. Meals)" },
      limit: { type: "number", label: "Limit ($)" },
    },
  },

  loanPolicy: {
    maxAmountMultiplier: { type: "number", label: "Max Multiplier (x Salary)" },
    maxRepaymentMonths: { type: "number", label: "Max Repayment (Months)" },
    interestRate: { type: "number", label: "Interest Rate (%)" },
    eligibilityMinServiceMonths: { type: "number", label: "Min Service (Months)" },
  },

  terminationPolicy: {
    noticePeriodDays: {
      probation: { type: "number", label: "Probation Notice (Days)" },
      confirmed: { type: "number", label: "Confirmed Notice (Days)" },
      senior: { type: "number", label: "Senior Notice (Days)" },
    },
    handoverChecklist: { type: "text", label: "Item", placeholder: "Laptop" },
    severanceRules: {
      minServiceYears: { type: "number", label: "Min Service for Severance" },
      weeksPerYear: { type: "number", label: "Weeks Pay per Year of Service" },
    },
  },
};





































