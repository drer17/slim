"use server";

import { get } from "@/lib/actions/get";
import SelectionPage from "./selection-page";
import { getUser } from "@/lib/actions/auth";

export default async function Home() {
  const currentUser = await getUser();
  const users = await get(["user"]);
  const portfolios = await get(["portfolio"]);
  if (!Array.isArray(users)) return null;

  return (
    <div className="w-full p-4">
      <SelectionPage
        currentUser={currentUser}
        users={users}
        portfolios={Array.isArray(portfolios) ? portfolios : []}
      />
    </div>
  );
}
