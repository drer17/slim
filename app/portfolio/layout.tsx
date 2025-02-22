"use server";

import Header from "@/components/global/header/header";
import Navigation from "@/components/global/navigation/navigation";
import { cn } from "@/lib/utils";
import { PortfolioProvider } from "./portfolio-provider";
import { get } from "@/lib/actions/get";
import { AssetLiabilityType, Tag, TransactionCategory } from "@prisma/client";
import { getUser } from "@/lib/actions/auth";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const author = await getUser();
  const tags = (await get(["tag"])) as Tag[];
  const assetLiabilityTypes = (await get([
    "asset-liability-type",
  ])) as AssetLiabilityType[];
  const transactionCategories = (await get([
    "transaction-categories",
  ])) as TransactionCategory[];

  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <PortfolioProvider
      author={author}
      tags={tags}
      assetLiabilityTypes={assetLiabilityTypes}
      transactionCategories={transactionCategories}
      colorPresets={[
        "#ec4899",
        "#f43f5e",
        "#f59e0b",
        "#eab308",
        "#10B981",
        "#06B6D4",
        "#3b82f6",
        "#8b5cf6",
        "#71717a",
        "#ffffff",
      ]}
    >
      <SidebarProvider defaultOpen={defaultOpen}>
        <div
          className={cn(
            "flex flex-col md:flex-row w-full flex-1 mx-auto overflow-hidden",
            "h-svh",
          )}
        >
          <Navigation />
          <SidebarInset>
            <div className="w-full p-4">
              <div className="hidden md:flex">
                <Header />
              </div>
              <div className="mt-4">{children}</div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </PortfolioProvider>
  );
}
