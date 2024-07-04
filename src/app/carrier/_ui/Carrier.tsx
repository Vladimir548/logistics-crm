'use client'
import {useQuery} from "@tanstack/react-query";
import {QueryCarrier} from "@/app/api/query/query-carrier";
import Table from "@/components/table/Table";
import {ColumnsCarrier} from "@/columns/ColumnsCarrier";
import TopLayouts from "@/app/layouts/TopLayouts";

export default function Carrier() {
    const { data } = useQuery({
        queryKey: ['get-all-carrier'],
        queryFn: () => QueryCarrier.getAll(),
    });
    return (
        <div>
            <TopLayouts url={'carrier'}/>
            <Table data={data?.carrier} columns={ColumnsCarrier} />
        </div>
    );
};