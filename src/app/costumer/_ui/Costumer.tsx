'use client'
import {useQuery} from "@tanstack/react-query";
import {QueryCostumer} from "@/app/api/query/QueryCostumer";
import Table from "@/components/table/Table";
import {ColumnsCostumer} from "@/columns/ColumnsCostumer";
import TopLayouts from "@/app/layouts/TopLayouts";

export default function Costumer() {
    const { data } = useQuery({
        queryKey: ['get-all-costumer'],
        queryFn: () => QueryCostumer.getAll(),
    });
    return (
        <div>
            <TopLayouts url={'costumer'}/>
            <Table data={data?.costumers} columns={ColumnsCostumer} />
        </div>
    );
};