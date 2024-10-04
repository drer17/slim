import type { Metadata } from "next";
import { ThemeProvider } from "./theme/theme_provider";
import { roboto } from "./theme/fonts";
import "./theme/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import ThemeToggle from "./theme/theme_toggle";
import Header from "@/components/global/header/header";
import { cn } from "@/lib/utils";
import SideBar from "@/components/global/side-bar/side-bar";

export const metadata: Metadata = {
  title: "SLIM",
  description: "Simple Ledger & Investment Management",
};

/**
 * Root layout component that wraps the entire application.
 *
 * @param children - The child components to be rendered within the layout.
 * @returns The rendered layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased w-full flex flex-col items-center`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="w-full flex flex-col items-center self-center">
              <div
                className={cn(
                  "flex flex-col md:flex-row w-full flex-1 mx-auto overflow-hidden",
                  "h-svh",
                )}
              >
                <SideBar />
                <main className="w-full p-4">
                  <Header />
                  {children}
                  <ThemeToggle />
                </main>
                <Toaster />
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
