'use client';

import { useQuery } from '@tanstack/react-query';
import { QueryInvoice } from '@/app/api/query/query-invoice';
import { ColumnsInvoice } from '@/columns/ColumnsInvoice';
import Table from "@/components/table/Table";
import TopLayouts from "@/app/layouts/TopLayouts";

export default function Invoice() {
  const { data } = useQuery({
    queryKey: ['get-all-invoice'],
    queryFn: () => QueryInvoice.getAll(),
  });
  return (
    <div>
      <TopLayouts url={'invoice'}/>
            <Table data={data} columns={ColumnsInvoice} />

    </div>
  );
}
