'use client';

import * as React from 'react';

import { format, formatDate } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { ru } from 'date-fns/locale';
import cn from 'classnames';
import { FaCalendarDays } from 'react-icons/fa6';
import { useFilters } from '@/zustand/useFilters';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/popover/Popover";
import {Button} from "@/components/buttons/Buttons";
import {Calendar} from "@/components/calendar/Calendar";
import {useEffect} from "react";

export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { getPeriodFrom, getPeriodTo,periodTo,periodFrom } = useFilters();
  const [date, setDate] = React.useState<DateRange | undefined>();
  const getChooseDate = (date: DateRange | undefined) => {
    setDate(date);
    if (date?.to) {
      getPeriodTo(formatDate(date?.to, 'yyyy.MM.dd'));
    }
    else {
      getPeriodTo('')
    }
    if (date?.from) {
      getPeriodFrom(formatDate(date?.from, 'yyyy.MM.dd'));
    }
    else {
      getPeriodFrom('')
    }
  };
  useEffect(() => {
    if (periodFrom && periodTo) {
      setDate({
        from: new Date(periodFrom),
        to: new Date(periodTo),
      })
    }
  }, [periodTo,periodFrom]);
  return (
    <div className={cn('grid w-full h-full', className)}>
      <Popover>
        <PopoverTrigger  asChild>
          <Button
            variant={'no-style'}
            size={"no-style"}
            id="date"
            className={cn(
              ' justify-start  py-3 text-text text-left font-normal hover:bg-text/10 ',

            )}
          >
            <FaCalendarDays className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  <span className={'first-letter:uppercase pr-0.5'}>
                    {format(date.from, 'LLL dd, y', {
                      locale: ru,
                    })}
                  </span>
                  -
                  <span className={'first-letter:uppercase pl-0.5'}>
                    {format(date.to, 'LLL dd, y', {
                      locale: ru,
                    })}
                  </span>
                </>
              ) : (
                <span className={'first-letter:uppercase pl-0.5'}>
                  {format(date.from, 'LLL dd, y', {
                    locale: ru,
                  })}
                </span>
              )
            ) : (
              <span>Выберите период</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto bg-secondary-cust/60 backdrop-blur-2xl p-0 border border-border"
          align="start"
        >
          <Calendar
            locale={ru}
            mode="range"
          className={'backdrop-blur-lg'}
            defaultMonth={date?.from}
            selected={date}
            onSelect={(date) => getChooseDate(date)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
