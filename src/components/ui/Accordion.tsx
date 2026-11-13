"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] overflow-hidden transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-100 pr-4">
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-zinc-500 dark:text-zinc-400"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80 pt-4">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
