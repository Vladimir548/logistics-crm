'use client';



import HomeLayout from '@/app/layouts/HomeLayout';

import { useQuery } from '@tanstack/react-query';


import { ColumnsActCarrier } from '@/columns/ColumnsActCarrier';
import {QueryRegistry} from "@/app/api/query/query-registry";
import Table from "@/components/table/Table";

export default function ActCarrier() {
  const { data } = useQuery({
    queryKey: ['all-not-paid-carrier'],
    queryFn: () => QueryRegistry.getNotPaidCarrier(),
  });
  return (
    <div>
      <HomeLayout>
        <main className="flex relative overflow-auto h-full ">

            <Table columns={ColumnsActCarrier} data={data} />

        </main>
      </HomeLayout>
    </div>
  );
}
