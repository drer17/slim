import Header from "@/components/global/header/header";
import Navigation from "@/components/global/navigation/navigation";
import { cn } from "@/lib/utils";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
        {children}
      </div>
    </div>
  );
}
