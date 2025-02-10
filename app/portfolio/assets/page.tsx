"use server";

import { getCards } from "@/lib/actions/get";
import Assets from "./assets";

export default async function Page() {
  const cards = await getCards(["assetLiability", "asset"]);

  return <Assets assets={cards} />;
}
