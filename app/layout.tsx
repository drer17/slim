import type { Metadata } from "next";
import { ThemeProvider } from "./theme/theme_provider";
import { roboto } from "./theme/fonts";
import "./theme/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

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
            <main className="flex w-full">{children}</main>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
