// src/config/shortcuts.js

const ROLE_SHORTCUTS = {
  Payroll: [
    // Your existing Payroll shortcuts (keep or add more)
    { keys: 'ctrl+g', path: '/Payroll/generate_payroll', description: 'Generate Payroll' },
    { keys: 'ctrl+v', path: '/Payroll/view_generated_payslips', description: 'View Payslips' },
    { keys: 'ctrl+r', path: '/Payroll/payroll_reports', description: 'Payroll Reports' },
    { keys: 'ctrl+t', path: '/Payroll/tax_reports', description: 'Tax Reports' },
    { keys: 'ctrl+p', path: '/Payroll/profile', description: 'My Profile' },
    { keys: 'ctrl+n', path: '/Payroll/send_notification', description: 'Send Notification' },
  ],

  Manager: [
    // Dashboard (common starting point)
    { keys: 'ctrl+d', path: '/hr_dashboard', description: 'Dashboard' },

    // Employee Management
    { keys: 'ctrl+e', path: '/hr_dashboard/Employee_Directory', description: 'Employee Directory' },
    { keys: 'ctrl+shift+a', path: '/hr_dashboard/AddEmployee', description: 'Add Employee' },
    { keys: 'ctrl+u', path: '/hr_dashboard/org-chart', description: 'Upload Documents' },

    // Attendance
    { keys: 'ctrl+a', path: '/hr_dashboard/myattendance', description: 'My Attendance' },
    { keys: 'ctrl+shift+d', path: '/hr_dashboard/Department_Attendance', description: 'Department Attendance' },

    // Leave Management
    { keys: 'ctrl+l', path: '/hr_dashboard/Approve_Reject', description: 'Approve/Reject Leave Requests' },

    // Announcement
    { keys: 'ctrl+b', path: '/hr_dashboard/Announcement', description: 'Announcements' },

    // Reports
    { keys: 'ctrl+r', path: '/hr_dashboard/Payroll_report', description: 'Payroll Reports' },
    { keys: 'ctrl+shift+r', path: '/hr_dashboard/efficiency_report', description: 'Employee Efficiency Reports' },
    { keys: 'ctrl+shift+l', path: '/hr_dashboard/Request', description: 'Leave Reports' },

    // Efficiency & Policy
    { keys: 'ctrl+f', path: '/hr_dashboard/efficiencyhr', description: 'Create Efficiency Form' },
    { keys: 'ctrl+o', path: '/hr_dashboard/policies', description: 'Company Policy' },

    // Notifications
    { keys: 'ctrl+n', path: '/hr_dashboard/notification_center_page', description: 'View Notifications' },
    { keys: 'ctrl+shift+n', path: '/hr_dashboard/send_notification_page', description: 'Send Notification' },

    // Profile (common)
    { keys: 'ctrl+p', path: '/hr_dashboard/profile', description: 'My Profile' },

    // Org Chart (if separate access)
    { keys: 'ctrl+shift+o', path: '/ORG', description: 'Organization Chart' },

    // Settings (shared)
    { keys: 'ctrl+s', path: '/hr_dashboard/setting', description: 'Settings' },
  ],

  // You can add Employee or other roles later
};

export default ROLE_SHORTCUTS;