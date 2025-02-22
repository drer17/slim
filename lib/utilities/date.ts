export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getFinancialYearStart(date: Date = new Date()): Date {
  const currentYear = date.getFullYear();
  let financialYearStart: Date;

  if (date.getMonth() < 6) {
    financialYearStart = new Date(currentYear - 1, 6, 1);
  } else {
    financialYearStart = new Date(currentYear, 6, 1);
  }

  return financialYearStart;
}
