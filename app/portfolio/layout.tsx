import Header from "@/components/global/header/header";
import Navigation from "@/components/global/navigation/navigation";
import { cn } from "@/lib/utils";
import { PortfolioProvider } from "./portfolio-provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PortfolioProvider>
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
