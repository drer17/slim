import { cn } from "@/lib/utils";

export default function Layout() {
  <div
    className={cn(
      "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
      "h-[60vh]", // for your use case, use `h-screen` instead of `h-[60vh]`
    )}
  ></div>;
}
