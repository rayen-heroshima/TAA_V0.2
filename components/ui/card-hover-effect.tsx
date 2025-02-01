"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentType, useState } from "react";
import { type ESGCategory } from "@/lib/types";
import * as Icons from "lucide-react";

interface ESGCardProps {
  category: ESGCategory;
  isExpanded?: boolean;
  isSubCard?: boolean;
  isActive?: boolean;
}

export function HoverEffect({ category, isActive }: ESGCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Dynamically select the icon component
  const Icon = Icons[category.icon as keyof typeof Icons] as ComponentType<{
    className?: string;
  }>;

  return (
    <Link href={category.link || "#"} legacyBehavior>
      <motion.div
        className={cn(
          "h-full w-full p-0 overflow-hidden relative cursor-pointer",
          isActive ? "bg-red-50 rounded-3xl" : "border-transparent"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative group block p-2 h-full w-full">
          <AnimatePresence>
            {isHovered && (
              <motion.span
                className={cn(
                  "absolute inset-0 h-full w-full bg-red-200 block rounded-3xl"
                )}
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <div className="block h-full w-full">
            <Card>
              <Icon className="w-12 h-12 text-red-500 mb-4 custom-border bg-red-100 rounded-md" />
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
              {category.subcategories && (
                <div
                  className={cn(
                    "transition-transform duration-300 transform-gpu",
                    isActive ? "rotate-180" : ""
                  )}
                  style={{ transformOrigin: "center", display: "inline-block" }}
                >
                  <Icons.ChevronDown className="w-5 h-4 text-gray-400 group-hover:text-red-500" />
                </div>
              )}
            </Card>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "rounded-2xl h-full w-full p-0 overflow-hidden shadow-md bg-transparent border border-transparent dark:border-white/[0.2] relative",
      className
    )}
  >
    <div>
      <div className="p-2">{children}</div>
    </div>
  </div>
);

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <h4 className={cn("text-xl font-semibold mb-2", className)}>{children}</h4>
);

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <p className={cn("text-gray-600 mb-2", className)}>{children}</p>
);
