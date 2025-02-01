"use client";

import { LinkPreview } from "./ui/link-preview";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import NormesESRS from "./NormesESRS";
import Image from "next/image";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DirectiveCSDDD() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToNewSection = () => {
      const newSection = document.getElementById("DCSDDD");
      if (newSection) {
        newSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const timeoutId = setTimeout(scrollToNewSection, 100);
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  const dummyContent = [
    {
      title: "Corporate Sustainability Due Diligence Directive (CSDDD):",
      description: (
        <>
          <strong>
            <TextGenerateEffect
              words={
                "Explication : La Directive Européenne sur le Devoir de Vigilance en Matière de Durabilité CSDDD"
              }
            />
          </strong>
          <p>
            est une législation introduite par le Parlement Européen en février 2022. Elle impose aux entreprises
            européennes de surveiller et de gérer les impacts de leurs activités sur les droits de l'Homme et
            l'environnement. Les entreprises doivent s'assurer que leurs chaînes d'approvisionnement respectent ces
            normes. La directive finale a été publiée le 30 janvier 2024 et entrera en vigueur en 2027.
            Explication : La Directive Européenne sur le Devoir de Vigilance en Matière de Durabilité (CSDDD)
          </p>
          <p>
            <strong>Objectif:</strong> La directive CS3D établit un cadre horizontal d'obligations pour les entreprises
            ayant une implantation dans l'UE (qu'elles soient basées en Europe ou qu'elles fournissent des biens ou des
            services dans l'UE), régissant la manière dont elles traitent les impacts négatifs réels et potentiels sur
            les droits de l'homme et l'environnement par le biais de leurs chaînes de valeur mondiales, y compris les
            opérations des filiales et des partenaires commerciaux. En exigeant des entreprises qu'elles prennent en
            compte leurs impacts, la CS3D répond à l'absence d'un cadre juridique harmonisé sur les obligations de
            diligence raisonnable.
          </p>
          <p>
            <strong>Scope:</strong> <br />
            <em>Entreprises de l'UE</em> – La directive s'applique aux entreprises de l'UE qui remplissent l'une des
            conditions suivantes: <br />
            <strong>A.</strong> Une entreprise emploie plus de 250 personnes en moyenne et réalise un chiffre d'affaires net
            mondial de €140 millions. <br />
            <strong>B.</strong> La société, même si elle n'atteint pas le seuil A, est la société mère d'un groupe qui emploie
            500 personnes et réalise un chiffre d'affaires net mondial de €150 millions.
          </p>
          <p>
            <strong>Scope:</strong> <br />
            <em>Entreprises tierces</em> – La directive s'applique aux entreprises tierces qui remplissent l'une des conditions
            suivantes: <br />
            <strong>A.</strong> Un chiffre d'affaires net mondial de €150 millions, avec au moins 40 millions générés dans l'UE. <br />
            <strong>B.</strong> Si ce seuil n'est pas atteint, la société, en tant que société mère d'un groupe employant 500 personnes
            et réalisant un chiffre d'affaires net mondial de €150 millions, doit générer au moins 40 millions dans l'UE.
          </p>
        </>
      ),
      badge: (
        <LinkPreview
          componentPreview={<NormesESRS />}
          className="z-50"
          url={"/pages/Normes_ESRS"}
        >
          <h1 className="inline-block text-red-600 font-bold px-4 py-2 mb-6">
          Norme ESRS
          </h1>
        </LinkPreview>
      ),
      image:
        "https://www.netzeronews.io/wp-content/uploads/2024/08/csddd-stars-featured-1200x630-opt.jpg",
    },
    {
      title: "",
      description: (
        <>
          <p>
            <strong>Explication / Définition:</strong> La Loi Allemande sur le Devoir de Vigilance (LkSG), adoptée en 2021,
            exige des entreprises allemandes d'identifier et d'atténuer les risques liés aux droits de l'Homme et à
            l'environnement dans leurs chaînes d'approvisionnement. Entrée en vigueur le 1er janvier 2023, cette loi
            s'applique principalement au secteur automobile mais concerne également l'ensemble des chaînes
            d'approvisionnement.
          </p>
          <p>
            <strong>Que réglemente-t-elle ?</strong> La LkSG régit les droits de l'homme et la protection de l'environnement dans
            les chaînes d'approvisionnement mondiales. Elle impose aux entreprises allemandes de mettre en œuvre des
            obligations de diligence pour leurs activités, leurs partenaires contractuels et fournisseurs indirects.
          </p>
          <p>
            <strong>À qui s'applique-t-elle ?</strong> À partir de janvier 2023, la LkSG s'applique à toute entreprise employant
            au moins 3 000 personnes, et à partir de 2024, aux entreprises employant au moins 1 000 personnes.
          </p>
          <p>
            <strong>Quels droits sont renforcés ?</strong> La loi LkSG favorise la protection des droits dans les chaînes
            d'approvisionnement en énonçant onze conventions sur les droits de l'homme internationalement reconnues,
            notamment contre le travail des enfants, le travail forcé, la discrimination, ainsi que pour la santé, la
            sécurité et la protection de l'environnement.
          </p>
          <p>
            <strong>Implications légales:</strong> Le non-respect des obligations peut entraîner des amendes administratives
            pouvant atteindre 8 millions d'euros ou 2 % du chiffre d'affaires annuel mondial.
          </p>
        </>
      ),
      badge: (
        <h2 className="inline-block text-red-600 font-bold px-4 py-2 mb-6">
          Loi Allemande sur le Devoir de Vigilance (LkSG)
        </h2>
      ),
      image:
        "https://minurso.unmissions.org/sites/default/files/styles/full_width_image/public/field/image/ndg.jpeg?itok=OuW3L44e",
    },
  ];

  return (
    <TracingBeam className="px-4">
      <div className="mx-auto antialiased pt-8 pb-12 relative" id="DCSDDD">
        <div className="space-y-16">
          {dummyContent.map((item, index) => (
            <article key={`content-${index}`} className="mb-10 pb-8 border-b">
              <div className="mb-4">{item.badge}</div>
              {item.title && (
                <h2 className="text-3xl font-bold  mb-4">
                  {item.title}
                </h2>
              )}
              <div className="prose prose-sm dark:prose-invert">
                {item.image && (
                  <Image
                    src={item.image}
                    alt="content image"
                    width={1000}
                    height={600}
                    className="rounded-lg mb-10 object-cover"
                  />
                )}
                {item.description}
              </div>
            </article>
          ))}
        </div>
      </div>
    </TracingBeam>
  );
}
