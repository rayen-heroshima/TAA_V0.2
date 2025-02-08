"use client";
import {  useEffect } from "react";

import { usePathname } from "next/navigation";
export default function Home() {
   const pathname = usePathname();
  
    useEffect(() => {
      const scrollToNewSection = () => {
        const newSection = document.getElementById("ESRS");
        if (newSection) {
          newSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };
      const timeoutId = setTimeout(scrollToNewSection, 100);
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, [pathname]);
  return <div></div>;
}