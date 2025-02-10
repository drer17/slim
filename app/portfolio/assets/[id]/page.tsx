"use server";

import { get } from "@/lib/actions/get";
import Asset from "./asset";
import { AssetLiability } from "@prisma/client";

export default async function Page({ params }: { params: { id: string } }) {
  const asset = (await get([
    "assetLiability",
    "asset",
    params.id,
  ])) as AssetLiability[];

  return <Asset {...asset[0]} />;
}
