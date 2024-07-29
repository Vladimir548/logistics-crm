
import {ColumnsInvoice} from "@/columns/ColumnsInvoice";
import Table from "@/components/table/Table";
import {QueryInvoice} from "@/app/api/query/query-invoice";
import InvoiceContextMenu from "@/app/invoice/_ui/context-menu/InvoiceContextMenu";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useEffect} from "react";

export default function UserInvoice({id}:{id:number}) {
    const {getDataForContext,contextItem} = InvoiceContextMenu()
    const send = useReactQuerySubscription({query:'update-invoice', tracking:'invoice'})
    useEffect(() => {
        send({operation:'invalidate',entity:'get-all-invoice'})
    }, [send]);
    return (

            <Table queryKey={['get-all-invoice']} queryFn={(page) => QueryInvoice.user({id:id,page})} columns={ColumnsInvoice} contextItem={contextItem} getDataForContext={getDataForContext} />

    );
};