'use client';

import { useQuery } from '@tanstack/react-query';
import { ColumnsCostumerContact } from '@/columns/ColumnsCostumerContact';
import {QueryContactCostumer} from "@/app/api/query/query-contact-costumer";
import Table from "@/components/table/Table";
import TopLayouts from "@/app/layouts/TopLayouts";

export default function CostumerContact() {
  const { data } = useQuery({
    queryKey: ['get-all-costumer-contact'],
    queryFn: () => QueryContactCostumer.getAll(),
  });
  return (
    <div>
      <TopLayouts url={'costumer/contact'}/>
            <Table data={data} columns={ColumnsCostumerContact} />

    </div>
  );
}
