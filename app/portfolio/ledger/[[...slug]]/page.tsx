"use server";

/*
 * Ledger Page
 *
 * A route to display a ledger for an obligation
 */

import { Ledger } from "@/components/views/ledger";
import { get } from "@/lib/actions/get";
import { Obligation } from "@prisma/client";

export default async function Page({ params }: { params: { slug: string[] } }) {
  const obligation = await get(["obligation", undefined, params.slug[0]]);
  if (!Array.isArray(obligation)) return;
  return (
    <Ledger
      slug={params.slug}
      obligation={(obligation[0] as Obligation).label}
    />
  );
}
