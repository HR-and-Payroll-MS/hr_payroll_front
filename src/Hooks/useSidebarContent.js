export const sidebarList = {
 Payroll: [
  {
    Icons: 'Users', // already good for managing multiple employees
    path: null,
    label: 'Payroll Management',
    Visible: false,
    sub: [
      { subPath: 'generate_payroll', label: 'Generate Payroll' },
      { subPath: 'salary_structure', label: 'Salary Structure' },
      // { subPath: 'allowances', label: 'Allowances/Bonuses' },
    ],
  },
  {
    Icons: 'CalendarCheck2', // better than BookA → clearly means attendance/marking
    path: null,
    label: 'Attendance',
    Visible: false,
    sub: [
      { subPath: 'myattendance', label: 'My Attendance' },
    ],
  },
  {
    Icons: 'Receipt', // industry standard for payslips
    path: null,
    label: 'Payslips',
    Visible: false,
    sub: [
      { subPath: 'view_generated_payslips', label: 'View/Edit Generated Payslips' },
    ],
  },
  {
    Icons: 'IndianRupee', // perfect for salary data (or use Wallet if you prefer)
    path: null,
    label: 'Employee Payroll Data',
    Visible: false,
    sub: [
      { subPath: 'view_employee_salary_info', label: 'View Employee Salary Info' },
      { subPath: 'edit_employee_salary_info', label: 'Edit Employee Salary Info' },
    ],
  },
  {
    Icons: 'FileBarChart2', // best modern icon for reports & analytics
    path: null,
    label: 'Reports',
    Visible: false,
    sub: [
      { subPath: 'payroll_reports', label: 'Payroll Reports' },
      { subPath: 'tax_reports', label: 'Tax Reports' },
      { subPath: 'department_wise_paryoll', label: 'Department-Wise Payroll' },
    ],
  },
  {
    Icons: 'BellRing', // more appropriate than ShieldAlert for notifications
    path: null,
    label: 'Notification',
    Visible: false,
    sub: [
      { subPath: 'view_notification', label: 'View Notification' },
      { subPath: 'send_notification', label: 'Send Notification' },
    ],
  },
  {
    Icons: 'UserCog', // perfect combo: profile + settings/logout
    path: null,
    label: 'Profile',
    Visible: false,
    sub: [
      { subPath: 'view_profile', label: 'View Profile' },
      { subPath: '/logout', label: 'Logout' },
    ],
  },
],

  Manager: [
    {
      Icons: 'Users',
      path: null,
      label: 'Employee Management',
      Visible: false,
      sub: [
        { subPath: 'Employee_Directory', label: 'Employee Directory' },
        { subPath: 'AddEmployee', label: 'Add Employee' },
        // {subPath:"View_Employee",label:"Manage Employee Accounts"},
        { subPath: 'org-chart', label: 'Upload Documents' },
      ],
    },
    {
      Icons: 'BookA',
      path: null,
      label: 'Attendance',
      Visible: false,
      sub: [
        { subPath: 'Employee_Attendance', label: 'Employee Attendance' },
        { subPath: 'myattendance', label: 'My Attendance' },
      ],
    },
    {
      Icons: 'Timer',
      path: null,
      label: 'Leave Management',
      Visible: false,
      sub: [
        {
          subPath: 'Approve_Reject',
          label: 'Approve/Reject Requests',
        },
        // { subPath: 'Employee/Directory', label: 'Manage Holidays' },
        // { subPath: 'Modal_Test', label: 'Manage Time Off Requests' },
      ],
    },
    {
      Icons: 'Timer',
      path: "Announcement",
      label: 'Announcement',
      Visible: false,
      sub:false
    },
    {
      Icons: 'Calendar',
      path: null,
      label: 'Payroll Management',
      Visible: false,
      sub: [
        { subPath: 'Payroll_report', label: 'View Payroll Reports' },
        { subPath: 'MyPayroll', label: 'My Payroll' },
      ],
    },
    {
      Icons: 'FlagTriangleRight',
      path: null,
      label: 'Reports',
      Visible: false,
      sub: [
        { subPath: '/', label: 'Payroll Reports' },
        { subPath: '/', label: 'Attendance Reports' },
        { subPath: '/', label: 'Leave Reports' },
        { subPath: '/', label: 'Overtime Reports' },
        { subPath: '/', label: 'employee efficiency Reports' },
        { subPath: '/', label: 'Employee Compliant Report' },
      ],
    },
    {
      Icons: 'ShieldAlert',
      path: 'policies',
      label: 'Policy',
      Visible: false,
      sub: null
    },
    // {
    //   Icons: 'ShieldAlert',
    //   path: null,
    //   label: 'System Admin',
    //   Visible: false,
    //   sub: [
    //     { subPath: '/', label: 'Assign Roles & Permissions' },
    //     { subPath: '/', label: 'Manage Departments' },
    //   ],
    // },
    {
      Icons: 'Megaphone',
      path: null,
      label: 'Notifications',
      Visible: false,
      sub: [
        { subPath: 'notification_center_page', label: 'View Notifications' },
        { subPath: 'send_notification_page', label: 'Send Notifications' },
      ],
    },
    // {
    //   Icons: 'CircleUser',
    //   path: null,
    //   label: 'Profile',
    //   Visible: false,
    //   sub: [
    //     { subPath: '/', label: 'Manage Profile' },
    //     { subPath: 'logout', label: 'logout' },
    //   ],
    // },
  ],

  Employee: [
    {
      path: null,
      label: 'M Employee',
      Visible: true,
      sub: [
        { subPath: 'Employee/ManageEmployee', label: 'Manage Employee' },
        { subPath: 'Employee/Directory', label: 'Directory' },
        { subPath: 'org-chart', label: 'ORG Chart' },
      ],
    },
    {
      path: null,
      label: 'M Checklist',
      Visible: false,
      sub: [
        { subPath: '/', label: 'To-Do' },
        { subPath: '/', label: 'Onboarding' },
        { subPath: '/', label: 'Offboarding' },
        { subPath: '/', label: 'Setting' },
      ],
    },
    {
      path: null,
      label: 'M Time Off',
      Visible: false,
      sub: [
        { subPath: '/', label: 'My Time Off' },
        { subPath: '/', label: 'Team Time Off' },
        { subPath: '/', label: 'Employee Time Off' },
        { subPath: '/', label: 'Settings' },
      ],
    },
    {
      path: null,
      label: 'M Attendance',
      Visible: false,
      sub: [
        { subPath: '/', label: 'My Attendance' },
        { subPath: '/', label: 'Team Attendance' },
        { subPath: '/', label: 'Employee Attendance' },
        { subPath: '/', label: 'Settings' },
      ],
    },
    {
      path: 'null',
      label: 'M Payroll',
      Visible: false,
      sub: [
        { subPath: '/', label: 'Manage Employee' },
        { subPath: '/', label: 'Directory' },
        { subPath: '/', label: 'ORG Chart' },
      ],
    },
    {
      path: 'null',
      label: 'M Performance',
      Visible: false,
      sub: [
        { subPath: '/', label: 'Manage Employee' },
        { subPath: '/', label: 'Directory' },
        { subPath: '/', label: 'ORG Chart' },
      ],
    },
    {
      path: null,
      label: 'M Recruitment',
      Visible: false,
      sub: [
        { subPath: '/', label: 'Jobs' },
        { subPath: '/', label: 'Candidates' },
        { subPath: '/', label: 'Settings' },
      ],
    },
  ],

  Dep_Man: [
    {
      Icons: 'Users',
      path: null,
      label: 'Employee Management',
      Visible: false,
      sub: [
        { subPath: 'AddEmployee', label: 'Add Employee' },
        { subPath: '', label: 'Update Employee information' },
        { subPath: '', label: 'Manage Employee Accounts' },
        { subPath: 'org-chart', label: 'Upload Documents' },
      ],
    },
    {
      Icons: 'BookA',
      path: null,
      label: 'Attendance',
      Visible: false,
      sub: [
        { subPath: 'checklist', label: 'View Attendance' },
        { subPath: '/', label: 'Track Employee Accounts' },
      ],
    },
    {
      Icons: 'Timer',
      path: null,
      label: 'Leave Management',
      Visible: false,
      sub: [
        {
          subPath: 'Employee/ManageEmployee',
          label: 'Approve/Reject Leave Requests',
        },
        { subPath: 'Employee/Directory', label: 'Manage Holidays' },
        { subPath: 'org-chart', label: 'Manage Time Off Requests' },
      ],
    },
    {
      Icons: 'Calendar',
      path: null,
      label: 'Payroll Management',
      Visible: false,
      sub: [
        { subPath: '/', label: 'View Payroll Reports' },
        { subPath: '/', label: 'Manage Payroll System' },
        { subPath: '/', label: 'Generate Payroll' },
      ],
    },
    {
      Icons: 'FlagTriangleRight',
      path: null,
      label: 'Reports',
      Visible: false,
      sub: [
        { subPath: '/', label: 'View Employee Reports' },
        { subPath: '/', label: 'View Tax Reports' },
      ],
    },
    {
      Icons: 'ShieldAlert',
      path: null,
      label: 'System Admin',
      Visible: false,
      sub: [
        { subPath: '/', label: 'Assign Roles & Permissions' },
        { subPath: '/', label: 'Manage Departments' },
      ],
    },
    {
      Icons: 'Megaphone',
      path: null,
      label: 'Notifications',
      Visible: false,
      sub: [
        { subPath: '/', label: 'View Notifications' },
        { subPath: '/', label: 'Send Notifications' },
      ],
    },
    {
      Icons: 'CircleUser',
      path: null,
      label: 'Profile',
      Visible: false,
      sub: [
        { subPath: '/', label: 'Manage Profile' },
        { subPath: 'logout', label: 'logout' },
      ],
    },
  ],
  Admin: [
    {
      path: null,
      label: 'M Employee',
      Visible: true,
      sub: [
        { subPath: 'Employee/ManageEmployee', label: 'Manage Employee' },
        { subPath: 'Employee/Directory', label: 'Directory' },
        { subPath: 'org-chart', label: 'ORG Chart' },
      ],
    },
    {
      path: null,
      label: 'M Checklist',
      Visible: false,
      sub: [
        { subPath: '/', label: 'To-Do' },
        { subPath: '/', label: 'Onboarding' },
        { subPath: '/', label: 'Offboarding' },
        { subPath: '/', label: 'Setting' },
      ],
    },
    {
      path: null,
      label: 'M Time Off',
      Visible: false,
      sub: [
        { subPath: '/', label: 'My Time Off' },
        { subPath: '/', label: 'Team Time Off' },
        { subPath: '/', label: 'Employee Time Off' },
        { subPath: '/', label: 'Settings' },
      ],
    },
    {
      path: null,
      label: 'M Attendance',
      Visible: false,
      sub: [
        { subPath: '/', label: 'My Attendance' },
        { subPath: '/', label: 'Team Attendance' },
        { subPath: '/', label: 'Employee Attendance' },
        { subPath: '/', label: 'Settings' },
      ],
    },
    {
      path: 'null',
      label: 'M Payroll',
      Visible: false,
      sub: [
        { subPath: '/', label: 'Manage Employee' },
        { subPath: '/', label: 'Directory' },
        { subPath: '/', label: 'ORG Chart' },
      ],
    },
    {
      path: 'null',
      label: 'M Performance',
      Visible: false,
      sub: [
        { subPath: '/', label: 'Manage Employee' },
        { subPath: '/', label: 'Directory' },
        { subPath: '/', label: 'ORG Chart' },
      ],
    },
    {
      path: null,
      label: 'M Recruitment',
      Visible: false,
      sub: [
        { subPath: '/', label: 'Jobs' },
        { subPath: '/', label: 'Candidates' },
        { subPath: '/', label: 'Settings' },
      ],
    },
  ],
};
