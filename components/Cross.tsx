"use client";

import { esgData } from "@/lib/data";
import { HoverEffect } from "./ui/card-hover-effect";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LinkPreview } from "./ui/link-preview";
import Image from "next/image";
import DirectiveCSDDD from "./DirectiveCSDDD";

export default function Cross() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToNewSection = () => {
      const newSection = document.getElementById("CROSS");
      if (newSection) {
        newSection.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    };

    const timeoutId = setTimeout(scrollToNewSection, 100);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  const activeChildCategory = esgData?.[1]?.subcategories?.[0];
  const [activeSubCategory] = useState<string | null>(
    null,
  );

  return (
    <div className="max-w-7xl mx-auto pt-16 pb-12 space-y-16" id="CROSS">
      {activeChildCategory ? (
        <div
          className={`p-8 rounded-lg shadow-xl ${activeChildCategory.color} transition-transform duration-300`}
        >
          <LinkPreview
            componentPreview={<DirectiveCSDDD />}
            className="z-50"
            url={"/pages/Directive_CSDDD"}
          >
            <h2 className="text-4xl font-extrabold text-center text-black mb-6">
              {activeChildCategory.title}
            </h2>
          </LinkPreview>

          <div className="text-gray-700 text-center">
            <p className="text-lg leading-relaxed mb-8">
              {activeChildCategory.description}
            </p>
          </div>

          {/* Two-column layout for image and summary text */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="relative w-full md:w-1/2 max-w-md">
              <Image
                src="https://ecoprism.com/assets/img/blog/Blog-32.webp"
                alt="Climate Change Impact on Businesses"
                width={800}
                height={450}
                className="w-full rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 text-left space-y-4">
              <p className="text-xl font-light leading-relaxed">
                Climate change isn’t just a buzzword—it’s reshaping the business
                landscape. Companies must adapt to an evolving environment and
                rethink their strategies.
              </p>
              <p className="text-lg font-normal leading-relaxed">
                This summary provides a quick insight into the major challenges
                and opportunities emerging from today&apos;s climate shifts.
              </p>
            </div>
          </div>

          {/* Creative Impact Areas Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg my-8 border-l-4 border-teal-500 shadow-lg">
            <h3 className="text-2xl font-semibold text-teal-700 mb-6">
              Where Climate Change Hits Hardest: Business Impact Areas
            </h3>
            <ul className="list-none space-y-6">
              <li className="flex items-start">
                <span className="text-teal-500 mr-3">⚡</span>
                <span className="flex-1">
                  Supply chain disruptions due to extreme weather.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3">🌱</span>
                <span className="flex-1">
                  Growing consumer demand for sustainable products.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3">📜</span>
                <span className="flex-1">
                  New regulations making compliance a top priority.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3">💧</span>
                <span className="flex-1">
                  Scarcity of resources driving up operational costs.
                </span>
              </li>
            </ul>
          </div>

          {/* Additional straightforward content block */}
          <div className="mt-8 text-center">
            <p className="text-xl font-light leading-relaxed">
              The trailblazers are not just adapting—they’re innovating. With
              smart strategies and bold actions, forward-thinking companies are
              turning climate challenges into opportunities for growth.
            </p>
          </div>
        </div>
      ) : (
        <p className="text-xl text-center text-gray-500">Category not found.</p>
      )}

      {/* Subcategories grid */}
      {activeChildCategory?.subcategories && (
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeChildCategory.subcategories.map((subCategory) => (
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
