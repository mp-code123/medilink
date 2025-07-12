"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemesProvider {...props}>
      <div className={cn("min-h-screen", "font-sans-antialiased")}>
        {children}
      </div>
    </NextThemesProvider>
  );
}
