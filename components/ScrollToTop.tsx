"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // When the route changes, scroll to the top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
