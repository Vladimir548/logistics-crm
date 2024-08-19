'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/accordion/Accordion';

interface IFilterTrigger {
  title: string;
  children: React.ReactNode;
  className?: string;
  valueKey: string;
}

export default function FilterTrigger({ title, children, valueKey }: IFilterTrigger) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={valueKey}>
        <AccordionTrigger className={'text-text px-2  border-b-text data-[state=open]:border-b data-[state=open]:bg-text/10 hover:bg-text/10'} >{title}</AccordionTrigger>
        <AccordionContent className={''}>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
