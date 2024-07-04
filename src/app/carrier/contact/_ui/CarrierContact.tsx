'use client'
import {useQuery} from "@tanstack/react-query";
import {QueryContactCarrier} from "@/app/api/query/query-contact-carrier";
import Table from "@/components/table/Table";
import {ColumnsCarrierContact} from "@/columns/ColumnsCarrierContact";
import TopLayouts from "@/app/layouts/TopLayouts";

export default function CarrierContact() {
    const { data } = useQuery({
        queryKey: ['get-all-carrier-contact'],
        queryFn: () => QueryContactCarrier.getAll(),
    });
    return (
        <div>
            <TopLayouts url={'carrier/contact'}/>
            <Table data={data} columns={ColumnsCarrierContact} />
        </div>
    );
};