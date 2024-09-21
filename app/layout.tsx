import type { Metadata } from "next";
import { ThemeProvider } from "./theme/theme_provider";
import { roboto } from "./theme/fonts";
import "./theme/globals.css";

export const metadata: Metadata = {
  title: "NextJS App",
  description: "NextJS tailwind shadcn template",
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
        className={`${roboto.className} antialiased p-6 w-full flex flex-col items-center`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="max-w-default w-full flex flex-col items-center self-center pt-2">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
