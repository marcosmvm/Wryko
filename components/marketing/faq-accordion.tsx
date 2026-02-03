'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  searchTerm?: string
  className?: string
}

function highlightText(text: string, term: string) {
  if (!term.trim()) return text
  const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-primary/20 text-foreground rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

export function FAQAccordion({ items, searchTerm = '', className }: FAQAccordionProps) {
  return (
    <div className={className}>
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <AccordionItem
              value={`item-${index}`}
              className="border-b border-border/50 rounded-lg px-2 hover:bg-primary/[0.02] transition-colors data-[state=open]:bg-primary/[0.03]"
            >
              <AccordionTrigger className="text-left text-base font-medium py-4 hover:no-underline">
                <span className="flex items-center gap-3">
                  <span className="w-0.5 h-5 rounded-full bg-transparent transition-colors group-data-[state=open]:bg-primary shrink-0" />
                  {searchTerm ? highlightText(item.question, searchTerm) : item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pl-5 pb-4">
                {searchTerm ? highlightText(item.answer, searchTerm) : item.answer}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  )
}
