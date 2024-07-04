'use client';
import HomeLayout from '@/app/layouts/HomeLayout';

import { useQuery } from '@tanstack/react-query';

import { QueryInvoice } from '@/app/api/query/query-invoice';
import { ColumnsStatsLogist } from '@/columns/ColumnsStatsLogist';
import { DateRangePicker } from '@nextui-org/date-picker';
import { I18nProvider } from '@react-aria/i18n';
import { useState } from 'react';
import { DateValue } from '@internationalized/date';
import { RangeValue } from '@nextui-org/react';
import Table from "@/components/table/Table";

export default function StatsLogist() {
  const [date, setDate] = useState<RangeValue<DateValue> | null>(null);
  const { data } = useQuery({
    queryKey: ['all-not-paid-our', date],
    queryFn: () => QueryInvoice.getStatsLogist(date?.start ? date?.start?.toString() : '', date?.end ? date?.end.toString() : ''),
  });
  return (
    <div>
      <HomeLayout>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4  ">
          <I18nProvider locale="ru-RU">
            <DateRangePicker
              variant={'underlined'}
              label="Период"
              visibleMonths={3}
              pageBehavior="single"
              onChange={(date) => setDate(date)}
              value={date}
            />
          </I18nProvider>
        </div>
        <main className="flex relative overflow-auto h-full ">

            <Table columns={ColumnsStatsLogist} data={data} />

        </main>
      </HomeLayout>
    </div>
  );
}
