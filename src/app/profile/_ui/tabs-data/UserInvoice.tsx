import {useQuery} from "@tanstack/react-query";
import {ColumnsInvoice} from "@/columns/ColumnsInvoice";
import Table from "@/components/table/Table";
import {ScrollArea, ScrollBar} from "@/components/scroll-area/ScrollArea";
import {QueryInvoice} from "@/app/api/query/query-invoice";

export default function UserInvoice({id}:{id:string}) {
    const {data,isPending} = useQuery({
        queryKey:['get-invoice-user'],
        queryFn:()=>QueryInvoice.user(id)
    })
    return (
        <ScrollArea className={' w-full h-full  '}>
            <Table data={data} columns={ColumnsInvoice} isLoading={isPending} />
            <ScrollBar  orientation="horizontal" />
        </ScrollArea>
    );
};