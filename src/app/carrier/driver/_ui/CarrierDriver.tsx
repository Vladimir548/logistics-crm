'use client'
import {QueryDriver} from "@/app/api/query/QueryDriver";
import {useQuery} from "@tanstack/react-query";
import Table from "@/components/table/Table";
import {ColumnsCarrierDriver} from "@/columns/ColumnsCarrierDriver";
import TopLayouts from "@/app/layouts/TopLayouts";

export default function CarrierDriver() {
    const { data } = useQuery({
        queryKey: ['get-all-driver'],
        queryFn: () => QueryDriver.getAll(),
    });
    return (
        <div>
            <TopLayouts url={'carrier/driver'}/>
            <Table data={data} columns={ColumnsCarrierDriver} />
        </div>
    );
};