"use client";

import { ArrowRight } from "lucide-react";
import { esgData } from "@/lib/data";
import { useState } from "react";
import { HoverEffect } from "./ui/card-hover-effect";
import Breadcrumbs from "./Breadcrumbs";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [activeCategory] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="mx-auto space-y-12">
      <Breadcrumbs  />

      <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://scontent.ftun16-1.fna.fbcdn.net/v/t1.6435-9/116671579_904348180058762_7725684902901648280_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=PsB42zbFtNYQ7kNvgHfw9yY&_nc_zt=23&_nc_ht=scontent.ftun16-1.fna&_nc_gid=AsJzcf8HyOdbZrH1-kB8tCR&oh=00_AYDTw5-D9xRHLQxYufGfbyTkZwLbOoilZJ1RvZVyjA1A2A&oe=67C10DC3')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="max-w-3xl space-y-8">
          {/* Main heading with gradient text */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-red-700 to-red-500 text-transparent bg-clip-text">
              Un Engagement ESG pour un Secteur Automobile Durable
            </span>
          </h1>

          {/* CTA Button */}
          <div
            onClick={() => router.push("/pages/Formulaire_ESG")}
            className="cursor-pointer z-10 group relative inline-flex items-center justify-center overflow-hidden rounded-lg px-8 py-4 font-bold text-white shadow-2xl transition-all duration-300 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            {/* This span ensures the entire button scales on hover without intercepting pointer events */}
            
            <span className="relative flex items-center gap-2">
              Formulaire ESG
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute right-0 top-0 w-72 h-72 bg-gradient-to-bl from-red-700/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-gradient-to-tr from-gray-900/30 to-transparent rounded-full blur-3xl" />
    </section>

      <div className="container mx-auto" id="start">
        <br />
        <br />
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 p-0">
          {esgData.map((category) => (
            <HoverEffect
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
