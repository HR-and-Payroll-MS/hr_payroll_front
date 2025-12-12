export default function calcPayrollForEmployee(emp, month) {
  const baseMap = { Finance: 20000, HR: 15000, IT: 18000 };
  const base = baseMap[emp.department] || 12000;
  const allowance = Math.round(base * 0.2);
  const bonus = Math.round(base * 0.05);
  const overtime = 0;
  const gross = base + allowance + bonus + overtime;
  const tax = Math.round(gross * 0.1);
  const pension = Math.round(gross * 0.03);
  const other = 0;
  const totalDeductions = tax + pension + other;
  const net = gross - totalDeductions;
  return {
    employee: emp,
    month,
    company: {
      name: "ACME Corp",
      address: "1 Example Street",
      phone: "+251 555 123",
      email: "hr@acme.test",
      logoUrl: "",
    },
    earnings: [
      { label: "Basic Salary", amount: base },
      { label: "Allowance", amount: allowance },
      { label: "Bonus", amount: bonus },
    ],
    deductions: [
      { label: "Income Tax (10%)", amount: tax },
      { label: "Pension (3%)", amount: pension },
    ],
    gross,
    totalDeductions,
    net,
    paymentMethod: "Bank Transfer",
    paymentDate: new Date().toLocaleDateString(),
  };
}