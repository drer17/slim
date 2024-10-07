"use server";

import Header from "@/components/global/header/header";
import Navigation from "@/components/global/navigation/navigation";
import { cn } from "@/lib/utils";
import { PortfolioProvider } from "./portfolio-provider";
import { get } from "@/lib/actions/get";
import { AssetLiabilityType, Tag, TransactionCategory } from "@prisma/client";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tags = (await get(["tag"])) as Tag[];
  const assetLiabilityTypes = (await get([
    "assetLiabilityTypes",
  ])) as AssetLiabilityType[];
  const transactionCategories = (await get([
    "transactionCategories",
  ])) as TransactionCategory[];

  return (
    <PortfolioProvider
      tags={tags}
      assetLiabilityTypes={assetLiabilityTypes}
      transactionCategories={transactionCategories}
      colorPresets={[]}
    >
      <div
        className={cn(
          "flex flex-col md:flex-row w-full flex-1 mx-auto overflow-hidden",
          "h-svh",
        )}
      >
        <Navigation mobileHeader={<Header />} />
        <div className="w-full p-4">
          <div className="hidden md:flex">
            <Header />
          </div>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </PortfolioProvider>
  );
}
