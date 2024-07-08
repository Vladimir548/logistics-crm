
'use client'

import {useQuery} from "@tanstack/react-query";
import {QueryApplication} from "@/app/api/query/query-application";
import {ScrollArea, ScrollBar} from "@/components/scroll-area/ScrollArea";
import React from "react";
import Table from "@/components/table/Table";
import {ColumnsApplication} from "@/columns/ColumnsApplication";

export default function UserApplication({id}: {id: string}) {
    const {data,isPending} = useQuery({
        queryKey:['get-application-user'],
        queryFn:()=>QueryApplication.user(id)
    })
    return (
        <ScrollArea className={' w-full h-full  '}>
           <Table data={data} columns={ColumnsApplication} isLoading={isPending} />
            <ScrollBar  orientation="horizontal" />
        </ScrollArea>
    );
};