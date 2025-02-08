"use client";
import NormesESRS from "@/components/NormesESRS";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function NormesP() {
const pathname = usePathname();

  useEffect(() => {
    const scrollToNewSection = () => {
      const newSection = document.getElementById("ESRS");
      if (newSection) {
        newSection.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    };

    const timeoutId = setTimeout(scrollToNewSection, 100);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  return (
    <div id="ESRS">
   <NormesESRS />
    </div>
  );
}
