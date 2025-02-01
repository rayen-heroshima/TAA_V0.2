"use client";
import { useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Exigences_generales = () => {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToNewSection = () => {
      const newSection = document.getElementById("EG");
      if (newSection) {
        newSection.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    };

    const timeoutId = setTimeout(scrollToNewSection, 100);
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div id="EG" className="bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            ESRS 1 - Exigences Générales
          </h1>
        </div>

        {/* Two-column layout for image and summary */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="relative w-full md:w-1/2">
            <Image
              src="https://white-tillet.com/wp-content/uploads/exigences_RDM_DDM-002-1397x540.jpg"
              alt="ESRS 1 Exigences Générales"
              width={800}
              height={400}
              className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 text-gray-600 text-left">
            <p className="text-xl leading-relaxed font-light">
              ESRS 1 n’est pas juste une norme—c’est le fondement d’une
              communication transparente et responsable. Elle établit les
              principes généraux pour présenter des informations conformes aux
              normes ESRS, sans imposer d’exigences spécifiques. En d’autres
              termes, c’est la boussole qui guide les entreprises vers un
              reporting durable et crédible.
            </p>
          </div>
        </div>

        {/* Key Points Section */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg mb-8 border-l-4 border-indigo-500 shadow-md">
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">
            Ce que vous devez savoir sur ESRS 1 :
          </h3>
          <ul className="list-none space-y-3">
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">🧭</span>
              <span className="flex-1">
                Une feuille de route pour aligner vos rapports avec les normes
                ESRS.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">📊</span>
              <span className="flex-1">
                Pas d’exigences spécifiques—mais des principes solides pour
                garantir la cohérence et la comparabilité.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">🌍</span>
              <span className="flex-1">
                Un pas de plus vers la transparence et la responsabilité
                environnementale, sociale et de gouvernance (ESG).
              </span>
            </li>
          </ul>
        </div>

        {/* Additional Information */}
        <div className="text-gray-600">
          <p className="text-lg leading-relaxed font-light">
            ESRS 1 est bien plus qu’un cadre technique—c’est un engagement
            envers l’intégrité et la clarté. En adoptant ces principes, les
            entreprises ne se contentent pas de suivre les règles ; elles
            montrent la voie vers un avenir durable et responsable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Exigences_generales;
