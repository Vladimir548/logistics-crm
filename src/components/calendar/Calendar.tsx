'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import {format} from 'date-fns';
import cn from 'classnames';
import { IoIosArrowForward } from 'react-icons/io';
import {Button, buttonVariants} from "@/components/buttons/Buttons";
import Sorting from "@/components/sorting/Sorting";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
        // captionLayout={'dropdown'}
      showOutsideDays={showOutsideDays}

      className={cn('p-3', className)}
      classNames={{
          root:'backdrop-blur-lg bg-secondary-cust/60',
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0  ',
        month: 'space-y-4 text-text ',
        month_caption: 'flex justify-center pt-1 relative items-center ',
          dropdown:'p-2 bg-red-600',
        caption_label: 'text-sm  font-medium first-letter:uppercase',
          button_previous: 'absolute left-3 text-text-dark rotate-180 border duration-300 easy-linear rounded-md border-border p-1 hover:text-text hover:bg-text/20 z-10 ',
          button_next: 'absolute right-3 text-text-dark border duration-300 easy-linear rounded-md border-border p-1 hover:text-text hover:bg-text/20 z-10',
        month_grid: 'w-full border-collapse space-y-1',
          // weeks: `bg-border/30`,
        week: 'flex w-full ',
          weekday:' first-letter:uppercase w-8',
          weekdays:'flex',
          day_button:
          'relative h-8 w-8 p-0 text-center rounded-md m-0 hover:bg-border text-sm text-text opacity-100 ',
        day: 'p-0 font-normal rounded-md  text-text   cursor-pointer   aria-selected:opacity-100',

        range_start: '[&:has(>.day-range-end)]:rounded-l-md [&:has(>.day-range-end)]:rounded-r-none',
        range_end: '  [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-l-none',
        selected:
          'bg-border rounded-md hover:bg-border/40 focus:bg-text-dark/10 focus:text-text ',
        outside:
          'day-outside text-muted-foreground opacity-70  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        disabled: 'text-muted-foreground opacity-50',
        range_middle:
          'aria-selected:bg-text/15  rounded-none aria-selected:text-text',
        hidden: 'invisible',

        ...classNames,
      }}

      components={{
          Chevron : (props) =>{
                  if (props.orientation === "left") {
                   return <IoIosArrowForward size={20} {...props} />
           }
           return <IoIosArrowForward {...props} size={20} />;
         },
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
