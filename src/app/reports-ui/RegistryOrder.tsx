'use client';

import { useQuery } from '@tanstack/react-query';
import HomeLayout from '@/app/layouts/HomeLayout';
import { ColumnsPaidOrder } from '@/columns/ColumnsPaidOrder';

import Table from "@/components/table/Table";
import {QueryRegistry} from "@/app/api/query/query-registry";

export default function RegistryOrder() {
  const { data } = useQuery({
    queryKey: ['get-paid-order'],
    queryFn: () => QueryRegistry.getPaid(),
  });

  return (
    <div>
      <HomeLayout>
        <main className="flex relative overflow-auto h-full ">

            <Table columns={ColumnsPaidOrder} data={data} />

        </main>
      </HomeLayout>
    </div>
  );
}
