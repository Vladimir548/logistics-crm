'use client';

import { QueryInvoice } from '@/app/api/query/query-invoice';
import { ColumnsInvoice } from '@/columns/ColumnsInvoice';
import Table from "@/components/table/Table";
import TopLayouts from "@/app/layouts/TopLayouts";
import InvoiceContextMenu from "@/app/invoice/_ui/context-menu/InvoiceContextMenu";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import { useEffect} from "react";

export default function Invoice() {
    const {getDataForContext,contextItem} = InvoiceContextMenu()
    const send = useReactQuerySubscription({query:'update-invoice', tracking:'invoice'})
    useEffect(() => {
        send({operation:'invalidate',entity:'get-all-invoice'})
    }, [send]);
  return (
    <div>
      <TopLayouts url={'invoice'}/>


            <Table queryKey={['get-all-invoice']} queryFn={(page,search) => QueryInvoice.getAll({query:search,page})} columns={ColumnsInvoice} contextItem={contextItem} getDataForContext={getDataForContext} />

    </div>
  );
}
