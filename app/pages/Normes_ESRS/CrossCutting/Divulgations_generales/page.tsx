"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Divulgations_generales = () => {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToNewSection = () => {
      const newSection = document.getElementById("DG");
      if (newSection) {
        newSection.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    };

    const timeoutId = setTimeout(scrollToNewSection, 100);
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        ESRS 2 - Divulgations générales
      </h1>
      <div
        id="DG"
        className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8"
      >
        {/* Image Section */}
        <div className="relative w-full md:w-1/2">
          <Image
            src="https://fastercapital.com/fr/i-fr/Demystification-des-declarations-de-divulgation--un-guide-des-consommateurs--Comprendre-l-importance-des-declarations-de-divulgation.webp"
            alt="ESRS 2 - Divulgations générales"
            width={800}
            height={400}
            className="rounded-xl hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-gray-700 leading-relaxed">
            ESRS 2 spécifie les informations essentielles à divulguer, quelle
            que soit la question de durabilité examinée.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Divulgations_generales;
