"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  componentPreview: React.ReactNode; // The component to display as preview
};

export const LinkPreview = ({
  url,
  children,
  className,
  componentPreview,
}: LinkPreviewProps) => {
  const [isOpen, setOpen] = React.useState(false);
  const [hoverEffect, setHoverEffect] = React.useState(false);

  const handleMouseEnter = () => setHoverEffect(true);

  return (
    <HoverCardPrimitive.Root
      openDelay={50}
      closeDelay={100}
      onOpenChange={(open) => setOpen(open)}
    >
      <HoverCardPrimitive.Trigger
        onMouseEnter={handleMouseEnter}
        className={cn("text-black dark:text-white", className)}
      >
        {children}
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Content align="center" sideOffset={5} className="relative">
        <AnimatePresence>
          {isOpen && hoverEffect && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: -20,
                scale: 1,
                transition: { type: "spring", stiffness: 260, damping: 20 },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              className="shadow-2xl rounded-2xl"
              style={{ zIndex: 9999 }} // Ensures the preview is on top
            >
              <div
                className="p-4 bg-white border-2 border-transparent rounded-2xl shadow-xl overflow-auto max-h-[80vh]"
              >
                <div className="rounded-lg overflow-hidden w-full">
                  <Link
                    href={url}
                    className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                  >
                    {componentPreview}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};
