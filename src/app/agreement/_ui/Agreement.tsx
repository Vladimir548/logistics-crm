
'use client'

import Table from "@/components/table/Table";
import {QueryAgreement} from "@/app/api/query/query-agreement";
import {useQuery} from "@tanstack/react-query";
import {ColumnsAgreement} from "@/columns/ColumnsAgreement";
import TopLayouts from "@/app/layouts/TopLayouts";

export default function Agreement() {
    const { data } = useQuery({
        queryKey: ['get-all-agreement'],
        queryFn: () => QueryAgreement.getAll(),
    });
    return (
        <div>
            <TopLayouts url={'agreement'}/>
            <Table data={data} columns={ColumnsAgreement}/>
        </div>
    );
};