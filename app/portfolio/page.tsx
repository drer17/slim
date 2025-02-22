"use server";

import Dashboard from "@/components/views/dashboard";
import { getDashboardData } from "@/lib/actions/get";
import { getFinancialYearStart } from "@/lib/utilities/date";

export default async function Page() {
  const cards = await getDashboardData(
    ["portfolio"],
    getFinancialYearStart().toISOString(),
    new Date().toISOString(),
  );
  return (
    <div className="flex flex-col gap-2 w-full">
      <Dashboard {...cards} />
    </div>
  );
}
