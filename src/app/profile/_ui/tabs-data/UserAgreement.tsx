import {useQuery} from "@tanstack/react-query";
import {ScrollArea, ScrollBar} from "@/components/scroll-area/ScrollArea";
import Table from "@/components/table/Table";
import React from "react";
import {QueryAgreement} from "@/app/api/query/query-agreement";
import {ColumnsAgreement} from "@/columns/ColumnsAgreement";

export default function UserAgreement({id}: {id: string}) {
    const {data,isPending} = useQuery({
        queryKey:['get-agreement-user'],
        queryFn:()=>QueryAgreement.user(id)
    })
    return (
        <ScrollArea className={' w-full h-full  '}>
            <Table data={data} columns={ColumnsAgreement} isLoading={isPending} />
            <ScrollBar  orientation={'horizontal'}/>
        </ScrollArea>
    );
};