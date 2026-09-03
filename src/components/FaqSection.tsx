"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { homeFaq } from "@/lib/schema";

/**
 * The visible half of the homepage FAQPage markup. These answers are the
 * clearest plain-language statement of what Kawi is, which is exactly what a
 * brand search needs to find as crawlable text rather than only as JSON-LD.
 */
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-24 lg:py-32 border-t border-foreground/10 bg-background"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Common questions
          </span>
          <div className="flex-1 h-px bg-foreground/10" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <h2 className="text-3xl lg:text-5xl font-display tracking-tight leading-tight">
              What Kawi is, in plain terms.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              The questions we are asked most often about the company, the engine and
              how a settlement actually runs.
            </p>
          </div>

          <div className="lg:col-span-8">
            <dl className="divide-y divide-foreground/10 border-t border-foreground/10">
              {homeFaq.map((entry, index) => {
                const open = openIndex === index;
                return (
                  <div key={entry.question} className="py-5">
                    <dt>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(open ? null : index)}
                        aria-expanded={open}
                        aria-controls={`faq-answer-${index}`}
                        className="w-full flex items-start justify-between gap-6 text-left group"
                      >
                        <span className="text-lg lg:text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                          {entry.question}
                        </span>
                        <span className="shrink-0 mt-1 text-muted-foreground">
                          {open ? (
                            <Minus className="w-5 h-5" />
                          ) : (
                            <Plus className="w-5 h-5" />
                          )}
                        </span>
                      </button>
                    </dt>
                    <dd
                      id={`faq-answer-${index}`}
                      // Always in the DOM so the answer is crawlable whether or
                      // not the reader has expanded it.
                      className={`grid transition-all duration-300 ${
                        open
                          ? "grid-rows-[1fr] opacity-100 mt-4"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <p className="overflow-hidden text-muted-foreground leading-relaxed">
                        {entry.answer}
                      </p>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
