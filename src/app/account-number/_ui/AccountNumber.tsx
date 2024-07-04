'use client';

import { useQuery } from '@tanstack/react-query';


import HomeLayout from '@/app/layouts/HomeLayout';



import { ColumnsAccountNumber } from '@/columns/ColumnsAccountNumber';
import {QueryAccountNumber} from "@/app/api/query/query-account-number";
import Table from "@/components/table/Table";
import TopLayouts from "@/app/layouts/TopLayouts";

export default function AccountNumber() {
    const { data } = useQuery({
        queryKey: ['get-all-account-number'],
        queryFn: () => QueryAccountNumber.getAll(),
    });
    return (
        <div>
            <TopLayouts url={'account-number'}/>
            <Table  data={data} columns={ColumnsAccountNumber} />
        </div>
    );
}
