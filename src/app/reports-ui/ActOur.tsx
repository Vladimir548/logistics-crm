'use client';




import HomeLayout from '@/app/layouts/HomeLayout';

import { useQuery } from '@tanstack/react-query';

import { ColumnsActOur } from '@/columns/ColumnsActOur';
import {QueryRegistry} from "@/app/api/query/query-registry";
import Table from "@/components/table/Table";

export default function ActOur() {
  const { data } = useQuery({
    queryKey: ['all-not-paid-our'],
    queryFn: () => QueryRegistry.getNotPaidOur(),
  });
  return (
    <div>
      <HomeLayout>
        <main className="flex relative overflow-auto h-full ">

            <Table columns={ColumnsActOur} data={data} />

        </main>
      </HomeLayout>
    </div>
  );
}
