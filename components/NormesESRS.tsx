"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { esgData } from "@/lib/data";
import { useState, useEffect } from "react";
import { HoverEffect } from "./ui/card-hover-effect";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function NormesESRS() {
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

  const activeParentCategory = esgData[1];
  
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center px-6 md:px-10 py-8 bg-white transition-all duration-500 ease-in-out">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center transition-transform transform hover:scale-105" id="ESRS">
        Normes européennes de reporting ESG
      </h2>

      <div className="article-content flex flex-col lg:flex-row gap-10 items-center justify-center w-full max-w-screen-xl">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full lg:w-1/2 h-[450px] md:h-[550px] rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
          <Image
            src="https://av.sc.com/corp-en/nr/content/images/CSDR-Timeline.jpg"
            alt="TAA Conference"
            className="object-cover w-full h-full transition-all duration-500 ease-in-out"
            width={891}
            height={585}
          />
        </div>

        {/* Text Section */}
        <div className="flex-grow w-full text-center lg:text-left space-y-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            <TextGenerateEffect words={"European Sustainability Reporting Standards"} />
          </h2>
          <h1 className="text-xl font-semibold text-red-600 mb-4 transform hover:scale-105 transition-all duration-300">
  ESRS
</h1>

          <p className="text-gray-700 leading-relaxed transition-all duration-300 hover:text-gray-800">
            Depuis janvier 2024, les normes européennes de reporting sur le
            développement durable (ESRS) fixent le cadre du reporting sur le
            développement durable en Europe.
          </p>
          <p className="text-gray-700 leading-relaxed transition-all duration-300 hover:text-gray-800">
            Ce changement s&apos;accompagne de la directive CSRD (Corporate
            Sustainability Reporting Directive) qui met en application les 12
            premières ESRS européennes, visant à normaliser et à améliorer la
            transparence des rapports environnementaux, sociaux et de
            gouvernance (ESG) à travers le continent.
          </p>
          <p className="text-gray-700 leading-relaxed transition-all duration-300 hover:text-gray-800">
            De nouvelles normes européennes pour plus de durabilité
            environnementale. Alors qu&apos;aujourd&apos;hui, en Europe, seules les
            sociétés de plus de 500 salariés sont tenues de présenter un rapport
            extra-financier, le scope des entreprises soumises à cette
            obligation va s’élargir dès 2024. Poussée par l’urgence climatique
            et motivée par la volonté de flécher les flux financiers vers des
            activités plus durables, la Commission européenne a en effet adopté
            la directive CSRD.
          </p>
        </div>
      </div>

      {/* Subcategories Grid Section */}
      {activeParentCategory?.subcategories && (
        <div className="mt-12 w-full max-w-screen-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-500 ease-in-out">
            {activeParentCategory.subcategories.map((subCategory) => (
              <HoverEffect
                key={subCategory.id}
                category={subCategory}
                isActive={activeSubCategory === subCategory.id}
                isSubCard
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
